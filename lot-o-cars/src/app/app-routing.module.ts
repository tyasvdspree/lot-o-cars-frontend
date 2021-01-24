import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardetailsComponent } from './components/car/car-details/car-details.component';
import { ContactComponent } from './components/general/contact/contact.component';
import { CarHireComponent } from './components/car/car-list-components/car-hire/car-hire.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { TermsComponent } from './components/general/terms/terms.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { AuthGuard } from './security/authguard';
import { RentComponent } from './components/car/rent/rent.component';
import { AgreementComponent } from './components/agreements/agreement/agreement.component';
import { MyCarsComponent } from './components/car/my-cars/my-cars.component';
import { UserpageComponent } from './components/user/userpage/userpage.component';
import { HirehistoryComponent } from './components/agreements/hire-history/hire-history.component';
import { RenthistoryComponent } from './components/agreements/rent-history/rent-history.component';
import { AgreementDetailsComponent } from './components/agreements/agreement-details/agreement-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'my-cars', component: MyCarsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cardetails/:id', component: CardetailsComponent },
  { path: 'agreement/:id', component: AgreementComponent, canActivate: [AuthGuard] },
  { path: 'agreementdetails/:id', component: AgreementDetailsComponent, canActivate: [AuthGuard] },
  { path: 'hire', component: CarHireComponent },
  { path: 'rent', component: RentComponent, canActivate: [AuthGuard]},
  { path: 'home', component: HomePageComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userpage', component: UserpageComponent, canActivate: [AuthGuard] },
  { path: 'hirehistory', component: HirehistoryComponent, canActivate: [AuthGuard]  },
  { path: 'renthistory', component: RenthistoryComponent, canActivate: [AuthGuard]  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: '**', component: HomePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
