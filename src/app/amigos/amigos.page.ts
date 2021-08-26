import { Component,OnInit, AfterViewInit, ViewChild, HostBinding } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { LoadingController, MenuController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ToastController, Platform, AlertController, NavController  } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Facebook} from '@ionic-native/facebook/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { error } from 'protractor';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.page.html',
  styleUrls: [
    './styles/amigos.page.scss', 
    './styles/amigos.shell.scss',
    './styles/amigos.responsive.scss'
  ]
})
export class amigosPage{
  amigos:any;
  textBuscar='';
  amigosApi:any;
  loading:any;

  constructor(
    public menu: MenuController, 
    public router: Router, 
    public alertController: AlertController,
    private firebaseAnalytics: FirebaseAnalytics,
    public storage: Storage,
    private facebook:Facebook,
    public apiServicio: ApiServiceService,
    public toastController: ToastController,
    public loadingController: LoadingController,
    private socialSharing: SocialSharing
    ) { 
      ////// SALIR DE LA APLICACION
     
    }
  ionViewWillEnter(){
    this.verficarConexionFB();
  }

  // Disable side menu for this page
  ionViewDidEnter(): void {
  
    this.menu.enable(false);
    this.getFriends();
    this.obtenerIdUsuario();
    this.googleAnalytics();   
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  verficarConexionFB(){
    this.presentLoading();
    this.storage.get('idusuario')
      .then(data =>{
        let dato = {
          "idUsuario":Number(data)
        };
        console.log(data);
        this.apiServicio.verificarConexionFB(dato)
        .then(res =>{
          console.log(res);
          if(res == 0){
            console.log('opcion 0')
            
            let amigosContent = document.getElementById('contenedor-amigos') as HTMLDivElement;
            let botonFB = document.getElementById('contenedor-fb') as HTMLDivElement; 

            amigosContent.style.display='none';
            botonFB.style.display='block';

            
          }else{
            console.log('opcion 1')
      
            let amigosContent = document.getElementById('contenedor-amigos') as HTMLDivElement;
            let botonFB = document.getElementById('contenedor-fb') as HTMLDivElement; 

            amigosContent.style.display='block';
            botonFB.style.display='none';
            
          }
          this.loading.dismiss();
        })
        .catch(er =>{
          console.log(er);
          this.loading.dismiss();
        });
      })
  }

  obtenerIdUsuario(){
    this.storage.get('idusuario')
      .then(data =>{
        this.getAmigos(data);
      })
  }
  


  getAmigos(val){
    this.apiServicio.obtenerAmigos(val)
      .subscribe((data) =>{
          this.amigos = data;
          console.log("traer amigos");
          console.log(data)
      },
      (error) =>{
        console.error(error);
      })
  }

  detalleAmigo(amigo){
    console.log(amigo);

    let navigationExtras: NavigationExtras = {
      state: {
        'amigo': amigo
      }
    };
    this.router.navigate(['detalleamigo'],navigationExtras);

  }
  
  buscarAmigo(event){

    //console.log(event);
    this.textBuscar = event.detail.value;
    
  }

  invitarAmigos(){
      // this is the complete list of currently supported params you can pass to the plugin (all optional)
      var options = {
        message: 'Hola, ¿conoces Bube?  Compara, Elige y ahorra al buscar tus tragos Favoritos en Bube App. Decargala en :', // not supported on some apps (Facebook, Instagram)- ¡BUBE, el mejor buscador de bebidas
        subject: 'the subject', // fi. for email
       // files: ['', ''], // an array of filenames either locally or remotely
        url: 'https://web.bube.com.pe',
       // chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
       // appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
       // iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
      };
      this.socialSharing.shareWithOptions(options);
  }

  buscarBebida(cerveza,id,nombre){
    console.log(id);
    this.storage.get('latitud')
    .then((val) =>{
        console.log(val);
        if(val != null){


          this.storage.get('km').then((val) =>{

                let navigationExtras: NavigationExtras = {
                  state: {
                    bebida: cerveza,
                    km:val,
                    regalo:id,
                    amigo:nombre
                  }
              };
                this.router.navigate(['busquedaProducto'],navigationExtras);

          }).catch(error =>{
            console.log("no Km");
          });

        }else{
          this.presentToast();
        }
      })
      .catch(error =>{
        console.log("no hay ubicacion");
      });
        
  }

    //funcion para sacar los amigos de facebook que usan la pp bube
    getFriends(){
      this.facebook.api('/me/friends?fields=uid,name,picture.type(large)', [])
       .then(amigos => {
         console.log(amigos);
         this.amigosApi = amigos;
         this.storage.get('idusuario')
          .then(id =>{
            this.insertarAmigos(id);
          });
       })
       .catch(error => {
         console.error(error);
       });
    }

    
     //llamando al servicio para insertar los datos de amigos
  insertarAmigos(id){
    let listaamigos1:any ={"idusuario":id ,"listaamigos": JSON.stringify(this.amigosApi.data)};
    let listaamigos:any = {"idusuario":id , "listaamigos": listaamigos1.listaamigos};
   this.apiServicio.guardarAmigos(listaamigos)
   .then(res =>{
     console.log("inserto amigos "+JSON.stringify(res));   
   })
   .catch(error =>{
     console.log("error insertar amigo "+error);
   });
}

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Porfavor debe ingresar una direccion',
      duration: 2000,
      color: 'danger',
     
    });
    toast.present();
  }
  
 // googleAnalytics
 googleAnalytics(){
  this.firebaseAnalytics.logEvent('pantalla',{pantalla:"amigos"})
  .then(res =>{
    console.log(res);
    console.log("firebase ok");
  })
  .catch(er =>{
    console.log(er);
    console.log("firebase no");
  });
}


async presentLoading() {
  this.loading = await this.loadingController.create({
    cssClass: 'my-custom-class',
    message: 'Conectando...'
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

conectarseFacebook(){
 this.presentLoading();
 this.facebook.getLoginStatus()
 .then((res)=>{
    if(res.status == 'connected'){
      this.facebook.logout()
      .then((res)=>{
          this.loginFacebook();
      }).catch((error)=>{
        console.log(error);
        this.presentAlert1()
      })
    }else{
      this.loginFacebook()
    }
 }).catch((error)=>{
   console.log(error)
   this.presentAlert1()
 })
}

loginFacebook(){
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
        this.obtenerAmigos(data.id);
      })
      .catch(error => {
        console.error(error);
        this.loading.dismiss();
        this.presentAlert1();
      });
  }

obtenerAmigos(idfb){
  this.facebook.api('/me/friends?fields=uid,name,picture.type(large)', [])
   .then(amigos => {
     console.log(amigos);
     this.amigosApi = amigos;
     this.storage.get('idusuario')
      .then(id =>{
        this.insertarAmigosFB(id,idfb);
      });
   })
   .catch(error => {
     console.error(error);
   });
}
insertarAmigosFB(id,idfb){
  this.facebook.logout();
  let listaamigos1:any ={"idusuario":id ,"listaamigos": JSON.stringify(this.amigosApi.data)};
  let listaamigos:any = {"idUsuario":id ,"idFacebook":idfb, "rutaFotoUsuario": listaamigos1.listaamigos};

  console.log(listaamigos);
 this.apiServicio.postAmigosConectado(listaamigos)
 .then(res =>{
   console.log("inserto amigos "+JSON.stringify(res));   
   this.loading.dismiss();
   this.ionViewWillEnter();
   this.ionViewDidEnter();
 })
 .catch(error =>{
   console.log("error insertar amigo "+error);
 });
}
}