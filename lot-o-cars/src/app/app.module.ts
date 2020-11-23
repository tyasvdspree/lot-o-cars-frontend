import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadermenuComponent } from './components/headermenu/headermenu.component';
import { FootermenuComponent } from './components/footermenu/footermenu.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadermenuComponent,
    FootermenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
