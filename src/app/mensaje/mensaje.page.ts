import { Component, OnInit,NgZone,ViewChild  } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { MenuController,IonSlides, ModalController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.page.html',
  styleUrls: [
    './styles/mensaje.page.scss'
  ]
})
export class MensajePage implements OnInit{
  
  public subscription;

  public android = false;
  public ios = false;

  constructor(
    public menu: MenuController,
    private splashScreen: SplashScreen,
    private platform: Platform,
    public router: Router, 
          ) { 

              }

  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.splashScreen.hide();
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      navigator['app'].exitApp();
   
  });

  if(this.platform.is("android")){
    this.android =true;
    this.ios = false;
    console.log("android");
  }else if (this.platform.is("ios")){
    this.android = false;
    this.ios = true;
    console.log("ios");
  }else{
    console.log("nada");
    this.ios = false;
    this.android = false;
    }
  }

  ngOnInit(){

  }




}