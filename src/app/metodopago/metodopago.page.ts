import {Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import {ApiServiceService } from '../api-service.service';
import {NavController} from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-metodopago',
  templateUrl: './metodopago.page.html',
  styleUrls: ['./metodopago.page.scss'],
})
export class MetodopagoPage{
  carrito:any=[];
  total;
  t;
  establecimientosCoincidencia:any;
  establecimientosSeleccionados:any;
  constructor(
    private router:Router,
    private navCtrl: NavController,
    public route: ActivatedRoute,
    private location: Location,
    private apiService:ApiServiceService
  ) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.carrito = this.router.getCurrentNavigation().extras.state.carrito;
        this.total=this.router.getCurrentNavigation().extras.state.total;
        this.establecimientosCoincidencia = this.router.getCurrentNavigation().extras.state.establecimientosCoincidencia; 
      }
      
    });
  }

  ionViewDidEnter(): void { 

    let cantidad = 0;
    console.log(this.carrito);
    for(let c of this.carrito.bebidas){
      console.log("t"+c.preciobebidasocio);
       cantidad += c.preciobebidasocio;
    }
    this.t = cantidad;
  }

  regresar(){
    this.location.back();
  }

  pagoTarjetas(){
    //calcular ahorro

   let prom:number = 0;
   for(let e of this.establecimientosCoincidencia){
    if(e.idsociocomercial != this.carrito.bebidas[0].idsociocomercial){
      prom += Math.abs(e.total - this.t);
    } 
   }

   var promedio = prom/this.establecimientosCoincidencia.length-1;

   if(promedio < 0){
     promedio  = 0;
   }
   this.apiService.setStorage('ahorro',promedio.toFixed(2));
                      ///
    let navigationExtras: NavigationExtras = {
      state: {
        carrito:this.carrito,
        total:this.total,
        establecimientosCoincidencia:this.establecimientosCoincidencia
      }
    };
    this.router.navigate(['tarjetas'],navigationExtras);
  }

}


