import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { CodigoEmailPage } from './codigo-email.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoEmailPage
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CodigoEmailPage]
})
export class CodigoEmailPageModule {}
