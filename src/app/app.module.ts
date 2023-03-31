import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MenuModuleModule } from './menu-module/menu-module.module';
import { HeaderModuleModule } from './header-module/header-module.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModuleModule,
    HeaderModuleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
