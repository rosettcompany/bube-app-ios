import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController} from '@ionic/angular';
import {ApiServiceService} from '../api-service.service';
import { Router,NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-modalPromociones',
  templateUrl: './modalPromociones.page.html',
  styleUrls: ['./styles/modalPromociones.page.scss',
              './styles/modalPromociones.shell.scss'],
})

export class ModalPromocionesPage{

promocion;
km;

constructor(private modalControler: ModalController,
                public apiService:ApiServiceService,
                public storage: Storage,
                private router:Router) {}


comprarPromocion(){
    
 this.construirDatosaPagar();
}

irEstablecimiento(){
  console.log(this.km);
    let navigationExtras: NavigationExtras = {
        state: {
          ind: this.promocion,
          km: this.km,
          promocion: true,
        }
      };
    this.router.navigate(['busquedaEstablecimiento'],navigationExtras);
    this.modalControler.dismiss();
}



construirDatosaPagar(){

        let promocion = this.promocion;
        let listaBebidas = [];
        listaBebidas.push({idbebida: promocion.idbebida, descripcionbebida: promocion.descripcionbebida,
                           nombre: promocion.nombre, idsociocomercial: promocion.idsociocomercial,
                           nombrebebida: promocion.nombremarca + '/' + promocion.nombrebebida, nombremarca: promocion.nombremarca,
                           preciobebidasocio: promocion.preciobebidasocio, rutaimagenbebida: promocion.rutaimagenbebida, tipo:'promocion'},);
        
        promocion.bebidas = listaBebidas;

        for(let bebida of promocion.bebidas){
           bebida.cantidad = 1;
        }
        
        console.log(promocion);
        this.storage.set('carrito', promocion);
        this.metodosPago(promocion);
  }

  metodosPago(promocion){
    /*
    let navigationExtras: NavigationExtras = {
      state: {
        carrito:promocion
      }
    };
    this.router.navigate(['tarjetas'],navigationExtras);
    */
    this.modalControler.dismiss(promocion);
  
  }

}