import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { User } from 'src/app/models/user.model';
import { Zone } from 'src/app/models/zone.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { UserService } from 'src/app/services/user/user.service';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { globals } from 'src/globals';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss'],
})
export class AddUserFormComponent {
  addForm!: FormGroup;
  errorMsg!: string;
  isAdmins = true;

  customers!: Customer[];
  customerSub!: Subscription;

  zones!: Zone[];
  zonecustomerId!: Zone[];
  zoneSub!: Subscription;

  regions = globals.region;
  roles = globals.roles;

  tab = ['username', 'password', 'r_password'];
  tabSelect!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
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
    if (this.isAdmins) {
      this.tabSelect = [
        { key: this.roles, name: 'role' },
        { key: this.regions, name: 'region' },
        { key: ['yes', 'no'], name: 'active' },
      ];
    } else {
      this.tabSelect = [
        { key: this.roles, name: 'role' },
        { key: this.customers, name: 'client' },
        { key: this.zonecustomerId, name: 'zone' },
        { key: this.regions, name: 'region' },
        { key: ['yes', 'no'], name: 'active' },
      ];
    }
  }

  _initForm() {
    this.addForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      r_password: ['', Validators.required],
      role: ['', Validators.required],
      region: ['', Validators.required],
      active: ['', Validators.required],
      // client: ['', Validators.required],
      // zone: ['', Validators.required],
      client: '',
      zone: '',
    });
  }

  getZoneForCustomerId(id: string, name: string) {
    if (name === 'client') {
      id = id.split("'")[1];
      this.zonecustomerId = this.zones.filter((zone) => zone.customerId === id);
    }
  }

  isAdmin(role: string, name: string) {
    if (
      name == 'role' &&
      role.split("'")[1] != 'admin' &&
      role.split("'")[1] != ('' as string)
    ) {
      this.isAdmins = false;
    } else if (
      name == 'role' &&
      (role.split("'")[1] === 'admin' || role.split("'")[1] === ('' as string))
    ) {
      this.isAdmins = true;
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
    let clientId =
      this.addForm.controls['client'].value[0] != ''
        ? this.addForm.controls['client'].value.toString()
        : '';

    // console.log('client ', clientId);

    let zoneId =
      this.addForm.controls['zone'].value[0] != ''
        ? this.addForm.controls['zone'].value.toString()
        : '';

    // console.log('zone ', zoneId);

    let typeC = this.customers.find((x) => x.id == clientId)?.type ?? '';

    // console.log('type ', typeC);

    const newUser = new User(
      this.addForm.controls['username'].value,
      this.addForm.controls['password'].value,
      this.addForm.controls['role'].value.toString(),
      this.addForm.controls['active'].value.toString(),
      clientId,
      zoneId,
      typeC,
      this.addForm.controls['region'].value.toString()
    ).toPlainObj();

    this.userService
      .add(newUser as User)
      .then(() => this.router.navigate(['admin-bo']))
      .catch((errMsg) => (this.errorMsg = errMsg));
  }
}
