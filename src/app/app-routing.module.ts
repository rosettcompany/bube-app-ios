import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


 const routes: Routes = [
  {
    path: 'walkthrough',
    loadChildren: () => import('./walkthrough/walkthrough.module').then( m => m.WalkthroughPageModule)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'validacionInicio/:ind',
    loadChildren: () => import('./validacionInicio/validacion.module').then(m => m.ValidacionPageModule)
  },
  {
    path: 'validacionCorreo',
    loadChildren: () => import('./validacionCorreo/validacionCorreo.module').then(m => m.validacionCorreoPagePageModule)
  },
  {
    path: 'app',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.inicioPageModule)
  },
  {
    path: 'terminos/:ind',
    loadChildren: () => import('./terminos/terminos.module').then(m => m.TerminosPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'detalleamigo',
    loadChildren: () => import('./detalleamigo/detalleamigo.module').then( m => m.DetalleamigoPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'metodopago',
    loadChildren: () => import('./metodopago/metodopago.module').then( m => m.MetodopagoPageModule)
  },
  {
    path: 'tarjetas',
    loadChildren: () => import('./tarjetas/tarjetas.module').then( m => m.TarjetasPageModule)
  },
  {
    path: 'agregar-tarjeta',
    loadChildren: () => import('./agregar-tarjeta/agregar-tarjeta.module').then( m => m.AgregarTarjetaPageModule)
  },
  {
    path: 'finalizar-compra',
    loadChildren: () => import('./finalizar-compra/finalizar-compra.module').then( m => m.FinalizarCompraPageModule)
  },
  {
    path: 'comprobante',
    loadChildren: () => import('./comprobante/comprobante.module').then( m => m.ComprobantePageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'busquedaProducto',
    loadChildren: () => import('./busquedaProducto/busquedaProducto.module').then(m => m.busquedaProductoPageModule)
  },
  {
    path: 'busquedaCategoria',
    loadChildren: () => import('./busquedaCategoria/busquedaCategoria.module').then(m => m.busquedaCategoriaPageModule)
  },
  {
    path: 'busquedaEstablecimiento',
    loadChildren: () => import('./busquedaEstablecimiento/busquedaEstablecimiento.module').then(m => m.busquedaEstablecimientoPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then(m => m.NotificacionesPageModule)
  },
  {
    path: 'contactanos',
    loadChildren: () => import('./contactanos/contactanos.module').then(m => m.ContactanosPageModule)
  },
  {
    path: 'mistarjetas',
    loadChildren: () => import('./mistarjetas/mistarjetas.module').then( m => m.MistarjetasPageModule)
  },
  {
    path: 'misdatos',
    loadChildren: () => import('./misdatos/misdatos.module').then(m => m.MisdatosPageModule)
  },
  {
    path: 'mensaje',
    loadChildren: () => import('./mensaje/mensaje.module').then(m => m.MensajePageModule)
  },
  {
    path: 'login-elige-sesion',
    loadChildren: () => import('./login-elige-sesion/login-elige-sesion.module').then( m => m.LoginEligeSesionPageModule)
  },
  {
    path: 'login-email',
    loadChildren: () => import('./login-email/login-email.module').then( m => m.LoginEmailPageModule)
  },
  {
    path: 'login-telefono',
    loadChildren: () => import('./login-telefono/login-telefono.module').then( m => m.LoginTelefonoPageModule)
  },
  {
    path: 'validacion-fecha-nacimiento',
    loadChildren: () => import('./validacion-fecha-nacimiento/validacion-fecha-nacimiento.module').then( m => m.ValidacionFechaNacimientoPageModule)
  },
  {
    path: 'registro-datos',
    loadChildren: () => import('./registro-datos/registro-datos.module').then( m => m.RegistroDatosPageModule)
  },
  {
    path: 'registro-datos-email',
    loadChildren: () => import('./registro-datos-email/registro-datos-email.module').then( m => m.RegistroDatosEmailPageModule)
  },
  {
    path: 'codigo-sms',
    loadChildren: () => import('./codigo-sms/codigo-sms.module').then( m => m.CodigoSmsPageModule)
  },  {
    path: 'codigo-email',
    loadChildren: () => import('./codigo-email/codigo-email.module').then( m => m.CodigoEmailPageModule)
  },
  {
    path: 'validacion-datos-compra',
    loadChildren: () => import('./validacion-datos-compra/validacion-datos-compra.module').then( m => m.ValidacionDatosCompraPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
