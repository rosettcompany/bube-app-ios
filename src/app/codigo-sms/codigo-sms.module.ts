import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';

import { CodigoSmsPage } from './codigo-sms.page';

const routes: Routes = [
  {
    path: '',
    component: CodigoSmsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CodigoSmsPage]
})
export class CodigoSmsPageModule {}
