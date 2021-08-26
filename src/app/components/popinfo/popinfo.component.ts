import { Component, OnInit } from '@angular/core';
import { PopoverController,ToastController,Platform } from '@ionic/angular';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-popinfo',
  templateUrl: './popinfo.component.html',
  styleUrls: ['./popinfo.component.scss'],
})
export class PopinfoComponent implements OnInit {
  usuario:any;
  subscription;
  user:any;
  constructor(
    public toastController: ToastController,
    private apiServicio:ApiServiceService,
    private platform: Platform,
    public popoverController: PopoverController) { 

  }

  ngOnInit() {}

  ionViewDidEnter(): void {
    console.log(this.usuario);
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      this.cerrar();
    });
  }

  pagar(){

    let input = document.getElementById('txt-numero') as HTMLIonInputElement;

    if(String(input.value).length==8 ){

      console.log(String(input.value).substring(0,1));
      console.log(String(input.value).substring(1,2));
      console.log(String(input.value).substring(2,3));
      console.log(String(input.value).substring(3,4));
      console.log(String(input.value).substring(4,5));
      console.log(String(input.value).substring(5,6));
      console.log(String(input.value).substring(6,7));
      console.log(String(input.value).substring(7,8));
      if(!isNaN(Number(String(input.value).substring(0,1))) && 
         !isNaN(Number(String(input.value).substring(1,2))) && 
         !isNaN(Number(String(input.value).substring(2,3))) &&
         !isNaN(Number(String(input.value).substring(3,4))) &&
         !isNaN(Number(String(input.value).substring(4,5))) &&
         !isNaN(Number(String(input.value).substring(5,6))) &&
         !isNaN(Number(String(input.value).substring(6,7))) &&
         !isNaN(Number(String(input.value).substring(7,8)))){
        this.usuario.dni=input.value;
        console.log(this.usuario);
        
        this.user = {"apellidosUsuario":this.usuario.apellidosusuario,"codigoPais":this.usuario.codigopais,"dni":input.value,
        "email2Usuario":this.usuario.email2usuario,"emailUsuario":this.usuario.emailusuario,"estadoUsuario":this.usuario.estadousuario,
        "fechaNacimientoUsuario":this.usuario.fechanacimientousuario,"fechaRegistro":this.usuario.fecharegistro,"idFacebook":this.usuario.idfacebook,
        "idUsuario":this.usuario.idusuario, "nombresUsuario":this.usuario.nombresusuario, "rutaFotoUsuario":this.usuario.rutafotousuario,
        "sexoUsuario":this.usuario.sexousuario,"telefonoUsuario":this.usuario.telefonousuario};

        this.apiServicio.insertarDni(this.user)
          .then(res =>{
            console.log(res);
            this.popoverController.dismiss({
              usuario: this.user
            });
          })
          .catch(er =>{
            console.log("error al insertar dni");
            console.log(er);
          })
      }else{
        this.presentToast('DNI invalido');
      }
      
      
    }else{
      this.presentToast('Ingrese su DNI');
      console.log("toast");
    }
  }

  async presentToast(msm) {
    const toast = await this.toastController.create({
      message: msm,
      duration: 2000,
      color: 'danger',
     
    });
    toast.present();
  }

  cerrar(){
    this.popoverController.dismiss();
    this.subscription.unsubscribe();
  }

}
