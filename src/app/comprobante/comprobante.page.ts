import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../api-service.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { File } from '@ionic-native/file/ngx';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { JoyrideService } from 'ngx-joyride';
import { JoyrideOptions } from 'ngx-joyride/lib/models/joyride-options.class';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

import { AlertController, ModalController, LoadingController } from '@ionic/angular';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.page.html',
  styleUrls: ['./comprobante.page.scss'],
})
export class ComprobantePage{
  compra:any=[];
  tipotarjeta;
  idcompra;
  pdfObject:any;
  fecha;
  loading:any;
  delivery:any;
  modalidad;
  indicadorModalidad;
  columnas=[];
  subscription;
  car;
  detalle;
  ahorrocompra:Number;
  num_tarjeta;
  total;
  igv;
  botonCompartir = false;

  countryCode:string = '+51';
  whatsAppNumber:string = '';
  tel:string;
  url:string;

  public isLoading = false;

  public alertModal;
  public alertIndicador = false;

  @ViewChild('gestionEntrega', {read: ElementRef}) div: ElementRef;

  constructor(
    public router: Router,
    public apiService:ApiServiceService,
    public route: ActivatedRoute,
    private firebaseAnalytics: FirebaseAnalytics,
    public alertController: AlertController,
    private file: File,
    private readonly joyrideService: JoyrideService,
    private socialSharing:SocialSharing,
    private platform:Platform,
    public storage: Storage,
    public loadingController: LoadingController
  ) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.compra = this.router.getCurrentNavigation().extras.state.compra;
        this.car = this.router.getCurrentNavigation().extras.state.car;
        this.tipotarjeta=this.router.getCurrentNavigation().extras.state.tipotarjeta;
        this.delivery = this.router.getCurrentNavigation().extras.state.delivery;
        console.log(this.car);
        console.log(this.tipotarjeta);
        console.log(this.idcompra);
        this.idcompra = this.compra[0].idcompra;
        this.whatsAppNumber = this.compra[0].telefonosocio;
        this.tel = "tel:"+this.countryCode+this.whatsAppNumber;
        this.url = "https://wa.me/"+this.countryCode+this.whatsAppNumber+"?text=Hola "+this.car.nombrecomercial+"!, espero orden N°"+String(this.idcompra)+"";
        console.log(this.url);
      }
    });
   }

  ionViewWillEnter(): void {
    this.subscription = this.platform.backButton.subscribeWithPriority(9999, () => {
      this.joyrideService.closeTour();
      if(this.alertIndicador == true){
        this.alertModal.dismiss();
        this.alertIndicador = false;
      }else{
        this.presentAlertConfirm(0);
        this.alertIndicador = true;
      }
    });
    
    if(this.delivery.modalidad == "1"){
      this.modalidad = 'Delivery';
      this.indicadorModalidad = 'S/ '+(this.delivery.precio).toFixed(2);
    }else{
      this.modalidad = 'Recojo en tienda';
      this.indicadorModalidad = '';
    }

    this.storage.get('tarjeta').then(res =>{
      this.num_tarjeta = String(res.numero).substring(String(res.numero).length-4);
    });

    this.storage.get('total').then(res =>{
     let t = Number(res).toFixed(2);
     this.total = t;
     let A = Number(this.total / 1.18);
     this.igv = (this.total - A).toFixed(2);
    });


    this.storage.get('ahorro').then(res =>{
      this.ahorrocompra = res;
    });

    this.apiService.getStorage('idusuario')
      .then(id =>{
          this.apiService.getDatosUsuario(id)
            .subscribe((user) =>{
                console.log(user);
                let usuario:any = user[0];
                
                this.apiService.getStorage('ubicacion')
                .then(dire =>{
                  this.enviarCorreo(usuario.emailusuario,usuario.nombresusuario);
                  this.enviarCorreoSocio(usuario,dire);
                })
                .catch(er =>{
                  console.log(er)
                });

            }, (error) =>{
              console.log("error al traer datos del usuario");
              console.log(error);
            });
      });
  }
 
  ionViewDidEnter(): void{
    if(this.platform.is("android")){
      this.validarInicioTour();
    }else{
  
      if (this.platform.is("ios")){
        
      }else{
        console.log("nada");
          this.validarInicioTour();
      }
    } 
    this.googleAnalytics();
  }

  validarInicioTour(){
    this.storage.get('tour').then(res =>{
      let tour = res;
      if(tour != null || tour != undefined){
        tour = tour + 1;
      }else{
        tour = 1;
      }
      if(tour < 3){
        this.IniciarTour();
      }
      this.storage.set('tour',tour);
    });
  }

  IniciarTour(){
    const options: JoyrideOptions = {
      steps: ['firstStep'],
      themeColor: '#212f23',
      showCounter: false,
      customTexts: {
        next: '>>',
        prev: '<<',
        done: 'Ok'
      }
    };
    this.joyrideService.startTour(options);
    this.scrollDiv();
  }
  scrollDiv(){
    this.div.nativeElement.scrollIntoView({behavior: 'auto', block: 'start'});
  }

     // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.subscription.unsubscribe();
  } 

  async presentLoading() {
    this.isLoading = true;
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Cargando..'
    });
    await this.loading.present();
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('dismissed'));
  }

  irAhorro(){
    this.presentAlertConfirm(1);

  }

  irInicio(){
    this.presentAlertConfirm(0);

  }

  removerDatos(){
    this.apiService.removeStorage('carrito');
    this.apiService.removeStorage('total');
    this.apiService.removeStorage('tarjeta');
    this.apiService.removeStorage('ahorro');
    this.apiService.removeStorage('num_bebidas');
    this.apiService.removeStorage('mi_seleccion');
  }

  compartir(){
    this.botonCompartir = true;
    this.columnas=[];
    this.presentLoading();
    var meses = new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var f = new Date();
    this.fecha=String(this.compra[0].fechacompra).substring(8,10)+" "+String(meses[Number(String(this.compra[0].fechacompra).substring(5,7))-1]).substring(0,3)+". "+String(this.compra[0].fechacompra).substring(0,4)+" "+String(this.compra[0].fechacompra).substring(11,16);
    console.log(this.compra);
    console.log(this.fecha);
    console.log(this.compra[0].bebidas);
    let  i;
      for(i= 0; i < this.compra[0].bebidas.length; i++ ){
        console.log(i);
        this.columnas.push({columns: [{text: this.compra[0].bebidas[i].nombrebebida,fontSize:11,margin:[0,3,0,0]},{text: this.compra[0].bebidas[i].cantidad,fontSize:11,margin:[0,3,0,0],alignment: 'right'},{text: 'S/ '+this.compra[0].bebidas[i].subtotal.toFixed(2),fontSize:11,margin:[0,3,0,0],alignment: 'right'}]},)

      }
      console.log("columnas");
      console.log(this.columnas);

    var docDefinition =  {
      pageSize: {
           width: 270,
           height: 'auto'
         },
       
      content: [
            {
              columns: [                           
                  {
                      text: this.fecha,fontSize:8,
                      alignment: 'right'
                  },
                      ]
            },
            {
              text: '¡Gracias por comprar en BUBE!',
              alignment: 'center',fontSize:7,margin:[0,10,0,5],color:'#108b3c',
            },
            {
              text: 'Orden # '+this.compra[0].idcompra,
              style: 'header',
              alignment: 'center'
            },
            {  
              text: '______________________________',
              color:'#108b3c',fontSize:13
            },
            {
              text: 'Datos para el recojo de su compra',
              margin:[0,10,0,0],
              alignment: 'center',	
              bold: true
            },
            {
              text: this.compra[0].nombrecomercial,
              alignment: 'center',margin:[0,7,0,0],color:'#5a5a59'
            },
            {
              text: 'Dirección: '+this.compra[0].direccionsocio,
              margin:[0,5,0,0],fontSize:10
            
            },
            {
              text: 'Teléfono: '+this.compra[0].telefonosocio,
              margin:[0,3,0,0],fontSize:10
            
            },
            {
              text: 'Responsable: '+this.compra[0].nombressocio+' '+this.compra[0].apellidossocio,
              style: 'datos_tienda',margin:[0,3,0,0],fontSize:10
            
            },
            {
              text: '___________________________________',
              color:'#108b3c',
              
            },
            {
              text: 'Información del pago',
              style: 'titulos',bold:true,margin:[0,5,0,0],
            
            },
            {
              text: this.compra[0].tipopagocompra,
              style: 'datos_tienda',margin:[0,5,0,0],
            
            },
            {
              text: '___________________________________',
              color:'#108b3c',
              
            },
            {
              columns: [
                {
                  text: 'Producto',bold:true,fontSize:12
                },
                {
                  text: 'Cantidad',bold:true,fontSize:12,alignment: 'right'
                },
                {
                  text: 'Subtotal',bold:true,fontSize:12,alignment: 'right'
                }
                      ]
            },
                this.columnas,   
            {
                  text: '___________________________________',
                  color:'#108b3c',
                  
                },
                {
                  columns: [
                    {
                      text: this.modalidad,bold:true,fontSize:11,margin:[0,10,0,0],
                    },
                    {
                      text: this.indicadorModalidad,bold:true,fontSize:12,margin:[0,10,0,0],alignment: 'right'
                    }
                          ]
            },
            {
              columns: [
                {
                  text: 'IGV',bold:true,fontSize:11,margin:[0,10,0,0],
                },
                {
                  text: 'S/ '+this.igv,bold:true,fontSize:12,margin:[0,10,0,0],alignment: 'right'
                }
                      ]
            },
               
            {
              text: '___________________________________',
              color:'#108b3c',
              
            },
            {
              columns: [
                {
                  text: 'Total',bold:true,fontSize:12,margin:[0,10,0,0],
                },
                {
                  text: 'S/ '+this.compra[0].montocompra.toFixed(2),bold:true,fontSize:12,margin:[0,10,0,0],alignment: 'right'
                }
                      ]
            },    
          ],        
     styles: {
       header: {
         fontSize: 13,
         bold: true,
         alignment: 'justify'
       }
     }
                    }
        this.pdfObject = pdfMake.createPdf(docDefinition);
        this.pdfObject.download();
        this.guardarPDF();
  
  }

  guardarPDF(){
    this.dismiss();
    this.botonCompartir = false;
    this.pdfObject.getBuffer((bufer) =>{
      var blob = new Blob([bufer], {type:'application/pdf'});
      this.file.writeFile(this.file.dataDirectory,'comprobantebube.pdf',blob,{replace: true})
        .then(fileEntry =>{      
          this.loading.dismiss(); 
          this.socialSharing.share("Comprobante Bube","te comparto el comprobante Bube",this.file.dataDirectory+'comprobantebube.pdf');
        });
    });
  }

  enviarCorreo(correo, nombre){
    var tds;
    let  i;
      
        console.log(i);
      
    
    var cuerpo = "<div style='background: #f3f1f1;'><label ><b>Hola "+nombre+"</b></label><br><label >Esta es la constancia de su compra:</label><table style='background: #ffffff; margin: auto; margin-top: 10px; margin-bottom: 10px; border: 1px solid #000000; padding: 10px; border-radius: 10px;'>";
        cuerpo += "<tr align='center'><td colspan=3 style='font-size: 20px;border-bottom: 1px solid #000000; padding-bottom: 5px;'><b>Orden # "+this.idcompra+"</b></td></tr><tr align='center'><td colspan=3 style='font-size: 16;font-weight: bold;'>Datos para el recojo de su compra</td>";
        cuerpo += "</tr><tr align='center'><td colspan=3 style='font-size: 15;font-weight: bold;margin-top: 10px;'>"+this.car.nombrecomercial+"</td><tr><td colspan=3><b>Dirección: </b>"+this.car.direccionsocio+"</td></tr><tr><td><b>Teléfono:</b>"+this.car.telefonosocio+"</td></tr>";
        cuerpo += "<tr><td colspan=3 style='border-bottom: 1px solid #000000; padding-bottom: 5px'><b>Responsable:</b> "+this.car.nombressocio+' '+this.car.apellidossocio+"</td>";
        cuerpo += "</tr><tr><td><b>Producto</b></td><td><b>Cantidad</b></td><td><b>Subtotal</b></td>";
        for(i= 0; i < this.car.bebidas.length; i++ ){
        cuerpo += "</tr><tr><td>"+this.car.bebidas[i].nombrebebida+"</td><td>"+this.car.bebidas[i].cantidad+"</td><td style='font-size: 14px;'>S/ "+this.car.bebidas[i].preciobebidasocio.toFixed(2)+"</td></tr>";
        }
        cuerpo +="<tr><td style='border-top: 1px solid #000000; padding-top: 2px;'>"+this.modalidad+"</td><td style='border-top: 1px solid #000000; padding-top: 3px;'> </td><td style='font-size: 13px; font-weight: bold; border-top: 1px solid #000000; padding-top: 3px;'>"+this.indicadorModalidad+"</td></tr>";
        cuerpo +="<tr><td style='border-top: 1px solid #000000; padding-top: 2px;'>IGV</td><td style='border-top: 1px solid #000000; padding-top: 3px;'> </td><td style='font-size: 13px; font-weight: bold; border-top: 1px solid #000000; padding-top: 3px;'>S/ "+this.igv+"</td></tr>";
        cuerpo += "<tr><td style='border-top: 1px solid #000000; padding-top: 5px;'><b>Total</b></td><td style='border-top: 1px solid #000000; padding-top: 5px;'> </td><td style='font-size: 18px; font-weight: bold; border-top: 1px solid #000000; padding-top: 5px;'>S/ "+this.total+"</td></tr></table><label><b>Muchas gracias por comprar en BUBE</b></label><br><br><label>Nota: Mensaje automático, por favor no responder</label><br><br></div><label>Aviso de confidencialidad</label><br><p style = 'text-align: justify; text-justify: inter-word;'>Este correo electrónico y/o el material adjunto es para uso exclusivo de la persona o entidad a la que expresamente se le ha enviado, y puede contener información confidencial o material privilegiado. Si usted no es el destinatario legítimo del mismo, por favor repórtelo inmediatamente al remitente del correo y bórrelo. Cualquier revisión, retransmisión, difusión o cualquier otro uso de este correo, por personas o entidades distintas a las del destinatario legítimo, queda expresamente prohibido. Este correo electrónico no pretende ni debe ser considerado como constitutivo de ninguna relación legal, contractual o de otra índole similar, en consecuencia, no genera obligación alguna a cargo de su emisor o su representada. En tal sentido, nada de lo señalado en esta comunicación o en sus anexos podrá ser interpretado como una recomendación sobre los riesgos o ventajas económicas, legales, contables o tributarias, o sobre las consecuencias de realizar o no determinada transacción.</p>";
       
        var email = {"email": correo,"content": cuerpo,"subject":"Constancia de operación"}
        console.log(email);
        this.apiService.enviarCorreo(email)
          .then(res =>{
            console.log("correo enviado");
            console.log(res);
          })
          .catch(er =>{
            console.log("error enviar correo");
            console.log(er);
          });
  }

  enviarCorreoSocio(user,dire){
   
    let  i;
    
    var cuerpo = "<div style='background: #f3f1f1;'><label ><b>Hola "+this.car.nombrecomercial+"</b></label><br><label >Esta es la constancia del pedido:</label><table style='background: #ffffff; margin: auto; margin-top: 10px; margin-bottom: 10px; border: 1px solid #000000; padding: 10px; border-radius: 10px;'>";
        cuerpo += "<tr align='center'><td colspan=3 style='font-size: 20px;border-bottom: 1px solid #000000; padding-bottom: 5px;'><b>Orden # "+this.idcompra+"</b></td></tr><tr align='center'><td colspan=3 style='font-size: 16;font-weight: bold;'>Datos del pedido</td>";
        cuerpo += "</tr><tr align='center'><td colspan=3 style='font-size: 15;font-weight: bold;margin-top: 10px;'>"+this.car.nombrecomercial+"</td><tr><td colspan=3><b>Comprador: </b>"+user.nombresusuario+' '+user.apellidosusuario+"</td></tr><tr><td><b>DNI: </b>"+user.dni+"</td></tr><tr><td><b>Teléfono: </b>"+user.telefonousuario+"</td></tr>";
        cuerpo += "<tr><td><b>Dirección: </b> "+dire+"</td></tr><tr><td colspan=3 style='border-bottom: 1px solid #000000; padding-bottom: 5px'><b>Referencia: </b> "+user.referencia+"</td>";
        cuerpo += "</tr><tr><td><b>Producto</b></td><td><b>Cantidad</b></td><td><b>Subtotal</b></td></tr>";
        for(i= 0; i < this.car.bebidas.length; i++ ){
          cuerpo += "</tr><tr><td>"+this.car.bebidas[i].nombrebebida+"</td><td>"+this.car.bebidas[i].cantidad+"</td><td style='font-size: 14px;'>S/ "+this.car.bebidas[i].preciobebidasocio.toFixed(2)+"</td></tr>";
          }
          cuerpo +="<tr><td style='border-top: 1px solid #000000; padding-top: 2px;'>"+this.modalidad+"</td><td style='border-top: 1px solid #000000; padding-top: 3px;'> </td><td style='font-size: 13px; font-weight: bold; border-top: 1px solid #000000; padding-top: 3px;'>"+this.indicadorModalidad+"</td></tr>";
          cuerpo +="<tr><td style='border-top: 1px solid #000000; padding-top: 2px;'>IGV</td><td style='border-top: 1px solid #000000; padding-top: 3px;'> </td><td style='font-size: 13px; font-weight: bold; border-top: 1px solid #000000; padding-top: 3px;'>S/ "+this.igv+"</td></tr>";
          cuerpo += "<tr><td style='border-top: 1px solid #000000; padding-top: 5px;'><b>Total</b></td><td style='border-top: 1px solid #000000; padding-top: 5px;'> </td><td style='font-size: 18px; font-weight: bold; border-top: 1px solid #000000; padding-top: 5px;'>S/ "+this.total+"</td></tr></table><label><b>Muchas gracias por ser socio de BUBE</b></label><br><br><label>Nota: Mensaje automático, por favor no responder</label><br><br></div><label>Aviso de confidencialidad</label><br><p style = 'text-align: justify; text-justify: inter-word;'>Este correo electrónico y/o el material adjunto es para uso exclusivo de la persona o entidad a la que expresamente se le ha enviado, y puede contener información confidencial o material privilegiado. Si usted no es el destinatario legítimo del mismo, por favor repórtelo inmediatamente al remitente del correo y bórrelo. Cualquier revisión, retransmisión, difusión o cualquier otro uso de este correo, por personas o entidades distintas a las del destinatario legítimo, queda expresamente prohibido. Este correo electrónico no pretende ni debe ser considerado como constitutivo de ninguna relación legal, contractual o de otra índole similar, en consecuencia, no genera obligación alguna a cargo de su emisor o su representada. En tal sentido, nada de lo señalado en esta comunicación o en sus anexos podrá ser interpretado como una recomendación sobre los riesgos o ventajas económicas, legales, contables o tributarias, o sobre las consecuencias de realizar o no determinada transacción.</p>";
         
        let suject = "Constancia del pedido #"+String(this.idcompra); 
        var email = {"email": this.compra[0].emailsocio,"content": cuerpo,"subject":suject}; 
        console.log(email);
        this.apiService.enviarCorreo(email)
          .then(res =>{
            console.log("correo enviado");
            
          })
          .catch(er =>{
            console.log("error enviar correo");
            console.log(er);
          });
  }

  async presentAlertConfirm(indicador) {
    this.alertModal = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Ya gestionaste tu entrega?',
      message: 'Ya no podrá regresar a esta pantalla',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Boton no');
          }
        }, {
          text: 'Si',
          handler: () => {

            if(indicador == 1){
              this.removerDatos();
              this.router.navigate(['app/ahorro']);
            }else{
              this.removerDatos();
              this.router.navigate(['app/inicio']);
            }

          }
        }
      ]
    });

    await this.alertModal.present();
  }

  //googleAnalytics
googleAnalytics(){
  this.firebaseAnalytics.logEvent('pantalla',{pantalla:"pasarela_Comprobante"})
  .then(res =>{
    console.log(res);
    console.log("firebase ok");
  })
  .catch(er =>{
    console.log(er);
    console.log("firebase no");
  });
}
  
}
