import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Device } from 'src/app/models/device.model';
import { User } from 'src/app/models/user.model';
import { Zone } from 'src/app/models/zone.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { DeviceService } from 'src/app/services/device/device.service';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { globals } from 'src/globals';

@Component({
  selector: 'app-device-view',
  templateUrl: './device-view.component.html',
  styleUrls: ['./device-view.component.scss'],
})
export class DeviceViewComponent {
  thead!: any[];

  types = globals.types;

  boxChecked!: any[];
  idsChecked!: string;

  devices!: Device[];
  devicesTab!: Device[];
  deviceSub!: Subscription;

  customers!: Customer[];
  customerSub!: Subscription;

  zones!: Zone[];
  zoneSub!: Subscription;

  user!: User;

  isSorting = false;
  isChecked = false;

  constructor(
    private customerService: CustomerService,
    private zoneService: ZoneService,
    public deviceService: DeviceService
  ) {}

  ngOnInit() {
    this.user = localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user')!)
      : '';

    if (this.user.role != 'user') {
      this.thead = [
        { name: 'customer', size: '10' },
        { name: 'zone', size: '10' },
        { name: 'name', size: '10' },
        { name: 'reference', size: '10' },
        { name: 'type', size: '10' },
        { name: 'deveui', size: '10' },
        { name: 'last_cnx', size: '10' },
        { name: 'alarm', size: '10' },
      ];
    } else {
      this.thead = [
        { name: 'customer', size: '10' },
        { name: 'zone', size: '10' },
        { name: 'name', size: '10' },
        { name: 'reference', size: '10' },
        { name: 'last_cnx', size: '10' },
        { name: 'alarm', size: '10' },
      ];
    }

    this._initSubs();
    // this.customerService.items.next(JSON.parse(localStorage.getItem('customers')!))
    this.customerService.getAll();
    this.zoneService.getAll();
    this.deviceService.getAll();
  }

  ngAfterContentChecked() {
    if (this.customers && this.zones && this.devices && !this.isChecked) {
      if (!this.isSorting) {
        this.devicesTab = [];
        this.devices.forEach((val) =>
          this.devicesTab.push(Object.assign({}, val))
        );
      }

      if (this.user && this.user.zoneId) {
        let zoneIds = this.user.zoneId.split(',');
        // console.log(zoneIds);
        let tab;
        let tabs = [];
        for (const zone of zoneIds) {
          tab = this.devicesTab.filter((x) => x.zone == zone);
          tabs.push(tab);
          // console.log("zone",zone,"\ntab",tab,"\ntabs",tabs);
        }
        this.devicesTab = tabs.flat();
        // console.log("device",this.devicesTab,"\n_______________________");
      }

      for (let d of this.devicesTab) {
        Object.assign(d, { customer: this.getCustomerById(d.client) });
        d.zone = this.getZoneById(d.zone);
      }
      // console.log(this.devices);
      // console.log(this.devicesTab);
    }
  }

  canDelete(item: any) {
    return true;
  }

  addBox(box: any) {
    this.isChecked = true;
    this.boxChecked = box;
    // console.log("boxCheck : ",this.boxChecked);
    sessionStorage.setItem('Ids', box);
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
    return this.zones
      .map((s) => {
        if (s.id === id) {
          return s.name;
        }
        return null;
      })
      .filter((s) => s != null)
      .toString();
  }

  _initSubs() {
    this.zoneSub = this.zoneService.items.subscribe(
      (items) => (this.zones = items)
    );
    this.customerSub = this.customerService.items.subscribe((items) => {
      this.customers = items;
      // localStorage.setItem('customers', JSON.stringify(items));
      // console.log(items);
    });
    this.deviceSub = this.deviceService.items.subscribe(
      (items) => (this.devices = items)
    );
  }

  getByZone(id: string) {
    this.isChecked = false;
    if (id != '') {
      this.devicesTab = [];
      this.devices
        .filter((d) => d.zone === id)
        .forEach((val) => this.devicesTab.push(Object.assign({}, val)));
      this.isSorting = true;
    } else {
      this.isSorting = false;
    }
  }

  getByType(type: any) {
    this.isChecked = false;
    if (type) {
      this.devicesTab = [];
      let types = this.types.find((t) => t.id === +type)?.id;

      let ztype = this.customers.filter((s) => s.type === types?.toString());
      let devicesType = [];

      for (const c of ztype) {
        for (const d of this.devices) {
          if (d.client === c.id) {
            devicesType.push(d);
          }
        }
      }
      devicesType.forEach((val) =>
        this.devicesTab.push(Object.assign({}, val))
      );
      this.isSorting = true;
    } else {
      this.isSorting = false;
    }
  }

  ngOnDestroy() {
    this.customerSub.unsubscribe();
    this.zoneSub.unsubscribe();
    this.deviceSub.unsubscribe();
  }
}
