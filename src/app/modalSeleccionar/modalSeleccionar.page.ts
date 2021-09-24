import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform} from '@ionic/angular';
import {ApiServiceService} from '../api-service.service';
import { Router,NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import introJs from 'intro.js/intro.js';

@Component({
  selector: 'app-modalSeleccionar',
  templateUrl: './modalSeleccionar.page.html',
  styleUrls: ['./styles/modalSeleccionar.page.scss',
              './styles/modalSeleccionar.responsive.scss',
              './styles/modalSeleccionar.shell.scss'],
})

export class ModalSeleccionarPage implements OnInit {

  tourActive = 0;

    total;
    num_bebidas;
    listaNoSeleccion:any;
    listaSeleccion:any;
    buttonDisabled = 'false';
    mapaListaSeleccion = [];
    mapaListaNoSeleccion = [];
    longitud;
    latitud;
    estadoSocio;
    km:number;
    regalo:number;
    listaEstablecimientos:any;
    listaBebidas:any;
    idBebidas:String = '';

     // SOLO UN ESTABLECIMIENTO

     esEstablecimiento;
     listatemporal = [];
     listaDisponibles = [];
     listaNoDisponibles = [];
     intro:any;
     
    constructor(private modalControler: ModalController,
                public apiService:ApiServiceService,
                public storage: Storage,
                private platform: Platform,
                private alertController: AlertController,
                private router:Router) { 
    }
  
ngOnInit() {
      
}

ionViewWillEnter(): void {
      this.calcularTotal();     
      if(this.esEstablecimiento == true){
        console.log(this.listaNoSeleccion);
        this.verificarSilasBebidasExiste();
      }else{
        for(let bebida of this.listaSeleccion){
             bebida.disponible = "";
        }
      }   
}
ionViewDidEnter(): void{
  this.validarInicioTour();
}

validarInicioTour(){
  this.storage.get('tour').then(res =>{
    let tour = res;
    if(tour != null || tour != undefined){
      if(tour < 2){
        this.introTour();
      }
    }else{
      this.introTour();
    }
  });
}

ionViewDidLeave(): void {
  this.intro.exit(true);
}

introTour() {
  this.intro = introJs();
  this.intro.setOptions({
  nextLabel: ">>",
  prevLabel: "<<",
  doneLabel: "Aceptar",
  hidePrev: true,
  steps: [

    {
      element: '#btn-agregar-carrito',
      intro: "En el mapa encontrarás todos los establecimientos que tienen el total de tu pedido, escoge el de tu preferencia en base al mejor precio y distancia disponible",
      position: 'top'

    }
  ]
  });
  this.intro.start();
}


verificarSilasBebidasExiste(){

 for(let bebida of this.listaSeleccion){

   if(this.listaNoSeleccion == null){
        bebida.disponible = "No disponible";
   }else{
    if(this.listaNoSeleccion.find(item => item.idbebida == bebida.idbebida)){
         
      bebida.disponible = " ";

     }else{

      bebida.disponible = "No disponible";

     }
   }
   
 }
}

verificarSiHayPromociones():boolean{

   let indicador = false;

   for(let bebida of this.listaSeleccion){

        if(bebida.tipo == "promocion"){
          indicador = true;
        }
   }

   return indicador;
}
    

calcularTotal(){
      var subtotal=0;
      this.num_bebidas = this.listaSeleccion.length
      this.storage.set('numerobebidas',this.num_bebidas);
      this.storage.set('listaseleccion',this.listaSeleccion);
      
      if(this.num_bebidas == 0){
        this.buttonDisabled = 'true';
        this.storage.remove('mi_seleccion');
        this.storage.remove('ind_seleccion');
      }

      for(let bebida of this.listaSeleccion){

      subtotal += bebida.cantidad*bebida.preciobebidasocio;

      }
      this.total=subtotal.toFixed(2);
      this.storage.set('mi_seleccion',this.listaSeleccion);
    
}
  
  cerrarModal(){
      this.modalControler.dismiss(this.listaSeleccion);
  }
  
  mas(index: number) {
      this.listaSeleccion[index].cantidad += 1;
      this.calcularTotal();
  }
  
  menos(index: number) {
    if(this.listaSeleccion[index].cantidad==1){
        this.listaSeleccion.splice(index,1);
        this.calcularTotal();

    }else{
        this.listaSeleccion[index].cantidad -= 1;
        this.calcularTotal();
    }
  }

agregarAlcarrito(){
      this.buttonDisabled = 'true';

      if(this.esEstablecimiento == true){

        let indicadorBebidasDiferentes = false;
        
        for(let beb of this.listaSeleccion){

          if(this.listaNoSeleccion == null){
            indicadorBebidasDiferentes = false;
          }else{
            if(this.listaNoSeleccion.find(it => it.idbebida == beb.idbebida && it.idsociocomercial != beb.idsociocomercial)){

              indicadorBebidasDiferentes = true;
 
            }
          }

        }

        if(indicadorBebidasDiferentes == true) 
          this.presentAlertConfirmarSobrescrituraBebidas();
        else 
          this.agregarListaSoloUnEstablecimiento();
        
      }else{

        let indicador = this.verificarSiHayPromociones();
        if(indicador == true){
             this.presentAlertTienePromociones();
             this.buttonDisabled = 'false';
        }else{

          this.agregarListaMapa();
        }
        
      }
}

agregarListaMapa(){

    for(let i=0; i<this.listaSeleccion.length; i++){

      let idBebida = this.listaSeleccion[i].idbebida;

      if(i == this.listaSeleccion.length-1){
        this.idBebidas = this.idBebidas.concat(idBebida)
      }else{
        this.idBebidas = this.idBebidas.concat(idBebida+",")
      }
    
    }

    let dataCoincidenciasEstablecimiento = {bebidas: this.idBebidas,
                                            cantidadBebidas: this.getCantidadBebidas(),
                                            estadoSocio:this.estadoSocio,
                                            lat:this.latitud,
                                            lng:this.longitud,km:this.km}

    this.getCoincidenciasEstablecimiento(dataCoincidenciasEstablecimiento);
  
}

agregarListaSoloUnEstablecimiento(){

 this.listatemporal = [];
 this.mapaListaSeleccion = [];


for(let bebida of this.listaSeleccion){

  if(this.listaNoSeleccion == null){
    this.listatemporal = [];
  }else{
    if(this.listaNoSeleccion.find(item => item.idbebida == bebida.idbebida)){
      
      let bebidaNueva = this.listaNoSeleccion.find(item => item.idbebida == bebida.idbebida);

       if(this.listatemporal.length == 0){
         bebidaNueva.cantidad = bebida.cantidad;
         bebidaNueva.nombrebebida = bebida.nombremarca + '/ ' + bebida.nombrebebida; 
         this.listatemporal.push(bebidaNueva);
       }else{

         if(this.listatemporal.find(item => item.idbebida == bebidaNueva.idbebida)){
  
             let bebCantidad = this.listatemporal.find(e => e.idbebida === bebidaNueva.idbebida);
             console.log(bebCantidad);
             bebidaNueva.nombrebebida = bebida.nombremarca + '/ ' + bebida.nombrebebida; 
             bebCantidad.cantidad += bebida.cantidad;

         }else{
          bebidaNueva.cantidad = bebida.cantidad;
          bebidaNueva.nombrebebida = bebida.nombremarca + '/ ' + bebida.nombrebebida; 
          this.listatemporal.push(bebidaNueva);
         }
       }
    }
  }

}



if(this.listatemporal.length == 0){

  this.presentAlertSinDisponibilidad();
  this.idBebidas = '';
  this.buttonDisabled = 'false';
    
}else{
  let subtotal = 0;
  console.log(this.listatemporal);
  
  for(let bebida of this.listatemporal){
   subtotal += bebida.cantidad*bebida.preciobebidasocio;
  }
  let total = subtotal.toFixed(2);
  
  this.mapaListaSeleccion.push({apellidossocio: this.listatemporal[0].apellidossocio, fotomarcadorgris: this.listatemporal[0].fotomarcadorgris, rutafotosocio: this.listatemporal[0].rutafotosocio,
                           fotomarcadoramarillo: this.listatemporal[0].fotomarcadoramarillo,
                           bebidas: this.listatemporal, count: this.listatemporal.length, 
                           hora_fin_atencion: this.listatemporal[0].hora_fin_atencion,
                           hora_fin_delivery: this.listatemporal[0].hora_fin_delivery,
                           hora_inicio_atencion: this.listatemporal[0].hora_inicio_atencion,
                           hora_inicio_delivery:  this.listatemporal[0].hora_inicio_delivery,
                           tipo_delivery: this.listatemporal[0].tipo_delivery,
                           rango_entrega: this.listatemporal[0].rango_entrega,
                           direccionsocio: this.listatemporal[0].direccionsocio, estadosocio: this.listatemporal[0].estadosocio, idpromocion: "true", 
                           idsociocomercial: this.listatemporal[0].idsociocomercial, latitud: this.listatemporal[0].latitud,
                           longitud: this.listatemporal[0].longitud, nombrecomercial: this.listatemporal[0].nombrecomercial,
                           nombressocio: this.listatemporal[0].nombressocio, telefonosocio: this.listatemporal[0].telefonosocio,estado_horario_tienda: this.listatemporal[0].estado_horario_tienda, total: Number(total)});
  this.irMapaSoloEstablecimiento();
}
}

getCantidadBebidas():number{
  var count = {};
  this.listaSeleccion.forEach(function(i) { count[i.idbebida] = (count[i.idbebida]||0) + 1;});
  var cantidad = Object.keys(count).length;
  return cantidad;
}


getCoincidenciasEstablecimiento(val){
  console.log(val);
      this.apiService.getCoincidenciasEstablecimiento(val)
      .then(data => {
              this.listaEstablecimientos = data;
              console.log(this.listaEstablecimientos)
              if(this.listaEstablecimientos == null){
                this.presentAlertSinResultados();
                this.idBebidas = '';
                this.buttonDisabled = 'false';
                ;
              }else{

                this.llenarListaNoSeleccionMapa();
                
                
              }
              
      })
      .catch(error =>{
        this.listaEstablecimientos = [];
        console.log(error);
  });
}


llenarListaNoSeleccionMapa(){
   for(let establecimiento of this.listaEstablecimientos){
       
       let dataCoincidenciasEstablecimiento = {establecimiento: establecimiento.idsociocomercial, bebidas: this.idBebidas}
      
       this.apiService.getCoincidenciasBebida(dataCoincidenciasEstablecimiento)
       .then(data => {
               
               let index = this.listaEstablecimientos.indexOf(establecimiento);
               let item = establecimiento;
               item.bebidas = data;

               for(let bebida of item.bebidas){

                 if(this.listaSeleccion.find(seleccion => seleccion.idbebida == bebida.idbebida)){

                    let seleccion = this.listaSeleccion.find(seleccion => seleccion.idbebida == bebida.idbebida)
                    bebida.cantidad = seleccion.cantidad;
                    bebida.nombremarca = seleccion.nombremarca;
          
                 }
                 
               }
               
               let subtotal = 0;

               for(let bebida of establecimiento.bebidas){

                subtotal += bebida.cantidad*bebida.preciobebidasocio;
        
              }

               let total = subtotal.toFixed(2);
               establecimiento.total = Number(total);
               this.listaEstablecimientos[index] = establecimiento;

       })
       .catch(error =>{
         console.log(error);
     });
     
   }
   this.llenarListaSeleccionMapa();
}

llenarListaSeleccionMapa(){


  for(let establecimientoSeleccion of this.listaSeleccion){

    for(let establecimientoNoSeleccion of this.listaEstablecimientos){

          if(establecimientoSeleccion.idsociocomercial == establecimientoNoSeleccion.idsociocomercial){

             if(this.mapaListaSeleccion.find(seleccion => seleccion.idsociocomercial === establecimientoNoSeleccion.idsociocomercial)){
               console.log("MISMO establecimiento");
             }else{
              this.mapaListaSeleccion.push(establecimientoNoSeleccion);
             }
              
          }
    }
  }

  this.irMapa();
  

}

irMapa(){

  this.storage.set('regalo',this.regalo);
  this.storage.remove('num_bebidas');
  let navigationExtras: NavigationExtras = {
    state: {
      establecimientosCoincidencia: this.listaEstablecimientos,
      establecimientosSeleccionados: this.mapaListaSeleccion,
      kilometros: this.km
    }
  };
  this.router.navigate(['mapa'],navigationExtras);
  this.modalControler.dismiss(0);
}

irMapaSoloEstablecimiento(){
  this.storage.remove('num_bebidas');
  this.storage.set('regalo',this.regalo);
  let navigationExtras: NavigationExtras = {
    state: {
      establecimientosCoincidencia: this.mapaListaSeleccion,
      establecimientosSeleccionados: this.mapaListaSeleccion,
      kilometros: this.km
    }
  };
  
  this.router.navigate(['mapa'],navigationExtras);
  this.modalControler.dismiss(0);
}


async presentAlertSinResultados() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Sin resultados',
    subHeader: 'No encontramos resultados válidos',
    message: 'Te recomendamos seleccionar de manera individual tu bebida.',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertSinResultadosCercanos() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Sin resultados',
    subHeader: 'No encontramos resultados válidos cerca',
    message: 'Te recomendamos seleccionar de manera individual tu bebida.',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertTienePromociones() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Promoción activa',
    subHeader: 'No se permite la compra de promociones',
    message: 'Te recomendamos comprar las promociones en el establecimiento de origen.',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertSinDisponibilidad() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'No disponible',
    subHeader: 'Bebidas no disponibles',
    message: 'Agregue bebidas del establecimiento seleccionado',
    buttons: ['OK']
  });

  await alert.present();
}

async presentAlertConfirmarSobrescrituraBebidas() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Actualización de precios',
    message: 'Los precios de las bebidas se actualizarán a los del establecimiento en pantalla',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Boton no');
          this.idBebidas = '';
          this.buttonDisabled = 'false';
        }
      }, {
        text: 'Continuar',
        handler: () => {
          this.agregarListaSoloUnEstablecimiento();
            
        }
      }
    ]
  });

  await alert.present();
}

getLongitudLatitud(data){

  this.storage.get('longitud')
  .then((val) =>{
    let longitud= val;

    this.storage.get('latitud')
    .then((val) =>{
      
      let latitud = val;

      this.listaEstablecimientos = this.obtenerMarcadoresPorDistancia(latitud, longitud, this.km, data);
      if(this.listaEstablecimientos.length == 0){
        this.presentAlertSinResultadosCercanos();
        this.idBebidas = '';
        this.buttonDisabled = 'false';
      }else{
        this.llenarListaNoSeleccionMapa();
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

}
