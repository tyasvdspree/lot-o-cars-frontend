import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { HireComponent } from './components/hire/hire.component';
import { LandingspageComponent } from './components/landingspage/landingspage.component';

const routes: Routes = [
  { path: 'contact', component: ContactComponent },
  { path: 'hire', component: HireComponent },
  { path: 'home', component: LandingspageComponent },
  { path: '**', component: LandingspageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
