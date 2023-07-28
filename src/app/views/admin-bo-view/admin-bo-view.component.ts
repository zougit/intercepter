import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { User } from 'src/app/models/user.model';
import { Zone } from 'src/app/models/zone.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { UserService } from 'src/app/services/user/user.service';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { globals } from 'src/globals';

@Component({
  selector: 'app-admin-bo-view',
  templateUrl: './admin-bo-view.component.html',
  styleUrls: ['./admin-bo-view.component.scss'],
})
export class AdminBOViewComponent {
  thead = [
    { name: 'username', size: '10' },
    { name: 'role', size: '10' },
    { name: 'customer', size: '10' },
    { name: 'zone', size: '10' },
    { name: 'type', size: '10' },
    { name: 'status', size: '10' },
    { name: '', size: '20' },
  ];

  users!: User[];
  userSub!: Subscription;

  customers!: Customer[];
  customerSub!: Subscription;

  zones!: Zone[];
  zoneSub!: Subscription;

  types = globals.types;

  constructor(
    public userService: UserService,
    private customerService: CustomerService,
    private zoneService: ZoneService
  ) {}

  ngOnInit() {
    this._initSubs();
    this.userService.getAll();
    this.customerService.getAll();
    this.zoneService.getAll();
  }

  ngAfterContentChecked() {
    if (this.users && this.customers && this.zones) {
      for (let u of this.users) {
        Object.assign(u, {
          customer: this.customers.find((x) => x.id == u.clientId)?.name ?? '',
        });
        Object.assign(u, {
          zone: u.zoneId !== '' ? this.getZoneById(u.zoneId.split(',')) : '',
        });
        u.type = this.types.find((t) => t.id === +u.type)?.name ?? '';
        // console.log(u);
      }
    }
  }

  getZoneById(ids: string[]) {
    let zones: string[] = [];

    ids.forEach((x) => {
      for (const z of this.zones) {
        if (x == z.id) {
          zones.push(z.name);
        }
      }
    });

    return zones;
  }

  _initSubs() {
    this.userSub = this.userService.items.subscribe(
      (items) => (this.users = items)
    );
    this.customerSub = this.customerService.items.subscribe(
      (items) => (this.customers = items)
    );
    this.zoneSub = this.zoneService.items.subscribe(
      (items) => (this.zones = items)
    );
  }

  ngOnDestroy() {
    this.customerSub.unsubscribe();
    this.zoneSub.unsubscribe();
  }
}
