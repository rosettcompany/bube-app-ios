import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalUbicacionPageRoutingModule } from './modal-ubicacion-routing.module';

import { ModalUbicacionPage } from './modal-ubicacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalUbicacionPageRoutingModule
  ],
  declarations: [ModalUbicacionPage]
})
export class ModalUbicacionPageModule {}
