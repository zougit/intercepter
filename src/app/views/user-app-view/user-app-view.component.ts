import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { UserApp } from 'src/app/models/userApp.model';
import { Zone } from 'src/app/models/zone.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { UserAppService } from 'src/app/services/userApp/user-app.service';
import { ZoneService } from 'src/app/services/zone/zone.service';

@Component({
  selector: 'app-user-app-view',
  templateUrl: './user-app-view.component.html',
  styleUrls: ['./user-app-view.component.scss'],
})
export class UserAppViewComponent implements OnInit, AfterContentChecked {
  thead = [
    { name: 'name', size: '10' },
    { name: 'firstname', size: '10' },
    { name: 'login', size: '10' },
    { name: 'password', size: '10' },
    { name: 'customer', size: '10' },
    { name: 'zone', size: '10' },
    { name: 'status', size: '10' },
    { name: 'role', size: '10' },
  ];

  customers!: Customer[];
  customerSub!: Subscription;

  zones!: Zone[];
  zoneSub!: Subscription;

  usersApp!: UserApp[];
  usersAppSub!: Subscription;

  constructor(
    private zoneService: ZoneService,
    private customerService: CustomerService,
    private userAppService: UserAppService
  ) {}

  ngOnInit(): void {
    this._initSubs();
    this.customerService.getAll();
    this.zoneService.getAll();
    this.userAppService.getAll();
  }

  ngAfterContentChecked() {
    if (this.usersApp) {
      for (let u of this.usersApp) {
        let zone = this.getZoneById(u.zoneId);
        Object.assign(u, { zone: zone!.name });
        Object.assign(u, { customer: this.getCustomerById(zone!.customerId) });
      }
    }
  }

  _initSubs() {
    this.zoneSub = this.zoneService.items.subscribe(
      (items) => (this.zones = items)
    );
    this.usersAppSub = this.userAppService.items.subscribe(
      (items) => (this.usersApp = items)
    );
    this.customerSub = this.customerService.items.subscribe(
      (items) => (this.customers = items)
    );
  }

  getCustomerById(id: string) {
    return this.customers
      .map((s) => {
        if (s.id === id) {
          return s.name;
        }
        return null;
      })
      .filter((s) => s != null)
      .toString();
  }

  getZoneById(id: string) {
    return this.zones.find((s) => s.id == id);
  }

  getByZone(id: string) {
    if (id != '') {
      this.usersApp
        .filter((d) => d.zoneId === id)
        .forEach((val) => this.usersApp.push(Object.assign({}, val)));
    }
  }
}
