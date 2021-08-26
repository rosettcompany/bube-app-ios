import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.page.html',
  styleUrls: ['./contactanos.page.scss'],
})
export class ContactanosPage implements OnInit {

  constructor(
    private router:Router,
    private firebaseAnalytics: FirebaseAnalytics,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  regresar(){
    let backbutton = document.getElementById('volver') as HTMLIonBackButtonElement;
    backbutton.disabled = true;
  }

      // googleAnalytics
  googleAnalytics(){
    this.firebaseAnalytics.logEvent('pantallas',{pantalla:"perfil_Contactanos"})
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
