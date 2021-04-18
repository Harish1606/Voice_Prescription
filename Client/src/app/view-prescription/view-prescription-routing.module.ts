import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPrescriptionPage } from './view-prescription.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPrescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPrescriptionPageRoutingModule {}
