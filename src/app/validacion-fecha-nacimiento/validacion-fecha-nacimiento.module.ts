import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ValidacionFechaNacimientoPage } from './validacion-fecha-nacimiento.page';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  {
    path: '',
    component: ValidacionFechaNacimientoPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ValidacionFechaNacimientoPage]
})
export class ValidacionFechaNacimientoPageModule {}
