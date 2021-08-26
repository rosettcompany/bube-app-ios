import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../api-service.service';
import { NavigationExtras, Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform,NavController, AlertController, IonRouterOutlet, MenuController } from '@ionic/angular';
import { Location } from '@angular/common';
import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage{

  usuario;
  tipoRegistro;
  constructor(private apiServicio: ApiServiceService,
    private router:Router,
    public menu: MenuController, 
    private platform: Platform,
    private routerOutlet: IonRouterOutlet,
     private splashScreen: SplashScreen,
     private location: Location,
     private alertController: AlertController,
     private navCtrl: NavController,
     private appVersion: AppVersion,
     private apiService: ApiServiceService,) {


      }

  ionViewDidEnter(): void{
   //this.comprobarVersion();
   this.obtenerIndUser();
   this.backbutton2();  
  }

  comprobarVersion(){
    this.platform.ready().then(() => {
      this.appVersion.getVersionNumber().then(ver => {

        console.log(ver);
        this.apiServicio.obtenerVersionApp()
        .then(res =>{
          console.log(res);
          if(String(ver) !== String(res[0].p_codigo).trim()){
            this.router.navigate(['./mensaje']);
          }else{
            this.obtenerIndUser();
          }
        })
        .catch(er =>{
          this.error();
        });
      }).catch(error => {
        alert(error);
        this.error();
      });
    });
  }


  obtenerIndUser(){
    this.apiServicio.getStorage('ind_user').
      then(valor => {


        this.apiServicio.getStorage('usuario').
        then(res => {
          this.usuario = res;
  
          this.apiServicio.getStorage('tipoRegistro').
          then(res => {
            this.tipoRegistro = res
    
            this.comprobarDatos(valor);
          })
        })
      })
  }

  async error() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error de conexión',
      message: 'Verifique su conexión a internet',
      buttons: [
        {
          text: 'OK',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Boton no');
          }
        }
      ]
    });
   
    await alert.present();
   }


  comprobarDatos(valor){


    let navigationExtras: NavigationExtras = {
      state: {
        nuevoUsuario:this.usuario,
        tipoRegistro: this.tipoRegistro
      }
    };

    switch(valor){
       case 2:
          console.log('Sesion completa');
           this.router.navigate(['./app/inicio'],navigationExtras);
          break;
       case 3:
         console.log('Falta validación bebidas');
         this.router.navigate(['./validacionInicio',1],navigationExtras);
         break;
       case 4:
         console.log('Falta validación correo');
         this.router.navigate(['./validacionCorreo'],navigationExtras);
         break;
       case 5:
         console.log('Falta iniciar sesion');
         this.router.navigate(['./login']);
         break;
       default:
         console.log('Usuario Nuevo');
         this.router.navigate(['./walkthrough']);
         break;
    }

  }
 
backbutton2(){
  this.platform.backButton.subscribeWithPriority(-1, () => {

    if (this.router.url === '/app/amigos' || this.router.url === '/app/inicio'
    || this.router.url === '/app/perfil' || this.router.url === '/app/ahorro'
    || this.router.url === '/validacionInicio/1'
    || this.router.url === '/validacionCorreo' || this.router.url === '/login'
    || this.router.url ==='/walkthrough') {

      console.log('ATRAS');
      navigator['app'].exitApp();
     
    }
  });
} 

backbuttonTemporal(){
   
  this.platform.backButton.subscribeWithPriority(0, () => {

     if(this.router.url === '/loading'){
       //////// NO HACE NADA
     }

  });
  
}

  
backbutton(){
    this.platform.backButton.subscribeWithPriority(0, () => {
      
      if(this.router.url === '/app/amigos' || this.router.url === '/app/inicio'
      || this.router.url === '/app/perfil' || this.router.url === '/app/ahorro'
      || this.router.url === '/validacionInicio/1'
      || this.router.url === '/validacionCorreo'){
        this.presentAlertConfirm();
      }else{

        if(this.router.url === '/comprobante'){

         /// NADA

        }else{

          if(this.router.url === '/loading'){
            //////// NO HACE NADA
          }else{
            
            if(this.router.url === '/login' || this.router.url ==='/walkthrough'){

                navigator['app'].exitApp();

            }else{
              
              if(this.router.url === '/app/perfil/misdatos/validacionInicio/2'){

                this.router.navigate(['./app/perfil/misdatos']);

              }else{

                if(this.router.url === '/app/perfil/misdatos'){

                  this.router.navigate(['./app/perfil']);

                }else{
                  
                   if(this.router.url === '/app/inicio/busquedaProducto' || this.router.url === '/app/inicio/busquedaCategoria'
                    || this.router.url === '/app/inicio/busquedaEstablecimiento' || this.router.url === '/app/inicio/busquedaPromocion'){

                      this.router.navigate(['./app/inicio']);
                      
                    }else{

                      if(this.router.url === '/app/perfil/notificaciones' || this.router.url === '/app/perfil/contactanos' || 
                         this.router.url === '/app/perfil/mistarjetas' ){

                          this.router.navigate(['./app/perfil']);

                          
                      }else{

                        this.navCtrl.back();
                      }
                     
                    }
                }
                
              }
              
            }
             
          }
         
        }
        
        
      }
    
    });

   }


   async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Salir',
      message: '¿Desea cerrar la aplicación?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Boton no');
          }
        }, {
          text: 'Si',
          handler: () => {
   
            navigator['app'].exitApp();
   
          }
        }
      ]
    });
   
    await alert.present();
   }


 

}
