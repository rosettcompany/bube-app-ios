import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';
import { busquedaProductoPage } from './busquedaProducto.page';
import { filtrarCategoriasPage } from './filtrarCategorias/filtrarCategorias.page';
import { filtrarEstablecimientosPage} from './filtrarEstablecimientos/filtrarEstablecimientos.page'
import { ModalSeleccionarPage } from './../modalSeleccionar/modalSeleccionar.page'
import { filtrarPage} from './filtrar/filtrar.page'
const routes: Routes = [
  {
    path: '',
    component: busquedaProductoPage
  }
];

@NgModule({
  entryComponents: [filtrarCategoriasPage, filtrarEstablecimientosPage, ModalSeleccionarPage, filtrarPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [busquedaProductoPage,filtrarCategoriasPage, filtrarEstablecimientosPage, ModalSeleccionarPage, filtrarPage]
})
export class busquedaProductoPageModule {}