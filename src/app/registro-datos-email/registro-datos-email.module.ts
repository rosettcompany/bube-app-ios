import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { RegistroDatosEmailPage } from './registro-datos-email.page';
import { ServicioAesService } from '../servicio-aes/servicio-aes.service';

const routes: Routes = [
  {
    path: '',
    component: RegistroDatosEmailPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [ServicioAesService],
  declarations: [RegistroDatosEmailPage]
})
export class RegistroDatosEmailPageModule {}
