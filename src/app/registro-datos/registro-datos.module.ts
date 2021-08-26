import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { RegistroDatosPage } from './registro-datos.page';
import { ServicioAesService } from '../servicio-aes/servicio-aes.service';

const routes: Routes = [
  {
    path: '',
    component: RegistroDatosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [ServicioAesService],
  declarations: [RegistroDatosPage]
})
export class RegistroDatosPageModule {}
