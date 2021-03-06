import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TarjetasPageRoutingModule } from './tarjetas-routing.module';
import { TarjetasPage } from './tarjetas.page';
import { ServicioAesService } from '../servicio-aes/servicio-aes.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TarjetasPageRoutingModule
  ],
  providers: [ServicioAesService],  
  declarations: [TarjetasPage]
})
export class TarjetasPageModule {}
