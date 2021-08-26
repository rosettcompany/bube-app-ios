import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class filtrarBean{

    // VALORES DE ENTRADA
    input: any;
    categoria:any;
    establecimiento:any;
  
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
    
    constructor(public storage: Storage) {}


    Aplicar2(listaMarca,listaPack){

        this.ListaMarca = listaMarca;
        this.ListaPacks = listaPack;
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
      
        let tipoCompra:String
        if(this.radio1 == 'comprar') tipoCompra = "AND SO.estadosocio = "+this.valorRadio;
        else tipoCompra = " ";
        
        let filtro = {nombrebebida: nombre_O_categoria_O_establecimiento, establecimiento: ' ', 
                      tipoCompra: tipoCompra, marca: this.cadenaFiltroMarca, pack: this.cadenaFiltroPack};
      
  
        let radio = this.radio1;
        let radio2 = this.radio2;
        
        console.log(filtro);
        let filtros = {
               filtro: filtro,
               promociones: this.valorRadio2
            }
        
        let rangos = {rango1: this.rango1,rango2: this.rango2, 
                      rango3: this.rango3, rango4: this.rango4, rango5: this.rango5};
      
        let filtrollenado = {'marcas': this.ListaMarca, 'packs': this.ListaPacks, 'rangos': rangos, 'radio': radio, 'radioPromocion': radio2};
        this.storage.set('filtrollenado',filtrollenado);
       // this.modalCtrl.dismiss(filtros);

       return filtros;
      }

    concatenarMarcas(listaMarca):String{
      let checkMarcas = [];
      let cadenaFiltroMarca:String = '';
      for(let item of listaMarca){
    
        if(item.isChecked == true){
  
          checkMarcas.push({idmarca: item.idmarca, nombremarca: item.nombremarca},);
        }
      }

        for(let i=0; i<checkMarcas.length; i++){
      
          let idMarca = checkMarcas[i].idmarca;
      
          if(checkMarcas.length == 1){
            cadenaFiltroMarca = cadenaFiltroMarca.concat("AND D.idmarca IN("+idMarca+")");

          }else{

            if(i == 0){
              cadenaFiltroMarca = cadenaFiltroMarca.concat("AND D.idmarca IN("+idMarca)
            }else{
              if(i == checkMarcas.length-1){
                cadenaFiltroMarca = cadenaFiltroMarca.concat(","+idMarca+")")
              }else{
                cadenaFiltroMarca = cadenaFiltroMarca.concat(","+idMarca)
              }
            }
          }

       }

       if(cadenaFiltroMarca == '') cadenaFiltroMarca = " ";

       return cadenaFiltroMarca;
      }  
      
  
  

    concatenarPacks(ListaPacks):String{

      let checkPacks = [];
      let cadenaFiltroPack:String = '';

      for(let item of ListaPacks){
    
        if(item.isChecked == true){

          checkPacks.push({numeropack: item.numeropack},);
        }
      }

        for(let i=0; i<checkPacks.length; i++){
      
          let numeropack = checkPacks[i].numeropack;

          if(checkPacks.length == 1){

          cadenaFiltroPack = cadenaFiltroPack.concat("AND D.numeropack IN("+numeropack+")");

          }else{

            if(i == 0){
              cadenaFiltroPack = cadenaFiltroPack.concat("AND D.numeropack IN("+numeropack)
            }else{
        
              if(i == checkPacks.length-1){
                cadenaFiltroPack = cadenaFiltroPack.concat(","+numeropack+")")
              }else{
                cadenaFiltroPack = cadenaFiltroPack.concat(","+numeropack)
              }
            }
          }
       }
       if(cadenaFiltroPack == '') cadenaFiltroPack = " ";

      return cadenaFiltroPack;
      }  

  concatenarEstablecimientos(listaEstablecimientos): String{
    
    let checkEstablecimientos = [];
    let cadenaFiltroEstablecimiento:String = '';
    for(let establecimiento of listaEstablecimientos){

      if(establecimiento.isChecked == true){
        checkEstablecimientos.push({idsociocomercial: establecimiento.idsociocomercial, nombrecomercial: establecimiento.nombrecomercial},);
      }
    }

    for(let i=0; i<checkEstablecimientos.length; i++){
  
      let idsociocomercial = checkEstablecimientos[i].idsociocomercial;

      if(checkEstablecimientos.length == 1){
         cadenaFiltroEstablecimiento = cadenaFiltroEstablecimiento.concat("AND SO.idsociocomercial IN("+idsociocomercial+")")
      }else{

        if(i == 0){
          cadenaFiltroEstablecimiento = cadenaFiltroEstablecimiento.concat("AND SO.idsociocomercial IN("+idsociocomercial)
        }else{
  
          if(i == checkEstablecimientos.length-1){
            cadenaFiltroEstablecimiento = cadenaFiltroEstablecimiento.concat(","+idsociocomercial+")")
          }else{
            cadenaFiltroEstablecimiento = cadenaFiltroEstablecimiento.concat(","+idsociocomercial)
          }
        }
      }
   }
   
   if(cadenaFiltroEstablecimiento == '') cadenaFiltroEstablecimiento = " ";

   return cadenaFiltroEstablecimiento;

  }


}