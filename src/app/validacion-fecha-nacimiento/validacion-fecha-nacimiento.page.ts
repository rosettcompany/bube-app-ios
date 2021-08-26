import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import * as moment from 'moment';

@Component({
  selector: 'app-validacion-fecha-nacimiento',
  templateUrl: './validacion-fecha-nacimiento.page.html',
  styleUrls: ['./styles/validacion-fecha-nacimiento.page.scss'],
})
export class ValidacionFechaNacimientoPage implements OnInit {

  constructor(public route: ActivatedRoute,
              public router: Router,
              public loadingController: LoadingController,
              private apiService: ApiServiceService,
              public alertController: AlertController) { 

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.nuevoUsuario = this.router.getCurrentNavigation().extras.state.nuevoUsuario;
        this.tipoRegistro = this.router.getCurrentNavigation().extras.state.tipoRegistro;
        this.amigo = this.router.getCurrentNavigation().extras.state.amigo;
        this.validarFechaNacimiento();
      }});
  }

  public fechaNacimiento:any;
  loading:any;
  nuevoUsuario:any;
  amigo;
  tipoRegistro;
  public botonContinuar = true;

  options = {
    buttons: [
      {
        text: "Cancelar",
        role: "cancel"
      },
      {
        text:'Ok',
        role: "Done",
          handler:(value:any) => {
            console.log(value);
            this.fechaNacimiento = String(value.month.text) +"-"+String(value.day.text)+"-"+String(value.year.text)
            this.nuevoUsuario.fechaNacimiento = this.convert(this.fechaNacimiento);
            console.log(this.convert(this.fechaNacimiento))
            this.validarFechaNacimiento();
          }
      }
    ]
  };

  ngOnInit() {
  
  }

  validarFechaNacimiento(){
    if(this.nuevoUsuario.fechaNacimiento == null || this.nuevoUsuario.fechaNacimiento == undefined || this.nuevoUsuario.fechaNacimiento == ''){
      this.botonContinuar = true;
      this.fechaNacimiento = this.nuevoUsuario.fechaNacimiento;
    }else{
      this.botonContinuar = false;
    }
  }


  validarMayorEdad():Boolean{
    let date = new Date();
    var date2=Date.parse(this.fechaNacimiento+' '+'00:00:00');

    let dateBirthday = new Date(date2)

    if(date.getFullYear() - dateBirthday.getFullYear()  < 18)
      return false;
    else
      return true;
  }

  irValidacionBebidas(){
      if(this.validarMayorEdad()){
          this.presentLoading()
          console.log(this.nuevoUsuario)
          let data = {"id":this.nuevoUsuario.id,
                      "email":this.nuevoUsuario.email,
                      "first_name":this.nuevoUsuario.nombreCompleto,
                      "picture":{"data":
                                    {"url":this.nuevoUsuario.rutaFoto} 
                                },
                      "last_name":this.nuevoUsuario.apellidos,
                      "gender":this.nuevoUsuario.genero,
                      "birthday":this.nuevoUsuario.fechaNacimiento,
                      "password":this.nuevoUsuario.password,
                      "telefono":(this.nuevoUsuario.telefono == '' || this.nuevoUsuario.telefono == null) ? '0':this.nuevoUsuario.telefono,
                      "viene_de":this.tipoRegistro,
                      "idapple":this.nuevoUsuario.idapple
                      }

            console.log(data)
            this.validarTipoRegistro(data)

      }else{
        this.presentAlert1()
      }
  }

  validarTipoRegistro(data){
    if(this.tipoRegistro == 'email'){
      this.insertaUser(data)
    }else{
      if(this.tipoRegistro == 'tel'){
        this.insertaUser(data)
      }else{
        if(this.tipoRegistro == 'fb'){
            this.insertaUserFB(data)
        }else{
          if(this.tipoRegistro == 'apple'){
            this.insertaUserApple(data)
          }else{
            console.log('ERROR EN TIPO DE REGISTRO')
          }
        }
      }
    }
  }

    //llamado al servicio de para insertar los datos del usuario en la BD
    insertaUser(usuario){
      this.apiService.postRegistrarLoginGmail(usuario)
        .then(data =>{
          console.log("retorno api "+JSON.stringify(data));
          this.guardarIdUser(data);
          this.irValidacionInicio();
        }).catch(er =>{
          this.loading.dismiss();
          this.presentAlert3(er);
        });
    }

    insertaUserApple(usuario){
      this.apiService.postRegistrarLoginApple(usuario)
        .then(data =>{
          console.log("retorno api "+JSON.stringify(data));
          this.guardarIdUser(data);
          this.irValidacionInicio();
        }).catch(er =>{
          this.loading.dismiss();
          this.presentAlert3(er);
        });
    }


      //llamado al servicio de para insertar los datos del usuario en la BD
  insertaUserFB(data){
    this.apiService.guardarUsuario(data)
      .then(res =>{
        this.guardarIdUser(res);
        this.insertarAmigos(res);
      }).catch(er =>{
        this.loading.dismiss();
        this.presentAlert3(er);
      });
  }

      //llamando al servicio para insertar los datos de amigos
  insertarAmigos(data){
    let idusuario = this.retornarid(data);
    let listaamigos1:any ={"idusuario":idusuario ,"listaamigos": JSON.stringify(this.amigo.data)};
    let listaamigos:any = {"idusuario":idusuario , "listaamigos": listaamigos1.listaamigos};
   this.apiService.guardarAmigos(listaamigos)
   .then(res =>{
     console.log("inserto amigos "+JSON.stringify(res))
     this.irValidacionInicio()
   })
   .catch(error =>{
     console.log("error insertar amigo "+error);
     this.loading.dismiss();
     this.presentAlert4();

   });
}

    irValidacionInicio(){
      var ind = 1;
      this.loading.dismiss();

      let navigationExtras: NavigationExtras = {
        state: {
          nuevoUsuario:this.nuevoUsuario,
          tipoRegistro: this.tipoRegistro
        }
      };

      this.router.navigate(['./validacionInicio',ind],navigationExtras);
    }


  //llamando al servicio para guardar localmente el idusuario
  guardarIdUser(data){
    let correo = this.nuevoUsuario.email;
    let idusuario = this.retornarid(data);
    let ind_user = this.retornarFlag(data);
    
    this.apiService.setStorage('idusuario',idusuario);
    this.apiService.setStorage('ind_user',ind_user);
    this.apiService.setStorage('correo',correo);
    this.apiService.setStorage('usuario',this.nuevoUsuario)
    this.apiService.setStorage('tipoRegistro',this.tipoRegistro)
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
  
    public retornarid(data):number{
      let array = [];
      let idusuario:number;
      array = data;
      array.find(usuario => {
        idusuario = usuario.idusuario;
      });
      return idusuario;
    }
  
    convert(input) {
      return moment(input).format('DD/MM/YYYY');
    }

    async presentLoading() {
      this.loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Iniciando sesión'
      });
      await this.loading.present();
    }


  async presentAlert1() {
    const alert = await this.alertController.create({
      header: 'Menor de edad',
      cssClass: 'my-custom-class',
      message: 'Debes ser mayor de edad (18+)',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert3(error) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Error al registrar usuario',
      message: error,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentAlert4() {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: 'Error al insertar amigos',
      message: 'Intente más tarde',
      buttons: ['OK']
    });

    await alert.present();
  }


}
