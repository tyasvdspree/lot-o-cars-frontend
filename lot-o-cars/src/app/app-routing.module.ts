import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardetailsComponent } from './components/cardetails/cardetails.component';
import { ContactComponent } from './components/contact/contact.component';
import { HireComponent } from './components/hire/hire.component';
import { LandingspageComponent } from './components/landingspage/landingspage.component';
import { TermsComponent } from './components/terms/terms.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './security/authguard';
import { RentComponent } from './components/rent/rent.component';
import { AgreementComponent } from './components/agreement/agreement.component';
import { MyCarsComponent } from './components/my-cars/my-cars.component';
import { UserpageComponent } from './components/userpage/userpage.component';
import { HirehistoryComponent } from './components/hirehistory/hirehistory.component';
import { RenthistoryComponent } from './components/renthistory/renthistory.component';
import { AgreementDetailsComponent } from './components/agreementdetails/agreementdetails.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrokerfeeDetailComponent } from './components/brokerfee/brokerfeeDetail/brokerfee-detail.component';
import { AdminListComponent } from './components/brokerfee/admin-list/admin-list.component';
import { UserListComponent } from './components/brokerfee/user-list/user-list.component';
import { BrokerfeeRequestComponent } from './components/brokerfee/brokerfeeRequest/brokerfee-request.component'


const routes: Routes = [
  { path: 'my-cars', component: MyCarsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cardetails/:id', component: CardetailsComponent },
  { path: 'agreement/:id', component: AgreementComponent, canActivate: [AuthGuard] },
  { path: 'agreementdetails/:id', component: AgreementDetailsComponent, canActivate: [AuthGuard] },
  { path: 'brokerfeeRequestDetail/:id', component: BrokerfeeDetailComponent, canActivate: [AuthGuard]},
  { path: 'brokerfeeRequestList', component: AdminListComponent, canActivate: [AuthGuard]},
  { path: 'brokerfeeRequestUserList', component: UserListComponent, canActivate: [AuthGuard]},
  { path: 'brokerfeeRequest', component: BrokerfeeRequestComponent, canActivate: [AuthGuard]},
  { path: 'hire', component: HireComponent },
  { path: 'rent', component: RentComponent, canActivate: [AuthGuard]},
  { path: 'home', component: LandingspageComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userpage', component: UserpageComponent, canActivate: [AuthGuard] },
  { path: 'hirehistory', component: HirehistoryComponent, canActivate: [AuthGuard]  },
  { path: 'renthistory', component: RenthistoryComponent, canActivate: [AuthGuard]  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: '**', component: LandingspageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
