import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';
import { Location } from '@angular/common';

import { ServicioAesService } from '../servicio-aes/servicio-aes.service';

@Component({
  selector: 'app-agregar-tarjeta',
  templateUrl: './agregar-tarjeta.page.html',
  styleUrls: ['./agregar-tarjeta.page.scss'],
})
export class AgregarTarjetaPage implements OnInit {
  nombre="";
  name="";
  apellido="";
  numero="Número de tarjeta";
  fecha="";
  cvv="";
  tipo="hola";
  tarjeta={};
  miTarjeta:any;
  nombreBoton;
  pantalla;
  ocultar=true;
  private keyJScrypto = '123456$#@$^@1ERF';

  constructor(
    private toastControler: ToastController,
    private apiService:ApiServiceService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private servicioAES: ServicioAesService,
    private router:Router,
    private route:ActivatedRoute,
    private location: Location) {
      this.route.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.miTarjeta = this.router.getCurrentNavigation().extras.state.tarjeta;
          this.pantalla = this.router.getCurrentNavigation().extras.state.pantalla;
          console.log(this.pantalla);
          
        }

      
        
      });
     }

  ngOnInit() {
  }

  
  ionViewWillEnter(): void {
    console.log(this.miTarjeta);
    if(this.miTarjeta=="0"){
      this.nombreBoton="Añadir tarjeta";
      this.fecha=" ";
      // this.tipo = this.miTarjeta.tipo;
      
    }else{
      
      this.nombreBoton="Editar tarjeta";
      this.ponerNumeroEditar(this.miTarjeta.numero);
      this.ponerNombre(this.miTarjeta.titular);
      this.ponerFecha(this.miTarjeta.fecha);
      this.ponerCvv(this.miTarjeta.cvv);
    }
  }
 

  ponerNumeroEditar(valor){
    let n = document.getElementById('txt-numero') as HTMLIonInputElement;
    let num = String(valor).substring(0,4)+" "+String(valor).substring(4,8)+" "+String(valor).substring(8,12)+" "+String(valor).substring(12,16);

    n.value = num;
    console.log("numero editar");
    console.log(valor);
    this.numero=num;
  }

  ponerNumero(valor){
    if(valor !=null){
      
    console.log(valor);
    console.log(String(valor).replace(/ /g, ""));
    let n = document.getElementById('txt-numero') as HTMLIonInputElement;
    let img = document.getElementById('tipo-tarjeta') as HTMLImageElement;
    let tarjeta =document.getElementById('cotenedor') as HTMLDivElement;
    var num = String(valor);
    console.log(num.substring(0,1));
    if(num.substring(0,1)=="4"){
      console.log("visa");
      img.style.display="block";
      //  img.src="./assets/Iconos/visa.png";
      n.style.color="#000";
      tarjeta.style.background="#1c3a24";
      // this.miTarjeta.tipo="visa";
      this.tipo="visa";
      this.arreglarNumero(valor);
      
    }
    else if(num.substring(0,1)=="5"){
      console.log("mastercard");
      // img.src="./assets/Iconos/master.png";
      img.style.display="block";
      n.style.color="#000";
      tarjeta.style.background="#464545";
      // this.miTarjeta.tipo="master";
      this.tipo="master";
      this.arreglarNumero(valor);
      
    }
    
    }else{
      console.log("numero vacio");
    }
  }

  arreglarNumero(valor){
    let n = document.getElementById('txt-numero') as HTMLIonInputElement;
   
      if(String(valor).substring(4)===" " && String(valor).length==5){
        n.value=valor;
        this.numero=valor;
      }else
        if(String(valor).length==5){
          let num = String(valor).substring(0,4)+" "+String(valor).substring(4);
          n.value= num
          this.numero=num;
        }
      
      if(String(valor).substring(9)===" " && String(valor).length==10){
        n.value=valor;
        this.numero=valor;
      }else
        if(String(valor).length==10){
          let num = String(valor).substring(0,9)+" "+String(valor).substring(9);
          n.value= num;
          this.numero=num;
        }
      
      if(String(valor).substring(14)===" " && String(valor).length==15){
        n.value=valor;
        this.numero=valor;
      }else
        if(String(valor).length==15){
          let num = String(valor).substring(0,14)+" "+String(valor).substring(14);
          n.value= num;
          this.numero=num;
        
    }else{
      this.numero=valor;
    }
    
  }

  ponerNombre(valor){
    
    if(valor!=null){
      this.nombre=String(valor);
    }else{
      console.log("nombre vacio");
    }
  }
  ponerCvv(valor){
    this.cvv=String(valor);
  }
  ponerFecha(valor){
    let fc = document.getElementById('txt-fecha') as HTMLIonInputElement;

    if(String(valor).substring(2)==="/" && String(valor).length==3){
      fc.value=valor;
    }else{
      if(String(valor).length==3){
        fc.value = String(valor).substring(0,2)+"/"+String(valor).substring(2);
        }
    }
    console.log(String(valor).substring(2));
    this.fecha=String(valor);

  }
  async insertarTarjeta(){
    var vNumero=false;
    var vFecha=false;
    var vTipo=false;
    var vCvv=false;
    var vNombre=false;
    let n = document.getElementById('txt-numero') as HTMLIonInputElement;
    let fe = document.getElementById('txt-fecha') as HTMLIonInputElement;
    let cv = document.getElementById('txt-cvv') as HTMLIonInputElement;
    let nombre =document.getElementById('txt-nombre') as HTMLIonInputElement;
    this.numero = String(n.value);
    this.fecha = String(fe.value);
    this.cvv = String(cv.value);
    this.nombre = String(nombre.value);

    let numeroEncriptado =  this.servicioAES.set(this.keyJScrypto, this.numero.replace(/ /g, ""))
    let fechaEncriptado = this.servicioAES.set(this.keyJScrypto,this.fecha);
    let cvvEncriptado = this.servicioAES.set(this.keyJScrypto,this.cvv);

    if( this.nombre.length==0){
      vNombre=false;
      this.presentToast("Debe ingresar el nombre del titular");
    }else{
      vNombre=true;
    }
    console.log(this.cvv);
    if( this.cvv.length==3){
      vCvv=true;
    }else{
      vCvv=false;
      this.presentToast("Debe ingresar el número de CVV");
    }
    console.log(this.fecha);
    if( this.fecha.length==5){
      let f = new Date();
      console.log(String(this.fecha).substring(3,5));
      console.log(String(f.getMonth()+1));
      if(Number(String(this.fecha).substring(0,2)) <= 12 && Number(String(this.fecha).substring(0,2)) > 0 ){
        
        if(Number(String(this.fecha).substring(3,5)) == Number(String(f.getFullYear()).substring(2,4))){

          if(Number(String(this.fecha).substring(0,2)) > Number(f.getMonth())+1){
            if(Number(String(this.fecha).substring(3,5)) >= Number(String(f.getFullYear()).substring(2,4)) && Number(String(this.fecha).substring(3,5)) < Number(String(f.getFullYear()).substring(2,4))+10){
              vFecha=true;
            }else{
              vFecha=false;
              this.presentToast("El Año de la fecha de vencimiento es incorrecto");
            }
          }else{
            vFecha=false;
            this.presentToast("El mes de la fecha de vencimiento es incorrecto"); 
          }
        }else{
          if(Number(String(this.fecha).substring(3,5)) >= Number(String(f.getFullYear()).substring(2,4)) && Number(String(this.fecha).substring(3,5)) < Number(String(f.getFullYear()).substring(2,4))+10){
            vFecha=true;
          }else{
            vFecha=false;
            this.presentToast("El Año de la fecha de vencimiento es incorrecto");
          }
        }
      }else{
        vFecha=false;
        this.presentToast("El mes de la fecha de vencimiento es incorrecto");
      }
    }else{
      vFecha=false;
      this.presentToast("Debe ingresar la fecha de vencimiento");
    }
    if( this.numero.length < 19){
      vNumero=false;
      this.presentToast("Debe ingresar un número de tarjeta");
    }else{
      vNumero=true;
    }
    if( this.tipo.length==0){
      vTipo=false;
      this.presentToast("Debe ingresar un número valido");
    }else{
      vTipo=true;
    }
       
    if(vNumero==true && vFecha==true && vTipo==true && vCvv==true && vNombre==true){
      const loading = await this.loadingCtrl.create();
      loading.present();
      this.apiService.getStorage('idusuario')
        .then(id =>{
          if(this.miTarjeta=="0"){
            this.tarjeta={
              "idusuario": id,
              "numero": numeroEncriptado,
              "titular":String(this.nombre),
              "fecha":fechaEncriptado,
              "tipo":this.tipo,
              "cvv":cvvEncriptado
            };
            console.log(this.tarjeta);
            this.apiService.getTarjetas(id).subscribe((data) =>{
              let t:any = data;
              console.log(t);

              if(t !=null){
                let indicador = 0;
                for( let x of t){
                  console.log(x);
                  if(numeroEncriptado == x.numero){
                    indicador++;
                  }
                }
                console.log(indicador);
                if(indicador == 0 ){

                  this.apiService.insertarTarjeta(this.tarjeta)
                  .then(res =>{
                  console.log(res);
                  loading.dismiss();
                  if(this.pantalla===1){
                    this.router.navigate(['mistarjetas']);
                    this.presentToast("Operación correcta");
                  }else{
                    
                    this.location.back();
                  }
                  })
                  .catch(err =>{
                    console.log(err);
                    loading.dismiss();
                    this.presentToast("No se puedo guardar su tarjeta intentelo de nuevo");
                  });
                
                  
                }else{
                  loading.dismiss();
                  this.presentToast("Esta tarjeta ya esta guardada");
                }
              }else{
                this.apiService.insertarTarjeta(this.tarjeta)
                .then(res =>{
                console.log(res);
                loading.dismiss();
                if(this.pantalla===1){
                  this.router.navigate(['mistarjetas']);
                  this.presentToast("Operación correcta");
                }else{
                  
                  this.location.back();
                }
                })
                .catch(err =>{
                  console.log(err);
                  loading.dismiss();
                  this.presentToast("No se puedo guardar su tarjeta intentelo de nuevo");
                });
              }
            });
          }else{
            this.tarjeta={
              "idusuario": id,
              "numero": numeroEncriptado,
              "titular":String(this.nombre),
              "fecha":fechaEncriptado,
              "tipo":this.tipo,
              "idtarjeta":this.miTarjeta.idtarjeta,
              "cvv":cvvEncriptado
            };
            console.log(this.tarjeta);

            this.apiService.getTarjetas(id).subscribe((data) =>{
              let t:any = data;
              console.log(t);

              let indicador = 0;
              

              console.log(indicador);

              if(indicador != 0 ){
                this.presentToast("Esta tarjeta ya esta guardada");
                loading.dismiss();
              }else{
                this.apiService.editarTarjeta(this.tarjeta)
              .then(res =>{
                console.log("tarjeta editada");
                console.log(res);
                loading.dismiss();
                if(this.pantalla===1){
                  this.router.navigate(['mistarjetas']);
                  this.presentToast("Operación correcta");
                }else{
                  this.location.back();
                }
              })
              .catch(er =>{
                console.log("error en editar tarjeta");
                console.log(er);
                loading.dismiss();
                this.presentToast("No se puedo editar su tarjeta intentelo de nuevo");
              });
              }
            }, (er) =>{
              console.log(er);
            });
            
          }
        })
        .catch(err =>{
          console.log(err);
          loading.dismiss();
          this.presentToast("No se puedo guardar su tarjeta intentelo de nuevo");
        });
    }
  }

  async presentToast(msm) {
    const toast = await this.toastControler.create({
      message: msm,
      duration: 2000,
      color: 'danger',
     
    });
    toast.present();
  }
  
  regresar(){
    let backbutton = document.getElementById('volver4') as HTMLIonBackButtonElement;
    backbutton.disabled = true;
  }


}
