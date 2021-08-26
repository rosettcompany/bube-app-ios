import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { LoginEligeSesionPage } from './login-elige-sesion.page';

const routes: Routes = [
  {
    path: '',
    component: LoginEligeSesionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginEligeSesionPage]
})
export class LoginEligeSesionPageModule {}
