import { Component, AfterViewInit, ViewChild, HostBinding } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { IonSlides, MenuController, ModalController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import {Router} from '@angular/router'
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.page.html',
  styleUrls: [
    './styles/tour.page.scss',
    './styles/tour.shell.scss'
  ]
})
export class TourPage{

  indicador:any;

  @ViewChild(IonSlides, { static: true }) slides: IonSlides;

  @HostBinding('class.first-slide-active') isFirstSlide = true;

  @HostBinding('class.last-slide-active') isLastSlide = false;

constructor(public menu: MenuController,
              public router: Router,
              private modalControler: ModalController,
              private splashScreen: SplashScreen,
              private platform: Platform) { }


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
  }



///////////////////// SLIDE 1

skipPage(): void{
  this.slides.length().then(length =>{
     this.slides.slideTo(1);
  });
}



///////////////////////// SLIDE 2

skipPage2(): void{
  this.slides.length().then(length =>{
     this.slides.slideTo(2);
  });
}


///////////////////// SLIDE 3

skipPage3(): void{
  this.slides.length().then(length =>{
     this.slides.slideTo(3);
  });
}


/////////////////////// SLIDE 4


skipTour(): void{

  if(this.indicador == 1){
    this.modalControler.dismiss();
  }else{
    this.router.navigate(['app/inicio']);
    this.modalControler.dismiss();
  }
  
}

}
