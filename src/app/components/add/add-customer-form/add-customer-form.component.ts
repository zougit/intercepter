import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer.model';
import { Zone } from 'src/app/models/zone.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { globals } from 'src/globals';

@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.scss'],
})
export class AddCustomerFormComponent {
  addForm!: FormGroup;
  errorMsg!: string;

  zones = [''];

  cpt = 1;

  types = globals.types;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private customerService: CustomerService,
    private zoneService: ZoneService
  ) {}

  ngOnInit() {
    this._initForm();
  }

  _initForm() {
    this.addForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  onClickCpt(str: string) {
    if (str === 'plus') {
      this.cpt++;
      this.zones.push('');
    } else if (str === 'minus' && this.cpt > 1) {
      this.cpt--;
      this.zones.pop();
    }
  }

  onClickSubmit() {
    this.customerService
      .add(this.addForm.value)
      .then((customer: Customer) => {
        // console.log('test');
        for (const zone of this.zones) {
          if (zone != '') {
            const newzone = new Zone(zone,customer.id).toPlainObj()
            // console.log(newzone);
            
            this.zoneService
              .add((newzone as unknown as Zone))
              .then(() => console.log('Success'))
              .catch((errMsg) => (this.errorMsg = errMsg));
          }
        }
        this.router.navigate(['customers']);
      })
      .catch((errMsg) => (this.errorMsg = errMsg));
  }
}
