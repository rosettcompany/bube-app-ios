import { Component, OnInit } from '@angular/core';
import { ModalController,AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-modal-ubicacion',
  templateUrl: './modal-ubicacion.page.html',
  styleUrls: ['./modal-ubicacion.page.scss'],
})
export class ModalUbicacionPage implements OnInit {
direccion:string;

  constructor(
    public modalController: ModalController,
    private geolocation: Geolocation,
    private apiService: ApiServiceService,
    private diagnostic: Diagnostic,
    public alertController: AlertController,

    ) { }

  ngOnInit() {
  }

  regresar(){
    this.modalController.dismiss();
  }

  obtenerDireccion(){
    this.diagnostic.isLocationAvailable()
    .then(r =>{
      if(r == true){
        this.getLocation();
      }else{
        //his.presentAlertConfirm();
        this.getLocation();
      }
    })
    .catch(er =>{
      console.log("error al verificar ubicacion diagnostic");
      this.presentAlertConfirm();
    });
  }
  

  //GEOCALIZACION DEL USUARIO
  async getLocation() {
    console.log('geocalizacion');
    let progres = document.getElementById('progress') as HTMLIonProgressBarElement;
    progres.style.display="block";
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
   this.enviarUbicacion(rta.coords.latitude,rta.coords.longitude);
   
   }

enviarUbicacion(lat,lng){
    this.modalController.dismiss({
        lat: lat,
        lng: lng
    });
  }

  
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'GPS Desactivado',
      message: 'Por favor activa tu GPS para tener acceso a tu ubicación',
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

}
