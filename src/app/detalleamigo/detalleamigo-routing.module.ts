import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetalleamigoPage } from './detalleamigo.page';

const routes: Routes = [
  {
    path: '',
    component: DetalleamigoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetalleamigoPageRoutingModule {}
