import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { AlertController, Platform ,NavController} from '@ionic/angular';



@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {
  token:any;
  tarjeta:any;
  carrito:any;
  total;
  estado;
  id;
  compra:any=[];
  detalle:any;
  ahorro;
  delivery:any;
  cardTipo:any;
  subscription;

  constructor(
    private apiServicio:ApiServiceService,
    private router: Router,
    private platform: Platform,
    private navCtrl: NavController,
    public route: ActivatedRoute,
    public alertController: AlertController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.id = this.router.getCurrentNavigation().extras.state.token;
        this.cardTipo = router.getCurrentNavigation().extras.state.cardTipo;
        this.delivery = this.router.getCurrentNavigation().extras.state.delivery;
        console.log(this.id);
      }
      
    }); 
   }


  ngOnInit() {
   
  }

  ionViewDidEnter(): void {

    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });

    this.apiServicio.getStorage('ahorro')
      .then(a =>{
        this.ahorro=a;
        
      });
    console.log("estodo si");
    this.apiServicio.getStorage('tarjeta')
        .then(res =>{
          console.log(res);
          this.tarjeta=res;
          this.apiServicio.getDatosUsuario(this.tarjeta.idusuario)
          .subscribe((res1) =>{
            this.apiServicio.getStorage('carrito')
            .then(car =>{
              let items = [];
              console.log(JSON.stringify(car));
              for(let bebida of car.bebidas){
                let item ={
                  "id":String(bebida.idbebida),
                  "title":bebida.nombre,
                  "description":bebida.nombrebebida,
                  "pictureUrl":bebida.rutaimagenbebida,
                  "quantity":bebida.cantidad,
                  "unitPrice":bebida.preciobebidasocio
                }
                items.push(item);
              }

              this.enviarToken(res1,items,car.nombrecomercial);
            })
            .catch(er =>{
              console.log(er);
            })
          },(er)=>{
            console.log(er);
          });
    });
  }

   // Restore to default when leaving this page
ionViewDidLeave(): void {
  this.subscription.unsubscribe();
} 

enviarToken(t,items,tienda){
  
  this.apiServicio.getStorage('total')
    .then(total =>{
        this.total=total;
        console.log('token');
        this.token={
          'token':this.id,
          'descripcion':'Compra bube',
          'tipo':this.cardTipo,
          'email':t[0].emailusuario,
          'total':total,
          'idusuario':tienda,
          'dni':t[0].dni,
          'nombreUsuario':t[0].nombresusuario,
          'apellidoUsuario':t[0].apellidosusuario,
          'item':items
        };
        console.log(this.token);

        this.apiServicio.enviarTokerTarjeta(this.token)
          .then(r =>{
            this.estado=r;
            console.log("estatus token");
            console.log(this.estado);

            if(this.estado.status =="approved"){
              this.construiCarrito();
            }else{
             this.mostrarMensajes();
            }
          })
          .catch(error =>{
            console.log(error);
         });
         
          
    });
}

construiCarrito(){
  this.apiServicio.getStorage('carrito')
    .then(res =>{
      var car:any;
      car = res;
      
      this.apiServicio.getStorage('ubicacion')
      .then(dire =>{

        var digitos = String(this.tarjeta.numero).substring(String(this.tarjeta.numero).length-4,String(this.tarjeta.numero).length);
        var tipo = String(this.tarjeta.tipo+"-"+digitos);

        this.carrito={
          "idusuario":this.tarjeta.idusuario,
          "idsociocomercial": car.idsociocomercial,
          "fechacompra":"2020-10-24",
          "tipopagocompra":tipo,
          "montocompra":Number(this.total),
          "estadocompra":0,
          "ahorrocompra":this.ahorro,
          "modalidad":Number(car.modalidad),
          "direccion_usuario": dire
        };
        console.log(this.carrito);
        this.guardarCompra(this.carrito,car);

        this.apiServicio.getStorage('regalo')
        .then(res =>{
          if(Number(res) != 0){
            this.guardarNotificacion(this.tarjeta.idusuario);
            this.guardarNotificacionAmigo(this.tarjeta.idusuario);
          }else{
            console.log("no es regalo");
          }
        })
        .catch(er=>{
          console.log("error al sacar amigo");
        });

      })
      .catch(er=>{
        console.log(er);
      });

       
      
    });
}

  guardarCompra(carro,car){
    this.apiServicio.guardarCompra(carro)
            .then(res =>{
              var r:any = res;
              var idcompra = r[0].idcompra;
              console.log(idcompra);

              var listaDetalle:any=[];
              var lista:any;
              for(let c of car.bebidas){

                if(c.tipo == "promocion")
                    lista={"idcompra": idcompra,"idbebida": 0,"subtotal":c.preciobebidasocio,"cantidad":c.cantidad, "idpromocion": c.idbebida}
                else
                   lista={"idcompra":idcompra,"idbebida":c.idbebida,"subtotal":c.preciobebidasocio,"cantidad":c.cantidad, "idpromocion": 'P0'}


                listaDetalle.push(lista);
              }
              this.detalle={"idcompra":idcompra,"listaDetalle":JSON.stringify(listaDetalle)};
              this.guardarDetalleCompra(this.detalle, car);

            })
            .catch(e =>{
              console.log("error comprobante");
              console.log(e);
          });
  }

  guardarDetalleCompra(detalle, car){
    console.log(detalle);
    this.apiServicio.guardarDetalleCompra(detalle)
      .then(res =>{
        console.log(res);
        this.compra=res;
        console.log(this.compra);
            
              let navigationExtras: NavigationExtras = {
                state: {
                  compra: this.compra,
                  car: car,
                  tipotarjeta:this.tarjeta.tipo,
                  delivery:this.delivery
                }
              };
          
          this.router.navigate(['comprobante'],navigationExtras);    
      })
      .catch(e =>{
        console.log("error detalle compra");
        console.log(e);
      });

  }

  guardarNotificacion(iduser){
    this.apiServicio.getDatosUsuario(iduser)
       .subscribe((data) =>{
         let user = data[0];
        
         this.apiServicio.getStorage('amigo')
         .then(amigo =>{
          let desc = user.nombresusuario+" enviaste un regalo a "+amigo;
          let notificacion = {
            "usuario":{
              "idUsuario":iduser
            },
            "idnotificacion":1,
            "descripcion":desc,
            "fecha_notificacion":"2020-10-24",
            "fecha_fin":"2020-10-24"
          }
          this.apiServicio.insertarNotificacion(notificacion)
          .then(res =>{
            console.log(res);
          })
          .catch(er =>{
            console.log(er);
            console.log("error insertar notificacion");
          });
  
      })
      .catch(er =>{
        console.log("error al sacar regalo");
      });
       },
       (error) =>{
         console.log(error);
       });
    
  }
  guardarNotificacionAmigo(iduser){
    this.apiServicio.getDatosUsuario(iduser)
       .subscribe((data) =>{
         let user = data[0];
         this.apiServicio.getStorage('regalo')
         .then(res =>{
        
         this.apiServicio.getStorage('amigo')
         .then(amigo =>{
          let desc = amigo+" acabas de recibir un regalo de "+user.nombresusuario;
          let notificacion = {
            "usuario":{
              "idUsuario":res
            },
            "idnotificacion":1,
            "descripcion":desc,
            "fecha_notificacion":"2020-10-24",
            "fecha_fin":"2020-10-24"
          }
          this.apiServicio.insertarNotificacion(notificacion)
          .then(res =>{
            console.log(res);
          })
          .catch(er =>{
            console.log(er);
            console.log("error insertar notificacion");
          });
        })
        .catch(er=>{
          console.log("error al sacar amigo");
        });

      })
      .catch(er =>{
        console.log("error al sacar regalo");
      });
       },
       (error) =>{
         console.log(error);
       });
    
  }


  mostrarMensajes(){
    if(this.estado.status == "in_process"){
      switch(this.estado.statusDetail){
        case 'pending_contingency':
          let titulo = "Estamos procesando tu pago.";
          let mensaje = "No te preocupes, menos de 2 días hábiles te avisaremos por e-mail si se acreditó.";
          this.presentAlertPagoPendiente(titulo,mensaje);
          break;
        case 'pending_review_manual':
          let titulo2 = "Estamos procesando tu pago.";
          let mensaje2 = "No te preocupes, menos de 2 días hábiles te avisaremos por e-mail si se acreditó o si necesitamos más información.";
          this.presentAlertPagoPendiente(titulo2,mensaje2);
          break;
      }
    }else if(this.estado.status == "rejected"){
      let titulo;
      let mensaje;
      switch(this.estado.statusDetail){
        case 'cc_rejected_bad_filled_card_number':
          titulo = "Tu pago fue rechazado.";
          mensaje = "Revisa el número de tarjeta.";
          this.presentAlertPagoRechasado(titulo,mensaje);
          break;

        case 'cc_rejected_bad_filled_date':
          titulo = "Tu pago fue rechazado.";
          mensaje = "Revisa la fecha de vencimiento.";
          this.presentAlertPagoRechasado(titulo,mensaje);
          break;

        case 'cc_rejected_bad_filled_other':
          titulo = "Tu pago fue rechazado.";
          mensaje = "Revisa los datos de su tarjeta que esten correctos.";
          this.presentAlertPagoRechasado(titulo,mensaje);
          break;

        case 'cc_rejected_bad_filled_security_code':
          titulo = "Tu pago fue rechazado.";
          mensaje = "Revisa el código de seguridad de la tarjeta.";
          this.presentAlertPagoRechasado(titulo,mensaje);
          break;

        case 'cc_rejected_blacklist':
          titulo = "Tu pago fue rechazado.";
          mensaje = "No pudimos procesar tu pago.";
          this.presentAlertPagoRechasado(titulo,mensaje);
          break;

        case 'cc_rejected_call_for_authorize':
          titulo = "Tu pago fue rechazado.";
          mensaje = "Debes autorizar ante su entidad bancaria el pago realizado.";
          this.presentAlertPagoRechasado(titulo,mensaje);
          break;

        case 'cc_rejected_card_disabled':
          titulo = "Tu pago fue rechazado.";
          mensaje = "Llama a su entidad bancaria para activar tu tarjeta o usa otro medio de pago.";
          this.presentAlertPagoRechasado(titulo,mensaje);
          break;
        
        case 'cc_rejected_card_error':
          titulo = "Tu pago fue rechazado.";
          mensaje = "No pudimos procesar tu pago.";
          this.presentAlertPagoRechasado(titulo,mensaje);
          break;

        case 'cc_rejected_duplicated_payment':
          titulo = "Tu pago fue rechazado.";
          mensaje = "Ya hiciste un pago por ese valor. Si necesitas volver a pagar usa otra tarjeta u otro medio de pago.";
          this.presentAlertPagoRechasado(titulo,mensaje);
          break;

        case 'cc_rejected_high_risk':
          titulo = "Tu pago fue rechazado.";
          mensaje = "Elige otro de los medios de pago, te recomendamos con medios en efectivo.";
          this.presentAlertPagoRechasado(titulo,mensaje);
          break;

        case 'cc_rejected_insufficient_amount':
          titulo = "Tu pago fue rechazado.";
          mensaje = "No tienes fondos suficientes.";
          this.presentAlertPagoRechasado(titulo,mensaje);
          break;

        case 'cc_rejected_invalid_installments':
          titulo = "Tu pago fue rechazado.";
          mensaje = "Su cuenta no procesa pagos en cuotas.";
          this.presentAlertPagoRechasado(titulo,mensaje);
          break;

        case 'cc_rejected_max_attempts':
          titulo = "Tu pago fue rechazado.";
          mensaje = "Llegaste al límite de intentos permitidos. Elige otra tarjeta u otro medio de pago.";
          this.presentAlertPagoRechasado(titulo,mensaje);
          break;

        case 'cc_rejected_other_reason':
          titulo = "Tu pago fue rechazado.";
          mensaje = "Tu tarjeta no procesó el pago.";
          this.presentAlertPagoRechasado(titulo,mensaje);
          break;
      }
    }else{
      let titulo = "Error en el servicio";
      let mensaje = "Obtuvimos un problema en el servidor.";
      this.presentAlertPagoRechasado(titulo,mensaje);
    }

  }

  async presentAlertPagoPendiente(titulo,messaje) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      message: messaje,
      backdropDismiss: false,
      buttons: [
         {
          text: 'Salir',
          handler: () => {
            this.router.navigate(['./app/inicio']);
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertPagoRechasado(titulo,messaje) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      message: messaje,
      backdropDismiss: false,
      buttons: [
         {
          text: 'Regresar',
          handler: () => {
            this.navCtrl.back();
          }
        }
      ]
    });

    await alert.present();
  }
  
  

  

}
