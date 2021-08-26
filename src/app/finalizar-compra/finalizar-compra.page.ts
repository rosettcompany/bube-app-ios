import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import { LoadingController, ModalController,AlertController,NavController,PopoverController, Platform } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import { PopinfoComponent } from '../components/popinfo/popinfo.component';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';



declare var Mercadopago:any;

@Component({
  selector: 'app-finalizar-compra',
  templateUrl: './finalizar-compra.page.html',
  styleUrls: ['./finalizar-compra.page.scss'],
})
export class FinalizarCompraPage implements OnInit {
  loading:any;
  tarjeta:any;
  carrito:any;
  usuario:any;
  delivery:any;
  modalidad = 'Recojo'
  indicadorModalidad;
  total = 0;
  num_tarjeta;
  tipo;
  subscription;
  buttonDisabled = 'false';
  constructor(private router:Router,
              public route: ActivatedRoute,
              private modalControler: ModalController,
              private platform: Platform,
              public popoverController: PopoverController,
              private navCtrl: NavController,
              private firebaseAnalytics: FirebaseAnalytics,
              private apiServicio:ApiServiceService,
              public alertController: AlertController,
              public loadingController: LoadingController) {
    
    Mercadopago.setPublishableKey("APP_USR-e710be6c-9f94-4ec3-8830-5df20b925910"); 
    
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.carrito = this.router.getCurrentNavigation().extras.state.carrito;
        this.total =this.router.getCurrentNavigation().extras.state.total;
        this.tarjeta=this.router.getCurrentNavigation().extras.state.tarjeta;
        this.delivery = this.router.getCurrentNavigation().extras.state.delivery;
        console.log(this.carrito);
        console.log(this.total);
        console.log("TARJETA");
        console.log(this.tarjeta);
        
      }
      
    });
   }

  ngOnInit() {
    
  }
  ionViewDidEnter(): void {
  if(this.delivery.modalidad == "1"){
    this.modalidad = 'Delivery';
    this.indicadorModalidad = 'S/ '+(this.delivery.precio).toFixed(2);
  }else{
    this.modalidad = 'Recojo';
    this.indicadorModalidad = this.carrito.direccionsocio;
  }

    let t = String(this.tarjeta.tipo).substring(0,1);
    let tip = String(this.tarjeta.tipo).substring(1);
    console.log(t);
    console.log(tip);
    this.tipo=t.toLocaleUpperCase()+tip;
    this.num_tarjeta = String(this.tarjeta.numero).substring(String(this.tarjeta.numero).length-4,String(this.tarjeta.numero).length);
    console.log(this.num_tarjeta);

    this.googleAnalytics(); 
  }

     // Restore to default when leaving this page
ionViewDidLeave(): void {
  this.subscription.unsubscribe();
  this.popoverController.dismiss(0);
  this.buttonDisabled = 'false';
} 

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando..'
    });
    await this.loading.present();
  }

  comprobarDni(){
    this.buttonDisabled = 'true';
    this.apiServicio.getStorage('idusuario')
      .then(id =>{
        this.apiServicio.getDatosUsuario(id)
          .subscribe((user) =>{
            this.usuario=user[0];
            console.log(this.usuario);
            if(this.usuario.dni == null){
              this.abrirPop(this.usuario);
            }else{
              this.pagar();
            }
          },(er) =>{
            console.log("error al traer datos usuario");
            console.log(er);
            this.buttonDisabled = 'false';
            this.alertaConexion();
          })
      })
  }

  async abrirPop(usuario){
    const popover = await this.popoverController.create({
      component: PopinfoComponent,
      backdropDismiss:false,
      componentProps:{
        'usuario': usuario
      }
    });
    await popover.present();
    
    const {data}  = await popover.onDidDismiss();
    this.buttonDisabled = 'false';
    if(data.usuario != 0){
      this.usuario = data.usuario;
      console.log(this.usuario);
      this.pagar();
    }
  }

  async pagar(){
    this.presentLoading();
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });
    this.apiServicio.setStorage('tarjeta',this.tarjeta);
    this.apiServicio.setStorage('total',this.total);
    this.apiServicio.setStorage('carrito',this.carrito);

    let fecha = String(this.tarjeta.fecha).split("/",2);
    let mes = fecha[0];
    let anio = 20+fecha[1];

    Mercadopago.clearSession();

    console.log(this.tarjeta.numero);
    console.log(this.usuario);
    let bin = String(this.tarjeta.numero).substring(0,6);
   
    Mercadopago.getPaymentMethod({
      "bin": bin
    },this.setPaymentMethod);
      
        Mercadopago.createToken({
        "docType":"DNI",
        "docNumber":this.usuario.dni,
        "cardNumber": this.tarjeta.numero,
        "securityCode": this.tarjeta.cvv,
        "cardExpirationMonth":mes,
        "cardExpirationYear":anio,
        "cardholderName": this.tarjeta.titular,
        "installments":1
        },this.sdkResponseHandler);
   
  }

  setPaymentMethod(status, response) {
    if (status == 200) {
        console.log(response);
        let card =document.getElementById('txt-tipo') as HTMLIonInputElement;
        card.value = response[0].id;

    } else {
        alert(`payment method info error: ${response}`);
    }
    }

  sdkResponseHandler(status,response){
    if(status != 200 && status != 201){
      let card =document.getElementById('txt-token') as HTMLIonInputElement;
      console.log(card.value);
      card.value=response.cause[0].code;
      console.log(card.value);
      console.log("status "+response.cause[0].code);
      console.log(response);
    }else{
      let card =document.getElementById('txt-token') as HTMLIonInputElement;
      console.log(response);
      console.log(status);
      card.value=response.id;
     
    }
   
   }

   enviarDatosPago(): void{

      let id = document.getElementById('txt-token') as HTMLIonInputElement;
      console.log(id.value);

      if(String(id.value).length <= 4){
        this.loading.dismiss();
        switch(id.value){
          case 'E301': 
            this.presentAlertConfirm("Ingresa un número de tarjeta válido.");
            this.buttonDisabled = 'false';
            break;

          case 'E302':  
            this.presentAlertConfirm("Revisa el código de seguridad(CVV)");
            this.buttonDisabled = 'false';
            break;
          
          case '316':  
            this.presentAlertConfirm("Ingresa un nombre válido");
            this.buttonDisabled = 'false';
            break;

          case '324':  
            this.presentAlertConfirm("Ingresa tu documento valido");
            this.buttonDisabled = 'false';
            break;

          case '325':  
            this.presentAlertConfirm("El mes es inválido");
            this.buttonDisabled = 'false';
            break;

          case '326':  
            this.presentAlertConfirm("El año es inválido");
            this.buttonDisabled = 'false';
            break;

          case '106':  
            this.presentAlertConfirm("No puedes realizar pagos a otros países.");
            this.buttonDisabled = 'false';
            break;

          case '109':  
            this.presentAlertConfirm("no procesa pagos en cuotas. Elige otra tarjeta u otro medio de pago.");
            this.buttonDisabled = 'false';
            break;

          case '126':  
            this.presentAlertConfirm("No pudimos procesar tu pago.");
            this.buttonDisabled = 'false';
            break;

          case '129':  
            this.presentAlertConfirm("no procesa pagos del monto seleccionado. Elige otra tarjeta u otro medio de pago.");
            this.buttonDisabled = 'false';
            break;

          case '145':  
            this.presentAlertConfirm("Una de las partes con la que intentas hacer el pago es de prueba y la otra es usuario real.");
            this.buttonDisabled = 'false';
            break;

          case '150':  
            this.presentAlertConfirm("No puedes realizar pagos.");
            this.buttonDisabled = 'false';
            break;

          case '151':  
            this.presentAlertConfirm("No puedes realizar pagos.");
            this.buttonDisabled = 'false';
            break;

          case '160':  
            this.presentAlertConfirm("No pudimos procesar tu pago.");
            this.buttonDisabled = 'false';
            break;

          case '204':  
            this.presentAlertConfirm("No está disponible en este momento. Elige otra tarjeta u otro medio de pago.");
            this.buttonDisabled = 'false';
            break;

          case '801':  
            this.presentAlertConfirm("Realizaste un pago similar hace instantes. Intenta de nuevo en unos minutos.");
            this.buttonDisabled = 'false';
            break;

          default:
            this.presentAlertConfirm("No pudimos procesar tu pago. Intentelo más tarde");
            this.buttonDisabled = 'false';
            break;
        }

      }else{
        let cardTipo =document.getElementById('txt-tipo') as HTMLIonInputElement;
        let navigationExtras: NavigationExtras = {
          state: {
            token: id.value,
            cardTipo:cardTipo.value,
            delivery:this.delivery
          }
        };
        this.loading.dismiss();
        this.router.navigate(['loading'],navigationExtras);

      }
 }

 async presentAlertConfirm(msm) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: "Revisar datos de su tarjeta",
    message: msm,
    buttons: [
      {
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          this.navCtrl.back();
        }
      }
    ]
  });

  await alert.present();
}
async alertaConexion() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: "Error de Conexión",
    message: 'Por favor Verifique su conexión a internet',
    buttons: [
      {
        text: 'OK',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          console.log('Boton no');
        }
      }
    ]
  });

  await alert.present();
}

regresar(){
  let backbutton = document.getElementById('volver3') as HTMLIonBackButtonElement;
  backbutton.disabled = true;
}


  //  async presentLoading() {
  //    this.loading  = await this.loadingController.create({
  //     cssClass: 'my-custom-class',
  //     message: 'Esperte un momento...'  
  //     // duration: 3000
  //   });
  //   return this.loading.present();
  // }



// async modalPago(){
//   const modal= await this.modalControler.create({
//      component: ModalPagoPage,
//      backdropDismiss: false,
//      cssClass: 'center-modal',
//      componentProps:{
//         tarjeta:this.tarjeta,
//         carrito:this.carrito,
//         total:this.total
//      }
//    });

//   await modal.present();

// }

//googleAnalytics
googleAnalytics(){
      this.firebaseAnalytics.logEvent('pantalla',{pantalla:"pasarela_FinalizarCompra"})
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
