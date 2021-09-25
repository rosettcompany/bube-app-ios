import { NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import {HttpClientModule} from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { PipesModule } from './pipes/pipes.module';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { File } from '@ionic-native/file/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { ParallaxHeader } from './parallax-header.directive';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { FirebaseAuthentication } from '@ionic-native/firebase-authentication/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Device } from '@ionic-native/device/ngx';
import { SignInWithApple } from '@ionic-native/sign-in-with-apple/ngx';
@NgModule({
  declarations: [AppComponent, ParallaxHeader],
  entryComponents: [],
  imports: [BrowserModule,
            PipesModule,
            IonicModule.forRoot(), 
            AppRoutingModule,
            AngularFireModule.initializeApp(environment.firebaseConfig), 
            AngularFireAuthModule,
            HttpClientModule, 
            BrowserAnimationsModule,
            IonicStorageModule.forRoot() ],
  providers: [
    StatusBar,
    Facebook,
    Diagnostic,
    Device,
    SignInWithApple,
    GooglePlus,
    AppVersion,
    FirebaseAuthentication,
    Geolocation,
    FirebaseAnalytics,
    NativeGeocoder,
    SocialSharing,
    SplashScreen,
    File,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule{
}
