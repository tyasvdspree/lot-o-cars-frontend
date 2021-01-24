import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadermenuComponent } from './components/application/header-menu/header-menu.component';
import { FootermenuComponent } from './components/application/footer-menu/footer-menu.component';
import { MaterialModule } from './modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ContactComponent } from './components/general/contact/contact.component';
import { CarHireComponent } from './components/car/car-list-components/car-hire/car-hire.component';
import { RentComponent } from './components/car/rent/rent.component';
import { CarFilterComponent } from './components/car/car-list-components/car-filter/car-filter.component';
import { CarListComponent } from './components/car/car-list-components/car-list/car-list.component';
import { CardetailsComponent } from './components/car/car-details/car-details.component';
import { CarService } from './services/car-service/car.service';
import { TermsComponent } from './components/general/terms/terms.component';
import { RegisterComponent } from './components/user/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegisterService } from './services/register-service/register.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LoginComponent } from './components/user/login/login.component';
import { AgreementComponent } from './components/agreements/agreement/agreement.component';
import { CalendarComponent } from './components/tool-components/calendar/calendar.component';
import { UserpageComponent } from './components/user/userpage/userpage.component';
import { ToastrModule } from 'ngx-toastr';
import { ImageuploadComponent } from './components/tool-components/image-upload/image-upload.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { TokenInterceptor } from './token-interceptor';
import { MyCarsComponent } from './components/car/my-cars/my-cars.component';
import { DeactivateCarDialogComponent } from './components/car/deactivate-car-dialog/deactivate-car-dialog.component';
import { DaterangepickerComponent } from './components/tool-components/daterange-picker/daterange-picker.component';
import { AgreementlistComponent } from './components/agreements/agreement-list/agreement-list.component';
import { HirehistoryComponent } from './components/agreements/hire-history/hire-history.component';
import { RenthistoryComponent } from './components/agreements/rent-history/rent-history.component';
import { AgreementDetailsComponent } from './components/agreements/agreement-details/agreement-details.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LocationComponent } from './components/tool-components/location/location.component';
import { BrokerfeeDetailComponent } from './components/brokerfee/brokerfee-detail/brokerfee-detail/brokerfee-detail.component';
import { BrokerfeeListComponent } from './components/brokerfee/brokerfee-list/brokerfee-list/brokerfee-list.component';
import { BrokerfeeRequestComponent } from './components/brokerfee/brokerfee-request/brokerfee-request/brokerfee-request.component';
import { EditCarComponent } from './components/car/edit-car/edit-car.component';
import { PaymentDialogComponent } from './components/agreements/payment-dialog/payment-dialog.component';
import localeNl from '@angular/common/locales/nl';

registerLocaleData(localeNl, 'nl');

@NgModule({
  declarations: [
    AppComponent,
    HeadermenuComponent,
    FootermenuComponent,
    HomePageComponent,
    ContactComponent,
    CarHireComponent,
    RentComponent,
    CarFilterComponent,
    CarListComponent,
    CardetailsComponent,
    TermsComponent,
    RegisterComponent,
    LoginComponent,
    CalendarComponent,
    AgreementComponent,
    MyCarsComponent,
    DeactivateCarDialogComponent,
    DaterangepickerComponent,
    UserpageComponent,
    ImageuploadComponent,
    AgreementlistComponent,
    HirehistoryComponent,
    RenthistoryComponent,
    AgreementDetailsComponent,
    DashboardComponent,
    LocationComponent,
    BrokerfeeDetailComponent,
    BrokerfeeListComponent,
    BrokerfeeRequestComponent,
    EditCarComponent,
    LocationComponent,
    PaymentDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    NgxWebstorageModule.forRoot(),
    ToastrModule.forRoot({positionClass: 'toast-bottom-right'}),
    IvyCarouselModule
  ],
  providers: [
    CarService,
    DatePipe,
    RegisterService,
    HttpClient,
    HttpClientModule,
    { provide: LOCALE_ID, useValue: 'nl-NL'},
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
