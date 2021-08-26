import { Component} from '@angular/core';
import { MenuController } from '@ionic/angular';
import {ApiServiceService} from '../api-service.service';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

export class Tag{
  tag: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

@Component({
  selector: 'app-validacion',
  templateUrl: './validacion.page.html',
  styleUrls: [
    './styles/validacion.page.scss',
    './styles/validacion.shell.scss',
    './styles/validacion.responsive.scss'
  ],
  providers: [Keyboard]
})
export class ValidacionPage{

  
 isItemAvailable = false;
 items = [];
 bebidas:any;
 pantallaAnterior;
 buttonDisabled = 'true';
 estado = {};

 tagName = [];
 tagBebidas = [];

 isKeyboardHide=true;

 Usuario:any = {};
 tipoRegistro;

 constructor(public menu: MenuController,
  public keyboard:Keyboard,
  public router: Router,
  public route: ActivatedRoute,
  private splashScreen: SplashScreen,
   public apiService:ApiServiceService, 
   public alertController: AlertController,
   private routeActivate: ActivatedRoute,
   private toastController: ToastController,
   public storage: Storage) { 
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.Usuario = this.router.getCurrentNavigation().extras.state.nuevoUsuario;
        this.tipoRegistro = this.router.getCurrentNavigation().extras.state.tipoRegistro;
      }});
   }
 
 public search: String = '';

 ionViewWillEnter() {
  this.keyboard.onKeyboardWillShow().subscribe(()=>{
    this.isKeyboardHide=false;
    // console.log('SHOWK');
  });

  this.keyboard.onKeyboardWillHide().subscribe(()=>{
    this.isKeyboardHide=true;
    // console.log('HIDEK');
  });
} 

 async presentAlert() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Alerta',
    subHeader: 'Demasiadas bebidas',
    message: 'Solo se permite hasta 10 bebidas favoritas.',
    buttons: ['OK']
  });

  await alert.present();
}

async presentToast(mensaje) {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 2000,
    color: 'success',
   
  });
  toast.present();
}


 initializeBebidas(val){
   this.getBebidas(val);
 }

 getItems(ev: any) {
     // Reset items back to all of the items
     
     // set val to the value of the searchbar

     const val = ev.target.value;
     

     // if the value is an empty string don't filter the items
     if (val && val.trim() !== '') {


      this.initializeBebidas(val);
         

        // this.items = this.items.filter((item) => {
       //      return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
       //  })

     } else {
         this.isItemAvailable = false;
     }
 }

  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.menu.enable(false);

    this.splashScreen.hide();
    let btnAtras = document.getElementById('btnAtras') as HTMLIonButtonElement;
    this.pantallaAnterior = this.routeActivate.snapshot.paramMap.get("ind");
    if(this.pantallaAnterior==1){
      btnAtras.hidden=true;
    }
    
    if(this.pantallaAnterior==2){
      this.tagName = [];
      this.buttonDisabled = 'false';
      let btn = document.getElementById('btn-guardar') as HTMLIonButtonElement;
      btn.textContent='Guardar';
      this.apiService.getStorage('idusuario')
        .then(id => {
          this.apiService.getBebidasFavoritas(id)
            .subscribe((data) =>{
              var bebidas:any = data;
              console.log(bebidas);
              bebidas.forEach(b => {
                this.tagName.push({idBebida: b.idbebida, nombreBebida: b.nombrebebida, idUsuario: b.idusuario});
                this.tagBebidas.push({"idBebida": b.idbebida, "idUsuario": b.idusuario });
                console.log(this.tagName);
              });
             
            });
        });
      
    }
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  Agregar(item: any){
    console.log(item);
  }

  getBebidas(val){
    this.apiService.getBebidas2(val)
    .subscribe(
      (data) => { // Success
        this.bebidas = data;
        this.isItemAvailable = true; 
      },
      (error) =>{
        console.error(error);
      }
    )
  }



add(item: any, item2: any): void {
    
    this.buttonDisabled = 'false';
    let cantidad = this.tagName.length;

    if(cantidad==10){
          this.presentAlert();
          this.isItemAvailable = false;
    }else{

      if(this.tagName.find(bebida => bebida.idBebida === item)){

        console.log("Encontrado");
        this.isItemAvailable = false;

      }else{

        let idusuario:number;

        this.storage.get('idusuario')
        .then((val) => {
             idusuario = val;
             this.tagName.push({idBebida: item, nombreBebida: item2, idUsuario: idusuario},);
             this.tagBebidas.push({"idBebida": item, "idUsuario": idusuario },);
             this.estado = {"idUsuario": idusuario, "estado": 4};
             this.isItemAvailable = false;
             
        });
    
        }
      console.log(this.tagBebidas);
    }

    
  }

  remove(id: number): void {
    this.tagName.splice(id, 1);
    this.tagBebidas.splice(id,1);
    let cantidad = this.tagName.length;

    if(cantidad==0){
      this.buttonDisabled = 'true';
    }

  }

  PostBebidasFavoritas(){

    if(this.pantallaAnterior==1){

      this.apiService.PostBebidasFavoritas(this.tagBebidas)
      .then(res =>{
        console.log('BEBIDAS FAVORITAS INSERTADAS');
        this.PutEstado();
        
      })
      .catch(error =>{
        console.log(error);
        
      }); 
    }else{
      console.log('editar bebidas');
      console.log(this.tagBebidas);
      this.apiService.EditarBebidasFavoritas(this.tagBebidas)
        .then(res =>{
          this.presentToast('Sus bebidas favoritas se han actualizado');
          console.log('bebidas editadas');
        })
        .catch(error =>{
          this.presentToast('No se pudo editar tus bebidas intentalo de nuevo');
          console.log('error editar bebidas');
          console.log(error);
        });
    }
  }

  PutEstado(){
    this.apiService.PutEstado(this.estado)
    .then( res => {
            console.log('ESTADO ACTUALIZADO');

            let navigationExtras: NavigationExtras = {
              state: {
                nuevoUsuario:this.Usuario,
                tipoRegistro:  this.tipoRegistro
              }
            };

            this.apiService.setStorage('ind_user',4);
            this.router.navigate(['validacionCorreo'],navigationExtras);
    })
    .catch(error => {
      console.log(error);
    });
  }

  irAtras(){
    this.router.navigate(['app/perfil/misdatos']);
  }

}