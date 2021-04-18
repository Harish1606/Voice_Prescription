import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPrescriptionPageRoutingModule } from './edit-prescription-routing.module';

import { EditPrescriptionPage } from './edit-prescription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditPrescriptionPageRoutingModule
  ],
  declarations: [EditPrescriptionPage]
})
export class EditPrescriptionPageModule {}
