import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { ServicioAesService } from '../servicio-aes/servicio-aes.service';
@Component({
  selector: 'app-registro-datos',
  templateUrl: './registro-datos.page.html',
  styleUrls: ['./styles/registro-datos.page.scss'],
})
export class RegistroDatosPage implements OnInit {
  public nombres:string="";
  public apellidos:string="";
  public celular:string="";
  public contrasenia:string="";
  public codigo;

  public activar_boton=true;
  public error_nombres = true;
  public error_apellidos = true;
  public error_celular = true;
  public error_contra = true;

  vClave = false;
  vCelular = false;
  private nuevoUsuario = {"id":'',"nombreCompleto": '',"apellidos":'', "telefono": '', "email": '', "rutaFoto": '', "fechaNacimiento":'',"genero":'',"password":''};

  private keyJScrypto = '123456$#@$^@1ERF';

  loading:any;
  subscription;
  subscription2;
  constructor(
    private router:Router,
    private firebaseAuthentication: FirebaseAuthentication,
    private alertControler:AlertController,
    private platform: Platform,
    private navCtrl: NavController,
    private servicioAES: ServicioAesService,
    public loadingController: LoadingController,
    public apiServicio:ApiServiceService
  ) { }

  ngOnInit() {

  }

  ionViewDidEnter():void{
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
      if(this.loading != null || this.loading != undefined){
        this.loading.dismiss();
      }
      this.navCtrl.pop();
    });
  }

    // Restore to default when leaving this page
    ionViewDidLeave(): void {
      this.subscription.unsubscribe();
    } 

  verificarCelular(){
    
    if(this.celular.length == 9){
      this.vCelular = true;
      this.error_celular = true;
    }else{
      this.vCelular = false;
      this.error_celular = false;
    }

    this.verificarInputs();
  }

  verificarContrasenia(){
    
    if(this.contrasenia.length >= 8){
      this.vClave = true;
      this.error_contra = true;
    }else{
      this.vClave = false;
      this.error_contra = false;
    }

    this.verificarInputs();
  }

  verificarInputs(){
    

    if(this.nombres != "" && this.apellidos != "" && this.vCelular == true && this.vClave == true){
      this.activar_boton = false;
    }else{
      this.activar_boton = true;
    }

  }

  async enviarCodigo(){
    this.nuevoUsuario.nombreCompleto = this.nombres;
    this.nuevoUsuario.apellidos = this.apellidos;
    this.nuevoUsuario.telefono = this.celular;
    this.nuevoUsuario.rutaFoto = 'https://firebasestorage.googleapis.com/v0/b/bubeapp.appspot.com/o/ImagenesUsuarios%2Favatar_perfil.jpg?alt=media&token=3757e499-3ff4-4f3a-ba3d-911bde3506f7';
    this.nuevoUsuario.password = this.servicioAES.set(this.keyJScrypto, this.contrasenia);
    
    
    let extras:NavigationExtras = {
      state:{
        "usuario":this.nuevoUsuario,
        "codigo":this.codigo
      }
    };
    this.subscription2.unsubscribe();
    this.router.navigate(['codigo-sms'],extras);

  }

  // VERIFICAR LOGIN GMAIL
  postVerificarLoginTelefono(){

    this.subscription2 = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
    });

    this.presentLoading();
    let data = {"telefono":this.celular};
    this.apiServicio.postVerificarLoginTelefono(data)
    .then((res)=>{
      console.log(res)
      this.loading.dismiss();
      var indice = this.retornarFlag(res);
      if(indice==0){
          console.log('usuario no existe');
          this.enviarMensaje();
      }else{
        this.presentAlert1()
        this.subscription2.unsubscribe();
      }
    }).catch((error)=>{
        console.log(error)
        this.loading.dismiss();
        this.presentAlert();
        this.subscription2.unsubscribe();
    });
  }

  public retornarFlag(data):number{
    let array = [];
    let ind_user:number;
    array = data;
    array.find(usuario => {
      ind_user = usuario.ind_user;
    });
    return ind_user;
  }

  enviarMensaje(){
    this.firebaseAuthentication.verifyPhoneNumber("+51"+this.celular.toString(),30000)
    .then(res =>{
      this.codigo = res;
      this.loading.dismiss();
      this.enviarCodigo();
      
    })
    .catch(er =>{
      console.log(er);
      this.loading.dismiss();
      this.presentAlert();
      this.subscription2.unsubscribe();
    });
  }


  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando...',
      translucent: true,
      animated: true
    });
    await this.loading.present();
  }

  async presentAlert() {
    const alert = await this.alertControler.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Error en el registro.',
      message: 'Ha ocurrido un error registrando inténtelo de nuevo.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert1() {
    const alert = await this.alertControler.create({
      header: 'Error',
      cssClass: 'my-custom-class',
      subHeader: 'el teléfono ya está registrado',
      message: 'Intente con otro teléfono',
      buttons: ['OK']
    });

    await alert.present();
  }
}
