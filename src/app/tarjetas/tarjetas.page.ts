import { Component, ViewChild } from '@angular/core';
import { Router ,ActivatedRoute,NavigationExtras} from '@angular/router';
import { IonList, NavController,ModalController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import { ModalTutorialTarjetasPage } from '../modalTutorialTarjetas/modalTutorialTarjetas.page';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Storage } from '@ionic/storage';
// declare var mercadoPago;
import { ServicioAesService } from '../servicio-aes/servicio-aes.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.page.html',
  styleUrls: ['./tarjetas.page.scss',
              './tarjetas.responsive.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('show', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => show', animate('1000ms ease-in-out')),
      transition('* => hidden', animate('100ms ease-in-out')),
    ])
  ]
})
export class TarjetasPage{
  tarjetas=[];
  checkedTaretas = [];
  establecimientosCoincidencia:any;
  delivery:any;
  tarjet;
  oculto=true;
  carrito:any;
  total = 0;
  t;
  hayTarjetas;
  tiendasAhorro=[];
  @ViewChild('lista') lista: IonList;

  spinner = true;
  animation = 'hidden';

  tarjetaSeleccionada = 0;

  private keyJScrypto = '123456$#@$^@1ERF';

  constructor(
    private router:Router,
    private apiServicio:ApiServiceService,
    private navCtrl: NavController,
    private servicioAES: ServicioAesService,
    private firebaseAnalytics: FirebaseAnalytics,
    private modalController: ModalController,
    public storage: Storage,
    public route: ActivatedRoute
    ) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.carrito = this.router.getCurrentNavigation().extras.state.carrito;
          this.establecimientosCoincidencia = this.router.getCurrentNavigation().extras.state.establecimientosCoincidencia;
          this.delivery = this.router.getCurrentNavigation().extras.state.delivery;
        }
      });
     }

  ionViewDidEnter(): void {
    this.tarjetaSeleccionada = 0;
    this.checkedTaretas;

    if(this.tarjetaSeleccionada == 0){
      this.oculto=true;
    }else{
      this.oculto=false;
    }
      
    let cantidad = 0;
    console.log("CARRITO");
    console.log(this.carrito);
    console.log(this.carrito.bebidas);
    for(let c of this.carrito.bebidas){
      console.log("t"+c.preciobebidasocio);
       cantidad +=  c.cantidad * c.preciobebidasocio;
    }
    this.t = cantidad;
    

    this.carrito.modalidad = this.delivery.modalidad;
    
    if(this.delivery.modalidad == "1"){
        this.total = Number((this.delivery.precio+cantidad).toFixed(2));
    }else{
      this.total = Number(cantidad.toFixed(2));
    }

    console.log('CANTIDAD SUMADA')
    console.log(cantidad);
    this.apiServicio.getStorage('idusuario')
      .then(id =>{
        this.obtenerTarjetas(id);
        console.log(id);
      })
      .catch(er =>{
        console.log("no hay idusuario");
      });
    
      this.googleAnalytics();  
  }


  
  obtenerTarjetas(id){
    this.animation = 'hidden';
    this.apiServicio.getTarjetas(id)
    .subscribe((data) =>{
      this.tarjetas=[data];
      console.log(this.tarjetas);

      if(this.tarjetas[0] !=null){

        this.hayTarjetas="Tus tarjetas";
        for(let t of this.tarjetas[0]){  

            t.numero = this.servicioAES.get(this.keyJScrypto,t.numero);
            t.cvv = this.servicioAES.get(this.keyJScrypto,t.cvv);
            t.fecha = this.servicioAES.get(this.keyJScrypto,t.fecha);
               
          if(t.tipo=="visa"){
            t.color="background:#1c3a24;";
          }else{
            t.color="background:#464545;";
          }
        }
        this.spinner = false;
        this.animation = 'show';

      }else{
        console.log("no tiene tarjetas agregadas");
        this.hayTarjetas="No tiene tarjetas agregadas";
        this.spinner = false;
        this.animation = 'show';
      }
    
    }, (error) =>{
      console.log("no tiene tarjetas agregadas");
      this.hayTarjetas="No tiene tarjetas agregadas";
    });
    
  }

  regresar(){
    let backbutton = document.getElementById('volver2') as HTMLIonBackButtonElement;
    backbutton.disabled = true;
  }

  nuevaTarjeta(){
    this.lista.closeSlidingItems();
    let navigationExtras: NavigationExtras = {
      state: {
        tarjeta:"0",
        pantalla:2
      }
    };
    this.router.navigate(['agregar-tarjeta'],navigationExtras);
  }
  

seleccionar(evento){
 
  let numeroTarjeta = evento.detail.value;
  
  if(this.tarjetaSeleccionada == 0){
    this.oculto=true;
  }else{
    this.oculto=false;
  }

  for(let tarjeta of this.tarjetas[0]){

    if(tarjeta.numero == numeroTarjeta){
        this.tarjet = tarjeta;
    }
  }
  console.log(this.tarjet);
}

EvnetotarjetaSeleccionada(evento){
  this.tarjetaSeleccionada = evento;
}

  siguiente(){

      //calcular ahorro
      if(this.carrito.idpromocion == null){
            
        //console.log("ttal tiennda"+this.t);
        //console.log("coincidencias tiendas");
        //console.log(this.establecimientosCoincidencia);
      let numeros:number[]=[];
      let prom=0;
     if(this.establecimientosCoincidencia ==null){
    
       prom=0;

     }else{
     
      for(let e of this.establecimientosCoincidencia){
        
        if(e.idsociocomercial != this.carrito.bebidas[0].idsociocomercial && e.total > this.t){
          this.tiendasAhorro.push(e.total);
          
        } 
      }
      numeros = this.tiendasAhorro.sort();
      if(numeros.length == 0){
        prom = 0;
      }else{
        prom = numeros[numeros.length-1] - this.t;
      }
     
      console.log(numeros);
      console.log("prom"+prom);
      console.log(numeros[numeros.length-1]);
      var promedio;

      if(prom == 0 || prom < 0){
          promedio = 0;
      }else{
          promedio = (prom/2);
      }
      
      if(promedio < 0){
        promedio  = 0;
      }
      //console.log("ahorro"+promedio.toFixed(2));
      this.apiServicio.setStorage('ahorro',promedio.toFixed(2));
     }

      }else{

     // console.log("ES PROMOCION");
      this.apiServicio.setStorage('ahorro',0);
      }
 
     this.comprobarValidacionDatos()
  }

  comprobarValidacionDatos(){
    this.storage.get('datos_validos').then(res =>{
      let indicador = res;
      if(indicador != null || indicador != undefined){
        this.irFinalizarCompra()
      }else{
        this.irValidarDatos()
      }
    });
  }

  irFinalizarCompra(){

    let navigationExtras: NavigationExtras = {
      state: {
        carrito:this.carrito,
        total:this.total,
        tarjeta:this.tarjet,
        delivery: this.delivery
      }
    };
   this.router.navigate(['finalizar-compra'],navigationExtras);
  }

  irValidarDatos(){
    let navigationExtras: NavigationExtras = {
      state: {
        carrito:this.carrito,
        total:this.total,
        tarjeta:this.tarjet,
        delivery: this.delivery
      }
    };
   this.router.navigate(['validacion-datos-compra'],navigationExtras);
  }

  editar(t){
    console.log("editar "+ t);
    this.lista.closeSlidingItems();
    let navigationExtras: NavigationExtras = {
      state: {
        tarjeta:t,
        pantalla:2
      }
    };
    this.router.navigate(['agregar-tarjeta'],navigationExtras);
  }

  eliminar(t){
    console.log("eliminar "+ t);
    this.lista.closeSlidingItems();
    this.apiServicio.eliminarTarjeta(t.idtarjeta)
      .then(res => {
        console.log("tarjeta eliminada");
        console.log(res);
        this.ionViewDidEnter();
      })
      .catch(er =>{
        console.log("error al eliminar tarjeta");
        console.log(er);
      })
   
  }
  async tutorial(){
    const modal= await this.modalController.create({
       component: ModalTutorialTarjetasPage,
       cssClass: 'small-modal',
       componentProps:{
         pagina: 2
       }
       
     });
     await modal.present();
  
     const {data} = await modal.onDidDismiss();
     console.log(data);
     this.apiServicio.setStorage('guia_tarjetas',1);
   }

    //googleAnalytics
 googleAnalytics(){
  this.firebaseAnalytics.logEvent('pantalla',{pantalla:"pasarela_Tarjetas"})
  .then(res =>{
    console.log(res);
    console.log("firebase ok");
  })
  .catch(er =>{
    console.log(er);
    console.log("firebase no");
  });
}

n1(data){
 
  let n1 = String(data).substring(0,4);

  return n1;
}

 n2(data){

  let n2 = String(data).substring(4,5);

  return n2;
}

 n3(data){

  let n3 = String(data).substring(12);

  return n3;
}
}

