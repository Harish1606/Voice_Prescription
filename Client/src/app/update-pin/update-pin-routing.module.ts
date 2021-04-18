import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePinPage } from './update-pin.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePinPageRoutingModule {}
