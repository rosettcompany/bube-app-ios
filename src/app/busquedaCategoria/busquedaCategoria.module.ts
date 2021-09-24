import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';
import { busquedaCategoriaPage } from './busquedaCategoria.page';
import { filtrarCategoriasPage } from '../busquedaProducto/filtrarCategorias/filtrarCategorias.page';
import { filtrarEstablecimientosPage} from '../busquedaProducto/filtrarEstablecimientos/filtrarEstablecimientos.page'
import { filtrarPage} from '../busquedaProducto/filtrar/filtrar.page';
import { ModalSeleccionarPage} from './../modalSeleccionar/modalSeleccionar.page'
import { filtrarBean } from './../busquedaProducto/filtrosBean/filtrosBean.component';
const routes: Routes = [
  {
    path: '',
    component: busquedaCategoriaPage
  }
];

@NgModule({
  entryComponents: [filtrarCategoriasPage, filtrarEstablecimientosPage, filtrarPage, ModalSeleccionarPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  providers: [
    filtrarBean
  ],
  declarations: [busquedaCategoriaPage]
})
export class busquedaCategoriaPageModule {}