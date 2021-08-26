import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../components/components.module';

import { busquedaEstablecimientoPage } from './busquedaEstablecimiento.page';
import { filtrarCategoriasPage } from '../busquedaProducto/filtrarCategorias/filtrarCategorias.page';
import { filtrarEstablecimientosPage} from '../busquedaProducto/filtrarEstablecimientos/filtrarEstablecimientos.page'
import { filtrarPage} from '../busquedaProducto/filtrar/filtrar.page';
import { ModalSeleccionarPage} from './../modalSeleccionar/modalSeleccionar.page'


const routes: Routes = [
  {
    path: '',
    component: busquedaEstablecimientoPage
  }
];

@NgModule({
  entryComponents: [filtrarCategoriasPage, filtrarEstablecimientosPage, filtrarPage, ModalSeleccionarPage ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [busquedaEstablecimientoPage]
})
export class busquedaEstablecimientoPageModule {}