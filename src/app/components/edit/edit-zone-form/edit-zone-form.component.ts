import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  AfterContentChecked,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Zone } from 'src/app/models/zone.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { globals } from 'src/globals';

@Component({
  selector: 'app-edit-zone-form',
  templateUrl: './edit-zone-form.component.html',
  styleUrls: ['./edit-zone-form.component.scss'],
})
export class EditZoneFormComponent
  implements OnInit, AfterContentChecked, OnDestroy
{
  @Input() id!: string;
  @Input() page!: string;

  editForm!: FormGroup;
  errorMsg!: string;

  zone!: Zone;

  customers!: Customer[];
  customerSub!: Subscription;

  type = globals.types;

  cpt = 0;

  constructor(
    private formBuilder: FormBuilder,
    private zoneService: ZoneService,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this._initForm();

    this.customerSub = this.customerService.items.subscribe(
      (items) => (this.customers = items)
    );

    this.customerService.getAll();

    this.zoneService
      .getById(this.id)
      .then((zone) => {
        this.zone = zone;

        this.editForm.patchValue({
          // client: this.customers.find((x) => x.id == zone.customerId)?.name,
          zone: zone.name,
          option: zone.option,
          idCG: zone.cgId,
        });
      })
      .catch((err) => console.log(err));
  }

  ngAfterContentChecked(): void {
    if (this.customers && this.page && this.zone) {
      if (this.cpt <= 0) {
        this.editForm.patchValue({
          client: this.customers.find((x) => x.id == this.zone.customerId)?.id,
        });
        this.cpt++;
      }
      this.customers = this.customers.filter(
        (s) =>
          s.type === this.type.find((x) => x.name == this.page)?.id.toString()
      );
    }
  }

  _initForm() {
    this.editForm = this.formBuilder.group({
      client: ['', Validators.required],
      zone: ['', Validators.required],

      idCG: ['', Validators.required],
    });
    if (this.page && this.page == 'converters') {
      this.editForm.addControl(
        'option',
        this.formBuilder.control(['', Validators.required])
      );
    }
  }

  onClickSubmit() {
    console.log('fini');
  }

  ngOnDestroy() {
    this.customerSub.unsubscribe();
  }
}
