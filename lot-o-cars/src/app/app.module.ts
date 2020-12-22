import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
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
import { RegisterService } from './services/register.service'
import { LoginComponent } from './components/login/login.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { AgreementComponent } from './components/agreement/agreement.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ToastrModule } from 'ngx-toastr';
import { ImageuploadComponent } from './components/imageupload/imageupload.component';
import {IvyCarouselModule} from 'angular-responsive-carousel';

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
    ImageuploadComponent,
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
    RegisterService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
