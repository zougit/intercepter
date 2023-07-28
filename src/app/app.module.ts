import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { WelcomeViewComponent } from './views/welcome-view/welcome-view.component';
import { MyAccountViewComponent } from './views/my-account-view/my-account-view.component';
import { AdminBOViewComponent } from './views/admin-bo-view/admin-bo-view.component';
import { CustomerViewComponent } from './views/customer-view/customer-view.component';
import { DeviceViewComponent } from './views/device-view/device-view.component';
import { AlarmsViewComponent } from './views/alarms-view/alarms-view.component';
import { SetupViewComponent } from './views/setup-view/setup-view.component';
import { HttpClientModule } from '@angular/common/http';
import { TranslocoRootModule } from './transloco/transloco-root.module';
import { TranslocoService } from '@ngneat/transloco';
import { TableauComponent } from './components/tableau/tableau.component';
import { MenuComponent } from './components/menu/menu.component';
import { AddBaseViewComponent } from './views/add-base-view/add-base-view.component';
import { LogViewComponent } from './views/log-view/log-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddDeviceFormComponent } from './components/add/add-device-form/add-device-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCustomerFormComponent } from './components/add/add-customer-form/add-customer-form.component';
import { CustomerService } from './services/customer/customer.service';
import { DeviceService } from './services/device/device.service';
import { ZoneService } from './services/zone/zone.service';
import { EditCustomerFormComponent } from './components/edit/edit-customer-form/edit-customer-form.component';
import { EditBaseViewComponent } from './views/edit-base-view/edit-base-view.component';
import { ZoneViewComponent } from './views/zone-view/zone-view.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { DialogDetailComponent } from './components/dialog-detail/dialog-detail.component';
import { EditDeviceFormComponent } from './components/edit/edit-device-form/edit-device-form.component';
import { EditMultiDeviceFormComponent } from './components/edit/edit-multi-device-form/edit-multi-device-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserService } from './services/user/user.service';
import { AddUserFormComponent } from './components/add/add-user-form/add-user-form.component';
import { UserAppViewComponent } from './views/user-app-view/user-app-view.component';
import { AppPacViewComponent } from './views/app-pac-view/app-pac-view.component';
import { AddZoneFormComponent } from './components/add/add-zone-form/add-zone-form.component';

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
  ],
  imports: [
    BrowserModule,
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
    NgxPaginationModule
  ],
  providers: [TranslocoService, CustomerService, DeviceService, ZoneService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
