
import { Component} from '@angular/core';
import { Router,ActivatedRoute,NavigationExtras } from '@angular/router';
import { LoadingController, ToastController, NavController, Platform} from '@ionic/angular';
import { Storage } from '@ionic/storage';
import introJs from 'intro.js/intro.js';

@Component({
  selector: 'app-detalleamigo',
  templateUrl: './detalleamigo.page.html',
  styleUrls: ['./detalleamigo.page.scss',
              './detalleamigo.shell.scss'],
})
export class DetalleamigoPage {
  amigo:any;
  fecha;
  fotoAmigo: String;
 
  // TOUR ACTIVO 
  tourActivo = false;
  intro:any;
  constructor(

    public router:Router,
    public storage: Storage,
    public route: ActivatedRoute,
    private navCtrl: NavController,
    private platform: Platform,
    public toastController: ToastController,
    public loadingController: LoadingController
    ) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.amigo = this.router.getCurrentNavigation().extras.state.amigo;
          console.log(this.amigo);
        }
        
      }); 
     }


  ionViewWillEnter(): void {  
    console.log(this.amigo);
    this.fotoAmigo =  'https://graph.facebook.com/'+this.amigo.idfacebook+'/picture?type=large';
    this.obtenerFecha();
  }

  
  ionViewDidEnter(): void{
    if(this.tourActivo == false){
      this.introTour();
      this.tourActivo = true;
    }
  }

  introTour() {
    this.intro  = introJs();
    this.intro .setOptions({
    nextLabel: ">>",
    prevLabel: "<<",
    doneLabel: "Aceptar",
    hidePrev: true,
    steps: [
  
      {
        element: '#bebidasFavoritas',
        intro: "Selecciona la bebida favorita de "+String(this.amigo.nombresusuario)+"y obsequiasela con Bube compartiendole el voucher de compra o enviandole el delivery",
        position: 'top'
  
      }
    ]
    });
    this.intro .start();
  }
  
  ionViewDidLeave(){
    let backbutton = document.getElementById('volverAmigo') as HTMLIonBackButtonElement;
    backbutton.disabled = false;
    this.intro.exit(true);
  }

   obtenerFecha(){
    if(this.amigo.anionacimiento != '2099' || this.amigo.anionacimiento != '2100'){
      switch(this.amigo.mesnacimiento){
        case 1 :
          this.fecha = this.amigo.dianacimiento+" de Enero";
          break;
        case 2:
          this.fecha = this.amigo.dianacimiento+" de Febrero";
          break;
        case 3:
          this.fecha = this.amigo.dianacimiento+" de Marzo";
          break;
        case 4:
          this.fecha = this.amigo.dianacimiento+" de Abril";
          break;
        case 5:
          this.fecha = this.amigo.dianacimiento+" de Mayo";
          break;
        case 6:
          this.fecha = this.amigo.dianacimiento+" de Junio";
          break;
        case 7:
          this.fecha = this.amigo.dianacimiento+" de Julio";
          break;
        case 8:
          this.fecha = this.amigo.dianacimiento+" de Agosto";
          break;
        case 9:
          this.fecha = this.amigo.dianacimiento+" de Setiembre";
          break;
        case 10:
          this.fecha = this.amigo.dianacimiento+" de Octubre";
          break;
        case 11:
          this.fecha = this.amigo.dianacimiento+" de Noviembre";
          break;
        case 12:
          this.fecha = this.amigo.dianacimiento+" de Diciembre";
          break;
        default:
          break;
      }
    }else{
      this.fecha = "";
    }
   }

   regresar(){
    let backbutton = document.getElementById('volverAmigo') as HTMLIonBackButtonElement;
    backbutton.disabled = true;
  }

  buscarBebida(cerveza,id){

    this.storage.get('latitud')
    .then((val) =>{
        console.log(val);
        if(val != null){


          this.storage.get('km').then((val) =>{

                let navigationExtras: NavigationExtras = {
                  state: {
                    bebida: cerveza,
                    km:val,
                    regalo:id,
                    amigo:this.amigo.nombresusuario
                  }
              };
                this.router.navigate(['busquedaProducto'],navigationExtras);

          }).catch(error =>{
            console.log("no Km");
          });

        }else{
          this.presentToast();
        }
      })
      .catch(error =>{
        console.log("no hay ubicacion");
      });
        
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Porfavor debe ingresar una direccion',
      duration: 2000,
      color: 'danger',
     
    });
    toast.present();
  }

  
  

}
