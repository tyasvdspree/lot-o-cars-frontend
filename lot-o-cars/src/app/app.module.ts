import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadermenuComponent } from './components/headermenu/headermenu.component';
import { FootermenuComponent } from './components/footermenu/footermenu.component';
import { MaterialModule } from './modules/material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingspageComponent } from './components/landingspage/landingspage.component';
import { ContactComponent } from './components/contact/contact.component';
import { HireComponent } from './components/hire/hire.component';
import { RentComponent } from './components/rent/rent.component';
import { FilterComponent } from './components/filter/filter.component';
import { ListComponent } from './components/list/list.component';
import { CardetailsComponent } from './components/cardetails/cardetails.component';
import { CarService } from './services/car.service';
import { TermsComponent } from './components/terms/terms.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RegisterService } from './services/register.service';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LoginComponent } from './components/login/login.component';
import { AgreementComponent } from './components/agreement/agreement.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { ToastrModule } from 'ngx-toastr';
import { ImageuploadComponent } from './components/imageupload/imageupload.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { TokenInterceptor } from './token-interceptor';
import { MyCarsComponent } from './components/my-cars/my-cars.component';
import { DeactivateCarDialogComponent } from './components/deactivate-car-dialog/deactivate-car-dialog.component';
import { DaterangepickerComponent } from './components/daterangepicker/daterangepicker.component';
import { AgreementlistComponent } from './components/agreementlist/agreementlist.component';
import { HirehistoryComponent } from './components/hirehistory/hirehistory.component';
import { RenthistoryComponent } from './components/renthistory/renthistory.component';
import { AgreementDetailsComponent } from './components/agreementdetails/agreementdetails.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LocationComponent } from './components/location/location.component';
import { BrokerfeeDetailComponent } from './components/brokerfee/brokerfeeDetail/brokerfee-detail/brokerfee-detail.component';
import { BrokerfeeListComponent } from './components/brokerfee/brokerfeeList/brokerfee-list/brokerfee-list.component';
import { BrokerfeeRequestComponent } from './components/brokerfee/brokerfeeRequest/brokerfee-request/brokerfee-request.component';
import { EditCarComponent } from './components/edit-car/edit-car.component';
import { PaymentDialogComponent } from './components/payment-dialog/payment-dialog.component';
import localeNl from '@angular/common/locales/nl';

registerLocaleData(localeNl, 'nl');

@NgModule({
  declarations: [
    AppComponent,
    HeadermenuComponent,
    FootermenuComponent,
    LandingspageComponent,
    ContactComponent,
    HireComponent,
    RentComponent,
    FilterComponent,
    ListComponent,
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
