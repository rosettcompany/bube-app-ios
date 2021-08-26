import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { IonicModule } from '@ionic/angular';

import { DetalleamigoPageRoutingModule } from './detalleamigo-routing.module';
import { JoyrideModule } from 'ngx-joyride';
import { DetalleamigoPage } from './detalleamigo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    JoyrideModule.forChild(),
    DetalleamigoPageRoutingModule
  ],
  declarations: [DetalleamigoPage]
})
export class DetalleamigoPageModule {}
