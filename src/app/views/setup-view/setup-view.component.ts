import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Papa } from 'ngx-papaparse';
import { Subscription } from 'rxjs';
import { Customer } from 'src/app/models/customer.model';
import { Device } from 'src/app/models/device.model';
import { Zone } from 'src/app/models/zone.model';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { DeviceService } from 'src/app/services/device/device.service';
import { ZoneService } from 'src/app/services/zone/zone.service';
import { globals } from 'src/globals';

@Component({
  selector: 'app-setup-view',
  templateUrl: './setup-view.component.html',
  styleUrls: ['./setup-view.component.scss'],
})
export class SetupViewComponent {
  addForm!: FormGroup;
  errorMsg!: string;
  fileMsg!: any[];

  devices!: Device[];
  devicesTab!: Device[];
  deviceSub!: Subscription;

  customers!: Customer[];
  customerSub!: Subscription;

  zones!: Zone[];
  zonecustomerId!: Zone[];
  zoneSub!: Subscription;

  tabSelect!: any[];

  fileSelected: any;
  fileParsed: any;

  tabMaj: any[] = [];

  types = globals.capteurs;

  isSubmit = false;
  isFalse = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private deviceService: DeviceService,
    private customerService: CustomerService,
    private zoneService: ZoneService,
    private papa: Papa
  ) {}

  ngOnInit() {
    this._initSubs();
    this._initForm();
    this.customerService.getAll();
    this.zoneService.getAll();
    this.deviceService.getAll();
    this.isSubmit = false;
  }

  ngAfterContentChecked() {
    if (this.customers && this.zones) {
      this.tabSelect = [
        { key: this.customers, name: 'client' },
        { key: this.zonecustomerId, name: 'zone' },
        { key: this.types, name: 'type' },
      ];
      if (this.isSubmit) {
        setTimeout(() => {
          this._initForm();
          this.isSubmit = false;
        }, 3000);
      }
    }
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

  _initForm() {
    this.addForm = this.formBuilder.group({
      client: ['', Validators.required],
      zone: ['', Validators.required],
      type: ['', Validators.required],
      csv: ['', Validators.required],
    });
  }

  getZoneForCustomerId(id: string, name: string) {
    if (name === 'client') {
      // console.log(id);
      this.zonecustomerId = this.zones.filter((zone) => zone.customerId === id);
    }
  }

  onFileSelected(e: Event) {
    this.fileSelected = null;
    const target = e.target as HTMLInputElement;
    const files = target.files as FileList;
    if (files.length > 0) {
      if (!files[0].type.includes('csv')) {
        this.errorMsg = "Ce n'est pas le bon format de fichier";
        this.addForm.controls['csv'].setErrors({ incorrect: true });
      }
      if (files[0].size == 0) {
        this.errorMsg = 'le fichier est vide';
        this.addForm.controls['csv'].setErrors({ incorrect: true });
      }

      this.fileSelected = files[0];
    } else {
      this.errorMsg = 'Aucun fichier trouvé';
      this.addForm.controls['csv'].setErrors({ incorrect: true });
    }
    this.fileMsg = [];
    this.papa.parse(this.fileSelected, {
      complete: (result) => {
        // console.log('début parse: ', result.data);

        result.data = result.data.filter((d: any) => {
          if (d.length >= 3) {
            for (const cell of d) {
              if (cell != '') {
                if (d.length > 3) {
                  return d.splice(3, d.length - 3);
                }
                return d;
              }
            }
          }
        });
        // console.log('ligne vide parse: ', result.data);
        let delData: any[] = [];
        for (let [i, data] of result.data.entries()) {
          // for (let i=0; i<result.data.length-cpt; i++) {
          if (data[0]) {
            if (data[0].length != 16) {
              this.fileMsg.push({
                name:
                  "le DevEui '" +
                  data[0] +
                  "' ne respecte pas le nombre de caractère",
                class: 'alert alert-danger',
              });
              this.isFalse = true;
            }
          } else {
            this.fileMsg.push({
              name: 'le DevEui ligne ' + (i + 1) + ' est manquant',
              class: 'alert alert-danger',
            });
            this.isFalse = true;
          }
          if (data[1]) {
            if (data[1].length != 32) {
              this.fileMsg.push({
                name:
                  "l'AppKey '" +
                  data[1] +
                  "' ne respecte pas le nombre de caractère",
                class: 'alert alert-danger',
              });
              this.isFalse = true;
            }
          } else {
            this.fileMsg.push({
              name: "l'AppKey ligne " + (i + 1) + ' est manquant',
              class: 'alert alert-danger',
            });
            this.isFalse = true;
          }

          if (!data[2]) {
            this.fileMsg.push({
              name: 'le nom ligne ' + (i + 1) + ' est manquant',
              class: 'alert alert-danger',
            });
            this.isFalse = true;
          }

          if (this.isFalse) {
            // console.log('data ', data);
            delData.push(data);
            this.isFalse = false;
          } else {
            if (!this.devices.find((d) => d.deveui == data[0])) {
              this.fileMsg.push({
                name: data[2] + ' a été ajouté',
                class: 'alert alert-success',
              });
            } else {
              this.fileMsg.push({
                // name: data[0] + ' existe déjà',
                name: data[0] + ' a été mis à jour',
                class: 'alert alert-success',
              });
              delData.push(data);
              this.tabMaj.push({
                id: this.devices.find((d) => d.deveui == data[0])?.id,
                deveui: data[0],
                appk: data[1],
                name: data[2],
                zoneOldId: this.devices.find((d) => d.deveui == data[0])?.zone,
              });
            }
          }
        }
        // console.log(this.tabMaj);

        result.data = result.data.filter(
          (item: any) => !delData.includes(item)
        );
        // console.log('file Msg: ', this.fileMsg);
        // console.log('ligne error parse: ', result.data);

        this.fileParsed = result.data;
      },
    });
  }

  onClickSubmit() {
    const newDevices: any[] = [];
    // console.log('file : ', this.fileParsed);

    for (let fp of this.fileParsed) {
      newDevices.push(
        new Device(
          fp[0],
          fp[1],
          fp[2],
          this.addForm.value.zone,
          this.addForm.value.client,
          this.addForm.value.type
        ).toPlainObj()
      );
    }
    // console.log(newDevices);
    if (newDevices.length != 0) {
      this.deviceService
        .addMany(newDevices as Device[])
        .then(() => {
          // this.zoneService
          //   .getById(newDevices[0].zone)
          //   .then((zone) => {
          //     this.zoneService
          //       .edit({
          //         id: newDevices[0].zone,
          //         nbDevices: zone.nbDevices + newDevices.length,
          //       })
          //       .then()
          //       .catch((errMsg) => (this.errorMsg = errMsg));
          //     console.log('Success');
          //   })
          //   .catch((errMsg) => (this.errorMsg = errMsg));
          console.log('add success');
        })
        .catch((errMsg) => (this.errorMsg = errMsg));
    }

    if (this.tabMaj.length != 0) {
      for (const d of this.tabMaj) {
        Object.assign(d, {
          zone: this.addForm.value.zone,
          client: this.addForm.value.client,
          type: this.addForm.value.type,
        });
      }
      let tabMajCopie = this.tabMaj.map((objet) => {
        const { zoneOldId, ...nouvelObjet } = objet;
        // console.log(nouvelObjet);
        
        return nouvelObjet;
      });
      // console.log(tabMajCopie);
      this.deviceService
        .editMany(tabMajCopie)
        .then(() => {
          // this.zoneService
          //   .getById(this.tabMaj[0].zone)
          //   .then((zone) => {
          //     this.zoneService
          //       .edit({
          //         id: this.tabMaj[0].zone,
          //         nbDevices: zone.nbDevices + this.tabMaj.length,
          //       })
          //       .then()
          //       .catch((errMsg) => (this.errorMsg = errMsg));
          //     console.log('Success');
          //   })
          //   .catch((errMsg) => (this.errorMsg = errMsg));
          console.log('edit success');
        })
        .catch((errMsg) => (this.errorMsg = errMsg));
    }

    this.isSubmit = true;
  }

  ngOnDestroy() {
    this.customerSub.unsubscribe();
    this.zoneSub.unsubscribe();
    this.deviceSub.unsubscribe();
  }
}
