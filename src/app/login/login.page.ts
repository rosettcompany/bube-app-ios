import { Component} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Facebook} from '@ionic-native/facebook/ngx';
import { ApiServiceService } from '../api-service.service';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { LoadingController, MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Device } from '@ionic-native/device/ngx';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage{
  user: any= {};
  respuesta: any={};
  amigo:any={};
  loading:any;
  idUsuarioLista = [];

  showSingApple: boolean = false;
  botonApple = false;

  private Usuario = {"id":'',"nombreCompleto": '',"apellidos":'', "telefono": '0', "email": '', "rutaFoto": '', "fechaNacimiento":'',"genero":'',"password":'',"idapple":''};

        
  constructor(
    public router:Router,
    private facebook:Facebook,
    public menu: MenuController, 
    private apiService: ApiServiceService,
    private splashScreen: SplashScreen,
    private platform: Platform,
    private googlePlus: GooglePlus,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private device: Device,
    private signInWithApple: SignInWithApple,
    public storage: Storage
  ) {

    if(String(this.device.platform) == 'iOS' && Number(String(this.device.version).substring(0,2)) >= 13 ){
      this.showSingApple = true;
     }
  }


   // Disable side menu for this page
   ionViewDidEnter(): void {
    this.menu.enable(false);
    this.splashScreen.hide();
  }
  
    // Restore to default when leaving this page
    ionViewDidLeave(): void {
      this.menu.enable(true);
    }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Iniciando sesión'
    });
    await this.loading.present();
  }

  async presentAlertSinConexion() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Sin Conexión',
      message: 'Intente más tarde',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert1() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Error al obtener datos',
      message: 'Intente más tarde',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Error al obtener amigos',
      message: 'Intente más tarde',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert3(error) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Error al registrar usuario',
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert4() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      subHeader: 'Error al insertar amigos',
      message: 'Intente más tarde',
      buttons: ['OK']
    });

    await alert.present();
  }

  //funcion para ir a la pagina de terminos y condiciones 
  terminosYcondiciones(): void {
    console.log('terminos y condiciones');
    var ind=1;
    this.router.navigate(['./terminos',ind]);
  }

  //funcion del boton iniciar sesion 

  loginFacebook(){
      this.logoutGmail();
      this.presentLoading();
      this.facebook.login(['public_profile', 'user_friends','email'])
        .then(rta => {
          console.log(rta.status);
          if(rta.status == 'connected'){
            this.getInfo();
            
          };
        })
        .catch(error => {
          this.loading.dismiss();
          this.presentAlertSinConexion();
          console.error(error);
        });
    }


   // funcion para sacar los datos personales de facebook del usuario
   getInfo(){
     this.facebook.api('/me?fields=id,email,first_name,picture.type(large),last_name,gender,birthday',[])
       .then(data => {
         console.log(data);
         this.user = data;

         
         this.Usuario.id = data.id;
         this.Usuario.email = (data.email  == null) ? '':data.email;
         this.Usuario.nombreCompleto = data.first_name;
         this.Usuario.apellidos = (data.last_name == null) ? '':data.last_name;
         this.Usuario.genero = (data.gender == null) ? '':data.gender;
         this.Usuario.rutaFoto = (data.picture.data.url == null) ? '':data.picture.data.url;
         this.Usuario.fechaNacimiento = (data.birthday == null) ? '':data.birthday;
       
        
        
         this.getFriends();
       })
       .catch(error => {
         console.error(error);
         this.loading.dismiss();
         this.presentAlert1();
       });
   }

   //funcion para sacar los amigos de facebook que usan la pp bube
   getFriends(){
    this.facebook.api('/me/friends?fields=uid,name,picture.type(large)', [])
     .then(amigos => {
       console.log(amigos);
       this.amigo = amigos;

       let data = {'id':this.Usuario.id}
       this.verificarUsuarioFB(data)
      // this.insertaUser();
     })
     .catch(error => {
       console.error(error);
       this.loading.dismiss();
       this.presentAlert2();
     });
  }

  verificarUsuarioFB(data){
    this.apiService.verificarUsuarioFB(data)
    .then((res)=>{
        this.loading.dismiss();
        this.logearse(res,'fb')
    }).catch((error)=>{
      console.log(error)
    })
  }

  //llamando al servicio para guardar localmente el idusuario
  guardarIdUser(data,tipo){
    let correo = this.user.email;
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

// conecta con la base de datos
logearse(data,tipo){
  var indice = this.retornarFlag(data);
  console.log('ind logearse '+indice);
  let navigationExtras: NavigationExtras = {
    state: {
      nuevoUsuario:this.Usuario,
      amigo:this.amigo,
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


irOtrosInicios(){
  this.router.navigate(['login-elige-sesion'])
}


logoutGmail(){
  this.googlePlus.logout();
}

cargarLoginApple(){
  //this.presentLoading()
  this.botonApple = true;
  this.eventoLoginApple();
}

eventoLoginApple(){
  this.apiService.getStorage('apple_activo').
  then(res => {
      if(res !=null){
        if(res == 1){
            this.loginApple();
        
        }else{
          this.loginApple();
        }
      }else{
        this.loginApple();
      }
  }).catch((error)=>{
     console.log(error)
     this.loginApple();
  })
}

loginApple(){

  this.signInWithApple.signin({
    requestedScopes: [
      ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,
      ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail
    ]
  })
  .then((res: AppleSignInResponse) => {
    // https://developer.apple.com/documentation/signinwithapplerestapi/verifying_a_user
   // alert('Send token to apple for verification: ' + res.identityToken);
    console.log(res);
    this.apiService.setStorage('apple_activo',1)
    //this.loading.dismiss();
    this.Usuario.nombreCompleto = (res.fullName.givenName == "" || res.fullName.givenName == null) ? '':res.fullName.givenName;
    this.Usuario.apellidos = (res.fullName.familyName == "" || res.fullName.familyName == null) ? '':res.fullName.familyName;
    this.Usuario.email = (res.email == "" || res.email == null) ? '':res.email;
    this.Usuario.rutaFoto ='https://firebasestorage.googleapis.com/v0/b/bubeapp.appspot.com/o/ImagenesUsuarios%2Favatar_perfil.jpg?alt=media&token=3757e499-3ff4-4f3a-ba3d-911bde3506f7';
    this.Usuario.idapple = (res.user == "" || res.user == null) ? '':res.user;
    this.user.email = this.Usuario.email;

    let data = {"idapple":this.Usuario.idapple};
    if(this.Usuario.idapple == ''){
      this.botonApple = false;
    }else{
      this.postVerificarLoginApple(data);
    }
  })
  .catch((error: AppleSignInErrorResponse) => {
    //alert(error.code + ' ' + error.localizedDescription);
    console.error(error);
    this.botonApple = false;
    this.presentApple();
  });
}

    // VERIFICAR LOGIN APPLE
    postVerificarLoginApple(data){
      //this.presentLoading2();
      this.apiService.postVerificarLoginApple(data)
      .then((res)=>{
        this.botonApple = false;
          this.logearse(res,'apple');
      }).catch((error)=>{
          console.log(error)
          this.botonApple = false;
         // this.loading.dismiss();
         this.presentApple();
      });
    }

    
  async presentApple() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Mensaje',
      message: 'Acción cancelada',
      buttons: ['OK']
    });

    await alert.present();
  }
}