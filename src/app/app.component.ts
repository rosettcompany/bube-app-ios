import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform} from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { AppVersion } from '@ionic-native/app-version/ngx';
import {ApiServiceService} from './api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent{


  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    public router:Router,
    public storage: Storage,
    private alertController: AlertController,
    private apiServicio: ApiServiceService,
    private appVersion: AppVersion,
  ) {
    // this.obtenerIndUser();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleLightContent();

    });
    
  }

}
