import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import { ServicioAesService } from '../servicio-aes/servicio-aes.service';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.page.html',
  styleUrls: ['./styles/login-email.page.scss'],
})
export class LoginEmailPage implements OnInit {
  subscription;
  constructor(private afAuth: AngularFireAuth,
    private router:Router,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,
    private platform: Platform,
    private servicioAES: ServicioAesService,
    private navCtrl: NavController,
    public alertController: AlertController,
    private apiService:ApiServiceService) { }

    myForm: FormGroup;
    submitted = false;

  private email = 'ben10_va@hotmail.com';
  private password = 'grover';

  private Usuario = {"nombreCompleto": '',"apellidos":'', "telefono": '', "email": '', "rutaFoto": '', "fechaNacimiento":'',"genero":'',"password":''};

  private keyJScrypto = '123456$#@$^@1ERF';

  loading:any;

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required,Validators.minLength(8)]],
     // direccion: ['', [Validators.required]]
    });
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

  get errorControl() {
    return this.myForm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    if (!this.myForm.valid) {
       console.log('Llena todos los datos!')
      return false;
    } else {
     console.log(this.myForm.value);
     this.Usuario.email = this.myForm.value.email
     let data = {"email":this.myForm.value.email,
                  "password": this.servicioAES.set(this.keyJScrypto, this.myForm.value.password)}

     this.postLoginEmail(data)
    }
  }

  irRegistroDatosEmail(){
    this.router.navigate(['registro-datos-email'])
  }

  postLoginEmail(data){
    this.presentLoading();
    this.apiService.postLoginEmail(data)
    .then((res)=>{
      console.log(res)
      this.logearse(res)
    }).catch((error)=>{ 
      console.log(error)
      this.loading.dismiss();
      this.presentAlert2(error);
    });
  }

  
  // conecta con la base de datos
  logearse(data){
    this.loading.dismiss();
    let navigationExtras: NavigationExtras = {
      state: {
        nuevoUsuario:this.Usuario,
        tipoRegistro:  'email'
      }
    };

    var indice = this.retornarFlag(data);
    console.log('ind logearse '+indice);

    if(indice==0){
      console.log('pass incorrecta');
      this.presentAlertErrorPass();
    }else{
      this.guardarIdUser(data);
      if(indice == 3){
        console.log('usuario nuevo');
        var ind = 1;
        this.router.navigate(['./validacionInicio',ind],navigationExtras);
      }else{
        if(indice == 4){
          console.log('usuario nuevo');
          this.router.navigate(['./validacionCorreo'],navigationExtras);
        }else{
          if(indice == 2){
              console.log('usuario antiguo');
              this.router.navigate(['./app/inicio'],navigationExtras);
          }else{
            if(indice == 5){
              console.log('usuario no existe');
              this.presentAlert();
            }
          }
        }
      }

    }
}
//llamando al servicio para guardar localmente el idusuario
guardarIdUser(data){
  let correo = this.email;
  let idusuario = this.retornarid(data);
  let ind_user = this.retornarFlag(data);
  
  this.apiService.setStorage('idusuario',idusuario);
  this.apiService.setStorage('ind_user',ind_user);
  this.apiService.setStorage('correo',correo);
  this.apiService.setStorage('usuario',this.Usuario)
  this.apiService.setStorage('tipoRegistro','email')
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

  public retornarid(data):number{
    let array = [];
    let idusuario:number;
    array = data;
    array.find(usuario => {
      idusuario = usuario.idusuario;
    });
    return idusuario;
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Iniciando sesión'
    });
    await this.loading.present();
  }


  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Usuario no existe',
      message: 'Debe crear un nuevo usuario',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlertErrorPass() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Contraseña incorrecta',
      message: 'Intente nuevamente',
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentAlert2(error) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Se ha producido un error',
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }

}
