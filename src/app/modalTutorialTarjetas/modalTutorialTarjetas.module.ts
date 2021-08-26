import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ModalTutorialTarjetasPageRoutingModule } from './modalTutorialTarjetas-routing.module';
import { ModalTutorialTarjetasPage } from './modalTutorialTarjetas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalTutorialTarjetasPageRoutingModule
  ],
  declarations: [ModalTutorialTarjetasPage]
})
export class ModalUbicacionPageModule {}
