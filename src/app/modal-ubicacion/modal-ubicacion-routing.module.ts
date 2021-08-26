import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalUbicacionPage } from './modal-ubicacion.page';

const routes: Routes = [
  {
    path: '',
    component: ModalUbicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalUbicacionPageRoutingModule {}
