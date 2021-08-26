import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.page.html',
  styleUrls: ['./terminos.page.scss'],
})
export class TerminosPage implements OnInit {
  pantallaAnterior;

  constructor(
    public router:Router,
    private firebaseAnalytics: FirebaseAnalytics,
    private navCtrl: NavController,
    private routeActivate:ActivatedRoute
  ) { }

  ngOnInit() {
    this.irPoliticas();
    this.pantallaAnterior = this.routeActivate.snapshot.paramMap.get("ind");
    let toolbar = document.getElementById('toolbar') as HTMLIonToolbarElement;
    let iconoBoton = document.getElementById('btnAtras') as HTMLImageElement;
    let tituloToolbar = document.getElementById('titulo') as HTMLIonTitleElement;
    let titulo2 = document.getElementById('titulo2') as HTMLHRElement;

    if(this.pantallaAnterior==2){
      toolbar.style.cssText="--background: #108b3c;";
      iconoBoton.src="./assets/Iconos/Icons/Navigation 24px/White/Back Arrow.svg";
      tituloToolbar.hidden=false;
      titulo2.hidden=true;
    }else{
      toolbar.style.cssText="--background: #121212;";
      iconoBoton.src="./assets/Iconos/navigation/close_24px.svg";
      tituloToolbar.hidden=true;
      titulo2.hidden=false;
    }
  }

  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.googleAnalytics();
  }

  regresar(){

    this.navCtrl.back();
    
  }

  irPoliticas(){
    let politicas = document.getElementById("politicas") as HTMLDivElement;
    politicas.focus();
  }

      // googleAnalytics
 googleAnalytics(){
  this.firebaseAnalytics.logEvent('pantallas',{pantalla:"terminos&Condiciones"})
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
