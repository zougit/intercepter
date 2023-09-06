import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { TranslocoService } from '@ngneat/transloco';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CustomerService } from './services/customer/customer.service';
import { DeviceService } from './services/device/device.service';
import { ZoneService } from './services/zone/zone.service';
import { UserService } from './services/user/user.service';

import { TableauComponent } from './components/tableau/tableau.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddDeviceFormComponent } from './components/add/add-device-form/add-device-form.component';
import { AddCustomerFormComponent } from './components/add/add-customer-form/add-customer-form.component';
import { EditCustomerFormComponent } from './components/edit/edit-customer-form/edit-customer-form.component';
import { DialogDetailComponent } from './components/dialog-detail/dialog-detail.component';
import { EditDeviceFormComponent } from './components/edit/edit-device-form/edit-device-form.component';
import { EditMultiDeviceFormComponent } from './components/edit/edit-multi-device-form/edit-multi-device-form.component';
import { AddUserFormComponent } from './components/add/add-user-form/add-user-form.component';
import { AddZoneFormComponent } from './components/add/add-zone-form/add-zone-form.component';

import { WelcomeViewComponent } from './views/welcome-view/welcome-view.component';
import { MyAccountViewComponent } from './views/my-account-view/my-account-view.component';
import { AdminBOViewComponent } from './views/admin-bo-view/admin-bo-view.component';
import { CustomerViewComponent } from './views/customer-view/customer-view.component';
import { DeviceViewComponent } from './views/device-view/device-view.component';
import { AlarmsViewComponent } from './views/alarms-view/alarms-view.component';
import { SetupViewComponent } from './views/setup-view/setup-view.component';
import { AddBaseViewComponent } from './views/add-base-view/add-base-view.component';
import { LogViewComponent } from './views/log-view/log-view.component';
import { AuthComponent } from './views/auth/auth.component';
import { EditBaseViewComponent } from './views/edit-base-view/edit-base-view.component';
import { ZoneViewComponent } from './views/zone-view/zone-view.component';
import { AppPacViewComponent } from './views/app-pac-view/app-pac-view.component';
import { UserAppViewComponent } from './views/user-app-view/user-app-view.component';
import { AuthGuard } from '@angular/fire/auth-guard';
import { AuthService } from './services/auth/auth.service';
import { AddUserAppFormComponent } from './components/add/add-user-app-form/add-user-app-form.component';
import { EditUserAppFormComponent } from './components/edit/edit-user-app-form/edit-user-app-form.component';
import { EditUserFormComponent } from './components/edit/edit-user-form/edit-user-form.component';
import { EditZoneFormComponent } from './components/edit/edit-zone-form/edit-zone-form.component';

@NgModule({
  declarations: [
    AppComponent,
    TableauComponent,
    MenuComponent,
    WelcomeViewComponent,
    MyAccountViewComponent,
    AdminBOViewComponent,
    CustomerViewComponent,
    DeviceViewComponent,
    AlarmsViewComponent,
    SetupViewComponent,
    AddBaseViewComponent,
    LogViewComponent,
    AddDeviceFormComponent,
    AddCustomerFormComponent,
    EditCustomerFormComponent,
    EditBaseViewComponent,
    ZoneViewComponent,
    DialogDetailComponent,
    EditDeviceFormComponent,
    EditMultiDeviceFormComponent,
    AddUserFormComponent,
    UserAppViewComponent,
    AppPacViewComponent,
    AddZoneFormComponent,
    AuthComponent,
    AddUserAppFormComponent,
    EditUserAppFormComponent,
    EditUserFormComponent,
    EditZoneFormComponent,
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    TranslocoRootModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    FontAwesomeModule,
    MatDialogModule,
    NgxPaginationModule,
  ],
  providers: [
    TranslocoService,
    AuthService,
    CustomerService,
    DeviceService,
    ZoneService,
    UserService,
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
