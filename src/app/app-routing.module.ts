import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeViewComponent } from './views/welcome-view/welcome-view.component';
import { AdminBOViewComponent } from './views/admin-bo-view/admin-bo-view.component';
import { CustomerViewComponent } from './views/customer-view/customer-view.component';
import { DeviceViewComponent } from './views/device-view/device-view.component';
import { AlarmsViewComponent } from './views/alarms-view/alarms-view.component';
import { SetupViewComponent } from './views/setup-view/setup-view.component';
import { AddBaseViewComponent } from './views/add-base-view/add-base-view.component';
import { LogViewComponent } from './views/log-view/log-view.component';
import { EditBaseViewComponent } from './views/edit-base-view/edit-base-view.component';
import { ZoneViewComponent } from './views/zone-view/zone-view.component';
import { EditMultiDeviceFormComponent } from './components/edit/edit-multi-device-form/edit-multi-device-form.component';
import { MyAccountViewComponent } from './views/my-account-view/my-account-view.component';
import { UserAppViewComponent } from './views/user-app-view/user-app-view.component';
import { AppPacViewComponent } from './views/app-pac-view/app-pac-view.component';

const routes: Routes = [
  {path: '', component: WelcomeViewComponent},
  {path: 'my-account', component: MyAccountViewComponent},
  {path: 'admin-bo', component: AdminBOViewComponent},
  {path: 'customers', component: CustomerViewComponent},
  {path: 'devices', component: DeviceViewComponent},
  {path: 'alarms', component: AlarmsViewComponent},
  {path: 'setup', component: SetupViewComponent},
  {path: 'app-pac', component: AppPacViewComponent},
  {path: 'user-app', component: UserAppViewComponent},
  {path: 'logs', component: LogViewComponent},
  {path: ':page/add', component: AddBaseViewComponent},
  {path: ':page/edit/:id', component: EditBaseViewComponent},
  {path: 'devices/multiEdit', component: EditMultiDeviceFormComponent},
  {path: 'zone/dealerships', component: ZoneViewComponent},
  {path: 'zone/converters', component: ZoneViewComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
