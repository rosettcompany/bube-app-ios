import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginEmailPage } from './login-email.page';
import { ServicioAesService } from '../servicio-aes/servicio-aes.service';

const routes: Routes = [
  {
    path: '',
    component: LoginEmailPage
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
  declarations: [LoginEmailPage]
})
export class LoginEmailPageModule {}
