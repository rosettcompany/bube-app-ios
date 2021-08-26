import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { MenuController, NavController} from '@ionic/angular';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage{
  promociones : any=[];
  spinner = true;
  fondoVisible = true;
  skeletonList = [1,2,3,4];
  notificaciones:any;

  constructor(
    private apiServicio: ApiServiceService,
    public menu: MenuController, 
    private firebaseAnalytics: FirebaseAnalytics,
    private navCtrl: NavController,
    private router:Router
  ) { }

  ionViewWillEnter(){
  
    this.apiServicio.getStorage('idusuario')
    .then(id =>{
      this.getNotificaciones(id);

      let notificacion = {
        "usuario":{
          "idUsuario":id
        }
      }
      this.apiServicio.cambiarEstadoNotificacion(notificacion)
      .then(res =>{
        console.log(res);
      })
      .catch(er=>{
        console.log("error cambiar estado");
        console.log(er);
      });
    })
    .catch(er=>{
      console.log(er);
    });
    
  }
    // Disable side menu for this page
    ionViewDidEnter(): void {
      this.menu.enable(false);

  
    }
  
    // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }
    
  regresar(){
    let backbutton = document.getElementById('volver') as HTMLIonBackButtonElement;
    backbutton.disabled = true;
  }

  getNotificaciones(id){
    this.fondoVisible = false;
    this.spinner = true;
    this.apiServicio.getNotificaciones(id).subscribe((data) =>{
      this.fondoVisible = true;
      this.spinner = false;
      console.log(data);
      this.notificaciones = data;
    },(error)=>{
      console.error(error);
    });
  }

    // googleAnalytics
    googleAnalytics(){
      this.firebaseAnalytics.logEvent('pantallas',{pantalla:"perfil_Notificaciones"})
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
