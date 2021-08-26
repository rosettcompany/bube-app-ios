import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';

declare var cordova: any;
@Component({
  selector: 'app-login-elige-sesion',
  templateUrl: './login-elige-sesion.page.html',
  styleUrls: ['./styles/login-elige-sesion.page.scss'],
})
export class LoginEligeSesionPage implements OnInit {

  private Usuario = {"id":'',"nombreCompleto": '',"apellidos":'', "telefono": '0', "email": '', "rutaFoto": '', "fechaNacimiento":'',"genero":'',"password":'',"idapple":''};

  loading:any;
  subscription;
  btnGoogle = false;
  botonGoogle = false;
  constructor(private router:Router,
              private afAuth: AngularFireAuth,
              private googlePlus: GooglePlus,
              private platform: Platform,
              private navCtrl: NavController,
              private facebook:Facebook,

              private apiService:ApiServiceService,
              public loadingController: LoadingController,
              public alertController: AlertController) { 
          
              }

  ngOnInit() {

  }

  ionViewDidEnter():void{
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
      /*
      if(this.loading != null || this.loading != undefined){
        this.loading.dismiss();
      }
      */
      this.navCtrl.pop();
 
    });
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.subscription.unsubscribe();
  } 

  irInicioCorreo(){
    this.router.navigate(['login-email'])
  }

  irInicioTelefono(){
    this.router.navigate(['login-telefono'])
  }


  cargarLoginGoogle(){
    //this.presentLoading()
    this.botonGoogle = true;
    this.eventoLogin();
  }
  

  eventoLogin(){
    this.apiService.getStorage('gmail_activo').
    then(res => {
        if(res !=null){
          if(res == 1){
            this.googlePlus.logout()
            .then((res)=>{
              this.apiService.setStorage('gmail_activo',0);
              this.loginGooglePlus();
            })  
            .catch((error)=>{
              console.log(error);
              /*
              this.botonGoogle = false;
              //this.loading.dismiss();
              */
              //this.presentAlert1();
              this.apiService.setStorage('gmail_activo',0);
              this.loginGooglePlus();
            });
          }else{
            this.loginGooglePlus();
          }
        }else{
          this.loginGooglePlus();
        }
    }).catch((error)=>{
       console.log(error)
       this.loginGooglePlus();
    })
  }

  loginGooglePlus(){
  //  this.logoutFacebook()
  this.googlePlus.login({})
  .then((res) =>{

    this.apiService.setStorage('gmail_activo',1)
    //this.loading.dismiss();
    this.Usuario.nombreCompleto = (res.givenName == null) ? '':res.givenName;
    this.Usuario.apellidos = (res.familyName == null) ? '':res.familyName;
    this.Usuario.email = (res.email == null) ? '':res.email;
    this.Usuario.rutaFoto = (res.imageUrl == null) ? 'https://firebasestorage.googleapis.com/v0/b/bubeapp.appspot.com/o/ImagenesUsuarios%2Favatar_perfil.jpg?alt=media&token=3757e499-3ff4-4f3a-ba3d-911bde3506f7':res.imageUrl;

    let data = {"email":this.Usuario.email};
    if(this.Usuario.email == ''){
        this.botonGoogle = false;
    }else{
      this.postVerificarLoginGmail(data);
    }
    }).catch((error)=>{
      console.log(error)
      this.botonGoogle = false;
      //this.loading.dismiss();
      this.presentAlert2()
    })
  }

  logout() {
    this.afAuth.signOut();
  }

  // VERIFICAR LOGIN GMAIL
  postVerificarLoginGmail(data){
    //this.presentLoading2();
    this.apiService.postVerificarLoginGmail(data)
    .then((res)=>{
        this.botonGoogle = false;
        this.logearse(res,'email')
    }).catch((error)=>{
        console.log(error)
        this.botonGoogle = false;
       // this.loading.dismiss();
       this.presentAlert1()
    });
  }

  // conecta con la base de datos
  logearse(data,tipo){
      var indice = this.retornarFlag(data);
      console.log('ind logearse '+indice);
      //this.loading.dismiss();
      let navigationExtras: NavigationExtras = {
        state: {
          nuevoUsuario:this.Usuario,
          tipoRegistro:  tipo
        }
      };

      if(indice==0){
        console.log('usuario no existe');
        this.router.navigate(['validacion-fecha-nacimiento'],navigationExtras)
      }else{
        this.guardarIdUser(data,tipo);
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
            }
          }
        }

      }
  }

        //llamando al servicio para guardar localmente el idusuario
  guardarIdUser(data,tipo){
    let correo = this.Usuario.email;
    let idusuario = this.retornarid(data);
    let ind_user = this.retornarFlag(data);
    
    this.apiService.setStorage('idusuario',idusuario);
    this.apiService.setStorage('ind_user',ind_user);
    this.apiService.setStorage('correo',correo);
    this.apiService.setStorage('usuario',this.Usuario)
    this.apiService.setStorage('tipoRegistro',tipo)
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

  async presentLoading2() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Verificando...'
    });
    await this.loading.present();
  }

  async presentAlert1() {
    const alert = await this.alertController.create({
      header: 'Error',
      cssClass: 'my-custom-class',
      subHeader: 'Error al obtener datos',
      message: 'Intente más tarde',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      header: 'Alerta',
      cssClass: 'my-custom-class',
      subHeader: 'Acción cancelada',
      buttons: ['OK']
    });

    await alert.present();
  }



  logoutFacebook(){
    this.facebook.logout();
  }


}
