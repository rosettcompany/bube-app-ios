import { Component, OnInit } from '@angular/core';
import { ModalController,AlertController ,LoadingController} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Router ,NavigationExtras} from '@angular/router';
import {  NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ApiServiceService } from '../api-service.service';
import { Storage } from '@ionic/storage';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { Device } from '@ionic-native/device/ngx';
@Component({
  selector: 'app-modal-verificar',
  templateUrl: './modal-verificar.page.html',
  styleUrls: ['./modal-verificar.page.scss'],
})
export class ModalVerificarPage implements OnInit {
    direccion:string;
    km;
    ruta;
    ind;
    ///// LOADING
    loading:any;

  constructor(
    public modalController: ModalController,
    private geolocation: Geolocation,
    private apiService: ApiServiceService,
    private diagnostic: Diagnostic,
    private firebaseAnalytics: FirebaseAnalytics,
    private device: Device,
    public storage: Storage,
    public alertController: AlertController,
    private loadingController: LoadingController,
    public router: Router
    ) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {

    this.storage.get('ubicacion')
      .then(res =>{
        this.direccion = res;
      })
      .catch(er =>{
        console.log("error en direccion");
      });

  }
  ionViewDidEnter(): void {
    console.log(this.ruta);
    console.log(this.km);
    console.log(this.ind);

  }

  regresar(){
    this.modalController.dismiss();
  }

  obtenerDireccion(){
    this.diagnostic.isLocationAvailable()
    .then(r =>{
      if(r == true){
        this.presentLoading();
        this.getLocation();
      }else{
        //this.presentAlertConfirm();
        this.presentLoading();
        this.getLocation();
      }
    })
    .catch(er =>{
      console.log("error al verificar ubicacion diagnostic");
      this.presentAlertConfirm();
    });
  }

  confirmar(){
      
    if(this.ind=="inicio"){
      this.modalController.dismiss();
    }else{
      
     if(this.ruta == "busquedaEstablecimiento"){
      this.firebaseAnalytics.logEvent('visitasPorEstablecimientos',{estableciemientos:this.ind.nombrecomercial,idestablecimiento:this.ind.idsociocomercial})
      .then(res =>{
          this.storage.get('ubicacion').then(res=>{
            this.storage.set('ubicacion_seleccion',res);
            let navigationExtras: NavigationExtras = {
            state: {
              km: this.km,
              ind: this.ind,
              regalo:0
            }
          };
          this.router.navigate([this.ruta],navigationExtras);
          this.modalController.dismiss();
          });
      })
      .catch(er =>{
        console.log(er);
      });
     }else{
      this.firebaseAnalytics.logEvent('visitasPorCategorias',{categorias:this.ind})
      .then(res =>{
         this.storage.get('ubicacion').then(res=>{
           this.storage.set('ubicacion_seleccion',res);
           let navigationExtras: NavigationExtras = {
           state: {
             km: this.km,
             ind: this.ind,
             regalo:0
           }
         };
         this.router.navigate([this.ruta],navigationExtras);
         this.modalController.dismiss();
         });
      })
      .catch(er =>{
        console.log(er);
      });
     }
     
    }

}
  

  //GEOCALIZACION DEL USUARIO
  async getLocation() {
    console.log('geocalizacion');
    const rta = await this.geolocation.getCurrentPosition();
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults:5
    };
    console.log('geocalizacion 2');
    console.log(rta);
     
    
   this.apiService.setStorage('longitud',rta.coords.longitude);
   console.log(rta.coords.longitude);
   this.apiService.setStorage('latitud',rta.coords.latitude);
   console.log(rta.coords.latitude);
   this.loading.dismiss();
   this.enviarUbicacion(rta.coords.latitude,rta.coords.longitude);

   }

   enviarUbicacion(lat,lng){
    this.modalController.dismiss({
        lat: lat,
        lng: lng
    });
  }
  
  async presentAlertConfirm() {
    let mensaje;
    if(this.device.platform == 'iOS' ){
      mensaje = 'Para poder visualizar la información de los productos y promociones de los establecimientos afiliados que se encuentran dentro de tu zona geográfica, es necesario activar tu GPS. Para activar tú GPS debes ir a la opción Configuración de tu móvil y otorgar el acceso al APP Bube.'
    }else{
      mensaje = 'Por favor activa tu GPS para tener acceso a tu ubicación'
    }
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Tu GPS se encuentra desactivado',
      message: mensaje,
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

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Actualizando su dirección'
    });
    await this.loading.present();
  }


}