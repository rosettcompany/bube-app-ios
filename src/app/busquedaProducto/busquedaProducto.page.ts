import { Component,ViewChild} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { MenuController, ModalController, LoadingController } from '@ionic/angular';
import { IonInfiniteScroll,ToastController, NavController } from '@ionic/angular';
import {ApiServiceService} from '../api-service.service';
import { filtrarCategoriasPage } from './filtrarCategorias/filtrarCategorias.page';
import { filtrarEstablecimientosPage} from './filtrarEstablecimientos/filtrarEstablecimientos.page';
import { filtrarPage} from './filtrar/filtrar.page';
import { ModalSeleccionarPage} from './../modalSeleccionar/modalSeleccionar.page';
import { Storage } from '@ionic/storage';
import {filtrarBean} from './../busquedaProducto/filtrosBean/filtrosBean.component';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

@Component({
  selector: 'app-inicio',
  templateUrl: './busquedaProducto.page.html',
  styleUrls: [
    './styles/busquedaProducto.page.scss',
    './styles/busquedaProducto.shell.scss',
    './styles/busquedaProducto.responsive.scss'
  ]
})
export class busquedaProductoPage{
  bebida_a_buscar:any;
  regalo;
  amigo;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(public menu: MenuController, 
              public router: Router,
              public toastController: ToastController,
              public apiService:ApiServiceService,
              private firebaseAnalytics: FirebaseAnalytics,
              private navCtrl: NavController,
              public filtrarbean: filtrarBean,
              public route: ActivatedRoute,
              public loadingController: LoadingController,
              public storage: Storage,
              private modalCtrl:ModalController
              ) {  
                

                // RECIBIENDO PARAMETROS DESDE LA PAGINA FILTROS
                 this.route.queryParams.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.km = this.router.getCurrentNavigation().extras.state.km;
                    this.bebida_a_buscar = this.router.getCurrentNavigation().extras.state.bebida;   
                    this.regalo = this.router.getCurrentNavigation().extras.state.regalo;                            
                    this.amigo = this.router.getCurrentNavigation().extras.state.amigo; 

                    this.storage.set('amigo',this.amigo);
                  } 
                });
            }


  @ViewChild('search') search : any;
  //// VARIABLES DE RECEPCION

  km:number;
  /////////////////

  filtro:any;
  rangoPrecio:number = 0;
  inputSearchbar:any;

  radio =false;
  filtroVisible = false;

  valueSegment = '';
  radioDefault = "";
  bebidas:any;
  bebidasLista = [];
  bebidasListaSecundaria: any;

  cantidadMin = 0;
  cantidadMax = 5;

  scrollValue: any;
  scrollBoolean = true;

  radiobuttonOrdenPrecio = false;
  radiobuttonOrdenDistancia = false;
  radiobuttonOrdenRecomendados = false;

  cantidadEncontrada = 0;
  cantidadLabel = false;

  ///FONDO ///
  fondoVisible = true;
  Skeleton = false;
  skeletonList = [1,2,3,4];
    // SCROOLL
    scrollActivo = false;
  ///// FOOTER DE SELECCION VISIBLE
  seleccionVisible = false;
  listaSeleccion = [];
  num_bebidas = 0;

  

 //// LONGITUD LATITUD
  longitud;
  latitud;
///// LOADING
  loading:any;

  mi_seleccion;

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
    filtrosEnviar = {nombrebebida: '', establecimiento: ' ', tipoCompra: 'AND SO.estadosocio IN(1,2)', marca: ' ', pack: ' ', subCategoria: '', lat: 0, lng:0, km: 0,ind_delivery: 0};

  /// BOTONES ANTIPROPAGACION
  chipPropagacion = true;

// Disable side menu for this page

ionViewWillEnter(){
  this.menu.enable(false);
  this.getLongitudLatitud();

  if(this.bebida_a_buscar != null){
    let search = document.getElementById('buscarBebida') as HTMLIonSearchbarElement;
    this.fondoVisible = false;
    this.presentLoadingBuscando();
    search.value= this.bebida_a_buscar;

  }else{
    this.focusSearchBar();
  }

  this.obtenerMiSeleccion();
}

obtenerMiSeleccion(){
  this.storage.get('ubicacion_seleccion').then(res =>{
    this.storage.get('ubicacion').then(r =>{
      if(r == res){
        this.storage.get('mi_seleccion').then(res =>{
      
            if(res != null){

              console.log(res);
              this.mi_seleccion=res;
              this.num_bebidas = this.mi_seleccion.length;
              this.seleccionVisible = true;
              this.listaSeleccion = this.mi_seleccion;
              
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

ionViewDidEnter(): void {
  this.menu.enable(false);
  this.googleAnalytics();
}

  ///// LIMPIAR FILTROS
  limpiarFiltro(){
    this.filtrosSeleccionados = [];
    this.radiobuttonOrdenPrecio = false;
    this.radiobuttonOrdenDistancia = false;
    this.radiobuttonOrdenRecomendados = false;
    this.radioDefault = "";
    this.rangosSeleccionados = [];
    this.marcasSeleccionadas = [];
    this.packsSeleccionados = [];
    this.radiosSeleccionados = [];
    this.establecimientosSeleccionados = [];
    this.storage.remove('filtrollenado');
    this.storage.remove('filtrollenadoEstablecimientos');
   } 

focusSearchBar(): void {
  setTimeout(() => {
    this.search.setFocus();
  }, 100);
}

regresar(){
  let backbutton = document.getElementById('volver') as HTMLIonBackButtonElement;
  backbutton.disabled = true;
 }

async presentLoadingBuscando() {
  this.loading = await this.loadingController.create({
    message: 'Buscando Bebida'
  });
  await this.loading.present();
}


getLongitudLatitud(){

    this.storage.get('longitud')
    .then((val) =>{

      this.longitud= parseFloat(val);
      this.storage.get('latitud')
      .then((val) =>{

        this.latitud = parseFloat(val);
        this.filtrosEnviar.km = this.km;
        this.filtrosEnviar.lng = this.longitud;
        this.filtrosEnviar.lat = this.latitud;

      });
      
    });
}

ngOnInit(){
  this.storage.remove('filtrollenado');
  this.storage.remove('listaseleccion');
  this.storage.remove('filtrollenadoEstablecimientos');
}

  // Restore to default when leaving this page
ionViewDidLeave(): void {
    this.menu.enable(true);
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

/////////////// MODAL FILTRAR  ////////////////

  async Modalfiltrar()
  {
    const modal = await this.modalCtrl.create(
      {
     component: filtrarPage,
     componentProps: {
      'input': this.inputSearchbar,
      'parteSuperiorVisible': true,
      'latitud':this.latitud,
      'longitud':this.longitud,
      'km':this.km,
      'parteSuperiorVisible2': false,
      'filtroSubCategoria': this.filtroSubCategoria
    }
   });
    modal.onDidDismiss()
        .then((data) => {
            const filtros = data['data'];
            console.log(filtros);
            if(filtros == 0 || filtros == undefined || filtros == null){

            }else{

              this.filtro = filtros.filtro;
              this.rangoPrecio = filtros.rango;
              this.bebida_a_buscar = filtros.bebida;
              console.log(this.filtro);
              this.llenarFiltrosAenviar();
              this.llenarFiltrosAplicados();
              this.getBebidasFiltro(this.filtrosEnviar);

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

      console.log(filtrollenado);
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

/////////////// MODAL FILTRAR  POR CATEGORIAS ////////////////
async ModalfiltrarCategorias()
  {
    const modal = await this.modalCtrl.create(
      {
     component: filtrarCategoriasPage,
     componentProps: {
      'input': this.inputSearchbar
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
              this.getBebidasFiltro(this.filtrosEnviar);

            }
            this.valueSegment = '';

    });
   return await modal.present();
}

/////////////// MODAL FILTRAR  POR ESTABLECIMIENTOS ////////////////
async ModalfiltrarEstablecimientos()
  {
    const modal = await this.modalCtrl.create(
      {
     component: filtrarEstablecimientosPage,
     componentProps: {
      'input': this.inputSearchbar,
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
              this.getBebidasFiltro(this.filtrosEnviar);
              
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
      'regalo':this.regalo

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

              this.storage.get('listaseleccion')
              .then((val)=> {
                   this.listaSeleccion = val;
                   console.log(val);
                   this.verificarPrueba();
                   this.guardarSeleccion();
              });

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

filtrarEstablecimiento(){

    this.ModalfiltrarEstablecimientos();
}

/////////////// CARGAR MAS DATOS ////////////////
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

getBebidas(val){
    this.apiService.getBebidasPrincipal(val)
    .then(
      (data) => { // Success
        
        // SPINNER
        if(this.bebida_a_buscar != null){
          this.loading.dismiss();
          this.bebida_a_buscar = null;
        }

        ///////
        this.scrollActivo = true;
        this.Skeleton = false;
        this.bebidasLista = [];
        this.cantidadLabel = true;
        this.filtroVisible = true;
        console.log(data);
       
        if(data != null || data != undefined){
          this.bebidas = data;
          this.bebidas = this.insertSeleccion(this.bebidas);
          this.verificarSeleccionador();
          if(this.bebidas.length == 0){
            this.cantidadMax = 0;
            this.cantidadEncontrada = 0;
            this.filtroVisible = false;
  
          }else{
  
            console.log(this.bebidas);
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
          this.filtroVisible = false;
        }
 




     })
     .catch(error =>{
        console.log(error);
    });
  }

getBebidasFiltro(val){
  this.bebidas = [];
  this.bebidasLista = [];
  this.Skeleton = true;
  this.cantidadLabel = false;
  this.scrollActivo = false;

    this.apiService.getBebidasConFiltro(val)
    .then(data => {
        this.scrollActivo = true;
        this.bebidasLista = [];
        this.cantidadLabel = true;
        this.Skeleton = false;
        this.chipPropagacion = true;
        this.botonSoloComprar = false;
         console.log(data);
        if(data != null){
          this.bebidas = data;
          this.bebidas = this.insertSeleccion(this.bebidas);
          this.verificarSeleccionador();
          this.restablecerMinMax();
          this.activarScroll();
          if(this.bebidas.length == 0){
            this.cantidadMax = 0;
            this.cantidadEncontrada = 0;
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

getItems(ev: any) {
    const val = ev.target.value;
    this.activarScroll();
    if (val && val.trim() !== '') {
         this.fondoVisible = false;
         this.radio = false;
         this.valueSegment = '';
         this.Skeleton = true;
         this.restablecerMinMax();
         let envio = {nombrebebida:val,lat: this.latitud, lng: this.longitud, km: this.km}
         this.getBebidas(envio);
         this.filtrosEnviar = {nombrebebida: val, establecimiento: ' ', tipoCompra: 'AND SO.estadosocio IN(1,2)', marca: ' ', pack: ' ', subCategoria: '', lat: this.latitud, lng: this.longitud, km: this.km,ind_delivery: 0};
         this.inputSearchbar = val;
         this.limpiarFiltro();       
     } else {
        this.restablecerMinMax();
     }
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
    
}

activarScroll(){
    if(this.scrollBoolean == false){
      this.scrollValue.target.disabled = false;
    }
}

restablecerMinMax(){
    this.cantidadMin = 0;
    this.cantidadMax = 5;
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
    this.getBebidasFiltro(this.filtrosEnviar);
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
        this.getBebidasFiltro(this.filtrosEnviar);  
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
        this.getBebidasFiltro(this.filtrosEnviar); 
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
      this.getBebidasFiltro(this.filtrosEnviar);
  
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
       this.getBebidasFiltro(this.filtrosEnviar); 
      }
   
    });

  }

}

removerFiltrosSeleccionadosSubCategoria(id:number){

  if(this.chipPropagacion == true){
     
    this.filtroSubCategoria.subcategoria = " ";
    this.chipPropagacion = false;
    this.subCategoriasSeleccionadas.splice(id,1);
    this.filtrosEnviar.subCategoria = " ";
    this.filtrosEnviar.pack = " ";
    this.filtrosEnviar.marca = " ";
    this.marcasSeleccionadas = [];
    this.packsSeleccionados = [];
    this.storage.remove('filtrollenado');
    console.log(this.filtrosEnviar);
    this.getBebidasFiltro(this.filtrosEnviar);
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
        this.getBebidasFiltro(this.filtrosEnviar);
  
      }
    });
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

  if(this.listaSeleccion.length > 0 && this.bebidas.length > 0){
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
  this.getBebidasFiltro(this.filtrosEnviar);
}

 // googleAnalytics
 googleAnalytics(){
  this.firebaseAnalytics.logEvent('pantalla',{pantalla:"busquedaPrincipal"})
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