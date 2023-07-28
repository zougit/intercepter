import { Component, EventEmitter, Output } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Device } from 'src/app/models/device.model';
import { Zone } from 'src/app/models/zone.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { DeviceService } from 'src/app/services/device/device.service';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { globals } from 'src/globals';

@Component({
  selector: 'app-add-device-form',
  templateUrl: './add-device-form.component.html',
  styleUrls: ['./add-device-form.component.scss'],
})
export class AddDeviceFormComponent {
  addForm!: FormGroup;
  errorMsg!: string;

  customers!: Customer[];
  customerSub!: Subscription;

  devices!: Device[];
  devicesTab!: Device[];
  deviceSub!: Subscription;

  zones!: Zone[];
  zonecustomerId!: Zone[];
  zoneSub!: Subscription;

  fileSelected: any;

  types = globals.capteurs;

  tab = ['deveui', 'appk', 'name'];
  tabSelect!: any[];

  tabCar = ['model', 'color', 'reference'];

  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private customerService: CustomerService,
    private zoneService: ZoneService,
    private router: Router,
    private afs: Storage
  ) {}

  ngOnInit() {
    this._initSubs();
    this.customerService.getAll();
    this.zoneService.getAll();
    this.deviceService.getAll();
    this._initForm();
  }

  ngAfterContentChecked() {
    if (this.customers && this.zones) {
      this.tabSelect = [
        { key: this.customers, name: 'client' },
        { key: this.zonecustomerId, name: 'zone' },
        { key: this.types, name: 'type' },
      ];
    }
  }

  getZoneForCustomerId(id: string, name: string) {
    if (name === 'client') {
      console.log(id);
      this.zonecustomerId = this.zones.filter((zone) => zone.customerId === id);
    }
  }

  _initForm() {
    this.addForm = this.formBuilder.group({
      deveui: ['', Validators.required],
      appk: ['', Validators.required],
      name: ['', Validators.required],
      client: ['', Validators.required],
      zone: ['', Validators.required],
      type: ['', Validators.required],
      model: [''],
      color: [''],
      reference: [''],
      img: [''],
    });
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
  }

  onFileSelected(e: Event) {
    this.fileSelected = null;
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files.length > 0) {
      this.fileSelected = files[0];
    }
  }

  onClickSubmit() {
    const newDevice = new Device(
      this.addForm.value.deveui,
      this.addForm.value.appk,
      this.addForm.value.name,
      this.addForm.value.zone,
      this.addForm.value.client,
      this.addForm.value.type,
      this.addForm.value.model,
      this.addForm.value.color,
      this.addForm.value.reference,
      this.addForm.value.img
    ).toPlainObj();
    // console.log(newDevice);

    const filename =
      this.fileSelected.name.split('.')[0] +
      '_' +
      new Date().getTime().toString() +
      '.' +
      this.fileSelected.name.split('.')[1];

    const fileRef = ref(this.afs, filename);
    
    if (!this.devices.find((d) => d.deveui == this.addForm.value.deveui)) {
      uploadBytes(fileRef, this.fileSelected).finally(() => {
        getDownloadURL(fileRef).then((url) => {
          newDevice.imgPath = url;
          this.deviceService
            .add(newDevice as Device)
            .then(() => {
              this.zoneService
                .getById(newDevice.zone)
                .then((zone) => {
                  this.zoneService
                    .edit({ id: newDevice.zone, nbDevices: zone.nbDevices + 1 })
                    .then();
                  this.router.navigate(['devices']);
                })
                .catch((errMsg) => (this.errorMsg = errMsg));
            })
            .catch((errMsg) => (this.errorMsg = errMsg));
        });
      });
    } else {
      this.errorMsg = 'Ce device existe déjà';
    }
  }

  ngOnDestroy() {
    this.customerSub.unsubscribe();
    this.zoneSub.unsubscribe();
    this.deviceSub.unsubscribe();
  }
}
