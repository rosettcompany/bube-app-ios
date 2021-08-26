import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';
import { ModalPromocionesPage} from '../modalPromociones/modalPromociones.page';
import { inicioPage } from './inicio.page';

const routes: Routes = [
  {
    path: '',
    component: inicioPage
  }
];

@NgModule({
  entryComponents: [ModalPromocionesPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [inicioPage,ModalPromocionesPage]
})
export class inicioPageModule {}