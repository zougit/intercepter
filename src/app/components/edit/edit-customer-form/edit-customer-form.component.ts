import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { Zone } from 'src/app/models/zone.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { globals } from 'src/globals';

@Component({
  selector: 'app-edit-customer-form',
  templateUrl: './edit-customer-form.component.html',
  styleUrls: ['./edit-customer-form.component.scss'],
})
export class EditCustomerFormComponent {
  @Input() id!: string;

  editForm!: FormGroup;
  errorMsg!: string;
  types = globals.types;

  customer: Customer;

  zoneSub: any;
  zones!: Zone[];

  zonesNames = [''];

  cpt = 0;

  nbzone = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private zoneService: ZoneService
  ) {
    this.customer = new Customer('', '');
  }

  ngOnInit() {
    this.customerService
      .getById(this.id)
      .then((customer: Customer) => {
        this.customer = customer;
        this.editForm.patchValue({
          name: this.customer.name,
          type: this.types.find((t) => t.id === +this.customer.type)?.id,
        });
      })
      .catch((errMsg) => (this.errorMsg = errMsg));

    this.zoneService.getAll();
    this._initSubs();
    this._initForm();
  }

  ngAfterContentChecked() {
    if (this.zones) {
      this.zones = this.getZoneByCustomerId(this.id);
      this.nbzone = this.zones.length;
    }
  }

  getZoneByCustomerId(id: string) {
    return this.zones.filter((s) => s.customerId == id);
  }

  range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  _initSubs() {
    this.zoneSub = this.zoneService.items.subscribe(
      (items) => (this.zones = items)
    );
  }

  _initForm() {
    this.editForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  onClickCpt() {
    if (this.cpt === 0) {
      this.cpt = this.zones.length;
    } else {
      this.cpt++;
    }
    this.zonesNames.push('');
  }

  onClickSubmit() {
    this.customerService
      .edit({
        name: this.editForm.value.name,
        type: this.editForm.value.type,
        id: this.id,
      })
      .then((customer: Customer) => {
        for (const zone of this.zonesNames) {
          if (zone != '') {
            const newzone = new Zone(zone, this.id).toPlainObj();
            this.zoneService
              .add(newzone as unknown as Zone)
              .then(() => console.log('Success'))
              .catch((errMsg) => {
                this.errorMsg = errMsg;
                console.log(errMsg);
              });
          }
        }
        for (const zone of this.zones) {
          if (zone) {
            this.zoneService
              .edit(zone)
              .then(() => console.log('Success'))
              .catch((errMsg) => {
                this.errorMsg = errMsg;
                console.log(errMsg);
              });
          }
        }
        this.router.navigate(['customers']);
      })
      .catch((errMsg) => {
        this.errorMsg = errMsg;
        console.log(errMsg);
      });
  }

  ngOnDestroy() {
    this.zoneSub.unsubscribe()
  }
}
