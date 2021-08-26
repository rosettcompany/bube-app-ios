import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import { ServicioAesService } from '../servicio-aes/servicio-aes.service';

@Component({
  selector: 'app-registro-datos-email',
  templateUrl: './registro-datos-email.page.html',
  styleUrls: ['./styles/registro-datos-email.page.scss'],
})
export class RegistroDatosEmailPage implements OnInit {

  myForm: FormGroup;
  submitted = false;
  private nuevoUsuario = {"id":'',"nombreCompleto": '',"apellidos":'', "telefono": '0', "email": '', "rutaFoto": '', "fechaNacimiento":'',"genero":'',"password":''};


  subscription;

  private keyJScrypto = '123456$#@$^@1ERF';

  public isLoading = false;
  constructor(private router:Router,
              private loadingController:LoadingController,
              public formBuilder: FormBuilder,
              private navCtrl: NavController,
              private platform: Platform,
              private servicioAES: ServicioAesService,
              private alertController:AlertController,
              private apiServicio:ApiServiceService) { }

  ngOnInit() {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      // do nothing
      this.dismiss();
      this.navCtrl.pop();
    });

    this.myForm = this.formBuilder.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
     // celular: ['', [Validators.required, Validators.pattern('^[0-9]+$'),Validators.max(999999999),Validators.min(111111111)]],
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
     // direccion: ['', [Validators.required]]
    });
  }

    // Restore to default when leaving this page
    ionViewDidLeave(): void {
      this.subscription.unsubscribe();
    } 

  get errorControl() {
    return this.myForm.controls;
  }

  async onSubmit() {
    this.submitted = true;

    if (!this.myForm.valid) {
       console.log('Llena todos los datos!')
      return false;
    } else {
  
      this.nuevoUsuario.nombreCompleto = this.myForm.value.nombres;
      this.nuevoUsuario.apellidos = this.myForm.value.apellidos;
      this.nuevoUsuario.email = this.myForm.value.email;
      this.nuevoUsuario.rutaFoto = 'https://firebasestorage.googleapis.com/v0/b/bubeapp.appspot.com/o/ImagenesUsuarios%2Favatar_perfil.jpg?alt=media&token=3757e499-3ff4-4f3a-ba3d-911bde3506f7';
      this.nuevoUsuario.password =  this.servicioAES.set(this.keyJScrypto, this.myForm.value.password);

      let data = {"email":this.nuevoUsuario.email};
      this.postVerificarLoginGmail(data)
    }
  }

    // VERIFICAR LOGIN GMAIL
    postVerificarLoginGmail(data){
      this.apiServicio.postVerificarLoginGmail(data)
      .then((res)=>{
        console.log(res)
        var indice = this.retornarFlag(res);
        if(indice==0){
            console.log('usuario no existe');
            this.irIngresarCodigo()
        }else{
          this.presentAlert1()
        }
      }).catch((error)=>{
          console.log(error)
      });
    }

    public retornarFlag(data):number{
      let array = [];
      let ind_user:number;
      array = data;
      array.find(usuario => {
        ind_user = usuario.ind_user;
      });
      return ind_user;
    }

  irValidacionCodigoEmail(){
      this.router.navigate(['codigo-email'])
  }

  irIngresarCodigo(){
    this.loadingRegistrando();
    let codigo = this.generaCodigo();
    let cuerpo = "<h4>Hola "+this.nuevoUsuario.nombreCompleto+"</h4><p>Este es el código que necesitas para tu registro en Bube:</p><h3 style='color:#000'>"+codigo+"</h3><p>Este correo electrónico se genera automáticamente. Por favor, no respondas a él. Si necesitas ayuda adicional, por favor, visita el Soporte de Bube.</p>";
    var email = {"email": this.nuevoUsuario.email,"content": cuerpo,"subject":"Código de verificación Bube"}
    this.apiServicio.enviarCorreo(email)
    .then(res =>{

      let navigationExtras: NavigationExtras = {
         state: {
          correo:this.nuevoUsuario.email,
          codigo: codigo,
          nuevoUsuario: this.nuevoUsuario
          }
      };
      this.dismiss();
      this.router.navigate(['codigo-email'],navigationExtras);
      }).catch(er =>{
            console.log(er);
      });

  }

  async AlertError(msm) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: msm,
      buttons: ['OK']
    });

    await alert.present();
  }

  generaCodigo() {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

  //////////////// LOADING LOGIN //////////////////
  async loadingRegistrando() {
    this.isLoading = true;
    return await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Registrando...'
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  async presentAlert1() {
    const alert = await this.alertController.create({
      header: 'Error',
      cssClass: 'my-custom-class',
      subHeader: 'el email ya está registrado',
      message: 'Intente con otro email',
      buttons: ['OK']
    });

    await alert.present();
  }
}
