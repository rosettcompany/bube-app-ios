import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MistarjetasPageRoutingModule } from './mistarjetas-routing.module';

import { MistarjetasPage } from './mistarjetas.page';
import { ServicioAesService } from '../servicio-aes/servicio-aes.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MistarjetasPageRoutingModule
  ],
  providers: [ServicioAesService],  
  declarations: [MistarjetasPage]
})
export class MistarjetasPageModule {}
