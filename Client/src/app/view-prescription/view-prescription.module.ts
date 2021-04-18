import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPrescriptionPageRoutingModule } from './view-prescription-routing.module';

import { ViewPrescriptionPage } from './view-prescription.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewPrescriptionPageRoutingModule
  ],
  declarations: [ViewPrescriptionPage]
})
export class ViewPrescriptionPageModule {}
