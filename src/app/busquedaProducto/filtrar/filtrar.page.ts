import { Component, AfterViewInit, ViewChild, HostBinding, OnInit, ɵConsole } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { MenuController, ModalController, NavParams } from '@ionic/angular';
import {ApiServiceService} from '../../api-service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-inicio',
  templateUrl: './filtrar.page.html',
  styleUrls: [
    './styles/filtrar.page.scss'
  ]
})
export class filtrarPage{

  // VALORES DE ENTRADA
  input: any;
  categoria:any;
  establecimiento:any;
  filtroSubCategoria:any;
  latitud:any;
  longitud:any;
  km:any;
  radio1 = '';
  radio2 = '';
  valorRadio = 0;
  valorRadio2 = false;

  rango1 = false;
  rango2 = false;
  rango3 = false;
  rango4 = false;
  rango5 = false;


  cadenaFiltroMarca: String = "";
  cadenaFiltroPack: String = "";
  
  Marcas: any;
  Packs: any;

  ListaMarca = [];
  ListaPacks = [];
  checkMarcas = [];
  checkPacks = [];

  parteSuperiorVisible;
  parteSuperiorVisible2;

  spinnerMarcas = false;
  spinnerPacks = false;
  
  constructor(public menu: MenuController,
              public router: Router,
              public route: ActivatedRoute,
              public storage: Storage,
              public apiService:ApiServiceService,
              private modalCtrl:ModalController
              ) {
              }

cargarDatos(){
  this.spinnerPacks = true;
  this.spinnerMarcas = true;
if(this.input != null){
    let filtro = {'nombrebebida': this.input, 'subCategoria': this.filtroSubCategoria.subcategoria,'lat':this.latitud,'lng':this.longitud,'km':this.km};
    console.log(filtro);
    this.getMarcas(filtro);
    this.getPack(filtro);
}else{
    if(this.categoria != null){
      let filtro = {'categoria': this.categoria, 'subCategoria': this.filtroSubCategoria.subcategoria,'lat':this.latitud,'lng':this.longitud,'km':this.km};
      console.log(filtro);
      this.getMarcasCategoria(filtro);
      this.getPackCategoria(filtro);
   }else{
     if(this.establecimiento != null){
       this.parteSuperiorVisible = false;
       let filtro = {'establecimiento': this.establecimiento, 'subCategoria': this.filtroSubCategoria.subcategoria};
       console.log(filtro);
      this.getMarcasEstablecimiento(filtro);
      this.getPackEstablecimiento(filtro);
     }
   }
  }
}

closeModal(){
  this.modalCtrl.dismiss(0);
}

// Disable side menu for this page
ionViewDidEnter(): void {
    this.menu.enable(false);
}

ionViewWillEnter(): void {
  this.cargarFiltroTemporal();
}

cargarFiltroTemporal(){

  this.storage.get('filtrollenado')
  .then((val) =>{

    if(val != null){

      let filtrollenado = val;
      this.ListaMarca = filtrollenado.marcas;
      this.ListaPacks = filtrollenado.packs;

      let rangos = filtrollenado.rangos;
      this.rango1 = rangos.rango1;
      this.rango2 = rangos.rango2;
      this.rango3 = rangos.rango3;
      this.rango4 = rangos.rango4;
      this.rango5 = rangos.rango5;

      this.radio1 = filtrollenado.radio;
      if(this.radio1 == 'comprar') this.valorRadio = 1;
      this.radio2 = filtrollenado.radioPromocion;
      
    }else{
      this.cargarDatos();
    }

  });
     
}

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  clickRadioButton1(): void{
    if(this.radio2 == 'promocion'){
      this.radio2 = '';
    }
    this.valorRadio = 1;

  }

  clickRadioButton2(): void{

    if(this.radio1 == 'comprar'){
      this.radio1 = '';
    }
    if(this.valorRadio2 == false){
      this.valorRadio2 = true;
    }else{
      this.valorRadio2 = false;
    }
    console.log(this.valorRadio2);
  }

  Limpiar(): void{
    this.radio1 = '';
    this.radio2 = '';
    this.valorRadio = 0;
    this.valorRadio2 = true;
    this.rango1 = false;
    this.rango2 = false;
    this.rango3 = false;
    this.rango4 = false;
    this.rango1 = false;

    for(let marcas of this.ListaMarca){
        marcas.isChecked = false;
    }

    for(let pack of this.ListaPacks){
        pack.isChecked = false;
    }
  }


Aplicar(): void{

  this.concatMarcas2();
  this.concatPacks2();

  if(this.cadenaFiltroPack == "")
        this.cadenaFiltroPack = ' ';
  if(this.cadenaFiltroMarca == "")
        this.cadenaFiltroMarca = ' ';

  let nombre_O_categoria_O_establecimiento;
  if(this.input != null)
      nombre_O_categoria_O_establecimiento = this.input;
  if(this.categoria != null)
      nombre_O_categoria_O_establecimiento = this.categoria;
  if(this.establecimiento != null)
  nombre_O_categoria_O_establecimiento = this.establecimiento;

  /*
  let tipoCompra:String
  let ind_delivery;
  if(this.radio1 == 'comprar'){
    tipoCompra = "AND SO.estadosocio = "+this.valorRadio;
    ind_delivery = 1;
  } 
  else{
    tipoCompra = "AND SO.estadosocio IN(1,2)";
    ind_delivery = 0;
  } 
  */
  
  let filtro = {nombrebebida: nombre_O_categoria_O_establecimiento, establecimiento: ' ', 
                 marca: this.cadenaFiltroMarca, pack: this.cadenaFiltroPack};

  let rangoSeleccionado = this.rangoSeleccionado();
  let radio = this.radio1;
  let radio2 = this.radio2;
  
  console.log(filtro);
  let filtros = {
         filtro: filtro,
         rango: rangoSeleccionado,
         promociones: this.valorRadio2
      }
  
  let rangos = {rango1: this.rango1,rango2: this.rango2, 
                rango3: this.rango3, rango4: this.rango4, rango5: this.rango5};

  let filtrollenado = {'marcas': this.ListaMarca, 'packs': this.ListaPacks, 'rangos': rangos, 'radio': radio, 'radioPromocion': radio2};
  this.storage.set('filtrollenado',filtrollenado);
  this.modalCtrl.dismiss(filtros);
}

concatMarcas(){
  for(let i=0; i<this.checkMarcas.length; i++){

    let idMarca = this.checkMarcas[i].idmarca;

    if(i == this.checkMarcas.length-1){
      this.cadenaFiltroMarca = this.cadenaFiltroMarca.concat(idMarca)
    }else{
      this.cadenaFiltroMarca = this.cadenaFiltroMarca.concat(idMarca+",")
    }
 }
}  

concatPacks(){
  for(let i=0; i<this.checkPacks.length; i++){

    let numeropack = this.checkPacks[i].numeropack;

    if(i == this.checkPacks.length-1){
      this.cadenaFiltroPack = this.cadenaFiltroPack.concat(numeropack)
    }else{
      this.cadenaFiltroPack = this.cadenaFiltroPack.concat(numeropack+",")
    }
 }
}  

concatMarcas2(){

  for(let i=0; i<this.checkMarcas.length; i++){

    let idMarca = this.checkMarcas[i].idmarca;

    if(this.checkMarcas.length == 1){
      this.cadenaFiltroMarca = this.cadenaFiltroMarca.concat("AND D.idmarca IN("+idMarca+")");
    }else{

      if(i == 0){
        this.cadenaFiltroMarca = this.cadenaFiltroMarca.concat("AND D.idmarca IN("+idMarca)
      }else{
        if(i == this.checkMarcas.length-1){
          this.cadenaFiltroMarca = this.cadenaFiltroMarca.concat(","+idMarca+")")
        }else{
          this.cadenaFiltroMarca = this.cadenaFiltroMarca.concat(","+idMarca)
        }
      }
    }


 }
}  

concatPacks2(){
  for(let i=0; i<this.checkPacks.length; i++){

    let numeropack = this.checkPacks[i].numeropack;
    
    if(this.checkPacks.length == 1){
      this.cadenaFiltroPack = this.cadenaFiltroPack.concat("AND D.numeropack IN("+numeropack+")");
    }else{

      if(i == 0){
        this.cadenaFiltroPack = this.cadenaFiltroPack.concat("AND D.numeropack IN("+numeropack)
      }else{
  
        if(i == this.checkPacks.length-1){
          this.cadenaFiltroPack = this.cadenaFiltroPack.concat(","+numeropack+")")
        }else{
          this.cadenaFiltroPack = this.cadenaFiltroPack.concat(","+numeropack)
        }
      }
    }

 }
}  

ItemsMarca(item){
    if(this.ListaMarca.find(marca => marca.idmarca === item.idmarca)){

      if(item.isChecked == true){

        this.checkMarcas.push({idmarca: item.idmarca, nombremarca: item.nombremarca},);
      }else{
            let i = this.checkMarcas.findIndex(marca=>{return marca.idmarca == item.idmarca});
            this.checkMarcas.splice(i, 1);  
      }
    }
}

ItemsPacks(item){
  if(this.ListaPacks.find(pack => pack.numeropack === item.numeropack)){

    if(item.isChecked == true){
      this.checkPacks.push({numeropack: item.numeropack},);
    }else{
          let i = this.checkPacks.findIndex(pack=>{return pack.numeropack == item.numeropack});
          this.checkPacks.splice(i, 1);  
    }
  }
}

getMarcas(val){
      this.apiService.getMarcasPrincipal(val)
      .then((data) => {
             this.Marcas = data;
             this.spinnerMarcas = false;
             this.llenarListaMarca();
        })
        .catch(error =>{
          console.log(error);
        });
}

getPack(val){
    this.apiService.getPackPrincipal(val)
    .then((data) => {
            this.Packs = data;
            this.spinnerPacks = false;
            this.llenarListaPacks();
      })
      .catch(error =>{
        console.log(error);
      });
  }

getMarcasCategoria(val){
    this.apiService.getMarcasCategoria(val)
    .then((data) => {
           this.Marcas = data;
           this.spinnerMarcas = false;
           console.log(this.Marcas);
           this.llenarListaMarca();
      })
      .catch(error =>{
        console.log(error);
      });
}

getPackCategoria(val){
  this.apiService.getPackCategoria(val)
  .then((data) => {
          this.Packs = data;
          this.spinnerPacks = false;
          this.llenarListaPacks();
    })
    .catch(error =>{
      console.log(error);
    });
}

getMarcasEstablecimiento(val){
  this.apiService.getMarcasEstablecimiento(val)
  .then((data) => {
         this.Marcas = data;
         this.spinnerMarcas = false;
         this.llenarListaMarca();
    })
    .catch(error =>{
      console.log(error);
    });
}

getPackEstablecimiento(val){
this.apiService.getPackEstablecimiento(val)
.then((data) => {
        this.Packs = data;
        this.spinnerPacks = false;
        this.llenarListaPacks();
  })
  .catch(error =>{
    console.log(error);
  });
}  

llenarListaMarca(){
      for(let i =0; i<this.Marcas.length; i++){
         this.ListaMarca.push({idmarca: this.Marcas[i].idmarca, nombremarca: this.Marcas[i].nombremarca,isChecked: false},)
      }
}

  llenarListaPacks(){
    for(let i =0; i<this.Packs.length; i++){
      this.ListaPacks.push({numeropack: this.Packs[i].numeropack, isChecked: false},)
   }
  }

ItemRango1(){

    if(this.rango1 == true){
      this.rango2 = false;
      this.rango3 = false;
      this.rango4 = false;
      this.rango5 = false;
    }
}

ItemRango2(){
  
  if(this.rango2 == true){
    this.rango1 = false;
    this.rango3 = false;
    this.rango4 = false;
    this.rango5 = false;
  }
}

ItemRango3(){
  
  if(this.rango3 == true){
    this.rango2 = false;
    this.rango1 = false;
    this.rango4 = false;
    this.rango5 = false;
  }
}

ItemRango4(){
  
  if(this.rango4 == true){
    this.rango2 = false;
    this.rango3 = false;
    this.rango1 = false;
    this.rango5 = false;
  }
}

ItemRango5(){
  
  if(this.rango5 == true){
    this.rango2 = false;
    this.rango3 = false;
    this.rango4 = false;
    this.rango1 = false;
  }
}


rangoSeleccionado():Number{

  let valorRangoPrecio:Number = 0;

  if(this.rango1 == true) valorRangoPrecio = 1;
  if(this.rango2 == true) valorRangoPrecio = 2;
  if(this.rango3 == true) valorRangoPrecio = 3;
  if(this.rango4 == true) valorRangoPrecio = 4;
  if(this.rango5 == true) valorRangoPrecio = 5;

  return valorRangoPrecio;
}



}