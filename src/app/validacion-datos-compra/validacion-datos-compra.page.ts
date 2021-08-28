import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-validacion-datos-compra',
  templateUrl: './validacion-datos-compra.page.html',
  styleUrls: ['./styles/validacion-datos-compra.page.scss'],
})
export class ValidacionDatosCompraPage implements OnInit {


  myForm: FormGroup;
  submitted = false;


  carrito;
  total;
  tarjeta;
  delivery;

  idusuario;

  botonContinuar = false;
  usuario;

  constructor(public formBuilder: FormBuilder,
              public apiService:ApiServiceService,
              public storage: Storage,
              private router:Router,
              public route: ActivatedRoute) 
  {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.carrito = this.router.getCurrentNavigation().extras.state.carrito;
        this.total =this.router.getCurrentNavigation().extras.state.total;
        this.tarjeta=this.router.getCurrentNavigation().extras.state.tarjeta;
        this.delivery = this.router.getCurrentNavigation().extras.state.delivery;
      }
    });

   }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      celular: ['', [Validators.required,Validators.max(999999999),Validators.min(111111111)]],
      dni: ['', [Validators.required,Validators.minLength(8)]]
    });

    this.getIdUsuario()
  }

  getIdUsuario(){
    this.storage.get('idusuario')
    .then((val) => {

        this.idusuario = val;
        this.getDatosUsuario(val)

    }).catch(error=>{
      console.log(error)
    });
  }

  getDatosUsuario(id){
    this.apiService.getDatosUsuario(id)
    .subscribe((data) =>{
        this.usuario = data[0];
        this.myForm.setValue({
          email: data[0].emailusuario,
          celular: (data[0].telefonousuario == 0 || data[0].telefonousuario  == '') ? '':data[0].telefonousuario,
          dni: data[0].dni
        });
    },error=>{
      console.log(error)
    });
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
     console.log(this.myForm.value);
      this.botonContinuar = true;
      let data = {"idUsuario": this.idusuario, "emailUsuario": this.myForm.value.email, "telefonoUsuario":String(this.myForm.value.celular)};
      this.PutCorreo(data)
    }
  }

  regresar(){
    let backbutton = document.getElementById('volver5') as HTMLIonBackButtonElement;
    backbutton.disabled = true;
  }

  clickSubmit(){
    let btnSubmit = document.getElementById('btnSubmit') as HTMLIonButtonElement;

    btnSubmit.click();
  }

  PutCorreo(data){
    this.apiService.PutCorreo(data)
    .then(res=>{
      let user = {"apellidosUsuario":this.usuario.apellidosusuario,
                  "codigoPais":this.usuario.codigopais,
                  "dni":this.myForm.value.dni,
                  "email2Usuario":this.usuario.email2usuario,
                  "emailUsuario":this.usuario.emailusuario,
                  "estadoUsuario":this.usuario.estadousuario,
                  "fechaNacimientoUsuario":this.usuario.fechanacimientousuario,
                  "fechaRegistro":this.usuario.fecharegistro,
                  "idFacebook":this.usuario.idfacebook,
                  "idUsuario":this.usuario.idusuario,
                  "nombresUsuario":this.usuario.nombresusuario,
                  "rutaFotoUsuario":this.usuario.rutafotousuario,
                  "sexoUsuario":this.usuario.sexousuario,
                  "telefonoUsuario":this.usuario.telefonousuario};

      this.putDNI(user)
    })
    .catch(error => {
      console.log(error);
      this.botonContinuar = false;
    });
}

  putDNI(data){
    this.apiService.insertarDni(data)
    .then(res =>{

      this.botonContinuar = false;
      console.log("finalizado")
      this.irFinalizarCompra();
    })
    .catch(error =>{
      console.log(error);
      this.botonContinuar = false;
    })
  }



  irFinalizarCompra(){

    this.storage.set('datos_validos',1);
    let navigationExtras: NavigationExtras = {
      state: {
        carrito:this.carrito,
        total:this.total,
        tarjeta:this.tarjeta,
        delivery: this.delivery
      }
    };
   this.router.navigate(['finalizar-compra'],navigationExtras);
  }

}
