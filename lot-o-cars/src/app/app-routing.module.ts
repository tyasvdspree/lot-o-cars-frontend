import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardetailsComponent } from './components/cardetails/cardetails.component';
import { ContactComponent } from './components/contact/contact.component';
import { HireComponent } from './components/hire/hire.component';
import { LandingspageComponent } from './components/landingspage/landingspage.component';
import { TermsComponent } from './components/terms/terms.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'cardetails/:id', component: CardetailsComponent },
  { path: 'hire', component: HireComponent },
  { path: 'home', component: LandingspageComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: LandingspageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
