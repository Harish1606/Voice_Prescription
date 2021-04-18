import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityPinPage } from './security-pin.page';

const routes: Routes = [
  {
    path: '',
    component: SecurityPinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityPinPageRoutingModule {}
