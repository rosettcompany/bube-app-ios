import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { JoyrideModule } from 'ngx-joyride';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'inicio',
        children: [
          {
            path: '',
            loadChildren: () => import('../inicio/inicio.module').then(m => m.inicioPageModule)
          }
        ]
      },
      {
        path: 'amigos',
        children: [
            {
              path: '',
              loadChildren: () => import('../amigos/amigos.module').then(m => m.amigosPageModule)
            }
        ]
      },
      {
        path: 'ahorro',
        children: [
          {
            path: '',
            loadChildren: () => import('../ahorro/ahorro.module').then(m => m.ahorroPageModule)
          }
        ]
      },{
        path: 'perfil',
        children:[
          {
            path: '',
            loadChildren: () => import('../perfil/perfil.module').then(m => m.perfilPageModule)
          }
        ]
      }
    ]
  }
  // /app/ redirect
];

@NgModule({
  imports: [RouterModule.forChild(routes), JoyrideModule.forChild(), HttpClientModule],
  exports: [RouterModule],
  providers: [ ]
})
export class TabsPageRoutingModule {}
