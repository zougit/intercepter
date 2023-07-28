import { Component, Input } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Device } from 'src/app/models/device.model';
import { Zone } from 'src/app/models/zone.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { DeviceService } from 'src/app/services/device/device.service';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { globals } from 'src/globals';

@Component({
  selector: 'app-edit-device-form',
  templateUrl: './edit-device-form.component.html',
  styleUrls: ['./edit-device-form.component.scss'],
})
export class EditDeviceFormComponent {
  @Input() id!: string;

  device!: Device;

  editForm!: FormGroup;
  errorMsg!: string;

  customers!: Customer[];
  customerSub!: Subscription;

  zones!: Zone[];
  zonecustomerId!: Zone[];
  zoneSub!: Subscription;

  types = globals.capteurs;

  tab = ['deveui', 'appk', 'name'];
  tabSelect!: any[];

  tabCar = ['model', 'color', 'reference'];
  fileSelected: any;

  constructor(
    private formBuilder: FormBuilder,
    private deviceService: DeviceService,
    private customerService: CustomerService,
    private zoneService: ZoneService,
    private router: Router,
    private afs: Storage
  ) {}

  ngOnInit() {
    this._initForm();
    this._initSubs();

    this.customerService.getAll();
    this.zoneService.getAll();

    this.deviceService
      .getById(this.id)
      .then((device: Device) => {
        this.device = device;
        this.editForm.patchValue(device);
      })
      .catch((errMsg) => (this.errorMsg = errMsg));
  }

  ngAfterContentChecked() {
    if (this.customers && this.zones && this.device) {
      this.getZoneForCustomerId(this.device.client, 'client');
      this.tabSelect = [
        { key: this.customers, name: 'client' },
        { key: this.zonecustomerId, name: 'zone' },
        { key: this.types, name: 'type' },
      ];
    }
  }

  getZoneForCustomerId(id: string, name: string) {
    if (name === 'client') {
      // console.log(id);
      this.zonecustomerId = this.zones.filter((zone) => zone.customerId === id);
    }
  }

  _initForm() {
    this.editForm = this.formBuilder.group({
      deveui: ['', Validators.required],
      appk: ['', Validators.required],
      name: ['', Validators.required],
      client: ['', Validators.required],
      zone: ['', Validators.required],
      type: ['', Validators.required],
      model: [''],
      color: [''],
      reference: [''],
    });
  }

  _initSubs() {
    this.zoneSub = this.zoneService.items.subscribe(
      (items) => (this.zones = items)
    );
    this.customerSub = this.customerService.items.subscribe(
      (items) => (this.customers = items)
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
    const filename =
      this.fileSelected.name.split('.')[0] +
      '_' +
      new Date().getTime().toString() +
      '.' +
      this.fileSelected.name.split('.')[1];

    const fileRef = ref(this.afs, filename);

    uploadBytes(fileRef, this.fileSelected).finally(() => {
      getDownloadURL(fileRef).then((url) => {
        let imgPathSplit = this.device.imgPath.split('/');
        let img = ref(
          this.afs,
          imgPathSplit[imgPathSplit.length - 1]!.split('?')[0]
        );
        deleteObject(img);
        this.deviceService
          .edit({
            id: this.id,
            deveui: this.editForm.value.deveui,
            appk: this.editForm.value.appk,
            name: this.editForm.value.name,
            zone: this.editForm.value.zone,
            client: this.editForm.value.client,
            type: this.editForm.value.type,
            model: this.editForm.value.model,
            color: this.editForm.value.color,
            reference: this.editForm.value.reference,
            imgPath: url,
          })
          .then(() => this.router.navigate(['devices']))
          .catch((errMsg) => {
            this.errorMsg = errMsg;
            console.log('test');
          });
      });
    });
  }
}
