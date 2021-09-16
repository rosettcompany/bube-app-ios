import { Component} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiServiceService } from '../api-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-modalSeleccionarModalidad',
  templateUrl: './modalSeleccionarModalidad.page.html',
  styleUrls: ['./styles/modalSeleccionarModalidad.page.scss'],
})

export class modalSeleccionarModalidadPage{

  public carrito:any;
  public establecimientosCoincidencia:any;

  public cantidad = 0;
  public precioSubTotal = 0;
  public precioDelivery = 0;
  public precioTotal = 0;
  public latitud;
  public longitud;
  public horarioDeliveryInicio = '7:00:00';
  public horarioDeliveryFin = '20:00:00';
  public horarioAtencionInicio = '7:00:00';
  public horarioAtencionFin = '18:00:00';;
  public modalidad;
  public infoModalidad:Boolean = true;
  public infoRecojoTienda:Boolean = true;
  public DeliveryDisponible:Boolean = true;
  public esPromocion:Boolean = true;
  
  public tipoDelivery;
  public rango_entrega;
  public rango_entrega_visible:Boolean = false;
  public camposUbicacion = false;

  public dateNow;
  public timeNow;  
  

  public direccion;
  public piso_departamento;
  public referencia;

  public usuario;

  public botonHabilitado = false;

  constructor( private storage:Storage,
                 private service:ApiServiceService,
                 private modalCtrl:ModalController){}



  ionViewWillEnter(): void { 
      this.getLongitudLatitud();
      this.getIdUsuario();
      this.calcularCantidadPrecio();
      if(this.carrito.estado_horario_tienda == 0){
        let rd_tienda = document.getElementById('rd_tienda') as HTMLIonRadioElement;
        rd_tienda.disabled = true;
        this.infoModalidad = false;
        this.infoRecojoTienda = true;
      }else{
        this.infoRecojoTienda = false;
      }

      if(this.carrito.idpromocion != null){
        this.esPromocion = false;
      }else{
        this.esPromocion = true;
      }
      this.horarioAtencionInicio = (this.carrito.hora_inicio_atencion == null) ? '':this.convert(this.carrito.hora_inicio_atencion);
      this.horarioAtencionFin =  (this.carrito.hora_fin_atencion == null) ? '':this.convert(this.carrito.hora_fin_atencion);
      this.horarioDeliveryInicio = (this.carrito.hora_inicio_delivery == null)? '':this.convert(this.carrito.hora_inicio_delivery);
      this.horarioDeliveryFin =  (this.carrito.hora_fin_delivery == null) ? '':this.convert(this.carrito.hora_fin_delivery);
      this.tipoDelivery = (this.carrito.tipo_delivery == null) ? '':this.carrito.tipo_delivery;
      this.rango_entrega = (this.carrito.rango_entrega == null) ? '-':this.cambiarFormatoHora(this.carrito.rango_entrega);   
  }

  calcularCantidadPrecio(){
    for(let bebida of this.carrito.bebidas){
      this.cantidad += bebida.cantidad;
      this.precioSubTotal += bebida.preciobebidasocio*bebida.cantidad;
    }
  }
  getLongitudLatitud(){
      this.storage.get('longitud')
      .then((val) =>{
        this.longitud= parseFloat(val);
        this.storage.get('latitud')
        .then((val) =>{
          this.latitud = parseFloat(val);
          this.getTimeNow();
        });
      });
  }

  getPrecioDelivery(){
    let data = {idSocioComercial: this.carrito.idsociocomercial,latitud:this.latitud,longitud:this.longitud}
    console.log(data)
    this.service.getPrecioDelivery(data)
    .then(data=>{

          let radio1 = document.getElementById('radio1') as HTMLIonRadioElement;
          if(data == null || data == undefined){
            this.DeliveryDisponible = false;
            radio1.disabled = true;
            this.camposUbicacion = false;
            
          }else{
            this.precioDelivery = Number(data[0].precio.toFixed(2));
            this.DeliveryDisponible = true;
           radio1.disabled = false;
           this.camposUbicacion = true;
          }
          this.cambiarModalidad();
    }).catch(error=>{

          console.log(error);
    });
  }

  getIdUsuario(){
    this.service.getStorage('idusuario')
    .then(id =>{
      this.service.getDatosUsuario(id)
       .subscribe((data) =>{     
        this.usuario = data[0];
        this.storage.get('ubicacion')
        .then((data)=>{

          this.direccion = data;
          this.piso_departamento = (this.usuario.piso_departamento == null) ? '':this.usuario.piso_departamento;
          this.referencia = (this.usuario.referencia == null) ? '':this.usuario.referencia;

        }).catch((error)=>{
          console.log(error)
        });
      
       },
       (error) =>{
         console.log(error);
       });
 
    });
  }


  procesarPago(){
      this.actualizarDatosUbicacion();
  }

  actualizarDatosUbicacion(){
    this.botonHabilitado = true;
    let data = {"idUsuario":this.usuario.idusuario,"direccion":this.direccion,"piso_departamento":this.piso_departamento, "referencia":this.referencia}
    this.putDatosUbicacion(data);
  }

  putDatosUbicacion(data){
      this.service.putActualizarUbicacion(data)
      .then((res)=>{
          this.botonHabilitado = false;
          let delivery = {modalidad:this.modalidad,precio:this.precioDelivery}
          let data = {carrito:this.carrito,establecimientosCoincidencia:this.establecimientosCoincidencia,delivery:delivery};
          this.modalCtrl.dismiss(data);

      }).catch((error)=>{
        console.log(error)
        this.botonHabilitado = false;
      });
  }

  cambiarModalidad(){
    if(this.modalidad == "1" ){
        console.log("DELIVERY");
        this.camposUbicacion = true;
        this.precioTotal = this.precioSubTotal + this.precioDelivery;
        this.infoModalidad = false;

        if(this.tipoDelivery == 1){
          this.rango_entrega_visible = false;
        }else{
          this.rango_entrega_visible = true;
        }
    }else{
      if(this.modalidad == "2"){
        console.log("LOCAL");
        this.precioTotal = this.precioSubTotal;
        this.camposUbicacion = false;
        this.infoModalidad = true;
        this.rango_entrega_visible = false;
      }

    }
  }
  agregarDia(){
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    return tomorrow;
  }

  verificarDisponibilidadDelivery(){

    var dateString1 = String(this.dateNow)+' '+String(this.carrito.hora_inicio_delivery);
    var jdt1 = moment(dateString1, "DD/MM/YYYY HH:mm:ss A").toDate();
 
    var dateString2 = String(this.dateNow)+' '+String(this.carrito.hora_fin_delivery);
    var jdt2 = moment(dateString2, "DD/MM/YYYY HH:mm:ss A").toDate();
 
    var dateString3 = String(this.dateNow)+' '+String(this.timeNow);
    var jdt3 = moment(dateString3, "DD/MM/YYYY HH:mm:ss A").toDate();

    console.log("Date "+this.dateNow);
    console.log(this.timeNow)
    console.log(this.carrito.hora_fin_delivery)
    console.log(this.carrito.hora_inicio_delivery)
    console.log("H inicio"+jdt1);
    console.log("H fin "+jdt2);
    console.log("H now"+ jdt3);
    
    if(jdt2 < jdt1){
      let fechaSumada = this.agregarDia();
      let fechaParceada = this.dateAsYYYYMMDDHHNNSSIos(fechaSumada);
      fechaParceada = this.converFecha(fechaParceada);
      jdt2 = moment(dateString2, "DD/MM/YYYY HH:mm:ss A").toDate();
    }

    if(jdt3>jdt1 && jdt3<jdt2){
      console.log('DENTRO DEL RANGO')
      this.DeliveryDisponible = false;
      this.modalidad = '1';
      this.getPrecioDelivery();
    }else{
      console.log('FUERA DEL RANGO')
      this.DeliveryDisponible = true;
      this.camposUbicacion = false;

      if(this.carrito.estado_horario_tienda == 0){
          let botonPagar = document.getElementById("botonPagar") as HTMLIonButtonElement;
          botonPagar.disabled = true;
      }else{
        this.modalidad = '2';
      }
    }
  }

  getTimeNow(){
    this.service.getFechaActual()
    .subscribe(data=>{
      let today = new Date();  

      today.setTime(Date.parse(data[0].fecha.replace('-','/','g')));
      console.log(today)          
      this.timeNow = this.dateAsHHNNSS(today);
      //this.dateNow = this.dateAsYYYYMMDDHHNNSS(today);
      this.dateNow = this.dateAsYYYYMMDDHHNNSSIos(today);
      this.dateNow = this.converFecha(this.dateNow);

      this.verificarDisponibilidadDelivery();
    },(error)=>{
      console.log(error)
    });
  }
  
 convert(input) {
  return moment(input, 'HH:mm:ss').format('h:mm A');
}

converFecha(input){
  return moment(input, 'YYYY/MM/DD').format('DD/MM/YYYY');
}

  dateAsYYYYMMDDHHNNSS(date): string {
    return date.getFullYear()
              + '-' + this.leftpad(date.getMonth() + 1, 2)
              + '-' + this.leftpad(date.getDate(), 2);
              /*+ ' ' + this.leftpad(date.getHours(), 2)
              + ':' + this.leftpad(date.getMinutes(), 2)
              + ':' + this.leftpad(date.getSeconds(), 2);
              */
  }

  dateAsYYYYMMDDHHNNSSIos(date): string {
    return date.getFullYear()
              + '/' + this.leftpad(date.getMonth() + 1, 2)
              + '/' + this.leftpad(date.getDate(), 2);              
              /*+ ' ' + this.leftpad(date.getHours(), 2)
              + ':' + this.leftpad(date.getMinutes(), 2)
              + ':' + this.leftpad(date.getSeconds(), 2);
              */
  }

  dateAsHHNNSS(date): string {
    return  this.leftpad(date.getHours(), 2)
              + ':' + this.leftpad(date.getMinutes(), 2)
              + ':' + this.leftpad(date.getSeconds(), 2);
  }

  leftpad(val, resultLength = 2, leftpadChar = '0'): string {
    return (String(leftpadChar).repeat(resultLength)
          + String(val)).slice(String(val).length);
  }

  modalDismiss(){
    this.modalCtrl.dismiss(undefined)
  }

  cambiarFormatoHora(hora){
    return String(hora).substring(0,2); 
  }
  
  cerrarModal(){
    this.modalCtrl.dismiss(null);
  }
}