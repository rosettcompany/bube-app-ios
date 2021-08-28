import { Component, OnInit,NgZone,ViewChild  } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { MenuController,IonSlides, ModalController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ModalUbicacionPage } from '../modal-ubicacion/modal-ubicacion.page';
import { ApiServiceService } from '../api-service.service';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { ToastController,AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
import { ModalVerificarPage} from '../modal-verificar/modal-verificar.page'
import { ModalPromocionesPage} from '../modalPromociones/modalPromociones.page';
import { modalSeleccionarModalidadPage} from '../modalSeleccionarModalidad/modalSeleccionarModalidad.page';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { Device } from '@ionic-native/device/ngx';
declare var google;

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: [
    './styles/inicio.page.scss',
    './styles/inicio.shell.scss',
    './styles/inicio.responsive.scss'
  ]
})
export class inicioPage implements OnInit{
  
      inputSearch = document.getElementById('buscarDireccion') as HTMLIonSearchbarElement;
      autocomplete: { input: string; };
      autocompleteItems: any[];
      GoogleAutocomplete: any;
      geocoder:any;
      ocultarlista = true;
      focus = false;
      @ViewChild(IonSlides, { static: true }) slides: IonSlides;
      Establecimientos:any;
      direccion:string = '';
      tituloEstablecimientos = 'Tiendas';
      promociones:any;
      slide = [];
      ///FONDO PROMOCIONES///
      Skeleton = true;
      skeletonList = [1,2,3];
      /// FONDO ESTABLECIMIENTOS
      Skeleton2 = true;
      skeletonList2 = [1,2,3,4,5,6];

      sinEstablecimientos = false;
      sinPromociones = false;
      conPromociones = false;
      conEstablecimientos = false;
      selecteTextId :string;
      tipoTiendaActiva = 1;
      longitud:any;
      latitud: any;
      km = "5";

  constructor(public menu: MenuController, public router: Router, 
              private splashScreen: SplashScreen,
              public storage: Storage,
              private diagnostic: Diagnostic,
              private firebaseAnalytics: FirebaseAnalytics,
              public alertController: AlertController,
              private apiservicio: ApiServiceService,
              private geolocation: Geolocation,
              private device: Device,
              private modalCtrl:ModalController,
              public zone: NgZone,
              public toastController: ToastController,
              private modalController: ModalController ) { 

                this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
                this.geocoder = new google.maps.Geocoder();
                this.autocomplete = { input: '' };
                this.autocompleteItems = [];

              }



  slideChanged(){
    console.log("slide changed.");
    this.slides.startAutoplay();
  }

  /////////////// MODAL PROMOCIONES  ////////////////
  async ModalPromociones(promocion)
  {
    const modal = await this.modalCtrl.create(
      {
     component: ModalPromocionesPage,
     cssClass: 'modal-chico',
     componentProps: {
      'promocion': promocion,
      'km': this.km
    }
   });
    modal.onDidDismiss()
        .then((data) => {
            const res = data['data'];
            console.log(res)
            if(res == undefined || res == 0){
              
            }else{
              this.ModalSeleccionarModalidad(res);
            }
    });
   return await modal.present();
}


  /////////////// MODAL MODALIDAD  ////////////////
  async ModalSeleccionarModalidad(promocion)
  {
    const modal = await this.modalCtrl.create(
      {
     component: modalSeleccionarModalidadPage,
     cssClass: 'modal-chico',
     componentProps: {
      'carrito': promocion,
      'establecimientosCoincidencia': []
      
    }
   });
    modal.onDidDismiss()
        .then((data) => {
            const res = data['data'];
            if(res != null || res != undefined){
              let navigationExtras: NavigationExtras = {
                state: {
                  carrito:res.carrito,
                  establecimientosCoincidencia:res.establecimientosCoincidencia,
                  delivery:res.delivery
                }
              };
              this.router.navigate(['tarjetas'],navigationExtras);
             }
    });
   return await modal.present();
}

   /// SALIR DE LA APLICACION
ngAfterViewInit(): void {

 }

  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.apiservicio.removeStorage('carrito');
    this.apiservicio.removeStorage('total');
    this.apiservicio.removeStorage('tarjeta');
    this.apiservicio.removeStorage('ahorro');
    this.apiservicio.removeStorage('num_bebidas');
    this.slides.startAutoplay();
    this.menu.enable(false);
    this.cargarUbicación();
    this.googleAnalytics();
  }




  irModalUbicacion(){
    this.diagnostic.isLocationAvailable()
        .then(r =>{
          if(r == true){
            this.abrirModal();
          }else{
            //this.presentAlertConfirm();
            this.abrirModal();
          }
        })
        .catch(er =>{
          console.log(er);
          console.log("error al verificar ubicación diagnostic");
          this.presentAlertConfirm();
          
        });
  }

  
  async abrirModal(){
    const modal= await this.modalController.create({
       component: ModalUbicacionPage
     });
     await modal.present();
 
     const {data} = await modal.onDidDismiss();
     console.log(data);
     if(data != undefined){
      this.obtenerDireccionGeocoder(data.lat,data.lng);
      this.ionViewDidEnter();
     }
   }

  escribiendo(){
    console.log('escribiendo...');
    this.focus=true;
  }


  //AUTOCOMPLETE, SIMPLEMENTE ACTUALIZAMOS LA LISTA CON CADA EVENTO DE ION CHANGE EN LA VISTA.
  buscarDireccion(){
    if(this.focus == true){
      if (this.direccion == '') {
        this.ocultarlista = true;
        this.autocompleteItems = [];
        return;
      }
      
      this.GoogleAutocomplete.getPlacePredictions({ input: this.direccion,componentRestrictions: { country: 'PE' }},
      (predictions, status) => {
        console.log(status);
        console.log(predictions);
        this.autocompleteItems = [];
        if(predictions != null){
          
          this.zone.run(() => {
            predictions.forEach((prediction) => {
              this.ocultarlista = false;
              this.autocompleteItems.push(prediction);
            });
          });
        }else{
          this.ocultarlista = true;
          let search = document.getElementById('buscarDireccion') as HTMLIonSearchbarElement;
          search.style.color = "#da0101";
          this.presentToast('La dirección no existe o esta mal escrita');
          
        }
      });
    }else{
      console.log('no esta escribiendo');
    }
    
  }

    //FUNCION QUE LLAMAMOS DESDE EL ITEM DE LA LISTA.
    seleccionarDireccion(item) {

      this.sinEstablecimientos == false;
      this.sinPromociones == false;


      this.storage.set('ubicacion',item.description);
      this.ocultarlista = true;
      this.focus= false;
      this.direccion = item.description;
      console.log(item);
      
      this.geocoder.geocode({'address':item.description}, (results, status) =>{
     
        console.log(results[0].geometry.location.lat());
        console.log(results[0].geometry.location.lng());
        this.storage.set('longitud',results[0].geometry.location.lng());
        this.storage.set('latitud',results[0].geometry.location.lat());
        this.cargarUbicación();
      });
    }

    refrescarInicio(){
      this.getEstablecimientoTipo(this.tipoTiendaActiva);
      this.getLongitudLatitudPromociones();
    }

      //LLAMAMOS A ESTA FUNCION PARA LIMPIAR LA LISTA CUANDO PULSAMOS IONCLEAR.
  ClearAutocomplete(){
    this.autocompleteItems = []
    this.autocomplete.input = ''
    this.ocultarlista = true;
  
  }
    

  cargarUbicación(){
    this.storage.get('ubicacion')
    .then((val) =>{
      if(val == null){
        this.diagnostic.isLocationAvailable()
          .then(r =>{
            if(r == true){
              this.getLocation();
            }else{
              //this.presentAlertConfirm();
              console.log("location false ");
              this.getLocation();
            }
          })
          .catch(er =>{
            console.log(er);
            console.log("error al verificar ubicacion diagnostic");
            this.presentAlertConfirm();
            
          });
      }else{
        
        this.storage.get('ubicacion_seleccion').then(res =>{
          if(res !== val){
            this.focus= false;
            this.direccion = val;
            this.verificarUbicacion("",0,"inicio");
            this.getEstablecimientoTipo(this.tipoTiendaActiva);
            this.getLongitudLatitudPromociones();
            this.getSlides();
            this.storage.set('ubicacion_seleccion',val);
          }else{
            this.focus= false;
            this.direccion = val;
            this.getEstablecimientoTipo(this.tipoTiendaActiva);
            this.getLongitudLatitudPromociones();
            this.getSlides();
          }
        });
      }
  
      })
    .catch(err =>{
        console.log("no hay ubicacion");
      });
     
   }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.slides.stopAutoplay();
    this.menu.enable(true);
  }

  ngOnInit(){
    this.splashScreen.hide();
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

  //GEOCALIZACION DEL USUARIO
async getLocation() {
  console.log('geocalizacion');
  
  this.geolocation.getCurrentPosition()
    .then((rta) =>{
      
      this.storage.set('longitud',rta.coords.longitude);
      this.storage.set('latitud',rta.coords.latitude);
      // this.getDireccion(rta.coords.latitude,rta.coords.longitude);
      this.obtenerDireccionGeocoder(rta.coords.latitude,rta.coords.longitude);
    })
    .catch((error) =>{
      console.log("Error obteniendo geocalizacion");
      console.log(error);
    });
  }

  obtenerDireccionGeocoder(lat,long){
    this.geocoder.geocode({'location':{lat:Number(lat),lng:Number(long)}}, (results, status) =>{
      this.apiservicio.setStorage('ubicacion',results[0].formatted_address);
      this.direccion = results[0].formatted_address;
      let dire = document.getElementById('buscarDireccion') as HTMLIonSearchbarElement;
      dire.value=results[0].formatted_address;
      console.log(results);
      console.log(results[0].formatted_address);
      console.log(this.direccion);
      this.Skeleton2 = true;
      this.Skeleton = true;
      this.getEstablecimientoTipo(this.tipoTiendaActiva);
      this.getLongitudLatitudPromociones();

    });
  }


  busquedaProducto(){
    this.storage.get('latitud')
    .then((val) =>{
        console.log(val);

        if(val == null || this.direccion == ''){

          this.presentToast('Por favor debe ingresar una dirección');

        }else{

          this.storage.get('ubicacion_seleccion').then(res =>{
            if(res !== this.direccion){
              this.verificarUbicacion("busquedaProducto",this.km,"producto");
            }else{
              let navigationExtras: NavigationExtras = {
                state: {
                  km: this.km,
                  regalo:0
                }
              };
               this.router.navigate(['busquedaProducto'],navigationExtras);
            }
          });
         
         
        }
      })
      .catch(error =>{
        console.log("no hay ubicacion");
      });
    
  }

  busquedaCategoria(value){

    this.storage.get('latitud')
    .then((val) =>{
        console.log(val);

        if(val == null || this.direccion == ''){

          this.presentToast('Por favor debe ingresar una dirección');   
        }else{
          let categoria:String = value;   
          
          this.storage.get('ubicacion_seleccion').then(res =>{
            if(res !== this.direccion){
              this.verificarUbicacion("busquedaCategoria",this.km,categoria);
            }else{
              let navigationExtras: NavigationExtras = {
                state: {
                  km: this.km,
                  ind:categoria
                }
              };
               this.router.navigate(['busquedaCategoria'],navigationExtras);
            }
          });
        }
      })
      .catch(error =>{
        console.log("no hay ubicacion");
      });

  }

  busquedaEstablecimiento(value){

    this.storage.get('latitud')
    .then((val) =>{
        console.log(val);
        if(val == null || this.direccion == ''){
          this.presentToast('Por favor debe ingresar una dirección');
      }else{
 
        let establecimiento:Number = value;

        this.storage.get('ubicacion_seleccion').then(res =>{
          if(res !== this.direccion){
            this.verificarUbicacion("busquedaEstablecimiento",this.km,establecimiento);
          }else{
            let navigationExtras: NavigationExtras = {
              state: {
                km: this.km,
                ind:establecimiento
              }
            };
             this.router.navigate(['busquedaEstablecimiento'],navigationExtras);
          }
        });
      }
      })
      .catch(error =>{
        console.log("no hay ubicacion");
      });

  }

  async presentToast(msm) {
    const toast = await this.toastController.create({
      message: msm,
      duration: 2000,
      color: 'danger',
     
    });
    toast.present();
  }

getEstablecimientoTipo(value){
  this.storage.get('latitud')
  .then((val) =>{
      console.log(val);
      if(val == null || this.direccion == ''){

        this.presentToast('Por favor debe ingresar una dirección');

    }else{
    
      this.apiservicio.getEstablecimientoTipo(value)
      .subscribe(
        (data) => {
         
             this.Skeleton2 = false;
             this.tipoTiendaActiva = value;
             if(data == null || data == undefined)
             data = [];
             console.log(data);
             this.getLongitudLatitud(data);
             this.cambiarTituloEstablecimiento(value);
        },(error) =>{
        console.error(error);
      });
    }
    })
    .catch(error =>{
      console.log("no hay ubicacion");
    });

}

cambiarTituloEstablecimiento(val){
  switch(val){

    case 1: 
      this.tituloEstablecimientos = 'Tiendas';
      this.setSelectedText('text1');
      break;
    case 2:
      this.tituloEstablecimientos = 'Licorerías';
      this.setSelectedText('text2');
      break;
    case 3:
      this.tituloEstablecimientos = 'Supermercados';
      this.setSelectedText('text3');
      break;
    case 4:
      this.tituloEstablecimientos = 'Online';
      this.setSelectedText('text4');
      break;
    default:
      this.tituloEstablecimientos = '';
    break;
  }
}

getPromociones(){
  let datos = {lat: this.latitud, lng: this.longitud, km: Number(this.km)};
  console.log(datos);
  this.apiservicio.getListaPromociones(datos)
  .then(
    (data) => {   
      console.log(data);
      
      if(data != null || data != undefined){
        this.sinPromociones = false;
        this.conPromociones = true;
        this.promociones = data;
      }else{
        this.sinPromociones = true;
        this.conPromociones = false;
        console.log("SIN PROMOCIONES")
      }
      this.Skeleton = false;
    })
    .catch(error =>{
       console.log(error);
   });
}

getLongitudLatitudPromociones(){
  this.storage.get('longitud')
  .then((val) =>{
    this.longitud= val;

    this.storage.get('latitud')
    .then((val) =>{
       this.latitud = val;

       this.getPromociones();
    });
  });
}

irPromocion(promocion){
   this.storage.get('latitud')
   .then((val) =>{
       console.log(val);
       if(val == null || this.direccion == ''){
 
        this.presentToast('Por favor debe ingresar una dirección');
 
     }else{
      

       this.ModalPromociones(promocion);
     }
     })
     .catch(error =>{
       console.log("no hay ubicación");
     });

}


guardarKm(){
    let km = this.km;
    this.storage.set('km',km);
    console.log('Kilometro Guardado'+km);
    this.getEstablecimientoTipo(this.tipoTiendaActiva);
    this.getLongitudLatitudPromociones();
    
}


getLongitudLatitud(data){

  this.storage.get('longitud')
  .then((val) =>{
    this.longitud= val;

    this.storage.get('latitud')
    .then((val) =>{
      
      this.latitud = val;
      
      if(data == null){
        this.sinEstablecimientos = true;
      }else{
        this.Establecimientos =  this.obtenerMarcadoresPorDistancia(this.latitud, this.longitud, this.km,data);
        this.Establecimientos.sort((a,b) => a.distancia > b.distancia  ? 1 : -1);
        console.log(this.Establecimientos );
        if(this.Establecimientos.length == 0)
             this.sinEstablecimientos = true;
        else
             this.sinEstablecimientos = false;
             this.conEstablecimientos = true;
      }


    });
    
  });

}




  //CALCULAR LA DISTANCIA ENTRE DOS PUNTOS
  getKilometros = function(lat1,lon1,lat2,lon2)
  {
  var rad = function(x) {return x*Math.PI/180;}
  var R = 6371; //Radio de la tierra en km
  var dLat = rad( lat2 - lat1 );
  var dLong = rad( lon2 - lon1 );
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong/2) * Math.sin(dLong/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c;
   return d.toFixed(1); //Retorna tres decimales
  }

  
//OBTENER MARCADORES DENTRO DE LA DISTANCIA SELECCIONAD

obtenerMarcadoresPorDistancia(lat,lon,km,tiendas){
  let tiendasAdistancia = [];
  for (var i=0; i<tiendas.length; i++)
  {
    let distancia = parseFloat(this.getKilometros(lat,lon,tiendas[i].latitud,tiendas[i].longitud));
    if( distancia < km)
    {
      tiendas[i].distancia = distancia;
      tiendasAdistancia.push(tiendas[i]);

    }
   }

   return tiendasAdistancia;
}


doRefresh(event) {
  
  this.cargarUbicación();

  setTimeout(() => {
    console.log('Completo');
    event.target.complete();
  }, 2000);
}

//// CAMBIAR COLOR TEXTO

setSelectedText(textId:string,) {
  this.selecteTextId = textId;

}

getTextColor(textId:string):string{
return this.selecteTextId == textId? "highlight-color" : "";
}


async verificarUbicacion(url,k,ind){
  this.storage.remove('mi_seleccion');
  const modal= await this.modalController.create({
     component: ModalVerificarPage,
     cssClass: 'modal-chico',
     componentProps:{
      ruta:url, 
      km:k,
      ind:ind
     }
     
   });
   await modal.present();

   const {data} = await modal.onDidDismiss();
   if(data != undefined){
    this.obtenerDireccionGeocoder(data.lat,data.lng);
    // this.ionViewDidEnter();
   }
 }


 getSlides(){
  this.apiservicio.getSlidesInicio()
  .subscribe(
    (data) => {
     
         let slideRecibidos:any = data;
         this.slide = [];
         let slidePorDefecto = [{"p_descripcion": 'https://firebasestorage.googleapis.com/v0/b/bubeapp.appspot.com/o/carrucel%2Fbubeportada.png?alt=media&token=e922ea72-a063-4f41-a2fa-95fa71933b45'}];

         for(let slide of slideRecibidos){
            
             if(slide.p_descripcion == '../assets/samplesImage/image.svg')
               console.log('No hay')
             else 
             this.slide.push(slide);
         }

         if(this.slide.length == 0)
             this.slide = slidePorDefecto;
        
         console.log( this.slide)
   
    },(error) =>{
    console.error(error);
  });
 }


 // googleAnalytics
 googleAnalytics(){
  this.firebaseAnalytics.logEvent('pantallas',{pantalla:"inicio"})
  .then(res =>{
    console.log(res);
    console.log("firebase ok");
  })
  .catch(er =>{
    console.log(er);
    console.log("firebase no");
  });
}
}