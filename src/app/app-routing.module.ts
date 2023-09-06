import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';

import { WelcomeViewComponent } from './views/welcome-view/welcome-view.component';
import { AdminBOViewComponent } from './views/admin-bo-view/admin-bo-view.component';
import { CustomerViewComponent } from './views/customer-view/customer-view.component';
import { DeviceViewComponent } from './views/device-view/device-view.component';
import { AlarmsViewComponent } from './views/alarms-view/alarms-view.component';
import { SetupViewComponent } from './views/setup-view/setup-view.component';
import { AddBaseViewComponent } from './views/add-base-view/add-base-view.component';
import { LogViewComponent } from './views/log-view/log-view.component';
import { EditBaseViewComponent } from './views/edit-base-view/edit-base-view.component';
import { EditMultiDeviceFormComponent } from './components/edit/edit-multi-device-form/edit-multi-device-form.component';
import { ZoneViewComponent } from './views/zone-view/zone-view.component';
import { MyAccountViewComponent } from './views/my-account-view/my-account-view.component';
import { UserAppViewComponent } from './views/user-app-view/user-app-view.component';
import { AppPacViewComponent } from './views/app-pac-view/app-pac-view.component';
import { AuthComponent } from './views/auth/auth.component';
import { map } from 'rxjs';

const redirectLogInToHome = () => redirectLoggedInTo(['']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectUnauthorizedOrUserRoleToHome = () => map(() =>  {
  let user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')!)
  : '';

  if(!user) {
    return ['login'];
  } else if (user.role == 'admin') {
    return true 
  } else {
    return ['devices']
  }

})
const redirectUnauthorizedOrDirectorRoleToHome = () => map(() =>  {
  let user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user')!)
  : '';

  if(!user) {
    return ['login'];
  } else if (user.role == 'admin' || user.role == 'director') {
    return true 
  } else {
    return ['devices']
  }

})

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectLogInToHome },
  },
  {
    path: '',
    component: WelcomeViewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedOrUserRoleToHome },
  },
  {
    path: 'my-account',
    component: MyAccountViewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'admin-bo',
    component: AdminBOViewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedOrDirectorRoleToHome },
  },
  {
    path: 'customers',
    component: CustomerViewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedOrUserRoleToHome },
  },
  {
    path: 'devices',
    component: DeviceViewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
  {
    path: 'alarms',
    component: AlarmsViewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedOrUserRoleToHome },
  },
  {
    path: 'setup',
    component: SetupViewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedOrUserRoleToHome },
  },
  {
    path: 'app-pac',
    component: AppPacViewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedOrUserRoleToHome },
  },
  {
    path: 'user-app',
    component: UserAppViewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedOrUserRoleToHome },
  },
  {
    path: 'logs',
    component: LogViewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedOrUserRoleToHome },
  },
  {
    path: ':page/add',
    component: AddBaseViewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedOrUserRoleToHome },
  },
  {
    path: ':page/edit/:id',
    component: EditBaseViewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedOrUserRoleToHome },
  },
  {
    path: 'devices/multiEdit',
    component: EditMultiDeviceFormComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedOrUserRoleToHome },
  },
  {
    path: 'zone/dealerships',
    component: ZoneViewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedOrUserRoleToHome },
  },
  {
    path: 'zone/converters',
    component: ZoneViewComponent,
    canActivate: [AuthGuard],
    data: { authGuardPipe: redirectUnauthorizedOrUserRoleToHome },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
