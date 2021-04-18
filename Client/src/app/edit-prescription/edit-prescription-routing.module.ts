import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPrescriptionPage } from './edit-prescription.page';

const routes: Routes = [
  {
    path: '',
    component: EditPrescriptionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPrescriptionPageRoutingModule {}
