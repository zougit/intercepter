import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { UserApp } from 'src/app/models/userApp.model';
import { Zone } from 'src/app/models/zone.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { UserAppService } from 'src/app/services/userApp/user-app.service';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { globals } from 'src/globals';

@Component({
  selector: 'app-add-user-app-form',
  templateUrl: './add-user-app-form.component.html',
  styleUrls: ['./add-user-app-form.component.scss'],
})
export class AddUserAppFormComponent {
  addForm!: FormGroup;
  errorMsg!: string;
  isAdmins = true;

  customers!: Customer[];
  customerSub!: Subscription;

  zones!: Zone[];
  zonecustomerId!: Zone[];
  zoneSub!: Subscription;

  roles = globals.roles;

  tab = ['name', 'firstname', 'login', 'password', 'r_password'];
  tabSelect!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private userAppService: UserAppService,
    private customerService: CustomerService,
    private zoneService: ZoneService,
    private router: Router
  ) {}

  ngOnInit() {
    this._initSubs();
    this.customerService.getAll();
    this.zoneService.getAll();
    this._initForm();
  }

  ngAfterContentChecked() {
    if (this.customers && this.zones) {
      this.customers = this.customers.filter((s) => s.type === '1');
      this.tabSelect = [
        { key: this.customers, name: 'client' },
        { key: this.zonecustomerId, name: 'zone' },
        { key: ['yes', 'no'], name: 'active' },
        { key: this.roles, name: 'role' },
      ];
    }
  }

  _initForm() {
    this.addForm = this.formBuilder.group({
      login: ['', Validators.required],
      name: ['', Validators.required],
      firstname: ['', Validators.required],
      password: ['', Validators.required],
      r_password: ['', Validators.required],
      role: ['', Validators.required],
      active: ['', Validators.required],
      client: ['', Validators.required],
      zone: ['', Validators.required],
    });
  }

  getZoneForCustomerId(id: string, name: string) {
    if (name === 'client') {
      // id = id.split("'")[1];
      this.zonecustomerId = this.zones.filter((zone) => zone.customerId === id);
    }
  }

  _initSubs() {
    this.zoneSub = this.zoneService.items.subscribe(
      (items) => (this.zones = items)
    );
    this.customerSub = this.customerService.items.subscribe(
      (items) => (this.customers = items)
    );
  }

  onClickSubmit() {
    const newUserApp = new UserApp(
      this.addForm.controls['login'].value,
      this.addForm.controls['name'].value,
      this.addForm.controls['firstname'].value,
      this.addForm.controls['password'].value,
      this.addForm.controls['role'].value,
      this.addForm.controls['active'].value,
      this.addForm.controls['zone'].value
    ).toPlainObj();

    this.userAppService
      .add(newUserApp as UserApp)
      .then(() => this.router.navigate(['user-app']))
      .catch((errMsg) => (this.errorMsg = errMsg));
  }
}
