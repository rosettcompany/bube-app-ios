import { Component, AfterViewInit, ViewChild, HostBinding, OnInit, IterableDiffers } from '@angular/core';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';
import { MenuController,ModalController,ToastController, NavController, Platform } from '@ionic/angular';
import {ApiServiceService} from '../api-service.service';
import { filtrarPage } from '../busquedaProducto/filtrar/filtrar.page';
import { filtrarEstablecimientosPage} from '../busquedaProducto/filtrarEstablecimientos/filtrarEstablecimientos.page';
import { filtrarCategoriasPage } from '../busquedaProducto/filtrarCategorias/filtrarCategorias.page';
import { ModalSeleccionarPage} from './../modalSeleccionar/modalSeleccionar.page';
import {filtrarBean} from './../busquedaProducto/filtrosBean/filtrosBean.component';
import { Storage } from '@ionic/storage';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import introJs from 'intro.js/intro.js';

@Component({
  selector: 'app-inicio',
  templateUrl: './busquedaCategoria.page.html',
  styleUrls: [
    './styles/busquedaCategoria.page.scss',
    './styles/busquedaCategoria.shell.scss',
    './styles/busquedaCategoria.responsive.scss'
  ]
})

export class busquedaCategoriaPage{
regalo;
time: number = 0;
display ;
interval;

  constructor(public menu: MenuController,
              public router: Router,
              public route: ActivatedRoute,
              public toastController: ToastController,
              public storage: Storage,
              private firebaseAnalytics: FirebaseAnalytics,
              public filtrarbean: filtrarBean,
              private navCtrl: NavController,
              private platform: Platform,
              public apiService:ApiServiceService,
              private modalCtrl:ModalController) {

              this.route.queryParams.subscribe(params => {
              if (this.router.getCurrentNavigation().extras.state) {
                this.categoria = this.router.getCurrentNavigation().extras.state.ind;
                this.km = this.router.getCurrentNavigation().extras.state.km;   
                this.regalo = this.router.getCurrentNavigation().extras.state.regalo;  
                console.log(this.regalo);
            
              }});
   }

  //// VARIABLES DE RECEPCION
  km:number;
  /////////////////
  filtro:any;   
  rangoPrecio:number = 0;
  radio = false;
  valueSegment = '';
  radioDefault = "";
  categoria = '';
  imagenCategoria = '';
  categoriaID = 0;
  backButtonDisabled = false;

  bebidas:any;
  bebidasLista = [];
  bebidasListaSecundaria: any;

  cantidadMin = 0;
  cantidadMax = 5;

  scrollValue: any;
  scrollBoolean = true;

  cantidadEncontrada = 0;
  cantidadLabel = false;
  filtroVisible = false;

  radiobuttonOrdenPrecio = false;
  radiobuttonOrdenDistancia = false;
  radiobuttonOrdenRecomendados = false;

  ///FONDO ///
  Skeleton = true;
  skeletonList = [1,2,3,4];
  // SCROOLL
  scrollActivo = false;
  ///// FOOTER DE SELECCION VISIBLE
  seleccionVisible = false;
  listaSeleccion = [];
  num_bebidas = 0;
  seleccionActiva = true;

  //// LONGITUD LATITUD
  longitud:any;
  latitud:any;

  /// BOTONES ANTIPROPAGACION
  chipPropagacion = true;

  /// FILTROS SELECCIONADOS
  filtrosSeleccionados = [];
  marcasSeleccionadas = [];
  packsSeleccionados = [];
  rangosSeleccionados = [];
  subCategoriasSeleccionadas = [];
  establecimientosSeleccionados = [];
  radiosSeleccionados = [];

  filtroSubCategoria = {"subcategoria": " "};

  indSoloComprar = false;
  botonSoloComprar = false;
  ///// FILTROS A ENVIAR
  filtrosEnviar = {nombrebebida: this.categoriaID, 
                   establecimiento: ' ',
                   tipoCompra: 'AND SO.estadosocio IN(1,2)',
                   marca: ' ',
                   pack: ' ',
                   subCategoria: '',
                   lat: 0,
                   lng:0,
                   km: 0,
                   ind_delivery: 0};

  // TOUR ACTIVO 
  tourActivo = false;
  intro:any;
  // Disable side menu for this page
  ionViewWillEnter(): void {
    this.menu.enable(false);
  }

  ngOnInit(){
    this.storage.remove('filtrollenado');
    this.storage.remove('listaseleccion');
    this.storage.remove('filtrollenadoEstablecimientos');
    this.seleccionActiva = true;
    this.getLongitudLatitud();
    this.CambioUbicacion();
  }


  ionViewDidEnter(): void{
      if(this.tourActivo == false){
        this.validarInicioTour();
        this.tourActivo = true;
      }
    this.googleAnalytics();
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

  CambioUbicacion(){
    this.storage.get('ubicacion_seleccion').then(ubi =>{
      this.storage.get('ubicacion').then(r =>{
        if(r == ubi){
          this.storage.get('mi_seleccion').then(res =>{
         
              if(res !== null){
                console.log(res);
                this.seleccionVisible = true;
                this.num_bebidas = res.length;
                this.listaSeleccion=res;
              }else{
                
                this.seleccionVisible=false;
              }
          
          });
        }else{
          this.seleccionVisible=false;
          this.num_bebidas=0;
          this.storage.remove('mi_seleccion');
        }
      });
    });
  }

  introTour() {
    this.intro = introJs();
    this.intro .setOptions({
    nextLabel: ">>",
    prevLabel: "<<",
    doneLabel: "Aceptar",
    hidePrev: true,
    steps: [

      {
        element: '#step1',
        intro: "Puedes incluir bebidas de otras categorías en tu selección principal, tu selección no se perderá",
        position: 'bottom'
  
      }
    ]
    });
    this.intro.start();
  }
  
 deshabilitarback(){
  this.backButtonDisabled = true;
 }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
    this.intro.exit(true);
  }

regresar(){
   let backbutton = document.getElementById('volver') as HTMLIonBackButtonElement;
   backbutton.disabled = true;
}

getLongitudLatitud(){
    this.storage.get('longitud')
    .then((val) =>{

      this.longitud= val;
      
      this.storage.get('latitud')
      .then((val) =>{

        this.latitud = val;
        this.filtrosEnviar.lng = this.longitud;
        this.filtrosEnviar.lat = this.latitud;
        this.filtrosEnviar.km = this.km;
        this.cargarDatos();
       // this.limpiarFiltro();
      });
      
    });
}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Seleccionado',
      duration: 500,
      position: 'top',
      color: 'success',
     
    });
    toast.present();
  }


////////////////// MODAL FILTRAR ////////////////////////
  async Modalfiltrar()
  {
    const modal = await this.modalCtrl.create(
      {
     component: filtrarPage,
     componentProps: {
      'categoria': this.categoriaID,
      'parteSuperiorVisible': true,
      'parteSuperiorVisible2': false,
      'latitud':this.latitud,
      'longitud':this.longitud,
      'km':this.km,
      'filtroSubCategoria': this.filtroSubCategoria
    }
   });
    modal.onDidDismiss()
        .then((data) => {
            const filtros = data['data'];
            if(filtros == 0 || filtros == undefined || filtros == null){

            }else{

              this.filtro = filtros.filtro;
              this.rangoPrecio = filtros.rango;
              console.log(this.filtro);
              this.llenarFiltrosAenviar();
              this.llenarFiltrosAplicados();
              this.getBebidasFiltroCategorias(this.filtrosEnviar);

            }
            this.valueSegment = '';
    });
   return await modal.present();
}

llenarFiltrosAenviar(){
  this.filtrosEnviar.nombrebebida = this.filtro.nombrebebida;
  this.filtrosEnviar.marca = this.filtro.marca;
  this.filtrosEnviar.pack = this.filtro.pack;
  console.log(this.filtrosEnviar);
}

llenarFiltrosAenviarEst(filtro){
  this.filtrosEnviar.establecimiento = filtro.establecimiento;
  console.log(this.filtrosEnviar);
}

llenarFiltrosAenviarSubCat(filtro){
  this.marcasSeleccionadas = [];
  this.packsSeleccionados = [];
  this.filtrosEnviar.pack = " ";
  this.filtrosEnviar.marca = " ";
  this.storage.remove('filtrollenado');
  
  this.filtrosEnviar.subCategoria = filtro.subcategoria;
  console.log(this.filtrosEnviar);
}

llenarSubCategoriasSeleccionadas(){
  this.subCategoriasSeleccionadas = [];
  this.storage.get('subcategoria').then((val) =>{
       let subcategoria = val;
       this.subCategoriasSeleccionadas.push({filtroid: subcategoria.idsubcategoria, nombrefiltro: subcategoria.nombre})
  });
}

llenarFiltrosAplicados(){

  this.filtrosSeleccionados = [];
  this.rangosSeleccionados = [];
  this.marcasSeleccionadas = [];
  this.packsSeleccionados = [];
  this.radiosSeleccionados = [];
  let filtrosAplicados:any;
  this.storage.get('filtrollenado').then((val) =>{
       filtrosAplicados = val;
       console.log(filtrosAplicados.marcas);
       console.log(filtrosAplicados.packs);

       for(let marcas of filtrosAplicados.marcas){
          
        if(marcas.isChecked == true){

           this.marcasSeleccionadas.push({filtroid: marcas.idmarca, nombrefiltro: marcas.nombremarca});
        }
       }

       for(let packs of filtrosAplicados.packs){
         if(packs.isChecked == true){
          this.packsSeleccionados.push({filtroid: packs.numeropack, nombrefiltro: packs.numeropack});
         }
         
       }

       let rangos = filtrosAplicados.rangos;
       
       if(rangos.rango1 == true) this.rangosSeleccionados.push({filtroid: rangos.rango1, nombrefiltro: 'Hasta S/50'});
       if(rangos.rango2 == true) this.rangosSeleccionados.push({filtroid: rangos.rango2, nombrefiltro: 'S/50 - S/250'});
       if(rangos.rango3 == true) this.rangosSeleccionados.push({filtroid: rangos.rango3, nombrefiltro: 'S/250 - S/500'});
       if(rangos.rango4 == true) this.rangosSeleccionados.push({filtroid: rangos.rango4, nombrefiltro: 'S/500 - S/1000'});
       if(rangos.rango5 == true) this.rangosSeleccionados.push({filtroid: rangos.rango5, nombrefiltro: 'S/1000 a mas'});

       if(filtrosAplicados.radio == 'comprar') this.radiosSeleccionados.push({filtroid: 3, nombrefiltro: 'Puedo Comprar'})
  });

}

llenarEstablecimientosSeleccionados(){
  this.establecimientosSeleccionados = [];
  this.storage.get('filtrollenadoEstablecimientos')
  .then((valor) =>{

    let filtrollenado = valor;

    if(filtrollenado.listaBodegas != null){
       
      for(let bodegas of filtrollenado.listaBodegas){

        if(bodegas.isChecked == true) this.establecimientosSeleccionados.push({filtroid: bodegas.idsociocomercial, nombrefiltro: bodegas.nombrecomercial});
      }
    }

    if(filtrollenado.listaSupermercados != null){
       
      for(let supermercado of filtrollenado.listaSupermercados){

        if(supermercado.isChecked == true)  this.establecimientosSeleccionados.push({filtroid: supermercado.idsociocomercial, nombrefiltro: supermercado.nombrecomercial});
      }
    }

    if(filtrollenado.listaLicorerias != null){
       
      for(let licoreria of filtrollenado.listaLicorerias){

        if(licoreria.isChecked == true)    this.establecimientosSeleccionados.push({filtroid: licoreria.idsociocomercial, nombrefiltro: licoreria.nombrecomercial});
      }
    }

    if(filtrollenado.listaOnline != null){
       
      for(let online of filtrollenado.listaOnline){

        if(online.isChecked == true)  this.establecimientosSeleccionados.push({filtroid: online.idsociocomercial, nombrefiltro: online.nombrecomercial});
      }
    }

  });
}

//////////////////// MODAL FILTRAR SUBCATEGORIAS ////////////////////
async ModalfiltrarCategorias()
  {
    const modal = await this.modalCtrl.create(
      {
     component: filtrarCategoriasPage,
     componentProps: {
      'categoria': this.categoriaID
    }
   });
    modal.onDidDismiss()
        .then((data) => {
            const subcategoria = data['data'];
            if(subcategoria == 0 || subcategoria == undefined || subcategoria == null){

            }else{

              console.log(subcategoria);
              this.filtroSubCategoria = subcategoria;
              this.llenarSubCategoriasSeleccionadas();
              this.llenarFiltrosAenviarSubCat(subcategoria);
              this.getBebidasFiltroCategorias(this.filtrosEnviar);
              //this.CategoriasFiltro(subcategoria);
              //this.restablecerListaPorCategoria(this.bebidasListaSecundaria);

            }
            this.valueSegment = '';

    });
   return await modal.present();
}

//////////////// FILTRAR ESTABLECIMIENTOS //////////////////
async ModalfiltrarEstablecimientos()
  {
    const modal = await this.modalCtrl.create(
      {
     component: filtrarEstablecimientosPage,
     componentProps: {
      'categoria': this.categoriaID,
      'km': this.km,
      'estadosocio': this.filtrosEnviar.tipoCompra
    }
   });
    modal.onDidDismiss()
        .then((data) => {
            const filtro = data['data'];
            if(filtro == 0 || filtro == undefined || filtro == null){

            }else{

              console.log(filtro);
              this.llenarFiltrosAenviarEst(filtro);
              this.llenarEstablecimientosSeleccionados();
              this.getBebidasFiltroCategorias(this.filtrosEnviar);
             // this.getBebidasFiltroCategorias(filtro);
             
            }
    });
   return await modal.present();
}

/////////////// MODAL SELECCIONAR ////////////////
async ModalSeleccionar()
  {
    const modal = await this.modalCtrl.create(
      {
     component: ModalSeleccionarPage,
     cssClass: 'small-modal',
     componentProps: {
      'listaSeleccion': this.listaSeleccion,
      'listaNoSeleccion': this.bebidas,
      'longitud':this.longitud,
      'latitud':this.latitud,
      'estadoSocio':this.filtrosEnviar.tipoCompra,
      'km': this.km,
      'regalo':0
    }
   });
    modal.onDidDismiss()
        .then((data) => {
            const retorno = data['data'];
            console.log(retorno);

            this.storage.get('numerobebidas')
            .then((val) =>{
      
              this.num_bebidas = val;

              if(this.num_bebidas == 0){
                this.seleccionVisible = false;
              }
              
            });
            this.storage.get('listaseleccion')
            .then((val)=> {
                 this.listaSeleccion = val;
                 console.log(val);
                 this.verificarPrueba();
                 this.guardarSeleccion();
            });
    });
   return await modal.present();
}


ionChangeSegment(): void{
       
    let opcion: String = this.valueSegment;
    if(opcion == "Categorias"){
        this.radio = false;
        this.ModalfiltrarCategorias();
    }else{
      if(opcion == "Ordenar"){
        this.radio = true;
      }else{
        if(opcion == "Filtrar"){

          this.radio = false;
          this.Modalfiltrar();
        }
      }
    }

  }

  Ordenar(event){
    let opcion = event.detail;
     this.activarScroll();
     if(opcion.value == "1"){
      this.radiobuttonOrdenPrecio = true;
      this.radiobuttonOrdenDistancia = false;
      this.radiobuttonOrdenRecomendados = false;
      this.order_price();

    }else{
      if(opcion.value == "2"){
        this.radiobuttonOrdenDistancia = true;
        this.radiobuttonOrdenPrecio = false;
        this.radiobuttonOrdenRecomendados = false;
        this.order_distancia();

      }else{
        if(opcion.value == "3"){
          this.radiobuttonOrdenDistancia = false;
          this.radiobuttonOrdenRecomendados = true;
          this.radiobuttonOrdenPrecio = false;
          this.order_recomendados();

        }
      }
    }
}

filtrarEstablecimiento(){
    this.ModalfiltrarEstablecimientos();
}

getBebidasFiltroCategorias(val){
  this.bebidas = [];
  this.bebidasLista = [];
  this.Skeleton = true;
  this.cantidadLabel = false;
  this.scrollActivo = false;
  this.seleccionActiva = true;
  this.apiService.getBebidasConFiltroCategoria(val)
  .then(data => {

      this.bebidasLista = [];
      this.cantidadLabel = true;
      this.Skeleton = false;
      this.scrollActivo = true;
      this.chipPropagacion = true;
      this.filtroVisible = true;
      this.seleccionActiva = false;
      this.botonSoloComprar = false;

      if(data != null || data != undefined){
        this.bebidas = data;
        this.bebidas = this.insertSeleccion(this.bebidas);
        this.verificarSeleccionador();
        this.restablecerMinMax();
        this.activarScroll();

        if(this.bebidas.length == 0){
          this.cantidadMax = 0;
          this.cantidadEncontrada = 0;
          this.filtroVisible = false;
          
        }else{
          
          this.cantidadEncontrada = this.bebidas.length;
          if(this.bebidas.length < 5){
            this.cantidadMax = this.bebidas.length;
          }

          for (let i = this.cantidadMin; i < this.cantidadMax; i++) {
            this.bebidasLista.push(this.bebidas[i]);
          }
          this.filtros();
        }
  

        
      }else{
        this.cantidadMax = 0;
        this.cantidadEncontrada = 0;
      }

  })
  .catch(error =>{
    console.log(error);
});
}

cargarDatos(){
  switch(this.categoria){
    case 'Cervezas':
      this.categoriaID = 1;
      this.imagenCategoria = 'https://firebasestorage.googleapis.com/v0/b/bubeapp.appspot.com/o/Im%C3%A1genes%20Categor%C3%ADas%2FCervezas_AppBUBE.png?alt=media&token=17eb80e0-1777-423d-9e2b-2d1a6f36b51a';
      this.filtrosEnviar.nombrebebida = this.categoriaID;
      this.getBebidasFiltroCategorias(this.filtrosEnviar);
      break;
    case 'Vinos':
      this.categoriaID = 2;
      this.imagenCategoria = 'https://firebasestorage.googleapis.com/v0/b/bubeapp.appspot.com/o/Im%C3%A1genes%20Categor%C3%ADas%2FVino_AppBUBE.png?alt=media&token=f2e8c7bc-61bd-4144-9c32-618b4fb46372'
      this.filtrosEnviar.nombrebebida = this.categoriaID;
      this.getBebidasFiltroCategorias(this.filtrosEnviar);
      break;
    case 'Espumantes':
      this.categoriaID = 3;
      this.imagenCategoria = 'https://firebasestorage.googleapis.com/v0/b/bubeapp.appspot.com/o/Im%C3%A1genes%20Categor%C3%ADas%2FEspumantes_AppBUBE.png?alt=media&token=9bc26baf-14f5-444a-b807-092f76f57304'
      this.filtrosEnviar.nombrebebida = this.categoriaID;
      this.getBebidasFiltroCategorias(this.filtrosEnviar);
      break;
    case 'Licores':
      this.categoriaID = 4;
      this.imagenCategoria = 'https://firebasestorage.googleapis.com/v0/b/bubeapp.appspot.com/o/Im%C3%A1genes%20Categor%C3%ADas%2FLicores_AppBUBE.png?alt=media&token=cd54f3f8-4aad-4ddb-a461-fd88b4b75674'
      this.filtrosEnviar.nombrebebida = this.categoriaID;
      this.getBebidasFiltroCategorias(this.filtrosEnviar);
      break;
    default:
       console.log("ERROR EN CARGAR DATOS BUSQUEDA CATEGORIA");
      break;
  }
}


filtros(){

    this.RangoPreciosFiltro();

    if(this.radiobuttonOrdenPrecio == true){
      this.order_price();

    }
    if(this.radiobuttonOrdenDistancia == true){
      this.order_distancia();

    }
    if(this.radiobuttonOrdenRecomendados == true){
      this.order_recomendados();

    }

    console.log(this.filtrosSeleccionados);
}

//// ORDENANDO DE MENOR A MAYOR
order_price(){
  this.bebidas.sort((a, b) => Number(a.preciobebidasocio) - Number(b.preciobebidasocio));
 
  this.restablecerMinMax();
  this.bebidasLista = [];

  if(this.bebidas.length < 5){
    this.cantidadMax = this.bebidas.length;
  }
  for (let i = this.cantidadMin; i < this.cantidadMax; i++) {
    this.bebidasLista.push(this.bebidas[i]);
  }

    let index = this.filtrosSeleccionados.map( item => item.filtroid ).indexOf(1)
    if(index > -1){
      this.filtrosSeleccionados.splice(index,1);
    }
    this.filtrosSeleccionados.push({filtroid: 1, nombrefiltro: 'Menor precio'});

}

order_distancia(){
  this.bebidas.sort((a, b) => Number(a.distancia) - Number(b.distancia));
 
  this.restablecerMinMax();
  this.bebidasLista = [];

  if(this.bebidas.length < 5){
    this.cantidadMax = this.bebidas.length;
  }
  for (let i = this.cantidadMin; i < this.cantidadMax; i++) {
    this.bebidasLista.push(this.bebidas[i]);
  }

    let index = this.filtrosSeleccionados.map( item => item.filtroid ).indexOf(1)
    if(index > -1){
      this.filtrosSeleccionados.splice(index,1);
    }
    this.filtrosSeleccionados.push({filtroid: 1, nombrefiltro: 'Menor distancia'});
}

order_recomendados(){

  this.bebidas.sort((a, b) => Number(b.valoracion) - Number(a.valoracion));
   
  this.restablecerMinMax();
  this.bebidasLista = [];

  if(this.bebidas.length < 5){
    this.cantidadMax = this.bebidas.length;
  }
  for (let i = this.cantidadMin; i < this.cantidadMax; i++) {
    this.bebidasLista.push(this.bebidas[i]);
  }

    let index = this.filtrosSeleccionados.map( item => item.filtroid ).indexOf(1)
    if(index > -1){
      this.filtrosSeleccionados.splice(index,1);
    }
    this.filtrosSeleccionados.push({filtroid: 1, nombrefiltro: 'Recomendados'});

}

restablecerMinMax(){
  this.cantidadMin = 0;
  this.cantidadMax = 5;
}

CategoriasFiltro(val){
  this.bebidasListaSecundaria = this.bebidas.filter((bebida) => {
    return bebida.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1;
  });
}

RangoPreciosFiltro(){
  if(this.rangoPrecio > 0){

    let minimo: number;
    let maximo: number;

    switch(this.rangoPrecio){

      case 1:
          minimo = 0;
          maximo = 50;
        break;
      case 2: 
          minimo = 50;
          maximo = 250;
        break;
      case 3: 
          minimo = 250;
          maximo = 500;
        break;
      case 4: 
          minimo = 500;
          maximo = 1000;
        break;
      case 5: 
          minimo = 1000;
          maximo = 99999;
        break;
    }
    var filteredData = [];
    for (var i = 0; i < this.bebidas.length; i++){
      let bebida = this.bebidas[i];
      if(bebida.preciobebidasocio >= minimo && bebida.preciobebidasocio <= maximo){
        filteredData.push(bebida);
      }
    }
    this.bebidas = filteredData;
    this.cantidadEncontrada = this.bebidas.length;
    this.restablecerMinMax();
    this.bebidasLista = [];

    if(this.bebidas.length < 5){
      this.cantidadMax = this.bebidas.length;
    }
    for (let i = this.cantidadMin; i < this.cantidadMax; i++) {
      this.bebidasLista.push(this.bebidas[i]);
    }
  }
  
}

loadData(event) {
  setTimeout(() => {

    console.log('Done');

    let numeroMaximo = this.bebidas.length - this.bebidasLista.length;

    if(numeroMaximo < 5 && numeroMaximo > -1){

      this.cantidadMin = this.cantidadMax;
      this.cantidadMax = this.cantidadMax + numeroMaximo;
    }else{

      this.cantidadMin = this.cantidadMax;
      this.cantidadMax = this.cantidadMax+5;
    }

    for (let i = this.cantidadMin; i < this.cantidadMax; i++) {
      this.bebidasLista.push(this.bebidas[i]);
    }

    this.scrollValue = event;
    this.scrollValue.target.complete();

    let numero = this.bebidas.length;

    if (this.bebidasLista.length == numero) {
      this.scrollValue.target.disabled = true;
      this.scrollBoolean = false;

    }

    
  }, 500);
}

activarScroll(){
  if(this.scrollBoolean == false){
    this.scrollValue.target.disabled = false;
  }
}

restablecerListaPorCategoria(bebidasListaSecundaria){
 
  this.restablecerMinMax();
  this.bebidasLista = [];

  this.cantidadEncontrada = bebidasListaSecundaria.length;

  if(this.bebidasListaSecundaria.length < 5){
    this.cantidadMax = bebidasListaSecundaria.length;
  }
  for (let i = this.cantidadMin; i < this.cantidadMax; i++) {
    this.bebidasLista.push(this.bebidasListaSecundaria[i]);
  }
}

  
irSeleccion(){
    this.ModalSeleccionar();
}

guardarSeleccion(){
  if(this.listaSeleccion.length > 0){
    this.storage.set('mi_seleccion',this.listaSeleccion);
    this.storage.get('ubicacion').then(res =>{
      this.storage.set('ubicacion_seleccion',res);
    });
  }else{
    this.storage.remove('mi_seleccion');
  }

 }

/// FILTROS SELECCIONADOS

agregarFiltroSeleccionado(item){
   this.filtrosSeleccionados.push(item);

}

removerFiltroSeleccionadosRadio(id: number): void {
  
  if(this.chipPropagacion == true){
     
    this.chipPropagacion = false;
    this.filtrosSeleccionados.splice(id, 1);
    this.radiobuttonOrdenPrecio = false;
    this.radiobuttonOrdenDistancia = false;
    this.radiobuttonOrdenRecomendados = false;
    this.radioDefault = "";
    console.log(this.filtrosEnviar);
    this.getBebidasFiltroCategorias(this.filtrosEnviar);

 }
  
}

removerFiltrosSeleccionadosMarcas(id:number,item):void{

  if(this.chipPropagacion == true){
     
    this.chipPropagacion = false;

    this.marcasSeleccionadas.splice(id,1);
  
    this.storage.get('filtrollenado')
    .then((val) =>{
  
      if(val != null){
  
        let filtrollenado = val;
        let marcas = filtrollenado.marcas;
         
        for(let marca of marcas){
          if(marca.idmarca == item.filtroid){
            marca.isChecked = false;
          }
        }
        filtrollenado.marcas = marcas;
        this.storage.set('filtrollenado',filtrollenado);
        
        let nuevoFiltro:String = this.filtrarbean.concatenarMarcas(marcas);
        this.filtrosEnviar.marca = String(nuevoFiltro);
        console.log(this.filtrosEnviar);
        this.getBebidasFiltroCategorias(this.filtrosEnviar);  
      }
    });

  }

}

removerFiltrosSeleccionadosPacks(id:number, item):void{

  if(this.chipPropagacion == true){
     
    this.chipPropagacion = false;

    this.packsSeleccionados.splice(id,1);

    this.storage.get('filtrollenado')
    .then((val) =>{
  
      if(val != null){
  
        let filtrollenado = val;
        let packs = filtrollenado.packs;
         
        for(let pack of packs){
          if(pack.numeropack == item.filtroid){
             pack.isChecked = false;
          }
        }
        filtrollenado.packs = packs;
        this.storage.set('filtrollenado',filtrollenado);
        
        let nuevoFiltro:String = this.filtrarbean.concatenarPacks(packs);
        this.filtrosEnviar.pack = String(nuevoFiltro);
        console.log(this.filtrosEnviar); 
        this.getBebidasFiltroCategorias(this.filtrosEnviar);
      }
    });

  }

}

removerFiltrosSeleccionadosEstablecimientos(id:number, item){

  if(this.chipPropagacion == true){
     
    this.chipPropagacion = false;
    this.establecimientosSeleccionados.splice(id,1);
    console.log(item);
    let establecimientosSeleccionados = [];
    this.storage.get('filtrollenadoEstablecimientos')
    .then((valor) =>{
  
      let filtrollenado = valor;
 
      if(filtrollenado.listaBodegas != null){
         
        let listaBodegas = filtrollenado.listaBodegas;
 
        for(let bodegas of listaBodegas){
  
          if(bodegas.idsociocomercial == item.filtroid) bodegas.isChecked = false;
          establecimientosSeleccionados.push(bodegas);
        }
 
        filtrollenado.listaBodegas = listaBodegas;
      }
  
      if(filtrollenado.listaSupermercados != null){
         
        let listaSupermercados = filtrollenado.listaSupermercados;
 
        for(let supermercado of listaSupermercados){
  
          if(supermercado.idsociocomercial == item.filtroid) supermercado.isChecked = false;
 
          establecimientosSeleccionados.push(supermercado);
        }
 
        filtrollenado.listaSupermercados = listaSupermercados;
      }
  
      if(filtrollenado.listaLicorerias != null){
         
        let listaLicorerias = filtrollenado.listaLicorerias;
 
        for(let licoreria of listaLicorerias){
  
          if(licoreria.idsociocomercial == item.filtroid) licoreria.isChecked = false;
          establecimientosSeleccionados.push(licoreria);
        }
 
        filtrollenado.listaLicorerias = listaLicorerias;
      }
  
      if(filtrollenado.listaOnline != null){
         
       let listaOnline = filtrollenado.listaOnline;
        for(let online of listaOnline){
 
          if(online.idsociocomercial == item.filtroid) online.isChecked = false;
          establecimientosSeleccionados.push(online);
        }
        filtrollenado.listaOnline = listaOnline;
      }
      
      this.storage.set('filtrollenadoEstablecimientos',filtrollenado);
      let nuevoFiltro = this.filtrarbean.concatenarEstablecimientos(establecimientosSeleccionados);
      this.filtrosEnviar.establecimiento = String(nuevoFiltro);
      console.log(this.filtrosEnviar);
      this.getBebidasFiltroCategorias(this.filtrosEnviar);
  
    });
  }

}

removerFiltrosSeleccionadosRadios(id:number,radio){

  if(this.chipPropagacion == true){
     
    this.chipPropagacion = false;

    this.radiosSeleccionados.splice(id,1);
   
    this.storage.get('filtrollenado')
    .then((val) =>{
  
      if(val != null){
  
        let filtrollenado = val;
        filtrollenado.radio = '';
        this.storage.set('filtrollenado',filtrollenado);
        this.filtrosEnviar.tipoCompra = 'AND SO.estadosocio IN(1,2)';
        this.filtrosEnviar.ind_delivery = 0;
        console.log(this.filtrosEnviar);
        this.getBebidasFiltroCategorias(this.filtrosEnviar);
 
      }
    });

  }

}

removerFiltrosSeleccionadosRangos(id:number){

  if(this.chipPropagacion == true){
     
    this.chipPropagacion = false;
    this.rangosSeleccionados.splice(id,1);
    this.rangoPrecio = 0;
  
    this.storage.get('filtrollenado')
    .then((val) =>{
   
      if(val != null){
   
        let filtrollenado = val;
   
        filtrollenado.rangos.rango1 = false;
        filtrollenado.rangos.rango2 = false;
        filtrollenado.rangos.rango3 = false;
        filtrollenado.rangos.rango4 = false;
        filtrollenado.rangos.rango5 = false;
   
       this.storage.set('filtrollenado',filtrollenado);
       console.log(this.filtrosEnviar);
       this.getBebidasFiltroCategorias(this.filtrosEnviar); 
      }
   
    });
  }

}

removerFiltrosSeleccionadosSubCategoria(id:number){

  if(this.chipPropagacion == true){
     
    this.chipPropagacion = false;
    this.filtroSubCategoria.subcategoria = " ";
    this.subCategoriasSeleccionadas.splice(id,1);
    this.filtrosEnviar.subCategoria = " ";
    this.filtrosEnviar.pack = " ";
    this.filtrosEnviar.marca = " ";
    this.marcasSeleccionadas = [];
    this.packsSeleccionados = [];
    this.storage.remove('filtrollenado');
    console.log(this.filtrosEnviar);
    this.getBebidasFiltroCategorias(this.filtrosEnviar);
  }

}
///////////////// SELECCIONAR ////////////////////

insertSeleccion(array){
  for(let item of array){
    item.esSeleccionado = false;
    item.esSeleccionadoInd = "Seleccionar";
  }
  return array;
}

seleccionarChangeText(bebida){
   console.log(bebida.esSeleccionado);
  if(bebida.esSeleccionado == true){
      
      if(this.listaSeleccion.find(item => item.idbebida === bebida.idbebida && item.idsociocomercial === bebida.idsociocomercial)){
       
           console.log("ENCONTRADO");

      }else{
        bebida.esSeleccionadoInd = "Seleccionado";
        bebida.cantidad = 1;
        this.listaSeleccion.push(bebida);
        this.num_bebidas = this.listaSeleccion.length;
        console.log(this.listaSeleccion);
      }


  }else{

      bebida.esSeleccionadoInd = "Seleccionar";

      let index = this.listaSeleccion.findIndex( item => item.idbebida === bebida.idbebida && item.idsociocomercial === bebida.idsociocomercial )
      this.listaSeleccion.splice(index,1);
      this.num_bebidas = this.listaSeleccion.length;
      console.log(this.listaSeleccion);
  }

  if(this.listaSeleccion.length > 0){
      this.seleccionVisible = true;
  }else{
     this.seleccionVisible = false;
  }

  this.guardarSeleccion();
}

verificarSeleccionador(){

  if(this.listaSeleccion.length > 0){
    for(let bebida of this.bebidas){

      for(let bebidaSel of this.listaSeleccion){

          if(bebida.idbebida == bebidaSel.idbebida && bebida.idsociocomercial == bebidaSel.idsociocomercial){

            bebida.esSeleccionado = true;
            bebida.esSeleccionadoInd = "Seleccionado";
      
          }
      }
    }
  }
}

verificarPrueba(){

  if(this.bebidasLista.length > 0){

    for(let seleccion of this.bebidasLista){
      seleccion.esSeleccionado = false;
      seleccion.esSeleccionadoInd = 'Seleccionar';
    }     

   if(this.listaSeleccion.length > 0){
     
    for(let seleccion of this.listaSeleccion){
      
      if(this.bebidasLista.find(item => item.idbebida === seleccion.idbebida && item.idsociocomercial === seleccion.idsociocomercial)){

       let item = this.bebidasLista.find(item => item.idbebida === seleccion.idbebida && item.idsociocomercial === seleccion.idsociocomercial);
       item.esSeleccionado = true;
       item.esSeleccionadoInd = 'Seleccionado';
       console.log(item);

      }
   }
   }

  }
}
SoloComprar(){
  console.log(this.indSoloComprar)
  this.botonSoloComprar = true;
  if(this.indSoloComprar){
      this.filtrosEnviar.ind_delivery = 1;
      this.filtrosEnviar.tipoCompra = 'AND SO.estadosocio = 1';
  }else{
    this.filtrosEnviar.tipoCompra = 'AND SO.estadosocio IN(1,2)';
    this.filtrosEnviar.ind_delivery = 0;
  }
  this.getBebidasFiltroCategorias(this.filtrosEnviar);
}

 //GoogleAnalytics
 googleAnalytics(){
  this.firebaseAnalytics.logEvent('PantallaCategorias',{categorias:this.categoria})
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