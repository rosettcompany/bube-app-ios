import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../components/components.module';
import { ModalPromocionesPage} from '../modalPromociones/modalPromociones.page';
import { MensajePage } from './mensaje.page';

const routes: Routes = [
  {
    path: '',
    component: MensajePage
  }
];

@NgModule({
  entryComponents: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ComponentsModule
  ],
  declarations: [MensajePage]
})
export class MensajePageModule {}