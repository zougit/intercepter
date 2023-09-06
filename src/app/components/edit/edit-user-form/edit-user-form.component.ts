import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user/user.service';
import { globals } from 'src/globals';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss'],
})
export class EditUserFormComponent {
  @Input() id!: string;

  editForm!: FormGroup;
  errorMsg!: string;

  user!: User;

  regions = globals.region;
  roles = globals.roles;

  tabSelect = [
    { key: this.roles, name: 'role', disabled: true },
    { key: this.regions, name: 'region', disabled: false },
    { key: ['yes', 'no'], name: 'active', disabled: true },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.userService
      .getById(this.id)
      .then((user: User) => {
        this.user = user;
        this.editForm.patchValue({
          username: user.username,
          role: user.role,
          region: user.region,
          active: user.status,
        });
      })
      .catch((errMsg) => (this.errorMsg = errMsg));
  }

  _initForm() {
    this.editForm = this.formBuilder.group({
      username: ['', Validators.required],
      role: [{ value: '', disabled: true }, Validators.required],
      region: ['', Validators.required],
      active: [{ value: '', disabled: true }, Validators.required],
      password: { value: '', disabled: true },
      r_password: { value: '', disabled: true },
    });
  }

  isEnabled(enabled: boolean) {
    if (enabled) {
      this.editForm.get('password')?.enable();
      this.editForm.get('r_password')?.enable();
    } else {
      this.editForm.get('password')?.disable();
      this.editForm.get('r_password')?.disable();
    }
  }

  onClickSubmit() {
    console.log('completed');
  }
}
