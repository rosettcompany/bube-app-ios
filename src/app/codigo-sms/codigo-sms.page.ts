import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AlertController, LoadingController, NavController, Platform, ToastController } from '@ionic/angular';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-codigo-sms',
  templateUrl: './codigo-sms.page.html',
  styleUrls: ['./styles/codigo-sms.page.scss'],
})
export class CodigoSmsPage implements OnInit {
  public usuario:any="";
  public codigo:string;
  public codigoSms:string;
  loading:any;

  code1;
  code2;
  code3;
  code4;
  code5;
  code6;
  contador;
  public n = 30;

  desctividarContador=true;

  @ViewChild('input1') input1 : any;
  @ViewChild('input2') input2 : any;
  @ViewChild('input3') input3 : any;
  @ViewChild('input4') input4 : any; 
  @ViewChild('input5') input5 : any; 
  @ViewChild('input6') input6 : any; 

  subscription;

  constructor(
    public router: Router, 
    private apiservicio: ApiServiceService,
    private firebaseAuthentication: FirebaseAuthentication,
    private alertControler:AlertController,
    private route:ActivatedRoute,
    public toastController: ToastController,
    private platform: Platform,
    private navCtrl: NavController,
    public loadingController: LoadingController
  ) {

    
    this.route.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
        this.codigo = this.router.getCurrentNavigation().extras.state.codigo;
      }
    })
   }

  ngOnInit() {
    
    let that = this;
    window.setInterval(function(){

        if(that.contador == 0){
          that.desctividarContador = false;
         }else{
           that.contador = that.n;
           that.n--;
         }
      
    },1000);

    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
      if(this.loading != null || this.loading != undefined){
        this.loading.dismiss();
      }
      this.navCtrl.pop();
    });
  }

  verificarCodigo(){
    this.presentLoading();
    this.codigoSms = String(this.code1)+String(this.code2)+String(this.code3)+String(this.code4)+String(this.code5)+String(this.code6);

    if(this.codigoSms.length == 6){
      this.firebaseAuthentication.signInWithVerificationId(this.codigo,this.codigoSms)
          .then(res =>{
            console.log(res);
            this.loading.dismiss();
            this.irValidacionFechaNacimieto()
          })
          .catch(er =>{
            console.log(er);
            this.loading.dismiss();
            console.log("error")
            this.presentAlert();
          });
    }
  }

  irValidacionFechaNacimieto(){

    let navigationExtras: NavigationExtras = {
      state: {
        nuevoUsuario:this.usuario,
        tipoRegistro:  'tel'
      }
    };

    this.router.navigate(['validacion-fecha-nacimiento'],navigationExtras)
  }

  async presentAlert() {
    const alert = await this.alertControler.create({
      cssClass: 'my-custom-class',
      header: 'Código incorrecto',
      subHeader: 'El código ingresado es incorrecto.',
      message: 'Si no le llegó el SMS con el código puede reenviarlo.',
      buttons: ['OK']
    });

    await alert.present();
  }

  reenviarCodigo(){
    this.presentLoading1();
    this.enviarMensaje();
  }

  enviarMensaje(){
    this.borrarCodigos();
    this.firebaseAuthentication.verifyPhoneNumber("+51"+this.usuario.telefono.toString(),30000)
    .then(res =>{
      this.loading.dismiss();
     this.presentToastOK();
     this.n = 30;
     this.contador = 30;
     this.desctividarContador = true;
     this.codigo = res;
    })
    .catch(er =>{
      console.log(er);
      this.loading.dismiss();
      this.presentToastERROR();
    });
  }

  async presentToastOK() {
    const toast = await this.toastController.create({
      message: 'Mensaje de texto enviado.',
      duration: 2000,
      color:'success'
    });
    toast.present();
  }
  async presentToastERROR() {
    const toast = await this.toastController.create({
      message: 'Mensaje de texto no se pudo enviar.',
      duration: 2000,
      color:'danger'
    });
    toast.present();
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class custom-loading',
      message: 'Verificando...',
      translucent: true,
      animated: true
    });
    await this.loading.present();
  }

  async presentLoading1() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class custom-loading',
      message: 'Enviando...',
      translucent: true,
      animated: true
    });
    await this.loading.present();
  }

  focusInput1(): void {
    if(String(this.code1).length > 0){
      if(String(this.code1).length == 1){
        this.focusInput2();
      }else{
        setTimeout(() => {
          this.input1.setFocus();
        }, 100);
      }
    }else{
      this.input1.setFocus();
    }
  }

  focusInput2(): void {
    if(String(this.code1).length > 0){
      if(String(this.code2).length == 1){
        this.focusInput3();
      }else{
        setTimeout(() => {
          this.input2.setFocus();
        }, 100);
      }
    }else{
      this.input1.setFocus();
    }
  }

  focusInput3(): void {
    if(String(this.code1).length > 0){
      if(String(this.code3).length == 1){
        this.focusInput4();
      }else{
        setTimeout(() => {
          this.input3.setFocus();
        }, 100);
      }
    }else{
      this.input1.setFocus();
    }
  }

  focusInput4(): void {
    if(String(this.code1).length > 0){
      if(String(this.code4).length == 1){
        this.focusInput5();
      }else{
        setTimeout(() => {
          this.input4.setFocus();
        }, 100);
      }
    }else{
      this.input1.setFocus();
    }

  }

  focusInput5(): void {
    if(String(this.code1).length > 0){
      if(String(this.code5).length == 1){
        this.focusInput6();
      }else{
        setTimeout(() => {
          this.input5.setFocus();
        }, 100);
      }
    }else{
      this.input1.setFocus();
    }

  }

  focusInput6(): void {
    if(String(this.code1).length > 0){
      if(String(this.code6).length == 1){
        this.verificarCodigo();
      }else{
        setTimeout(() => {
          this.input6.setFocus();
        }, 100);
      }
    }else{
      this.input1.setFocus();
    }
  }

  borrarCodigos(){
    this.code6 = '';
    this.code5 = '';
    this.code4 = '';
    this.code3 = '';
    this.code2 = '';
    this.code1 = '';
  }
}

