import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalVerificarPage } from './modal-verificar.page';

const routes: Routes = [
  {
    path: '',
    component: ModalVerificarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalVerificarPageRoutingModule {}
