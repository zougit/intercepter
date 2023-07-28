import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Zone } from 'src/app/models/zone.model';
import { ZoneService } from 'src/app/services/zone/zone.service';

@Component({
  selector: 'app-add-zone-form',
  templateUrl: './add-zone-form.component.html',
  styleUrls: ['./add-zone-form.component.scss'],
})
export class AddZoneFormComponent {
  @Input() page!: string;

  addForm!: FormGroup;
  errorMsg!: string;
  isAdmins = true;

  zones!: Zone[];
  zoneSub!: Subscription;

  tab = ['username', 'password', 'r_password'];
  tabSelect!: any[];

  constructor(
    private formBuilder: FormBuilder,
    private zoneService: ZoneService,
    private router: Router
  ) {}

  ngOnInit() {
    this._initSubs();
    this.zoneService.getAll();
    this._initForm();
  }

  ngAfterContentChecked() {
    this.tabSelect = [
      { key: ['yes', 'no'], name: 'active' },
    ];
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
  }

  onClickSubmit() {
    const newUser = new Zone('', '').toPlainObj();

    this.zoneService
      .add(newUser as Zone)
      .then(() => this.router.navigate(['zone/'+this.page]))
      .catch((errMsg) => (this.errorMsg = errMsg));
  }
}
