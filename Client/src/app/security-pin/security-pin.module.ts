import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecurityPinPageRoutingModule } from './security-pin-routing.module';

import { SecurityPinPage } from './security-pin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurityPinPageRoutingModule
  ],
  declarations: [SecurityPinPage]
})
export class SecurityPinPageModule {}
