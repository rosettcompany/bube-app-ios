import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MapaPageRoutingModule } from './mapa-routing.module';
import { MapaPage } from './mapa.page';
import { ModalTiendaPage} from './../modal-tienda/modal-tienda.page'
import {ModalCarritoPage} from './../modal-carrito/modal-carrito.page'
import { ComponentsModule } from '../components/components.module';
import { modalSeleccionarModalidadPage} from '../modalSeleccionarModalidad/modalSeleccionarModalidad.page';

@NgModule({
  entryComponents: [ModalTiendaPage, modalSeleccionarModalidadPage,ModalCarritoPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    MapaPageRoutingModule
  ],
  declarations: [MapaPage, ModalTiendaPage, modalSeleccionarModalidadPage,ModalCarritoPage]
})
export class MapaPageModule {}
