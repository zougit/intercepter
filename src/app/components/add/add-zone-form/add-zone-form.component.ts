import {
  AfterContentChecked,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Zone } from 'src/app/models/zone.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { globals } from 'src/globals';

@Component({
  selector: 'app-add-zone-form',
  templateUrl: './add-zone-form.component.html',
  styleUrls: ['./add-zone-form.component.scss'],
})
export class AddZoneFormComponent
  implements OnInit, AfterContentChecked, OnDestroy
{
  @Input() page!: string;

  addForm!: FormGroup;
  errorMsg!: string;

  customers!: Customer[];
  customerSub!: Subscription;

  type = globals.types;

  constructor(
    private formBuilder: FormBuilder,
    private zoneService: ZoneService,
    private customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this._initSubs();
    this.customerService.getAll();
    this._initForm();
  }

  ngAfterContentChecked() {
    if (this.customers && this.page) {
      this.customers = this.customers.filter(
        (s) =>
          s.type === this.type.find((x) => x.name == this.page)?.id.toString()
      );
    }
  }

  _initForm() {
    this.addForm = this.formBuilder.group({
      client: ['', Validators.required],
      zone: ['', Validators.required],

      idCG: ['', Validators.required],
    });
    if (this.page && this.page == 'converters') {
      this.addForm.addControl(
        'option',
        this.formBuilder.control(['', Validators.required])
      );
    }
  }

  _initSubs() {
    this.customerSub = this.customerService.items.subscribe(
      (items) => (this.customers = items)
    );
  }

  onClickSubmit() {
    const newUser = new Zone(
      this.addForm.value['zone'],
      this.addForm.value['client'],
      'On',
      0,
      this.addForm.value['idCG'],
      this.addForm.value['option']
    ).toPlainObj();

    this.zoneService
      .add(newUser as Zone)
      .then(() => this.router.navigate(['zone/' + this.page]))
      .catch((errMsg) => (this.errorMsg = errMsg));
  }

  ngOnDestroy(): void {
    this.customerSub.unsubscribe();
  }
}
