import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LoginTelefonoPage } from './login-telefono.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServicioAesService} from '../servicio-aes/servicio-aes.service'
const routes: Routes = [
  {
    path: '',
    component: LoginTelefonoPage
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
  declarations: [LoginTelefonoPage]
})
export class LoginTelefonoPageModule {}
