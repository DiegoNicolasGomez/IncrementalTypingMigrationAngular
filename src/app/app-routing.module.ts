import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuModuleModule, routes as menuRoutes } from './menu-module/menu-module.module';

const routes: Routes = [
  ...menuRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
