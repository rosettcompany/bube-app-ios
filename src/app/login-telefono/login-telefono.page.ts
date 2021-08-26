import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import * as CryptoJS from 'crypto-js';
import { ServicioAesService} from '../servicio-aes/servicio-aes.service'
@Component({
  selector: 'app-login-telefono',
  templateUrl: './login-telefono.page.html',
  styleUrls: ['./styles/login-telefono.page.scss'],
})
export class LoginTelefonoPage implements OnInit {
  myForm: FormGroup;
  submitted = false;

  private telefono = '999999999';
  private password = 'grover';

  private Usuario = {"nombreCompleto": '',"apellidos":'', "telefono": '', "email": '', "rutaFoto": '', "fechaNacimiento":'',"genero":'',"password":''};

  private keyJScrypto = '123456$#@$^@1ERF';

  loading:any;
  subscription;
  constructor(private router:Router,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder,
    private platform: Platform,
    private navCtrl: NavController,
    private servicioAES: ServicioAesService,
    public alertController: AlertController,
    private apiService:ApiServiceService
    ) { 
      this.myForm = this.formBuilder.group({
        telefono: ['', [Validators.required,Validators.max(999999999),Validators.min(111111111)]],
        password: ['', [Validators.required,Validators.minLength(8)]],
       // direccion: ['', [Validators.required]]
      });
  
  }

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
     this.Usuario.telefono = this.myForm.value.telefono
     let data = {"telefono":this.myForm.value.telefono,
                  "password": this.servicioAES.set(this.keyJScrypto, this.myForm.value.password)}

     this.postLoginTelefono(data)
    }
  }

  postLoginTelefono(data){
    this.presentLoading();
    this.apiService.postLoginTelefono(data)
    .then((res)=>{
      console.log(res)
      this.logearse(res)
    }).catch((error)=>{ 
      console.log(error)
      this.loading.dismiss();
      this.presentAlert2();
    });
  }

    
  // conecta con la base de datos
  logearse(data){
    this.loading.dismiss();

    let navigationExtras: NavigationExtras = {
      state: {
        nuevoUsuario:this.Usuario,
        tipoRegistro:  'tel'
      }
    };

    var indice = this.retornarFlag(data);
    console.log('ind logearse '+indice);

    if(indice==0){
      console.log('Pass incorrecta');
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
  let telefono = this.telefono;
  let idusuario = this.retornarid(data);
  let ind_user = this.retornarFlag(data);
  
  this.apiService.setStorage('idusuario',idusuario);
  this.apiService.setStorage('ind_user',ind_user);
  this.apiService.setStorage('telefono',telefono);
  this.apiService.setStorage('usuario',this.Usuario)
  this.apiService.setStorage('tipoRegistro','tel')
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


  irRegistroDatos(){
    this.router.navigate(['registro-datos'])
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


  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Se ha producido un error',
      message: 'Error en el servidor de bube',
      buttons: ['OK']
    });

    await alert.present();
  }
}
