import { Component, AfterViewInit, ViewChild, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import { FormGroup, FormControl } from '@angular/forms';
import {ApiServiceService} from '../../api-service.service';
import { Storage } from '@ionic/storage';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-inicio',
  templateUrl: './filtrarEstablecimientos.page.html',
  styleUrls: [
    './styles/filtrarEstablecimientos.page.scss'
  ],
  animations: [
    trigger('visibilityChanged', [
      state('show', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => show', animate('1000ms ease-in-out')),
      transition('* => hidden', animate('100ms ease-in-out')),
    ])
  ]
})
export class filtrarEstablecimientosPage{


  input:any;
  categoria:any;
  km;
  estadosocio;

  lista1 = false;
  lista2 = false;
  lista3 = false;
  lista4 = false;

  icon1 = 'add-outline';
  icon2 = 'add-outline';
  icon3 = 'add-outline';
  icon4 = 'add-outline';

  error1 = false;
  error2 = false;
  error3 = false;
  error4 = false;
 
  skeleton1 = false;
  skeleton2 = false;
  skeleton3 = false;
  skeleton4 = false;

  animation1 = 'hidden';
  animation2 = 'hidden';
  animation3 = 'hidden';
  animation4 = 'hidden';

  cadenaFiltroEstablecimiento: String = "";

  ListaBodegas = [];
  ListaLicorerias = [];
  ListaSupermercados = [];
  ListaOnline = [];

  Bodegas:any;
  Licorerias:any;
  Supermercados:any;
  Online:any;

  longitud;
  latitud;

  checkEstablecimientos = [];

  constructor(public menu: MenuController,
     public router: Router,
     public storage: Storage,
     private modalCtrl:ModalController, 
     public apiService:ApiServiceService) {

   }

  ngOnInit() {
    this.getLongitudLatitud();
  }

  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.menu.enable(false);
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

getEstablecimientos(val){

    switch(val.tipoEstablecimiento){
      case 1:
        this.skeleton1 = true;
        break;
      case 2:
        this.skeleton2 = true;
        break;
      case 3:
        this.skeleton3 = true;
        break;
      case 4:
        this.skeleton4 = true;
        break;
    }

    this.apiService.getBebidasEstablecimientos(val)
    .then(data => {
               
                if(data == null){
                  data = [];
                }

               switch(val.tipoEstablecimiento){
                  case 1:
                   this.Bodegas = this.obtenerMarcadoresPorDistancia(this.latitud,this.longitud,this.km,data);
                   this.skeleton1 = false;
                   if(this.Bodegas.length == 0){
                    this.error1 = true;
                   }else{
                    this.llenarListaBodegas();
                   }
                   break;
                  case 2:
                    this.Licorerias = this.obtenerMarcadoresPorDistancia(this.latitud,this.longitud,this.km,data);
                    this.skeleton2 = false;
                    if(this.Licorerias.length == 0){
                      this.error2 = true;
                    }else{
                      this.llenarListaLicorerias();
                    }
                    break;
                  case 3:
                    console.log(data);
                    this.Supermercados = this.obtenerMarcadoresPorDistancia(this.latitud,this.longitud,this.km,data);
                    this.skeleton3 = false;
                    if(this.Supermercados.length == 0){
                      this.error3 = true;
                    }else{
                      this.llenarListaSupermercados();
                    }
                    break;
                  case 4:
                     this.Online = this.obtenerMarcadoresPorDistancia(this.latitud,this.longitud,this.km,data);
                     this.skeleton4 = false;
                     if(this.Online.length == 0){
                      this.error4 = true;
                    }else{
                      this.llenarListaOnline();
                    }
                    break;
                  default:
                    console.log("error");
                   break;
               }

      }).catch(error =>{
      console.log(error);
    });
}

getEstablecimientosCategoria(val){
  console.log(val);
  switch(val.tipoEstablecimiento){
    case 1:
      this.skeleton1 = true;
      break;
    case 2:
      this.skeleton2 = true;
      break;
    case 3:
      this.skeleton3 = true;
      break;
    case 4:
      this.skeleton4 = true;
      break;
  }
  this.apiService.getBebidasEstablecimientosCategoria(val)
  .then(data => {
             console.log(data);
             if(data == null){
               data = [];
             }
              switch(val.tipoEstablecimiento){
                case 1:
                 this.Bodegas = this.obtenerMarcadoresPorDistancia(this.latitud,this.longitud,this.km,data);
                 this.skeleton1 = false;
                 if(this.Bodegas.length == 0){
                  this.error1 = true;
                 }else{
                  this.llenarListaBodegas();
                 }
                   
                 break;
                case 2:
                  this.Licorerias = this.obtenerMarcadoresPorDistancia(this.latitud,this.longitud,this.km,data);
                  this.skeleton2 = false;
                  if(this.Licorerias.length == 0){
                    this.error2 = true;
                  }else{
                    this.llenarListaLicorerias();
                  }
                  break;
                case 3:
                  this.Supermercados = this.obtenerMarcadoresPorDistancia(this.latitud,this.longitud,this.km,data);
                  this.skeleton3 = false;
                  if(this.Supermercados.length == 0){
                    this.error3 = true;
                  }else{
                    this.llenarListaSupermercados();
                  }
                  break;
                case 4:
                  this.Online = this.obtenerMarcadoresPorDistancia(this.latitud,this.longitud,this.km,data);
                  this.skeleton4 = false;
                  if(this.Online.length == 0){
                    this.error4 = true;
                  }else{
                    this.llenarListaOnline();
                  }
                  break;
                default:
                  console.log("error");
                 break;
             }

            

    }).catch(error =>{
    console.log(error);
  });
}



Aplicar(): void{

  this.concatEstablecimiento2();
  if(this.cadenaFiltroEstablecimiento == "")
  this.cadenaFiltroEstablecimiento = " ";

  let nombre_O_categoria;
  if(this.input != null)
      nombre_O_categoria = this.input;
  if(this.categoria != null)
      nombre_O_categoria = this.categoria;

  let filtro = {establecimiento: this.cadenaFiltroEstablecimiento};

  let filtrollenadoEstablecimientos = {'listaLicorerias': this.ListaLicorerias, 'listaBodegas': this.ListaBodegas, 'listaSupermercados': this.ListaSupermercados, 'listaOnline': this.ListaOnline};
  this.storage.set('filtrollenadoEstablecimientos',filtrollenadoEstablecimientos);
  this.modalCtrl.dismiss(filtro);
}

closeModal(){
  this.modalCtrl.dismiss(0);
}

expandir1(val): void{

if(this.lista1 == false){
  this.icon1 = 'remove-outline';
  this.animation1 = 'show';
  this.lista1 = true;

  this.storage.get('filtrollenadoEstablecimientos')
  .then((valor) =>{
       
    if(valor != null){
    
      let filtrollenado = valor;
      this.ListaBodegas = filtrollenado.listaBodegas;

      if(this.ListaBodegas.length == 0){

        let nombre_O_categoria;
        if(this.input != null){
          nombre_O_categoria = this.input;
          let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
          this.getEstablecimientos(data);
        }
        if(this.categoria != null){
          nombre_O_categoria = this.categoria;
          let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
          this.getEstablecimientosCategoria(data);
        }
    }

    }else{

        if(this.ListaBodegas.length == 0){

            let nombre_O_categoria;
            if(this.input != null){
              nombre_O_categoria = this.input;
              let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
              this.getEstablecimientos(data);
            }
            if(this.categoria != null){
              nombre_O_categoria = this.categoria;
              let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
              this.getEstablecimientosCategoria(data);
            }
        }
    }
   }); 
  }else{
    this.lista1 = false;
    this.error1 = false;
    this.animation1 = 'hidden';
    this.icon1 = 'add-outline';
 }
}

expandir2(val): void{

if(this.lista2 == false){
    this.icon2 = 'remove-outline';
    this.animation2 = 'show';
    this.lista2 = true;   

  this.storage.get('filtrollenadoEstablecimientos')
    .then((valor) =>{

      if(valor != null){
    
        let filtrollenado = valor;
        this.ListaLicorerias = filtrollenado.listaLicorerias;
        
        if(this.ListaLicorerias.length == 0){
    
          let nombre_O_categoria;
          if(this.input != null){
            nombre_O_categoria = this.input;
            let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
            this.getEstablecimientos(data);
          }
          if(this.categoria != null){
            nombre_O_categoria = this.categoria;
            let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
            this.getEstablecimientosCategoria(data);
          }
        }
      
      }else{
                
          if(this.ListaLicorerias.length == 0){
    
            let nombre_O_categoria;
            if(this.input != null){
              nombre_O_categoria = this.input;
              let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
              this.getEstablecimientos(data);
            }
            if(this.categoria != null){
              nombre_O_categoria = this.categoria;
              let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
              this.getEstablecimientosCategoria(data);
            }
          }
      }
    });
  }else{
    this.lista2 = false;
    this.animation2 = 'hidden';
    this.error2 = false;
    this.icon2 = 'add-outline';
 }

}

expandir3(val): void{

  if(this.lista3 == false){
    this.icon3 = 'remove-outline';
    this.animation3 = 'show';
    this.lista3 = true;

    this.storage.get('filtrollenadoEstablecimientos')
    .then((valor) =>{

      if(valor != null){
    
        let filtrollenado = valor;
  
        this.ListaSupermercados = filtrollenado.listaSupermercados;

        if(this.ListaSupermercados.length == 0){
    
          let nombre_O_categoria;
          if(this.input != null){
            nombre_O_categoria = this.input;
            let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
            this.getEstablecimientos(data);
          }
  
          if(this.categoria != null){
            nombre_O_categoria = this.categoria;
            let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
            this.getEstablecimientosCategoria(data);
          }
        }

      }else{

          if(this.ListaSupermercados.length == 0){
    
            let nombre_O_categoria;
            if(this.input != null){
              nombre_O_categoria = this.input;
              let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
              this.getEstablecimientos(data);
            }
    
            if(this.categoria != null){
              nombre_O_categoria = this.categoria;
              let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
              this.getEstablecimientosCategoria(data);
            }
          }
      }
    });
  }else{
    this.lista3 = false;
    this.animation3 = 'hidden';
    this.error3 = false;
    this.icon3 = 'add-outline';
 }
}

expandir4(val): void{

if(this.lista4 == false){
      this.icon4 = 'remove-outline';
      this.animation4 = 'show';
      this.lista4 = true;
  
    this.storage.get('filtrollenadoEstablecimientos')
    .then((valor) =>{

      if(valor != null){
    
        let filtrollenado = valor;
        this.ListaOnline = filtrollenado.listaOnline;

          if(this.ListaOnline.length == 0){
    
            let nombre_O_categoria;
            if(this.input != null){
              nombre_O_categoria = this.input;
              let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
              this.getEstablecimientos(data);
            }
    
            if(this.categoria != null){
              nombre_O_categoria = this.categoria;
              let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
              this.getEstablecimientosCategoria(data);
            }
          }

      }else{

          if(this.ListaOnline.length == 0){
    
            let nombre_O_categoria;
            if(this.input != null){
              nombre_O_categoria = this.input;
              let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
              this.getEstablecimientos(data);
            }
    
            if(this.categoria != null){
              nombre_O_categoria = this.categoria;
              let data = {nombreBebida: nombre_O_categoria, tipoEstablecimiento: val,estadoSocio: this.estadosocio}
              this.getEstablecimientosCategoria(data);
            }
          }
      }
    });
  }else{
    this.lista4 = false;
    this.animation4 = 'hidden';
    this.error4 = false;
    this.icon4 = 'add-outline';
 }
} 



concatEstablecimiento(){
    for(let i=0; i<this.checkEstablecimientos.length; i++){
  
      let idsociocomercial = this.checkEstablecimientos[i].idsociocomercial;
      if(i == this.checkEstablecimientos.length-1){
        this.cadenaFiltroEstablecimiento = this.cadenaFiltroEstablecimiento.concat(idsociocomercial)
      }else{
        this.cadenaFiltroEstablecimiento = this.cadenaFiltroEstablecimiento.concat(idsociocomercial+",")
      }
   }
  } 
  
concatEstablecimiento2(){
    for(let i=0; i<this.checkEstablecimientos.length; i++){
  
      let idsociocomercial = this.checkEstablecimientos[i].idsociocomercial;

      if(this.checkEstablecimientos.length == 1){
         this.cadenaFiltroEstablecimiento = this.cadenaFiltroEstablecimiento.concat("AND SO.idsociocomercial IN("+idsociocomercial+")")
      }else{

        if(i== 0){
          this.cadenaFiltroEstablecimiento = this.cadenaFiltroEstablecimiento.concat("AND SO.idsociocomercial IN("+idsociocomercial)
        }else{
  
          if(i == this.checkEstablecimientos.length-1){
            this.cadenaFiltroEstablecimiento = this.cadenaFiltroEstablecimiento.concat(","+idsociocomercial+")")
          }else{
            this.cadenaFiltroEstablecimiento = this.cadenaFiltroEstablecimiento.concat(","+idsociocomercial)
          }
        }
      }

   }
  }  

ItemsEstablecimiento(item, tipo){
  
    let ListaTemportal = [];
    switch(tipo){
      case 1: ListaTemportal = this.ListaBodegas;
        break;
      case 2: ListaTemportal = this.ListaLicorerias;
        break;
      case 3: ListaTemportal = this.ListaSupermercados;
        break;
      case 4: ListaTemportal = this.ListaOnline;
        break;
      default:
        console.log("ERROR");
        break;
    }
    
    if(ListaTemportal.find(establec => establec.idsociocomercial === item.idsociocomercial)){

      if(item.isChecked == true){
        this.checkEstablecimientos.push({idsociocomercial: item.idsociocomercial, nombrecomercial: item.nombrecomercial},);
        console.log(this.checkEstablecimientos);
      }else{
            let i = this.checkEstablecimientos.findIndex(establecimiento=>{return establecimiento.idsociocomercial == item.idsociocomercial});
            this.checkEstablecimientos.splice(i, 1);  
      }
    }
    console.log(item);
}

llenarListaBodegas(){

    for(let i =0; i<this.Bodegas.length; i++){
       this.ListaBodegas.push({nombrecomercial: this.Bodegas[i].nombrecomercial,
                               idsociocomercial: this.Bodegas[i].idsociocomercial, isChecked: false},)
    }
}

llenarListaLicorerias(){

  for(let i =0; i<this.Licorerias.length; i++){
     this.ListaLicorerias.push({nombrecomercial: this.Licorerias[i].nombrecomercial,
                             idsociocomercial: this.Licorerias[i].idsociocomercial, isChecked: false},)
  }
}

llenarListaSupermercados(){

  for(let i =0; i<this.Supermercados.length; i++){
     this.ListaSupermercados.push({nombrecomercial: this.Supermercados[i].nombrecomercial,
                             idsociocomercial: this.Supermercados[i].idsociocomercial, isChecked: false},)
  }
}

llenarListaOnline(){

  for(let i =0; i<this.Online.length; i++){
     this.ListaOnline.push({nombrecomercial: this.Online[i].nombrecomercial,
                             idsociocomercial: this.Online[i].idsociocomercial, isChecked: false},)
  }
}

Limpiar(): void{

  for(let bodega of this.ListaBodegas){
    bodega.isChecked = false;
  }

  for(let licoreria of this.ListaLicorerias){
    licoreria.isChecked = false;
  }

  for(let Supermercados of this.ListaSupermercados){
    Supermercados.isChecked = false;
  }

  for(let online of this.ListaOnline){
    online.isChecked = false;
  }
}


getLongitudLatitud(){

  this.storage.get('longitud')
  .then((val) =>{
    this.longitud= val;

    this.storage.get('latitud')
    .then((val) =>{
      
      this.latitud = val;
      


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