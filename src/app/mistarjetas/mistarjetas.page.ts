import { Component, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { IonList, NavController,ModalController } from '@ionic/angular';
import { ModalTutorialTarjetasPage } from '../modalTutorialTarjetas/modalTutorialTarjetas.page';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ServicioAesService } from '../servicio-aes/servicio-aes.service';

@Component({
  selector: 'app-mistarjetas',
  templateUrl: './mistarjetas.page.html',
  styleUrls: ['./mistarjetas.page.scss'],
  animations: [
    trigger('visibilityChanged', [
      state('show', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('* => show', animate('1000ms ease-in-out')),
      transition('* => hidden', animate('100ms ease-in-out')),
    ])
  ]
})
export class MistarjetasPage {
  tarjetas:any=[];

  @ViewChild('lista') lista: IonList;

  spinner = true;
  animation = 'hidden';

  private keyJScrypto = '123456$#@$^@1ERF';
  
  constructor(
    private router:Router,
    private apiServicio:ApiServiceService,
    private modalController: ModalController,
    private servicioAES: ServicioAesService,
    private navCtrl: NavController) {
     
    }

  ngOnInit(){
    
  }   

  ionViewWillEnter(): void {
    this.apiServicio.getStorage('idusuario')
    .then(id=>{
      this.obtenerTarjetas(id);
    });
    this.abrilTutorial();
  }

  obtenerTarjetas(id){
    this.animation = 'hidden';
    this.apiServicio.getTarjetas(id)
    .subscribe((data) =>{
      console.log("listar tarjetas");
      console.log(data);
            this.tarjetas=data;
            console.log(this.tarjetas);
            if(this.tarjetas != null){

              for(let tarjeta of this.tarjetas){

                tarjeta.numero = this.servicioAES.get(this.keyJScrypto,tarjeta.numero);
                tarjeta.cvv = this.servicioAES.get(this.keyJScrypto,tarjeta.cvv);
                tarjeta.fecha = this.servicioAES.get(this.keyJScrypto,tarjeta.fecha);
              }
              this.spinner = false;
              this.animation = 'show';

            }else{
              this.spinner = false;
              this.animation = 'show';
            }


      },(er) =>{
      console.log(er);
    });
  }

  abrilTutorial(){
    this.apiServicio.getStorage('guia_tarjetas')
    .then(guia =>{
      if( guia != null){
      }else{
        this.tutorial();
      }
    })     
  }

  agregarTarjeta(){
    this.lista.closeSlidingItems();
    let navigationExtras: NavigationExtras = {
      state: {
        tarjeta:"0",
        pantalla:1
      }
    };
    this.router.navigate(['./agregar-tarjeta'],navigationExtras);

  }

  regresar(){
    let backbutton = document.getElementById('volver') as HTMLIonBackButtonElement;
    backbutton.disabled = true;
  }



  editar(t){
    console.log("editar "+ t);
    this.lista.closeSlidingItems();
    let navigationExtras: NavigationExtras = {
      state: {
        tarjeta:t,
        pantalla:1
      }
    };
    this.router.navigate(['agregar-tarjeta'],navigationExtras);
  }

  eliminar(t){
    console.log(t);
    this.lista.closeSlidingItems();
    this.apiServicio.eliminarTarjeta(t.idtarjeta)
      .then(res => {
        console.log("tarjeta eliminada");
        console.log(res);
        this.ionViewWillEnter();
      })
      .catch(er =>{
        console.log("error al eliminar tarjeta");
        console.log(er);
      })
   
  }
  async tutorial(){
    const modal= await this.modalController.create({
       component: ModalTutorialTarjetasPage,
       cssClass: 'small-modal',
       componentProps:{
         pagina: 1
       }
       
     });
     await modal.present();
     const {data} = await modal.onDidDismiss();
     console.log(data);
     this.apiServicio.setStorage('guia_tarjetas',1);
   }
  


   n1(data){
 
    let n1 = String(data).substring(0,4);

    return n1;
  }

   n2(data){

    let n2 = String(data).substring(4,5);

    return n2;
  }

   n3(data){

    let n3 = String(data).substring(12);

    return n3;
  }
}
