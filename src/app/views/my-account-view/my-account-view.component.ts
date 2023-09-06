import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { globals } from 'src/globals';

//TODO - modifier l'auth pour edit un user et finir le formulaire
@Component({
  selector: 'app-my-account-view',
  templateUrl: './my-account-view.component.html',
  styleUrls: ['./my-account-view.component.scss'],
})
export class MyAccountViewComponent implements OnInit {
  userForm!: FormGroup;
  errorMsg!: string;

  user!: User;

  regions = globals.region;
  roles = globals.roles;

  tabSelect = [
    { key: this.roles, name: 'role', disabled: true },
    { key: this.regions, name: 'region', disabled: false },
    { key: ['yes', 'no'], name: 'active', disabled: true },
  ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') ?? '');    
    this._initForm();
  }

  _initForm() {
    this.userForm = this.formBuilder.group({
      name: [this.user.username, Validators.required],
      role: [{ value: this.user.role, disabled: true }, Validators.required],
      region: [this.user.region, Validators.required],
      active: [
        { value: this.user.status, disabled: true },
        Validators.required,
      ],
      password: { value: '', disabled: true },
      r_password: { value: '', disabled: true },
    });
  }

  isEnabled(enabled : boolean) {
    if (enabled) {
      this.userForm.get('password')?.enable();
      this.userForm.get('r_password')?.enable();
    } else {
      this.userForm.get('password')?.disable();
      this.userForm.get('r_password')?.disable();
    }
  }

  onClickSubmit() {
    console.log('completed');
  }
}
