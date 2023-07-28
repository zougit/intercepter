import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Device } from 'src/app/models/device.model';
import { Zone } from 'src/app/models/zone.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { DeviceService } from 'src/app/services/device/device.service';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { globals } from 'src/globals';

@Component({
  selector: 'app-edit-multi-device-form',
  templateUrl: './edit-multi-device-form.component.html',
  styleUrls: ['./edit-multi-device-form.component.scss'],
})
export class EditMultiDeviceFormComponent {
  @Input() id!: string;

  devices: Device[] = [];

  editForms!: FormArray;
  editForm!: FormGroup;
  errorMsg!: string;

  customers!: Customer[];
  customerSub!: Subscription;

  zones!: Zone[];
  zonesDevices: Zone[][] = [];
  zonecustomerId!: Zone[];
  zoneSub!: Subscription;

  ids!: string[];

  types = globals.capteurs;

  tab = ['deveui', 'name'];
  tabSelect!: any[];

  isCustomer = false;

  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private customerService: CustomerService,
    private zoneService: ZoneService,
    private router: Router
  ) {}

  ngOnInit() {
    let ids = sessionStorage.getItem('Ids');
    this.ids = ids!.split(',');
    console.log(this.ids);

    this._initForm();
    this._initSubs();

    this.customerService.getAll();
    this.zoneService.getAll();

    this.ids.forEach((id: string, i) => {
      this.deviceService
        .getById(id)
        .then((device: Device) => {
          this.devices.push(device);
          this.editForms.controls[i].patchValue(device);
          // console.log('i ', i, ' form ', this.editForms.controls[i].value);
        })
        .catch((errMsg) => (this.errorMsg = errMsg));
    });
  }

  ngAfterContentChecked() {
    if (this.customers && this.zones && this.devices) {
      if (!this.isCustomer) {
        for (const [i, device] of this.devices.entries()) {
          this.getZoneForCustomerId(device.client, i, 'check');
        }
      }
      // this.tabSelect = [
      //   { key: this.customers, name: 'client' },
      //   { key: this.zonesDevices, name: 'zone' },
      // ];
      // console.log(' devices ', this.devices);
    }
  }

  hasProp(o: Object, name: string) {
    // return o.hasOwnProperty(name);
    if(o) {
      return o.hasOwnProperty(name) ;
    } else {
      return false
    }
  }

  getZoneForCustomerId(id: string, idDevice: number, name: string) {
    if (name === 'client') {
      this.isCustomer = true;
    }
    // console.log(id);
    this.zonesDevices[idDevice] = this.zones.filter(
      (zone) => zone.customerId === id
    );
  }

  _initForm() {
    this.editForms = this.formBuilder.array([]);
    for (const _ of this.ids) {
      this.editForms.push(
        this.formBuilder.group({
          deveui: ['', Validators.required],
          name: ['', Validators.required],
          client: ['', Validators.required],
          zone: ['', Validators.required],
        })
      );
    }
    this.editForm = this.formBuilder.group({
      names: this.editForms,
    });
    // console.log('edit array ', this.editForm.controls['names']);
  }

  _initSubs() {
    this.zoneSub = this.zoneService.items.subscribe(
      (items) => (this.zones = items)
    );
    this.customerSub = this.customerService.items.subscribe(
      (items) => (this.customers = items)
    );
  }

  get names(): FormArray {
    return this.editForm.get('names') as FormArray;
  }

  onClickSubmit() {
    let items = [];

    for (const [i, device] of this.devices.entries()) {
      items.push({
        id: device.id,
        deveui: this.editForm.controls['names'].value[i].deveui,
        name: this.editForm.controls['names'].value[i].name,
        zone: this.editForm.controls['names'].value[i].zone,
        client: this.editForm.controls['names'].value[i].client,
      });
    }

    this.deviceService
      .editMany(items)
      .then(() => this.router.navigate(['devices']))
      .catch((errMsg) => {
        this.errorMsg = errMsg;
        console.log('test');
      });
  }

  ngOnDestroy() {
    this.zoneSub.unsubscribe();
    this.customerSub.unsubscribe();
  }
}
