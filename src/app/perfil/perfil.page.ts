import { Component,OnInit, AfterViewInit, ViewChild, HostBinding } from '@angular/core';
import { Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import {TourPage} from '../tour/tour.page'
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: [
    './styles/perfil.page.scss',
    './styles/perfil.shell.scss',
    './styles/perfil.responsive.scss'
  ]
})
export class perfilPage{

  usuario: any; 
  usuarioFoto:any;
  usuarioNombresApellidos:any;
  mostrarBotonCambiarFoto=true;

  constructor(public menu: MenuController, 
    public router: Router,
    private googlePlus: GooglePlus,
    private firebaseAnalytics: FirebaseAnalytics,
    private apiServicio:ApiServiceService,
    public alertController: AlertController,
    private modalCtrl:ModalController,
    private facebook:Facebook) { }
  
  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.menu.enable(false);

    this.getIdUsuario();
    this.googleAnalytics();
  }

  getIdUsuario(){
    this.apiServicio.getStorage('idusuario')
    .then( id =>{
      console.log(id);
      this.apiServicio.getDatosUsuario(id)
       .subscribe((data) =>{
         this.usuario  = data[0];
         console.log(this.usuario)
         this.usuarioNombresApellidos = this.usuario.nombresusuario+" "+this.usuario.apellidosusuario;
         if(this.usuario.idfacebook == '' || this.usuario.idfacebook == null){
            this.usuarioFoto = this.usuario.rutafotousuario;
            this.mostrarBotonCambiarFoto = false;
         }else{
          this.usuarioFoto='https://graph.facebook.com/'+this.usuario.idfacebook+'/picture?type=large';
          this.mostrarBotonCambiarFoto=true;
         }
       },
       (error) =>{
         console.log(error);
       });
 
    });
  }

   // Restore to default when leaving this page
   ionViewDidLeave(): void {
     this.menu.enable(true);
   }

  /////////////// MODAL TOUR  ////////////////

  async ModalTour()
  {
    const modal = await this.modalCtrl.create(
      {
     component: TourPage,
     componentProps: {
      'indicador': 1
    }
   });
   modal.onDidDismiss();
   return await modal.present();
}

  goMisDatos(){
    console.log("Mis datos");
    this.router.navigate(['misdatos']);
  }

  goMetodosPago(){
    this.router.navigate(['mistarjetas']);
  }

  goTerminosCondiciones(){
    var ind=2;
    this.router.navigate(['terminos',ind]);
  }

  goTutorial(){
    console.log("Tutorial");
    this.ModalTour();
  }

  goNotificaciones(){
    console.log("Notificaciones");
    this.router.navigate(['notificaciones']);
  }

  goContactanos(){
    console.log("Contactanos");
    this.router.navigate(['contactanos']);
  }

  goCerrarSesion(){
    console.log("Cerrar Sesion");
    this.apiServicio.setStorage('ind_user',5);
    this.router.navigate(['./login']);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cerrar Sesión',
      message: '¿ Desea cerrar sesión ?',
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

            this.facebook.getLoginStatus()
            .then((res)=>{
               if(res.status == 'connected'){
                 this.facebook.logout()
                 .then((res)=>{
                      this.logoutGoogle()
                 }).catch((error)=>{
                   console.log(error);
                   this.presentAlert1();
                 })
               }else{

                this.logoutGoogle()
               }
            }).catch((error)=>{
              console.log(error);
              this.presentAlert1();
            });

            
          }
        }
      ]
    });
    await alert.present();
  }

  logoutGoogle(){
    this.apiServicio.getStorage('gmail_activo').
    then(res => {
        if(res !=null){
          if(res == 1){
            this.googlePlus.logout()
            .then((res)=>{
              this.apiServicio.setStorage('gmail_activo',0);
              this.apiServicio.setStorage('ind_user',5);
              this.router.navigate(['./login']);
            })  
            .catch((error)=>{
              /*
                console.log(error);
                this.presentAlert1();
            */  this.apiServicio.setStorage('gmail_activo',0);
                this.apiServicio.setStorage('ind_user',5);
                this.router.navigate(['./login']);
            });
          }else{
            this.apiServicio.setStorage('ind_user',5);
            this.router.navigate(['./login']);
          }
        }else{
          this.apiServicio.setStorage('ind_user',5);
          this.router.navigate(['./login']);
        }
    }).catch((error)=>{
       console.log(error)
       this.presentAlert1()
    });
  }

  //googleAnalytics
 googleAnalytics(){
  this.firebaseAnalytics.logEvent('pantalla',{pantalla:"perfil"})
  .then(res =>{
    console.log(res);
    console.log("firebase ok");
  })
  .catch(er =>{
    console.log(er);
    console.log("firebase no");
  });
}


async presentAlert1() {
  const alert = await this.alertController.create({
    header: 'Error',
    cssClass: 'my-custom-class',
    subHeader: 'Error cerrar sesión',
    message: 'Intente más tarde',
    buttons: ['OK']
  });

  await alert.present();
}

}