import { Component, AfterViewInit, ViewChild, HostBinding } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonSlides, MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: [
    './styles/walkthrough.page.scss',
    './styles/walkthrough.shell.scss',
    './styles/walkthrough.responsive.scss'
  ]
})
export class WalkthroughPage implements AfterViewInit {
  slidesOptions: any = {
    zoom: {
      toggle: false // Disable zooming to prevent weird double tap zomming on slide images
    }
  };
  backButtonSubscription;
  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  @HostBinding('class.first-slide-active') isFirstSlide = true;

  @HostBinding('class.last-slide-active') isLastSlide = false;

  constructor(public menu: MenuController, private splashScreen: SplashScreen, private platform: Platform) { }


  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.menu.enable(false);
  }

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  ngAfterViewInit(): void {
    // ViewChild is set
    this.slides.isBeginning().then(isBeginning => {
      this.isFirstSlide = isBeginning;
    });
    this.slides.isEnd().then(isEnd => {
      this.isLastSlide = isEnd;
    });

    // Subscribe to changes
    this.slides.ionSlideWillChange.subscribe(changes => {
      this.slides.isBeginning().then(isBeginning => {
        this.isFirstSlide = isBeginning;
      });
      this.slides.isEnd().then(isEnd => {
        this.isLastSlide = isEnd;
      });
    });

    this.splashScreen.hide(); 

  }

  skipWalkthrough(): void {
    // Skip to the last slide
    this.slides.length().then(length => {
      this.slides.slideTo(length);
    });
  }

  skipPage(): void{
    this.slides.length().then(length =>{
       this.slides.slideTo(1);
    });
  }
  skipPage2(): void{
    this.slides.length().then(length =>{
       this.slides.slideTo(2);
    });
  }
  
  backPage(): void{
    this.slides.length().then(length =>{
       this.slides.slideTo(0);
    });
  }

  skipPage3(){
    this.slides.length().then(length =>{
      this.slides.slideTo(3);
   });
  }

  backPage2(){
    this.slides.length().then(length =>{
      this.slides.slideTo(1);
   });
  }

}
