import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../components/components.module';

import { perfilPage } from './perfil.page';

import {TourPage} from '../tour/tour.page'

const routes: Routes = [
  {
    path: '',
    component: perfilPage
  }
];

@NgModule({
  entryComponents: [TourPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [perfilPage, TourPage]
})
export class perfilPageModule {}