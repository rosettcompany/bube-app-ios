import { Component} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController, ModalController } from '@ionic/angular';
import {ApiServiceService} from '../api-service.service';
import { Storage } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AlertController } from '@ionic/angular';
import {TourPage} from '../tour/tour.page'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-validacionCorreo',
  templateUrl: './validacionCorreo.page.html',
  styleUrls: [
    './styles/validacionCorreo.page.scss',
    './styles/validacionCorreo.shell.scss',
    './styles/validacionCorreo.responsive.scss'
  ]
})

export class validacionCorreoPage{

   correo:String ='';
   
   tagCorreo = {};

   estado = {};
   public submitted = false;
   public myForm: FormGroup;

   Usuario:any = {};
   tipoRegistro;

   emailVisible = false;
   telVisible = false;
  

  constructor(public menu: MenuController, public router: Router,
    private modalCtrl:ModalController,
    public formBuilder: FormBuilder,
    public route: ActivatedRoute,
     public apiService:ApiServiceService,private splashScreen: SplashScreen,
      public storage: Storage, public alertController: AlertController) {

        this.route.queryParams.subscribe(params => {
          if (this.router.getCurrentNavigation().extras.state) {
            this.Usuario = this.router.getCurrentNavigation().extras.state.nuevoUsuario;
            this.tipoRegistro = this.router.getCurrentNavigation().extras.state.tipoRegistro;
          }});
       }


    ngOnInit(){

        this.myForm = this.formBuilder.group({
          email: ['', [Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
          celular: ['', [Validators.max(999999999),Validators.min(111111111)]]
        });

    }
  // Disable side menu for this page
  ionViewDidEnter(): void {
    this.menu.enable(false);
    this.splashScreen.hide();
    
    /*this.storage.get('correo')
    .then((val) =>{
      this.correo =val;
      this.myForm.setValue({
        email: val,
        celular: ''
      });
    });
*/
    this.validarTipoRegistro(this.tipoRegistro)
  }

  validarTipoRegistro(tipo){
    if(tipo == 'email'){
      this.myForm.setValue({
        email: this.Usuario.email,
        celular: ''
      });
      this.emailVisible = false;
      this.telVisible = true;
    }else{
      if(tipo == 'tel'){
        this.myForm.setValue({
          email:'',
          celular: this.Usuario.telefono
        });
        this.telVisible = false;
        this.emailVisible = true;
      }else{
        if(tipo == 'fb'){
          this.myForm.setValue({
            email: this.Usuario.email,
            celular: this.Usuario.telefono
          });
          this.telVisible = true;
          this.emailVisible = true;
      }else{
        if( tipo == 'apple'){
          this.myForm.setValue({
            email: this.Usuario.email,
            celular: this.Usuario.telefono
          });
          this.emailVisible = true;
          this.telVisible = true;
        }
      }
    }
   }
  }
  
  get errorControl() {
    return this.myForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.myForm.valid) {
       console.log('Llena todos los datos!')
      return false;
    } else {
      this.inicio()
 
    }
  }

    /////////////// MODAL TOUR  ////////////////

    async ModalTour()
    {
      const modal = await this.modalCtrl.create(
        {
       component: TourPage,
       componentProps: {
        'indicador': 2
      }
     });
     modal.onDidDismiss();
     return await modal.present();
  }
 

  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  inicio(): void {
    let idusuario:number;
    this.storage.get('idusuario')
    .then((val) => {

         idusuario = val;
         
          if(String(this.myForm.value.celular) == ''){
            this.tagCorreo = {"idUsuario": idusuario, "emailUsuario": this.myForm.value.email, "telefonoUsuario":"0"};
          }else{
            this.tagCorreo = {"idUsuario": idusuario, "emailUsuario": this.myForm.value.email, "telefonoUsuario":String(this.myForm.value.celular)};
          }

         this.estado = {"idUsuario": idusuario, "estado": 2};
         console.log(this.tagCorreo);
         this.PutCorreo();
    });
  }

  PutCorreo(){
        this.apiService.PutCorreo(this.tagCorreo)
        .then(res =>{

          console.log('CORREO ACTUALIZADO');
          this.PutEstado();
          
        })
        .catch(error => {
          console.log(error);
        });
  }

  PutEstado(){
    this.apiService.PutEstado(this.estado)
    .then( res => {

            this.storage.remove('datos_validos');
            console.log('ESTADO ACTUALIZADO');
            this.apiService.setStorage('ind_user',2);
            this.router.navigate(['app/inicio']);
    })
    .catch(error => {
      console.log(error);
    });
  }
}