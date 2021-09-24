import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoadingController,ModalController, NavController, ToastController, MenuController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { ModalCarritoPage } from '../modal-carrito/modal-carrito.page';
import { ModalTiendaPage } from '../modal-tienda/modal-tienda.page';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { JsonPipe, Location } from '@angular/common';
import { Storage } from '@ionic/storage';
import { modalSeleccionarModalidadPage} from '../modalSeleccionarModalidad/modalSeleccionarModalidad.page';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
declare var google;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})

export class MapaPage {
  mapRef = null;
  num_bebidas;
  total;
  lat;
  lng;

  array = [];
  
  bebidas=[];
  carrito:any=[];
  
  establecimientosCoincidencia:any;
  establecimientosSeleccionados: any;
  kilometros:number;
  usuarioFoto:any;

  estilos =  [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ];

  constructor(
    private geolocation: Geolocation,
    private loadingCtrl: LoadingController,
    private modalController: ModalController,
    public router: Router,
    private firebaseAnalytics: FirebaseAnalytics,
    private navCtrl: NavController,
    public apiService:ApiServiceService,
    public route: ActivatedRoute,
    private modalCtrl:ModalController,
    public storage: Storage,
    public menu: MenuController,
    private location: Location,
    public toastController: ToastController,
    public popoverController: PopoverController) {

      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.bebidas = this.router.getCurrentNavigation().extras.state.bebidas;
          this.kilometros=this.router.getCurrentNavigation().extras.state.kilometros;
          this.establecimientosCoincidencia=this.router.getCurrentNavigation().extras.state.establecimientosCoincidencia;
          this.establecimientosSeleccionados=this.router.getCurrentNavigation().extras.state.establecimientosSeleccionados;
          
          console.log(this.kilometros);
          console.log(this.establecimientosCoincidencia);
          console.log(this.establecimientosSeleccionados);
        }
        
      });
     }

  regresar(){
    let backbutton = document.getElementById('volver1') as HTMLIonBackButtonElement;
    backbutton.disabled = true;
  }

  ionViewDidEnter(): void {

    let btn_volver = document.getElementById('btn-volver') as HTMLIonButtonElement;
    btn_volver.disabled = true;

    this.menu.enable(false);

    this.storage.get('longitud').then(res =>{
      this.lng = res;
      this.storage.get('latitud').then(res =>{
        this.lat= res;
        this.loadMap(this.kilometros,this.establecimientosCoincidencia);
      }).catch(er =>{
        console.log('error sacando latitud');
      });
    }).catch(er =>{
      console.log('error sacando longitud');
    });
     
     if(this.carrito.length > 0){
       console.log(this.carrito.length);
       let btn_explorar = document.getElementById('btn-explorar') as HTMLIonButtonElement;
       let btn_volver = document.getElementById('btn-volver') as HTMLIonButtonElement;
      // this.num_bebidas = this.bebidas.length;
       btn_volver.textContent="Ver detalle";
       btn_explorar.style.display="block";
     }

    // this.initAutocomplete ();
    this.googleAnalytics();
  }

    // Restore to default when leaving this page
    ionViewDidLeave(): void {
      this.menu.enable(true);
      this.loadingCtrl.dismiss();
    }

  // CREAR MAPA
   async loadMap(km,obj) {
     const loading = await this.loadingCtrl.create();
     loading.present();
     const myLatLng = await this.getLocation();
     console.log(myLatLng);
     const mapEle: HTMLElement = document.getElementById('map');
     this.mapRef = new google.maps.Map(mapEle, {
       center: myLatLng,
       zoom: 14,
       styles: this.estilos
     });
     google.maps.event
     .addListenerOnce(this.mapRef, 'idle', () => {
       loading.dismiss();
       this.obtenerMarcadoresPorDistancia(myLatLng.lat, myLatLng.lng,km,obj);
      
     });

     
   }
 // MARCADOR 
 private addMaker(lat: number, lng: number) {
  const marker = new google.maps.Marker({
    position: { lat, lng },
    map: this.mapRef,
    title: 'YO',
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 11, //tamaño
      strokeColor: '#c1e8f8', //color del borde
      strokeWeight: 2, //grosor del borde
      fillColor: '#059fdb', //color de relleno
      fillOpacity:1// opacidad del relleno
    }
  });
 }


   //GEOCALIZACION DEL USUARIO
   private async getLocation() {
     return {
       lat: this.lat,
       lng: this.lng
     };
    }
   
   //OBTENER MARCADORES DENTRO DE LA DISTANCIA SELECCIONAD
   obtenerMarcadoresPorDistancia(lat,lon,km,tiendas){
     console.log(lat);
     console.log(lon);
     for (var i=0; i<tiendas.length; i++)
     {
       if(parseInt(this.getKilometros(lat,lon,tiendas[i].latitud,tiendas[i].longitud)) < km)
       {
         var tienda = tiendas[i];
         console.log(tienda);
         console.log(this.getKilometros(lat,lon,tiendas[i].latitud,tiendas[i].longitud));
         this.addMakerTiendas(tienda);
         this.array.push(tienda);   
       }
      }

      this.addMaker(lat,lon);
      this.mapRef.setCenter({lat:lat,lng:lon});
    }
   
   //marcar tiendas en el mapa
   private addMakerTiendas(tienda) {
     console.log(tienda);
     var icono;

         if(this.establecimientosSeleccionados.find(socio => socio.idsociocomercial === tienda.idsociocomercial)){
          icono=tienda.fotomarcadoramarillo;
         }else{
          icono=tienda.fotomarcadorgris;
         }
     
     let lng= parseFloat(tienda.longitud);
     let lat = parseFloat(tienda.latitud);
     const marker = new google.maps.Marker({
       position: {lat,lng},
       map: this.mapRef,
       title: tienda.nombrecomercial,
       icon: icono
     }); 
     
    const infoPrecio = '<p id="precio" style="margin:0px;color:#000000;padding:0px;">'+tienda.total.toFixed(2)+'</p>';
    const infoWindow = new google.maps.InfoWindow({
      content:infoPrecio,
    });
    infoWindow.open(this.mapRef, marker);
    marker.addListener("click", () =>{
   
      let fecha = new Date();
      let horario = {
        "dia":(fecha.getDay()== 0)? 7 : fecha.getDay(),
        "idsociocomercial":tienda.idsociocomercial,//tienda.idsociocomercial
      };
       console.log(horario);
      this.apiService.validarDiaDisponibleTienda(horario)
      .then(res =>{
        console.log(res);
        this.infoTienda(tienda,res);
      })
      .catch(er =>{
        console.log(er);
      });
    //  this.infoTienda(tienda);
      
    });
  
    let btn_volver = document.getElementById('btn-volver') as HTMLIonButtonElement;
    btn_volver.disabled = false;
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
  return d.toFixed(3); //Retorna tres decimales
   }

   
    abrirCarrito(){
    this.apiService.getStorage('carrito')
      .then(res =>{
        console.log(res);
        if(res != null){
          this.modalCarrito();
        }else{
          this.presentToast();
        }
      })
      .catch(er =>{
          this.presentToast();
      });
  
    
    }

    async modalCarrito(){
      const modal= await this.modalController.create({
        component: ModalCarritoPage,
        cssClass: 'small-modal',
        componentProps:{
         'establecimientosCoincidencia':this.array
      }
      });
      modal.onDidDismiss()
      .then((data) => {
 
           console.log("data retorno carrito");
           const res = data['data'];
           console.log(res);
          this.apiService.getStorage('num_bebidas')
          .then((val) =>{
            this.num_bebidas = val;
            if(this.num_bebidas == 0){
             this.apiService.removeStorage('carrito');
             let btn_explorar = document.getElementById('btn-explorar') as HTMLIonButtonElement;
             let btn_volver = document.getElementById('btn-volver') as HTMLIonButtonElement;
             btn_volver.textContent="Volver a mi seleccion";
             btn_explorar.style.display="none";
            }
            if(res == undefined || Number(res) == 0){
            }else{
              this.ModalSeleccionarModalidad(res.carrito,res.establecimientosCoincidencia);
            }
          });
 
       });
           return await modal.present();
    }

   async infoTienda(tienda,estadoDia){
    const modal= await this.modalController.create({
       component: ModalTiendaPage,
       cssClass: 'small-modal',
       componentProps:{
          'datos':tienda,
          'estado_dia':estadoDia
       }
     });

     modal.onDidDismiss()
        .then((data) => {
          let res:any=data;
          console.log("ingo tienda");
          console.log(res);
          if(res.data != null){
            console.log(data);
            // this.carrito=res.data;
            this.apiService.setStorage('carrito',res.data);
            var b = res.data.bebidas;
            console.log(b);
            this.num_bebidas=b.length;
            let btn_explorar = document.getElementById('btn-explorar') as HTMLIonButtonElement;
            let btn_volver = document.getElementById('btn-volver') as HTMLIonButtonElement;
           // this.num_bebidas = this.bebidas.length;
            btn_volver.textContent="Ver detalle";
            btn_explorar.style.display="block";
            this.ModalSeleccionarModalidad(res.data,this.array);
           
          }
    });
    return await modal.present();

  }
 
  
   volver(){
    let btn_volver = document.getElementById('btn-volver') as HTMLIonButtonElement;

    if(btn_volver.textContent=="Ver detalle"){
     
      this.apiService.getStorage('carrito')
        .then(car =>{
       
          if(car != null){
            this.apiService.getStorage('total')
            .then(t =>{
              this.ModalSeleccionarModalidad(car,this.array);
            });
          }else{
            this.presentToast();
          }
        });
    }else{
      this.storage.remove('carrito');
      this.navCtrl.back();
    } 
    
   }

   seguir(){
    let btn_volver = document.getElementById('volver1') as HTMLIonBackButtonElement;
    btn_volver.click();
   }
   

   async presentToast() {
    const toast = await this.toastController.create({
      message: 'Carrito vacío',
      duration: 2000,
      color: 'danger',
     
    });
    toast.present();
  }


    /////////////// MODAL SELECCIONAR MODALIDAD ////////////////
    async ModalSeleccionarModalidad(carrito,establecimientosCoincidencia)
     {
       const modal = await this.modalCtrl.create(
         {
        component: modalSeleccionarModalidadPage,
        cssClass: 'modal-chico',
        componentProps: {
          'carrito': carrito,
          'establecimientosCoincidencia': establecimientosCoincidencia,
        }
      });
       modal.onDidDismiss()
           .then((data) => {
               const res = data['data'];
               console.log(res);
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

 //googleAnalytics
 googleAnalytics(){
  this.firebaseAnalytics.logEvent('pantalla',{pantalla:"mapa"})
  .then(res =>{
    console.log(res);
    console.log("firebase ok");
  })
  .catch(er =>{
    console.log(er);
    console.log("firebase no");
  });
}

cerrarMensaje(){
  console.log("asdasd");
  let m = document.getElementById('mensaje') as HTMLIonChipElement;
  let map = document.getElementById('map') as HTMLDivElement;
  m.hidden = true;
  map.style.marginTop = "0px";

}
   
}

