import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Zone } from 'src/app/models/zone.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { globals } from 'src/globals';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.scss'],
})
export class CustomerViewComponent {
  thead = [
    { name: 'name', size: '20' },
    { name: 'type', size: '10' },
    { name: 'zone', size: '20' },
    { name: '', size: '20' },
  ];

  customers!: Customer[];
  customerSub!: Subscription;

  zones!: Zone[];
  zoneSub!: Subscription;

  types = globals.types

  constructor(
    public customerService: CustomerService,
    private zoneService: ZoneService
  ) {}

  ngOnInit() {
    this._initSubs();
    this.customerService.getAll();
    this.zoneService.getAll();
  }

  ngAfterContentChecked() {
    if (this.customers && this.zones) {
      this.customerService.items.next(this.customers)
      for (let c of this.customers) {
        Object.assign(c, { zone: this.getZoneByCustomerId(c.id) });
        Object.assign(c, { typeId: this.getZoneByCustomerId(c.type) });
        c.type = this.types.find((t) => t.id === +c.type)?.name ?? "";
        // console.log(c);
      }
    }
  }

  getZoneByCustomerId(id: string) {
    let map = this.zones.map((s) => {
      if (s.customerId === id) {
        return s.name;
      }
      return null;
    });
    return map.filter((s) => s != null);
  }

  _initSubs() {
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
