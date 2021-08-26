import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalTutorialTarjetasPage } from './modalTutorialTarjetas.page';

const routes: Routes = [
  {
    path: '',
    component: ModalTutorialTarjetasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalTutorialTarjetasPageRoutingModule {}
