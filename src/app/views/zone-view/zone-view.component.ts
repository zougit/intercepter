import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Zone } from 'src/app/models/zone.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { globals } from 'src/globals';
import { Device } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/device/device.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/models/user.model';
import { array } from '@amcharts/amcharts5';

@Component({
  selector: 'app-zone-view',
  templateUrl: './zone-view.component.html',
  styleUrls: ['./zone-view.component.scss'],
})
export class ZoneViewComponent {
  path!: string;

  theadConcession = [
    { name: 'customer', size: '20' },
    { name: 'name', size: '20' },
    { name: 'cgId', size: '10' },
    { name: 'id', size: '10' },
    { name: 'status', size: '10' },
    { name: 'nbDevices', size: '10' },
    { name: '', size: '10' },
  ];
  theadCatalyseur = [
    { name: 'customer', size: '20' },
    { name: 'name', size: '20' },
    { name: 'option', size: '10' },
    { name: 'cgId', size: '10' },
    { name: 'id', size: '10' },
    { name: 'nbDevices', size: '10' },
    { name: '', size: '10' },
  ];

  devices!: Device[];
  deviceSub!: Subscription;

  customers!: Customer[];
  customerZone!: Customer[];
  customerSub!: Subscription;

  zones!: Zone[];
  zoneSub!: Subscription;

  zoneType!: Zone[];

  users!: User[];
  userSub!: Subscription;

  isSorting = false;
  types = globals.types;

  constructor(
    private location: Location,
    private customerService: CustomerService,
    public zoneService: ZoneService,
    private deviceService: DeviceService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.path = this.location.path().slice(6);
    this._initSubs();
    this.customerService.getAll();
    this.zoneService.getAll();
    this.deviceService.getAll();
    this.userService.getAll();

    this.isSorting = false;
  }

  ngAfterContentChecked() {
    if (this.customers && this.zones && this.devices && this.users) {
      for (let z of this.zones) {
        Object.assign(z, { customer: this.getCustomerById(z.customerId) });
        z.nbDevices = this.getNbDevice(z.id);
        Object.assign(z, {
          canDel: z.nbDevices || this.filterUserZone(z.id).length > 0 ? false : true,
        });
      }

      if (!this.isSorting) {
        let type = this.types.find((t) => t.name === this.path)?.id;
        this.zoneType = this.getZonebyType(type!);
      }
      // console.log(this.zoneType);
    }
  }

  filterUserZone(id: string) {
    return this.users.filter((x) => {
      let zone: string[] = x.zoneId.split(",");
      zone = zone.filter((x) => x == id);
      
      if (zone.length > 0) {
        return zone;
      }
      return;
    });
  }

  canDelete(item: Zone) {
    if (item.nbDevices) {
      // console.log(item);
      return false;
    }
    return true;
  }

  getNbDevice(zoneId: string) {
    if (zoneId) {
      return this.devices.filter((x) => x.zone == zoneId).length;
    }
    return 0;
  }

  getByCustomer(id: string) {
    if (id != '') {
      let type = this.types.find((t) => t.name === this.path)?.id;
      this.zoneType = this.getZonebyType(type!).filter(
        (z) => z.customerId == id
      );
      this.isSorting = true;
    } else {
      this.isSorting = false;
    }
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

  getZonebyType(type: number) {
    if (type) {
      this.customerZone = this.customers.filter(
        (s) => s.type === type.toString()
      );
      let zonescustomer = [];

      for (const c of this.customerZone) {
        for (const z of this.zones) {
          if (z.customerId === c.id) {
            zonescustomer.push(z);
          }
        }
      }

      return zonescustomer;
    }
    return [];
  }

  _initSubs() {
    this.zoneSub = this.zoneService.items.subscribe(
      (items) => (this.zones = items)
    );
    this.customerSub = this.customerService.items.subscribe(
      (items) => (this.customers = items)
    );
    this.deviceSub = this.deviceService.items.subscribe(
      (items) => (this.devices = items)
    );
    this.userSub = this.userService.items.subscribe(
      (items) => (this.users = items)
    );
  }

  ngOnDestroy() {
    this.customerSub.unsubscribe();
    this.zoneSub.unsubscribe();
    this.deviceSub.unsubscribe();
    this.userSub.unsubscribe();
  }
}
