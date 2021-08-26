import { Component, AfterViewInit, ViewChild, HostBinding, OnInit } from '@angular/core';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';
import { MenuController,ModalController,ToastController, NavController } from '@ionic/angular';
import {ApiServiceService} from '../api-service.service';
import { filtrarPage } from '../busquedaProducto/filtrar/filtrar.page';
import { filtrarCategoriasPage } from '../busquedaProducto/filtrarCategorias/filtrarCategorias.page';
import { ModalSeleccionarPage} from './../modalSeleccionar/modalSeleccionar.page';
import { Storage } from '@ionic/storage';
import {filtrarBean} from './../busquedaProducto/filtrosBean/filtrosBean.component';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

@Component({
  selector: 'app-inicio',
  templateUrl: './busquedaEstablecimiento.page.html',
  styleUrls: [
    './styles/busquedaEstablecimiento.page.scss',
    './styles/busquedaEstablecimiento.shell.scss',
    './styles/busquedaEstablecimiento.responsive.scss'
  ]
})
export class busquedaEstablecimientoPage{
regalo;
  constructor(public menu: MenuController,
              public router: Router,
              public route: ActivatedRoute,
              public filtrarbean: filtrarBean,
              public storage: Storage,
              private firebaseAnalytics: FirebaseAnalytics,
              private navCtrl: NavController,
              public toastController: ToastController,
              public apiService:ApiServiceService,
              private modalCtrl:ModalController) {

              this.route.queryParams.subscribe(params => {
              if (this.router.getCurrentNavigation().extras.state) {
                this.establecimiento = this.router.getCurrentNavigation().extras.state.ind;
                this.establecimientoID = this.establecimiento.idsociocomercial;
                this.km = this.router.getCurrentNavigation().extras.state.km;
                this.primeroPromociones = this.router.getCurrentNavigation().extras.state.promocion;
                this.regalo = this.router.getCurrentNavigation().extras.state.regalo;
                console.log(this.regalo);
              }});
   }

    //// VARIABLES DE RECEPCION
    km:number;
    /////////////////


  filtro:any;   
  rangoPrecio:number = 0;
  promociones = false;
  primeroPromociones;
  radio = false;
  valueSegment = '';
  radioDefault = "";
  categoria = '';
  establecimientoID:number = 0;
  establecimiento:any;

  bebidas:any;
  bebidasListaGeneral:any;
  indicadorBebidasListaGeneral = false;
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

  searchQuery = '';

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

   listaTemporal:any;

  //////// ESTRELLAS PUNTUACION

  estrellasCantidad:number;

    /// FILTROS SELECCIONADOS

  /// BOTONES ANTIPROPAGACION
  chipPropagacion = true;

    filtrosSeleccionados = [];
    marcasSeleccionadas = [];
    packsSeleccionados = [];
    rangosSeleccionados = [];
    subCategoriasSeleccionadas = [];
    establecimientosSeleccionados = [];
    radiosSeleccionados = [];

    filtroSubCategoria = {"subcategoria": " "};
  
  
    ///// FILTROS A ENVIAR
filtrosEnviar = {nombrebebida: 0, establecimiento: ' ', tipoCompra: ' ', marca: ' ', pack: ' ', subCategoria: ''};

ionViewWillEnter():void {
 this.menu.enable(false);
}
cargarMiSeleccion(){
  this.storage.get('ubicacion_seleccion').then(ubi =>{
    this.storage.get('ubicacion').then(r =>{
      if(r == ubi){
        this.storage.get('mi_seleccion').then(res =>{

            if(res !== null){
              console.log(res);
              this.seleccionVisible = true;
              this.num_bebidas = res.length;
              this.listaSeleccion=res;
              this.cargarDatos();
            }else{
              this.cargarDatos();
              this.seleccionVisible=false;
            }
        });
      }else{
        this.cargarDatos();
        this.seleccionVisible=false;
        this.num_bebidas=0;
        this.storage.remove('mi_seleccion');
      }
    });
  });
}

ngOnInit(){
  this.storage.remove('filtrollenado');
  this.storage.remove('listaseleccion');
  this.storage.remove('filtrollenadoEstablecimientos');
  this.seleccionActiva = true;
  this.cargarMiSeleccion();
}

  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.googleAnalytics();
  }

 cargarEstrellas(){
  
  if(this.estrellasCantidad ==null){

    var node = document.getElementById("puntuacion");

    let puntos:number;

    if(this.bebidas[0].valoracion == null)
      puntos = 0;
    else
      puntos = this.bebidas[0].valoracion;
    
    let puntosrecorrigo = puntos;
    this.estrellasCantidad = puntos;
    for(let i = 0; i<puntos; i++){
      
      if(puntosrecorrigo >= 1)
      node.innerHTML += '<ion-icon style="color: #ffc30b;"  name="star"></ion-icon>'
      else
      node.innerHTML += '<ion-icon style="color: #ffc30b;"  name="star-half"></ion-icon>'
      
      puntosrecorrigo --;
    }
   }
  }



 regresar(){
  let backbutton = document.getElementById('volver') as HTMLIonBackButtonElement;
  backbutton.disabled = true;
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
//////////////////// MODAL FILTRAR ///////////////////
  async Modalfiltrar()
  {
    const modal = await this.modalCtrl.create(
      {
     component: filtrarPage,
     componentProps: {
      'establecimiento': this.establecimientoID,
      'parteSuperiorVisible': false,
      'parteSuperiorVisible2': true,
      'filtroSubCategoria': this.filtroSubCategoria
    }
   });
    modal.onDidDismiss()
        .then((data) => {
            const filtros = data['data'];
            if(filtros == 0 || filtros == undefined || filtros == null){

            }else{

              this.searchQuery = '';
              this.filtro = filtros.filtro;
              this.rangoPrecio = filtros.rango;
              this.promociones = filtros.promociones;
              console.log(this.filtro);
              this.llenarFiltrosAenviar();
              this.llenarFiltrosAplicados();
              this.getBebidasFiltroEstablecimiento(this.filtrosEnviar);
              modal.dismiss();

            }
            this.valueSegment = '';
    });
   return await modal.present();
}

llenarFiltrosAenviar(){
  this.filtrosEnviar.tipoCompra = this.filtro.tipoCompra;
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

       if(filtrosAplicados.radioPromocion == 'promocion') this.radiosSeleccionados.push({filtroid: 3, nombrefiltro: 'Promociones'})

  });

}

////////////////// MODAL FILTRAR CATEGORIAS
async ModalfiltrarCategorias()
  {
    const modal = await this.modalCtrl.create(
      {
     component: filtrarCategoriasPage,
     componentProps: {
      'establecimiento': this.establecimientoID
    }
   });
    modal.onDidDismiss()
        .then((data) => {
            const subcategoria = data['data'];
            if(subcategoria == 0 || subcategoria == undefined || subcategoria == null){

            }else{

              this.searchQuery = '';
              console.log(subcategoria);
              this.filtroSubCategoria = subcategoria;
              this.llenarSubCategoriasSeleccionadas();
              this.llenarFiltrosAenviarSubCat(subcategoria);
              this.getBebidasFiltroEstablecimiento(this.filtrosEnviar);

            }
            this.valueSegment = '';

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
      'listaNoSeleccion': this.bebidasListaGeneral,
      'esEstablecimiento': true,
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
  
                this.storage.get('listaseleccion')
                .then((val)=> {
                     this.listaSeleccion = val;
                     console.log(val);
                     this.verificarPrueba();
                     this.guardarSeleccion();
                });
  
              });
            

    });
  return await  modal.present();
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
      this.order_price();
    }else{
      if(opcion.value == "2"){
        this.radiobuttonOrdenDistancia = true;
        this.radiobuttonOrdenPrecio = false;
      }
    }
}

getBebidasFiltroEstablecimiento(val){
  this.bebidas = [];
  this.bebidasLista = [];
  this.Skeleton = true;
  this.cantidadLabel = false;
  this.scrollActivo = false;
  this.seleccionActiva = true;
  this.apiService.getBebidasConFiltroEstablecimiento(val)
  .then(data => {

      this.bebidas = data;

      if(this.indicadorBebidasListaGeneral == false){
        this.bebidasListaGeneral = data;
        this.indicadorBebidasListaGeneral = true;
      }

      this.scrollActivo = true;
      this.bebidasLista = [];
      this.cantidadLabel = true;
      this.Skeleton = false;
      this.chipPropagacion = true;
      console.log(this.bebidas);
      this.filtroVisible = true;
      this.seleccionActiva = false;
      this.cargarEstrellas();

      if(this.bebidas == null){

        this.cantidadEncontrada = 0;
        this.filtroVisible = false;

      }else{


        this.bebidas = this.insertSeleccion(this.bebidas);
        this.verificarSeleccionador();
        this.restablecerMinMax();
        this.activarScroll();
        
        this.cantidadEncontrada = this.bebidas.length;
        if(this.bebidas.length < 5){
            this.cantidadMax = this.bebidas.length;
        }
        
        for (let i = this.cantidadMin; i < this.cantidadMax; i++) {
          this.bebidasLista.push(this.bebidas[i]);
        }
        console.log(this.bebidasLista);
        this.filtros();

      }

  })
  .catch(error =>{
    console.log(error);
});
}

cargarDatos(){
  
    this.filtrosEnviar.nombrebebida = this.establecimientoID;
    this.getBebidasFiltroEstablecimiento(this.filtrosEnviar);
 
}


filtros(){
    this.RangoPreciosFiltro();
    if(this.radiobuttonOrdenPrecio == true){
      this.order_price();
    }
    if(this.promociones == true){
      let tipo = 'promocion';
      console.log(tipo);
      this.PromocionesFiltro(tipo);
    }else{
      let tipo = 'productos todos';
      console.log(tipo);
    }
    if(this.primeroPromociones == true){
      this.order_promociones();
    }
}

//// ORDENANDO DE MENOR A MAYOR
order_price(){

  if(this.searchQuery != ''){
    this.listaTemporal.sort((a, b) => Number(a.preciobebidasocio) - Number(b.preciobebidasocio));
    this.restablecerMinMax();
    this.bebidasLista = [];
    this.cantidadEncontrada = this.listaTemporal.length;
    if(this.listaTemporal.length < 5){
        this.cantidadMax = this.listaTemporal.length;
    }else{
      this.activarScroll();
    }
    for (let i = this.cantidadMin; i < this.cantidadMax; i++) {
      this.bebidasLista.push(this.listaTemporal[i]);
    }
    let index = this.filtrosSeleccionados.map( item => item.filtroid ).indexOf(1)
    if(index > -1){
      this.filtrosSeleccionados.splice(index,1);
    }
    this.filtrosSeleccionados.push({filtroid: 1, nombrefiltro: 'Menor precio'});
  }else{
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

}

order_promociones(){
  this.bebidas.sort((a, b) => (a.tipo < b.tipo) ? 1 : -1);
  this.primeroPromociones = false;

  this.restablecerMinMax();
  this.bebidasLista = [];

  if(this.bebidas.length < 5){
    this.cantidadMax = this.bebidas.length;
  }
  for (let i = this.cantidadMin; i < this.cantidadMax; i++) {
    this.bebidasLista.push(this.bebidas[i]);
  }
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

PromocionesFiltro(val){
  
  let listaSecundaria:any;

   listaSecundaria = this.bebidas.filter((bebida) =>{
     return bebida.tipo.toLowerCase().indexOf(val.toLowerCase()) > -1;
   });
   this.bebidas = listaSecundaria;
   this.restablecerListaPorCategoria(this.bebidas);
}


RangoPreciosFiltro(){
  console.log(this.rangoPrecio);
  console.log(this.bebidas);
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
    console.log(this.bebidas);
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

  if (this.searchQuery == '') {

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

  }else{

    setTimeout(() => {

      console.log('Done');
  
      let numeroMaximo = this.listaTemporal.length - this.bebidasLista.length;
  
      if(numeroMaximo < 5 && numeroMaximo > -1){
  
        this.cantidadMin = this.cantidadMax;
        this.cantidadMax = this.cantidadMax + numeroMaximo;
      }else{
  
        this.cantidadMin = this.cantidadMax;
        this.cantidadMax = this.cantidadMax+5;
      }
  
      for (let i = this.cantidadMin; i < this.cantidadMax; i++) {
        this.bebidasLista.push(this.listaTemporal[i]);
      }
  
      this.scrollValue = event;
      this.scrollValue.target.complete();
  
      let numero = this.listaTemporal.length;
  
      if (this.bebidasLista.length == numero) {
        this.scrollValue.target.disabled = true;
        this.scrollBoolean = false;
  
      }

    }, 500);
    
     
  }

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

  if(bebidasListaSecundaria.length < 5){
    this.cantidadMax = bebidasListaSecundaria.length;
  }
  for (let i = this.cantidadMin; i < this.cantidadMax; i++) {
    this.bebidasLista.push(bebidasListaSecundaria[i]);
  }
}

restablecerListaPorPromocion(bebidasListaSecundaria){
  this.restablecerMinMax();
  this.bebidasLista = [];

  this.cantidadEncontrada = bebidasListaSecundaria.length;

  if(bebidasListaSecundaria.length < 5){
    this.cantidadMax = bebidasListaSecundaria.length;
  }
  for (let i = this.cantidadMin; i < this.cantidadMax; i++) {
    this.bebidasLista.push(bebidasListaSecundaria[i]);
  }
}


searchList(): void {

  const query = (this.searchQuery && this.searchQuery !== null) ? this.searchQuery : '';
  this.listaTemporal = this.filterList(this.bebidas, query);
  this.restablecerMinMax();
  this.bebidasLista = [];
  this.cantidadEncontrada = this.listaTemporal.length;
  if(this.listaTemporal.length < 5){
      this.cantidadMax = this.listaTemporal.length;
  }else{
    this.activarScroll();
  }
  for (let i = this.cantidadMin; i < this.cantidadMax; i++) {
    this.bebidasLista.push(this.listaTemporal[i]);
  }
}

filterList(list, query): Array<any> {
  return list.filter(item => item.nombrebebida.toLowerCase().includes(query.toLowerCase()) || item.nombremarca.toLowerCase().includes(query.toLowerCase()));
}

filterItems() {
  return this.bebidas.filter(item => {
    return item.nombrebebida.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1;
  });
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


 irSeleccion(){
  this.ModalSeleccionar();
 }

 /// FILTROS SELECCIONADOS

agregarFiltroSeleccionado(item){
  this.filtrosSeleccionados.push(item);
  console.log(this.filtrosEnviar);

}

removerFiltroSeleccionadosRadio(id: number): void {

  if(this.chipPropagacion == true){
    this.searchQuery = '';
    this.chipPropagacion = false;

    this.filtrosSeleccionados.splice(id, 1);
    this.radiobuttonOrdenPrecio = false;
 
    this.radioDefault = "";
    console.log(this.filtrosEnviar);
    this.getBebidasFiltroEstablecimiento(this.filtrosEnviar);

  }

}


removerFiltrosSeleccionadosMarcas(id:number,item):void{

  if(this.chipPropagacion == true){
    this.searchQuery = '';
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
        this.getBebidasFiltroEstablecimiento(this.filtrosEnviar);
      }
    });
  }

}

removerFiltrosSeleccionadosPacks(id:number, item):void{

  if(this.chipPropagacion == true){
    this.searchQuery = '';
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
        this.getBebidasFiltroEstablecimiento(this.filtrosEnviar);
      }
    });
  }

}

removerFiltrosSeleccionadosRadioPromociones(id:number,radio){

  if(this.chipPropagacion == true){
    this.searchQuery = '';
    this.chipPropagacion = false;
    this.radiosSeleccionados.splice(id,1);
    this.promociones = false;
    
    this.storage.get('filtrollenado')
    .then((val) =>{
  
      if(val != null){
  
        let filtrollenado = val;
        filtrollenado.radioPromocion = '';
        this.storage.set('filtrollenado',filtrollenado);  
      }

      console.log(this.filtrosEnviar);
      this.getBebidasFiltroEstablecimiento(this.filtrosEnviar);
    });
  }

}

removerFiltrosSeleccionadosRangos(id:number){

  if(this.chipPropagacion == true){
    this.searchQuery = '';
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
       this.getBebidasFiltroEstablecimiento(this.filtrosEnviar);
      }
   
    });
  }

}

removerFiltrosSeleccionadosSubCategoria(id:number){

  if(this.chipPropagacion == true){

    this.filtroSubCategoria.subcategoria = " ";
    this.searchQuery = '';
    this.chipPropagacion = false;
    this.subCategoriasSeleccionadas.splice(id,1);

    this.filtrosEnviar.subCategoria = " ";
    this.filtrosEnviar.pack = " ";
    this.filtrosEnviar.marca = " ";
    this.marcasSeleccionadas = [];
    this.packsSeleccionados = [];
    this.storage.remove('filtrollenado');
    console.log(this.filtrosEnviar);
    this.getBebidasFiltroEstablecimiento(this.filtrosEnviar);
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

 //GoogleAnalytics
 googleAnalytics(){
  this.firebaseAnalytics.logEvent('pantallaEstablecimientos',{estableciemiento:this.establecimiento.nombrecomercial, idestablecimient:this.establecimientoID})
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