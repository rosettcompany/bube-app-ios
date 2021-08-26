import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, LoadingController } from '@ionic/angular';
import {ApiServiceService} from '../api-service.service';
import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

@Component({
  selector: 'app-ahorro',
  templateUrl: './ahorro.page.html',
  styleUrls: [
    './styles/ahorro.page.scss',
    './styles/ahorro.shell.scss',
    './styles/ahorro.responsive.scss'
  ]
})
export class ahorroPage {

  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;

   
  DataGrafico: any;
  ahorros:any;
  ahorrosMes:any;

  defaultAnio:String;
  defaultMes:String;
  envioDatos = {};

  ahorroTotal:number;
  totalMes:number = 0;

  detalleVisible = false;
  ahorrosVisible = false;
  tituloVisible = false;
  mesVisible  = false;

  mes:String;

  ///// LOADING
  loading:any;


  
  constructor(public menu: MenuController, 
              public router: Router,
              private firebaseAnalytics: FirebaseAnalytics,
              public apiService:ApiServiceService,
              public loadingController: LoadingController,
              public storage: Storage) { }

  // Disable side menu for this page
  ionViewWillEnter(): void {
    this.menu.enable(false);
    this.getFechaActual();
    this.CargarDatos();
  }
  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
    this.detalleVisible = false;
    this.mesVisible = false;
  }

  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.googleAnalytics();
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando'
    });
    await this.loading.present();
  }

  getFechaActual(){
    var d = new Date();
    var anio = d.getFullYear();
    var mes = d.getMonth();
    this.defaultAnio = String(anio);
    this.defaultMes = String(mes+1);
  }


   // METODO CARGA INICIAL DE TODOS LOS DATOS
  CargarDatos() {
     
    if(this.ahorros == null) this.presentLoading();

    let Valoranio:String = this.defaultAnio;
    let Valormes:String = this.defaultMes;
    let idusuario:number;
    this.storage.get('idusuario')
    .then((val) =>{

         idusuario = val;
          /// NO OLVIDAR CAMBIAR ESTA PARTE EL ID USUARIO
         this.envioDatos = {"idUsuario": idusuario, "anio": Valoranio, "mes": Valormes}
         console.log(this.envioDatos);
         this.getDataGrafico(this.envioDatos);
         this.getAhorrosMes(this.envioDatos);
    });

   }

   getAhorroTotal(){
    let subTotal = 0;
     for(let ahorro of this.ahorrosMes){
        subTotal = subTotal + ahorro.ahorro;
     }
     this.ahorroTotal = subTotal;
     this.ahorroTotal.toFixed(2);
   }

   // METODO PARA CARGAR DATOS CUANDO LOS COMBOBOX CAMBIAN
  ionChange(): void{

      let Valoranio:String = this.defaultAnio;
      let Valormes:String = this.defaultMes;
      let idusuario:number;
      this.storage.get('idusuario')
      .then((val) =>{

           idusuario = val;
            
           this.envioDatos = {"idUsuario": idusuario, "anio": Valoranio, "mes": Valormes}
           console.log(this.envioDatos);
           this.getAhorros(this.envioDatos);
           this.getDataGrafico(this.envioDatos);
      });      
  }

  verDetalle(ahorro){

    let idusuario:number;
    this.storage.get('idusuario')
    .then((val) =>{
      idusuario = val;
    this.envioDatos = {"idUsuario": idusuario, "anio": ahorro.anio, "mes": ahorro.numeromes}
    this.mes  = this.getMeses(ahorro.mes);
    this.getAhorros(this.envioDatos);
   });   
  }

  ocultarDetalle(){
    this.ahorrosVisible = true;
    this.detalleVisible = false;
    this.tituloVisible = true;
    this.mesVisible = false;
  }



  // METODOS PARA CONSUMIR API
    // METODO GET DE LISTA DE AHORROS
  getAhorros(val){
          this.apiService.getAhorros(val)
          .then(res => {
             console.log("Datos Cargados");
             this.ahorros = res;
             this.ahorrosVisible = false;
             this.detalleVisible = true;
             this.tituloVisible = false;
             this.mesVisible = true;

             this.ContarTotalPorMes();

             console.log(res);
             this.loading.dismiss();

          })
          .catch(error =>{
            console.log(error);
            this.loading.dismiss();
      });
  }

  ContarTotalPorMes(){
    let ultimo = this.ahorros.length;
    ultimo --;
    this.ahorros.splice(ultimo, 1);

    let subTotalMes = 0;
    let ind = 0;
    for(let ahorro of this.ahorros){
        
      if(ind < this.ahorros.length){
        subTotalMes += ahorro.ahorrocompra;
      }
      ind ++;  
    }
    this.totalMes = subTotalMes;

  }

    // METODO GET DE LISTA DE AHORROS
  getAhorrosMes(val){
          this.apiService.getAhorrosMes(val)
          .then(res => {
             console.log("Datos Cargados");
             this.ahorrosMes = res;

             if(this.ahorrosMes.length > 11){
              this.ahorrosMes = this.ahorrosMes.slice(0, 12);
             }
             this.ahorrosVisible = true;
             this.tituloVisible = true;
             console.log(res);
             this.getAhorroTotal();
            

             this.loading.dismiss();

          })
          .catch(error =>{
            console.log(error);
            this.loading.dismiss();
      });
  }  
  
    // METODO GET DE LISTA DEL GRAFICO
  getDataGrafico(val){
            this.apiService.getDataGrafico(val)
            .then(res => {
              console.log("Datos Grafico cargado");
              this.DataGrafico = res;
              console.log(res);
              this.createBarChart();
              
              

            })
            .catch(error =>{
              console.log(error);
            });
  }



  // METODO PARA CREAR EL GRAFICO
  createBarChart() {

    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto','Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: [{
          label: 'Soles ahorrados',
          data: [this.cargarDatosGrafico("Jan"),this.cargarDatosGrafico("Feb"), this.cargarDatosGrafico("Mar"), this.cargarDatosGrafico("Apr"), this.cargarDatosGrafico("May"),
          this.cargarDatosGrafico("Jun"), this.cargarDatosGrafico("Jul"), this.cargarDatosGrafico("Aug"), this.cargarDatosGrafico("Sep"), this.cargarDatosGrafico("Oct"), this.cargarDatosGrafico("Nov"),
          this.cargarDatosGrafico("Dec")],
          backgroundColor: 'rgba(0,0,0,0)', // array should have same number of elements as number of, dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

 // METODO PARA GARDAR LOS DATOS DEL GRAFICO
  cargarDatosGrafico(value): Number{
           
            let ret: number;
            let data = [];
          if(this.DataGrafico.find(Mes => Mes.mes === value)){

              data = this.DataGrafico.filter(Mes => Mes.mes === value);
              ret = data[0]["ahorro"];
          }else{
            ret = 0;
          }
          return ret;
  }

  getMeses(mes:String): String{
      
    switch(mes){

      case 'Jan':
        return 'Enero';
      case 'Feb':
        return 'Febrero';
      case 'Mar':
        return 'Marzo';
      case 'Apr':
        return 'Abril';
      case 'May':
        return 'Mayo';
      case 'Jun':
        return 'Junio';
      case 'Jul':
        return 'Julio';
      case 'Aug':
        return 'Agosto';
      case 'Sep':
        return 'Septiembre';
      case 'Oct':
        return 'Octubre';
      case 'Nov':
        return 'Noviembre';
      case 'Dec':
        return 'Diciembre';


    }
  }

 // googleAnalytics
 googleAnalytics(){
  this.firebaseAnalytics.logEvent('pantalla',{pantalla:"ahorro"})
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