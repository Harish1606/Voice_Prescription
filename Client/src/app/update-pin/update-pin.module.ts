import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePinPageRoutingModule } from './update-pin-routing.module';

import { UpdatePinPage } from './update-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePinPageRoutingModule
  ],
  declarations: [UpdatePinPage]
})
export class UpdatePinPageModule {}
