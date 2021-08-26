import { Component } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { Storage } from '@ionic/storage';
import { ToastController, NavController, LoadingController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

@Component({
  selector: 'app-misdatos',
  templateUrl: './misdatos.page.html',
  styleUrls: ['./misdatos.page.scss'],
})

export class MisdatosPage{
  usuario: any;
  tagName = [];
  btn = false;
  user:any;
  nombresBebidas = '';

    ///// LOADING
    loading:any;

  constructor(
    private apiServicio:ApiServiceService,
    private navCtrl: NavController,
    private router:Router,
    public storage: Storage,
    private firebaseAnalytics: FirebaseAnalytics,
    private socialSharing: SocialSharing,
    private loadingController: LoadingController,
    public toastController: ToastController
    ) { }


    
    ionViewWillEnter(): void{
    
      this.tagName=[];
      if(this.usuario == null) this.presentLoading();
      this.apiServicio.getStorage('idusuario')
       .then(id =>{
  
      this.apiServicio.getDatosUsuario(id)
        .subscribe((data) =>{
          this.loading.dismiss();
          this.usuario=data;
          console.log(this.usuario);
          let nombres = document.getElementById('idnombre') as HTMLIonInputElement;
          let apellidos = document.getElementById('idapellido') as HTMLIonInputElement;
          let email = document.getElementById('idemail') as HTMLIonInputElement;
          let celular = document.getElementById('idcelular') as HTMLIonInputElement;
          let fecha = document.getElementById('idfecha') as HTMLIonInputElement;
          let dni = document.getElementById('iddni') as HTMLIonInputElement;
          var fechan
          fechan = this.usuario[0].fechanacimientousuario;
          console.log(fechan);
          if(this.usuario[0].fechanacimientousuario == "" || fechan.substring(0,10)=='2099-12-31'){
             fechan = "";
          }else{
             
  
           fecha.value = fechan;
          console.log(fecha.value);
  
          }
          if(this.usuario[0].telefonousuario == 0){
            celular.value = "";
          }else{
            celular.value = this.usuario[0].telefonousuario;
          }
  
          if(this.usuario[0].dni == null){
            dni.value = "";
          }else{
            dni.value = this.usuario[0].dni;
          }
  
          nombres.value = this.usuario[0].nombresusuario;
          apellidos.value = this.usuario[0].apellidosusuario;
          email.value = this.usuario[0].emailusuario;
          
          
        },
        (error) =>{
  
        });
            this.apiServicio.getBebidasFavoritas(id)
              .subscribe((data) =>{
                var bebidas:any = data;
                console.log(bebidas);
                bebidas.forEach(b => {
                  this.tagName.push({idBebida: b.idbebida, nombreBebida: b.nombrebebida,nombre:b.nombre, idUsuario: b.idusuario, nombremarca: b.nombremarca});
                console.log(this.tagName);
            });
             
          });
       
      });
    }

      // Disable side menu for this page
  ionViewDidEnter(): void {
    this.googleAnalytics();
  }
  irBebidas(){
     var ind = 2;
    this.router.navigate(['validacionInicio',ind]);
    this.tagName=[];
  }

    async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando'
    });
    await this.loading.present();
  }

  botonGuardar(){
    this.btn=true;
    console.log(this.usuario);
    let nombres = document.getElementById('idnombre') as HTMLIonInputElement;
    let apellidos = document.getElementById('idapellido') as HTMLIonInputElement;
    let email = document.getElementById('idemail') as HTMLIonInputElement;
    let celular = document.getElementById('idcelular') as HTMLIonInputElement;
    let fecha = document.getElementById('idfecha') as HTMLIonInputElement;
    let dni = document.getElementById('iddni') as HTMLIonInputElement;

    this.user = {"apellidosUsuario":apellidos.value,"codigoPais":this.usuario[0].codigopais,"dni":dni.value,
    "email2Usuario":this.usuario[0].email2Usuario,"emailUsuario":email.value,"estadoUsuario":this.usuario[0].estadousuario,
    "fechaNacimientoUsuario":fecha.value,"fechaRegistro":this.usuario[0].fecharegistro,"idFacebook":this.usuario[0].idfacebook,
    "idUsuario":this.usuario[0].idusuario, "nombresUsuario":nombres.value, "rutaFotoUsuario":this.usuario[0].rutafotousuario,
    "sexoUsuario":this.usuario[0].sexousuario,"telefonoUsuario":celular.value};
    
    console.log(this.user);
    
    let vNombre = false;
    let vApellido = false;
    let vDni = false;
    let vCelular = false;
    let vFecha = false;
    

    if(String(nombres.value).length == 0 ){
      vNombre = false;
      this.presentToast('Ingrese su nombre','danger');
      this.btn=false;
    }else{
      vNombre = true;
      
    }
    if(String(apellidos.value).length == 0 ){
      vApellido = false;
      this.presentToast('Ingrese su apellido','danger');
      this.btn=false;
    }else{
      vApellido = true; 
    }
    if(String(celular.value).length == 0 ){
      vCelular = false;
      this.presentToast('Ingrese su teléfono','danger');
      this.btn=false;
    }else{
      vCelular = true;
      
    }
    if(String(fecha.value).length == 0 ){
      vFecha = false;
      this.presentToast('Ingrese su Fecha de nacimiento','danger');
      this.btn=false;
    }else{
      vFecha = true;
      
    }
    if(String(dni.value).length==8 ){

      if(!isNaN(Number(String(dni.value).substring(0,1))) && 
         !isNaN(Number(String(dni.value).substring(1,2))) && 
         !isNaN(Number(String(dni.value).substring(2,3))) &&
         !isNaN(Number(String(dni.value).substring(3,4))) &&
         !isNaN(Number(String(dni.value).substring(4,5))) &&
         !isNaN(Number(String(dni.value).substring(5,6))) &&
         !isNaN(Number(String(dni.value).substring(6,7))) &&
         !isNaN(Number(String(dni.value).substring(7,8)))){
       
          vDni = true
      }else{
        vDni=false;
        this.presentToast('DNI invalido','danger');
        this.btn=false;
      }
      
      
    }else{
      vDni = false;
      this.presentToast('Ingrese su DNI','danger');
      this.btn=false;
      console.log("toast");
    }
    

    if(vNombre == true && vApellido == true && vCelular == true && vDni == true && vFecha==true){
      console.log(this.usuario[0]);
      this.apiServicio.putUsuario(this.user)
        .subscribe(res =>{
          this.tagName=[];
          this.presentToast('Sus datos se han actualizado','success');
          this.btn=false;
          this.ionViewWillEnter();
        })

    }
  }

  async presentToast(msm,color) {
    const toast = await this.toastController.create({
      message: msm,
      duration: 2000,
      color: color,
     
    });
    toast.present();
  }

  regresar(){
    // let backbutton = document.getElementById('volver') as HTMLIonBackButtonElement;
    // backbutton.disabled = true;
    this.router.navigate(['./app/perfil']);
    this.tagName = [];
  }
  buscarBebida(cerveza){

      this.storage.get('km').then((val) =>{

        let navigationExtras: NavigationExtras = {
          state: {
            bebida: cerveza,
            km:val
          }
      };
        this.router.navigate(['busquedaProducto'],navigationExtras);
        this.tagName=[]; 

      }).catch(error =>{
        console.log("no Km");
      });
    
    
  }

  invitarAmigos(){

    this.nombresBebidas = "";
    for(let i = 0; i < this.tagName.length;i++ ){
      console.log(i);
      if(i !== this.tagName.length -1){
        this.nombresBebidas += this.tagName[i].nombre+", ";
      }else{
        this.nombresBebidas += this.tagName[i].nombre+".";
      }
    }

    console.log(this.nombresBebidas);
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
      message: 'Hola,Te quería pasar información que te ayudara mucho para que puedas sorprenderme😌! Mis bebidas favoritas son : '+this.nombresBebidas+'. Para ver los tragos favoritos de tus contactos y vivir la experiencia Bube descarga el app en:', // not supported on some apps (Facebook, Instagram)- ¡BUBE, el mejor buscador de bebidas
      subject: 'the subject', // fi. for email
     // files: ['', ''], // an array of filenames either locally or remotely
      url: 'https://web.bube.com.pe',
     // chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
     // appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
     // iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
    };
    this.socialSharing.shareWithOptions(options);
}

 // googleAnalytics
 googleAnalytics(){
  this.firebaseAnalytics.logEvent('pantallas',{pantalla:"perfil_MisDatos"})
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

