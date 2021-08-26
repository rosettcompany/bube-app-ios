import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-codigo-email',
  templateUrl: './codigo-email.page.html',
  styleUrls: ['./styles/codigo-email.page.scss'],
})
export class CodigoEmailPage implements OnInit {

  codigo;
  correo;
  private nuevoUsuario:any;
  code1 = '';
  code2 = '';
  code3 = '';
  code4 = '';

  eventoPropagacion = false;
  @ViewChild('input1') input1 : any;
  @ViewChild('input2') input2 : any;
  @ViewChild('input3') input3 : any;
  @ViewChild('input4') input4 : any; 


  desctividarContador=true;
  public n = 30;
  contador;

  constructor(    private router:Router,
    public alertController: AlertController,
    private route:ActivatedRoute,
    private platform: Platform,
    private navCtrl: NavController,
    private apiServicio:ApiServiceService) { 
      
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.codigo = this.router.getCurrentNavigation().extras.state.codigo;
          this.correo = this.router.getCurrentNavigation().extras.state.correo;
          this.nuevoUsuario = this.router.getCurrentNavigation().extras.state.nuevoUsuario;
        }
      });

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
      this.focusInput1();
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
      this.focusInput1();
    }
  }

  focusInput4(): void {
    if(String(this.code1).length > 0){
      if(String(this.code4).length == 1){
        this.compararCodigo();
      }else{
        setTimeout(() => {
          this.input4.setFocus();
        }, 100);
      }
    }else{
      this.focusInput1();
    }
  }
  compararCodigo(){
    let code = this.code1+this.code2+this.code3+this.code4;
    if(this.codigo == String(code).toUpperCase()){

        this.irValidacionFechaNacimieto()
    }else{
      this.AlertError();
    }
  }

  borrarCodigos(){
    this.code4 = '';
    this.code3 = '';
    this.code2 = '';
    this.code1 = '';
  }

  irValidacionFechaNacimieto(){

    let navigationExtras: NavigationExtras = {
      state: {
        nuevoUsuario:this.nuevoUsuario,
        tipoRegistro:  'email'
      }
    };

    this.router.navigate(['validacion-fecha-nacimiento'],navigationExtras)
  }

  async AlertError() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Código incorrecto intentelo de nuevo',
      buttons: ['OK']
    });

    await alert.present();
  }

  enviarCodigo(){
    this.desctividarContador = true;
    this.n = 30;
    this.contador = 30;
    this.borrarCodigos();
    let cod = this.generaCodigo();
          let cuerpo = "<h4>Hola "+this.nuevoUsuario.nombreCompleto+"</h4><p>Este es el código que necesitas para su registro en Bube:</p><h3 style='color:#000'>"+cod+"</h3><p>Este correo electrónico se genera automáticamente. Por favor, no respondas a él. Si necesitas ayuda adicional, por favor, visita el Soporte de Bube.</p>";
          var email = {"email": this.nuevoUsuario.email,"content": cuerpo,"subject":"Código de verificación Bube"}
          this.apiServicio.enviarCorreo(email)
            .then(res =>{
              this.codigo = cod;
              this.alertaCorreoEnviado();

            })
            .catch(er =>{
              this.AlertErrorEnviar();
              console.log(er);
            });
          
  }

  async AlertErrorEnviar() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Ocurrio un problema al enviar el correo',
      buttons: ['OK']
    });

    await alert.present();
  }

  async alertaCorreoEnviado() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'Su código de recuperación ha sido enviado',
      buttons: ['OK']
    });

    await alert.present();
  }

  generaCodigo() {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

}
