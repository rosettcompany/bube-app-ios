(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{"Y+Q8":function(t,e,o){"use strict";o.r(e),o.d(e,"FinalizarCompraPageModule",(function(){return p}));var i=o("ofXK"),n=o("3Pt+"),r=o("TEn/"),s=o("tyNb"),a=o("mrSG"),l=o("fXoL"),c=o("CmMg");let b=(()=>{class t{constructor(t,e,o,i){this.toastController=t,this.apiServicio=e,this.platform=o,this.popoverController=i}ngOnInit(){}ionViewDidEnter(){console.log(this.usuario),this.subscription=this.platform.backButton.subscribeWithPriority(9999,()=>{this.cerrar()})}pagar(){let t=document.getElementById("txt-numero");8==String(t.value).length?(console.log(String(t.value).substring(0,1)),console.log(String(t.value).substring(1,2)),console.log(String(t.value).substring(2,3)),console.log(String(t.value).substring(3,4)),console.log(String(t.value).substring(4,5)),console.log(String(t.value).substring(5,6)),console.log(String(t.value).substring(6,7)),console.log(String(t.value).substring(7,8)),isNaN(Number(String(t.value).substring(0,1)))||isNaN(Number(String(t.value).substring(1,2)))||isNaN(Number(String(t.value).substring(2,3)))||isNaN(Number(String(t.value).substring(3,4)))||isNaN(Number(String(t.value).substring(4,5)))||isNaN(Number(String(t.value).substring(5,6)))||isNaN(Number(String(t.value).substring(6,7)))||isNaN(Number(String(t.value).substring(7,8)))?this.presentToast("DNI invalido"):(this.usuario.dni=t.value,console.log(this.usuario),this.user={apellidosUsuario:this.usuario.apellidosusuario,codigoPais:this.usuario.codigopais,dni:t.value,email2Usuario:this.usuario.email2usuario,emailUsuario:this.usuario.emailusuario,estadoUsuario:this.usuario.estadousuario,fechaNacimientoUsuario:this.usuario.fechanacimientousuario,fechaRegistro:this.usuario.fecharegistro,idFacebook:this.usuario.idfacebook,idUsuario:this.usuario.idusuario,nombresUsuario:this.usuario.nombresusuario,rutaFotoUsuario:this.usuario.rutafotousuario,sexoUsuario:this.usuario.sexousuario,telefonoUsuario:this.usuario.telefonousuario},this.apiServicio.insertarDni(this.user).then(t=>{console.log(t),this.popoverController.dismiss({usuario:this.user})}).catch(t=>{console.log("error al insertar dni"),console.log(t)}))):(this.presentToast("Ingrese su DNI"),console.log("toast"))}presentToast(t){return Object(a.a)(this,void 0,void 0,(function*(){(yield this.toastController.create({message:t,duration:2e3,color:"danger"})).present()}))}cerrar(){this.popoverController.dismiss(),this.subscription.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(l.Ib(r.sb),l.Ib(c.a),l.Ib(r.mb),l.Ib(r.nb))},t.\u0275cmp=l.Cb({type:t,selectors:[["app-popinfo"]],decls:9,vars:0,consts:[["size","large","name","close-circle-outline",3,"click"],["type","tel","inputmode","numeric","pattern","[0-9]","maxlength","8","id","txt-numero","placeholder","DNI"],[3,"click"]],template:function(t,e){1&t&&(l.Mb(0,"ion-content"),l.Mb(1,"div"),l.Mb(2,"ion-icon",0),l.Ub("click",(function(){return e.cerrar()})),l.Lb(),l.Lb(),l.Mb(3,"div"),l.Mb(4,"ion-label"),l.uc(5,"Ingrese su Documento de identidad(DNI)"),l.Lb(),l.Jb(6,"ion-input",1),l.Mb(7,"ion-button",2),l.Ub("click",(function(){return e.pagar()})),l.uc(8,"Pagar"),l.Lb(),l.Lb(),l.Lb())},directives:[r.q,r.w,r.G,r.A,r.rb,r.h],styles:["ion-content[_ngcontent-%COMP%], ion-label[_ngcontent-%COMP%]{text-align:center}ion-label[_ngcontent-%COMP%]{margin-top:10px;color:#000;justify-content:center;font-size:18px;font-family:Gotham-Medium}ion-icon[_ngcontent-%COMP%]{margin-left:80%;color:red}ion-input[_ngcontent-%COMP%]{margin-top:20px;margin-left:5%;margin-right:5%;border:1px solid #108b3c;border-radius:10px;color:#000;background:#fff}ion-button[_ngcontent-%COMP%], ion-input[_ngcontent-%COMP%]{width:90%;height:40px}ion-button[_ngcontent-%COMP%]{margin:20px 5% 10px;border-radius:10px;color:#fff;--background:#108b3c}"]}),t})();var u=o("M2bA");function d(t,e){if(1&t&&(l.Mb(0,"ion-item",12),l.Mb(1,"ion-col"),l.Mb(2,"ion-row"),l.Mb(3,"p",7),l.uc(4),l.Lb(),l.Lb(),l.Mb(5,"ion-row"),l.Mb(6,"ion-label",5),l.uc(7),l.Lb(),l.Lb(),l.Mb(8,"ion-row"),l.Mb(9,"ion-label",13),l.uc(10),l.Mb(11,"span",14),l.uc(12," Disponible"),l.Lb(),l.Lb(),l.Lb(),l.Lb(),l.Jb(13,"img",15),l.Lb()),2&t){const t=e.$implicit;l.yb(4),l.vc(t.nombrebebida),l.yb(3),l.vc(t.nombrecomercial),l.yb(3),l.wc("S/ ",t.preciobebidasocio.toFixed(2)," \xb0 "),l.yb(3),l.fc("src",t.rutaimagenbebida,l.nc)}}const g=[{path:"",component:(()=>{class t{constructor(t,e,o,i,n,r,s,a,l,c){this.router=t,this.route=e,this.modalControler=o,this.platform=i,this.popoverController=n,this.navCtrl=r,this.firebaseAnalytics=s,this.apiServicio=a,this.alertController=l,this.loadingController=c,this.modalidad="Recojo",this.total=0,this.buttonDisabled="false",Mercadopago.setPublishableKey("APP_USR-e710be6c-9f94-4ec3-8830-5df20b925910"),this.route.queryParams.subscribe(t=>{this.router.getCurrentNavigation().extras.state&&(this.carrito=this.router.getCurrentNavigation().extras.state.carrito,this.total=this.router.getCurrentNavigation().extras.state.total,this.tarjeta=this.router.getCurrentNavigation().extras.state.tarjeta,this.delivery=this.router.getCurrentNavigation().extras.state.delivery,console.log(this.carrito),console.log(this.total),console.log("TARJETA"),console.log(this.tarjeta))})}ngOnInit(){}ionViewDidEnter(){"1"==this.delivery.modalidad?(this.modalidad="Delivery",this.indicadorModalidad="S/ "+this.delivery.precio.toFixed(2)):(this.modalidad="Recojo",this.indicadorModalidad=this.carrito.direccionsocio);let t=String(this.tarjeta.tipo).substring(0,1),e=String(this.tarjeta.tipo).substring(1);console.log(t),console.log(e),this.tipo=t.toLocaleUpperCase()+e,this.num_tarjeta=String(this.tarjeta.numero).substring(String(this.tarjeta.numero).length-4,String(this.tarjeta.numero).length),console.log(this.num_tarjeta),this.googleAnalytics()}ionViewDidLeave(){this.subscription.unsubscribe(),this.popoverController.dismiss(0),this.buttonDisabled="false"}presentLoading(){return Object(a.a)(this,void 0,void 0,(function*(){this.loading=yield this.loadingController.create({cssClass:"my-custom-class",message:"Cargando.."}),yield this.loading.present()}))}comprobarDni(){this.buttonDisabled="true",this.apiServicio.getStorage("idusuario").then(t=>{this.apiServicio.getDatosUsuario(t).subscribe(t=>{this.usuario=t[0],console.log(this.usuario),null==this.usuario.dni?this.abrirPop(this.usuario):this.pagar()},t=>{console.log("error al traer datos usuario"),console.log(t),this.buttonDisabled="false",this.alertaConexion()})})}abrirPop(t){return Object(a.a)(this,void 0,void 0,(function*(){const e=yield this.popoverController.create({component:b,backdropDismiss:!1,componentProps:{usuario:t}});yield e.present();const{data:o}=yield e.onDidDismiss();this.buttonDisabled="false",0!=o.usuario&&(this.usuario=o.usuario,console.log(this.usuario),this.pagar())}))}pagar(){return Object(a.a)(this,void 0,void 0,(function*(){this.presentLoading(),this.subscription=this.platform.backButton.subscribeWithPriority(9999,()=>{}),this.apiServicio.setStorage("tarjeta",this.tarjeta),this.apiServicio.setStorage("total",this.total),this.apiServicio.setStorage("carrito",this.carrito);let t=String(this.tarjeta.fecha).split("/",2),e=t[0],o=20+t[1];Mercadopago.clearSession(),console.log(this.tarjeta.numero),console.log(this.usuario);let i=String(this.tarjeta.numero).substring(0,6);Mercadopago.getPaymentMethod({bin:i},this.setPaymentMethod),Mercadopago.createToken({docType:"DNI",docNumber:this.usuario.dni,cardNumber:this.tarjeta.numero,securityCode:this.tarjeta.cvv,cardExpirationMonth:e,cardExpirationYear:o,cardholderName:this.tarjeta.titular,installments:1},this.sdkResponseHandler)}))}setPaymentMethod(t,e){200==t?(console.log(e),document.getElementById("txt-tipo").value=e[0].id):alert("payment method info error: "+e)}sdkResponseHandler(t,e){if(200!=t&&201!=t){let t=document.getElementById("txt-token");console.log(t.value),t.value=e.cause[0].code,console.log(t.value),console.log("status "+e.cause[0].code),console.log(e)}else{let o=document.getElementById("txt-token");console.log(e),console.log(t),o.value=e.id}}enviarDatosPago(){let t=document.getElementById("txt-token");if(console.log(t.value),String(t.value).length<=4)switch(this.loading.dismiss(),t.value){case"E301":this.presentAlertConfirm("Ingresa un n\xfamero de tarjeta v\xe1lido."),this.buttonDisabled="false";break;case"E302":this.presentAlertConfirm("Revisa el c\xf3digo de seguridad(CVV)"),this.buttonDisabled="false";break;case"316":this.presentAlertConfirm("Ingresa un nombre v\xe1lido"),this.buttonDisabled="false";break;case"324":this.presentAlertConfirm("Ingresa tu documento valido"),this.buttonDisabled="false";break;case"325":this.presentAlertConfirm("El mes es inv\xe1lido"),this.buttonDisabled="false";break;case"326":this.presentAlertConfirm("El a\xf1o es inv\xe1lido"),this.buttonDisabled="false";break;case"106":this.presentAlertConfirm("No puedes realizar pagos a otros pa\xedses."),this.buttonDisabled="false";break;case"109":this.presentAlertConfirm("no procesa pagos en cuotas. Elige otra tarjeta u otro medio de pago."),this.buttonDisabled="false";break;case"126":this.presentAlertConfirm("No pudimos procesar tu pago."),this.buttonDisabled="false";break;case"129":this.presentAlertConfirm("no procesa pagos del monto seleccionado. Elige otra tarjeta u otro medio de pago."),this.buttonDisabled="false";break;case"145":this.presentAlertConfirm("Una de las partes con la que intentas hacer el pago es de prueba y la otra es usuario real."),this.buttonDisabled="false";break;case"150":case"151":this.presentAlertConfirm("No puedes realizar pagos."),this.buttonDisabled="false";break;case"160":this.presentAlertConfirm("No pudimos procesar tu pago."),this.buttonDisabled="false";break;case"204":this.presentAlertConfirm("No est\xe1 disponible en este momento. Elige otra tarjeta u otro medio de pago."),this.buttonDisabled="false";break;case"801":this.presentAlertConfirm("Realizaste un pago similar hace instantes. Intenta de nuevo en unos minutos."),this.buttonDisabled="false";break;default:this.presentAlertConfirm("No pudimos procesar tu pago. Intentelo m\xe1s tarde"),this.buttonDisabled="false"}else{let e=document.getElementById("txt-tipo"),o={state:{token:t.value,cardTipo:e.value,delivery:this.delivery}};this.loading.dismiss(),this.router.navigate(["loading"],o)}}presentAlertConfirm(t){return Object(a.a)(this,void 0,void 0,(function*(){const e=yield this.alertController.create({cssClass:"my-custom-class",header:"Revisar datos de su tarjeta",message:t,buttons:[{text:"OK",role:"cancel",cssClass:"secondary",handler:t=>{this.navCtrl.back()}}]});yield e.present()}))}alertaConexion(){return Object(a.a)(this,void 0,void 0,(function*(){const t=yield this.alertController.create({cssClass:"my-custom-class",header:"Error de Conexi\xf3n",message:"Por favor Verifique su conexi\xf3n a internet",buttons:[{text:"OK",role:"cancel",cssClass:"secondary",handler:t=>{console.log("Boton no")}}]});yield t.present()}))}regresar(){document.getElementById("volver3").disabled=!0}googleAnalytics(){this.firebaseAnalytics.logEvent("pantalla",{pantalla:"pasarela_FinalizarCompra"}).then(t=>{console.log(t),console.log("firebase ok")}).catch(t=>{console.log(t),console.log("firebase no")})}}return t.\u0275fac=function(e){return new(e||t)(l.Ib(s.g),l.Ib(s.a),l.Ib(r.kb),l.Ib(r.mb),l.Ib(r.nb),l.Ib(r.lb),l.Ib(u.a),l.Ib(c.a),l.Ib(r.a),l.Ib(r.ib))},t.\u0275cmp=l.Cb({type:t,selectors:[["app-finalizar-compra"]],decls:47,vars:9,consts:[["slot","start",2,"color","#f3f2ed"],["id","volver3",3,"click"],["slot","end"],["style","--border-color:#121212;margin-top: 20px;",4,"ngFor","ngForOf"],[2,"margin-top","60px","--border-color","#ffc30b"],[1,"tienda"],[2,"margin-top","10px","--border-color","#ffc30b"],[1,"descripcion-bebida"],[2,"margin-top","10px","--border-color","#121212"],["id","txt-token","disabled","true",2,"--background","#121212","border","none","color","#121212",3,"ionChange"],["id","txt-tipo","disabled","true",2,"--background","#121212","border","none","color","#121212"],["id","btn-volver","expand","block",3,"disabled","click"],[2,"--border-color","#121212","margin-top","20px"],[1,"precio"],[2,"font-weight","lighter","color","#108b3c"],[3,"src"]],template:function(t,e){1&t&&(l.Mb(0,"ion-header"),l.Mb(1,"ion-toolbar"),l.Mb(2,"ion-buttons",0),l.Mb(3,"ion-back-button",1),l.Ub("click",(function(){return e.regresar()})),l.Lb(),l.Lb(),l.Mb(4,"ion-title"),l.uc(5,"Finalizar compra"),l.Lb(),l.Mb(6,"ion-label",2),l.uc(7),l.Lb(),l.Lb(),l.Lb(),l.Mb(8,"ion-content"),l.Mb(9,"h3"),l.uc(10,"Resumen de tu orden"),l.Lb(),l.sc(11,d,14,4,"ion-item",3),l.Mb(12,"ion-item",4),l.Mb(13,"ion-col"),l.Mb(14,"ion-row"),l.Mb(15,"ion-label",5),l.uc(16),l.Lb(),l.Lb(),l.Lb(),l.Mb(17,"ion-label",5),l.uc(18),l.Lb(),l.Lb(),l.Mb(19,"ion-item",6),l.Mb(20,"ion-col"),l.Mb(21,"ion-row"),l.Mb(22,"ion-label",5),l.uc(23,"M\xe9todo de Pago"),l.Lb(),l.Lb(),l.Lb(),l.Mb(24,"ion-col"),l.Mb(25,"ion-row"),l.Mb(26,"ion-label",7),l.uc(27),l.Lb(),l.Lb(),l.Mb(28,"ion-row"),l.Mb(29,"ion-label",5),l.uc(30),l.Lb(),l.Lb(),l.Mb(31,"ion-row"),l.Jb(32,"ion-label"),l.Lb(),l.Lb(),l.Lb(),l.Mb(33,"ion-item",8),l.Mb(34,"ion-col"),l.Mb(35,"ion-row"),l.Mb(36,"ion-label",7),l.uc(37,"Total"),l.Lb(),l.Lb(),l.Lb(),l.Mb(38,"ion-col"),l.Mb(39,"ion-row"),l.Mb(40,"ion-label",7),l.uc(41),l.Lb(),l.Lb(),l.Lb(),l.Lb(),l.Mb(42,"ion-input",9),l.Ub("ionChange",(function(){return e.enviarDatosPago()})),l.Lb(),l.Jb(43,"ion-input",10),l.Lb(),l.Mb(44,"ion-footer"),l.Mb(45,"ion-button",11),l.Ub("click",(function(){return e.comprobarDni()})),l.uc(46,"Pagar"),l.Lb(),l.Lb()),2&t&&(l.yb(7),l.wc("S/ ",e.total.toFixed(2),""),l.yb(4),l.ec("ngForOf",e.carrito.bebidas),l.yb(5),l.vc(e.modalidad),l.yb(2),l.vc(e.indicadorModalidad),l.yb(9),l.xc("",e.tipo,"****",e.num_tarjeta,""),l.yb(3),l.wc("vence ",e.tarjeta.fecha,""),l.yb(11),l.wc("S/ ",e.total.toFixed(2),""),l.yb(4),l.fc("disabled",e.buttonDisabled))},directives:[r.v,r.fb,r.i,r.e,r.f,r.eb,r.G,r.q,i.j,r.B,r.p,r.Q,r.A,r.rb,r.t,r.h],styles:["ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:#108b3c}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%]{color:#fff;font-family:Gotham-Medium;font-size:23px}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{color:#fff;font-family:SFCompactText-Medium;font-size:20px;margin-right:10px}ion-content[_ngcontent-%COMP%], ion-footer[_ngcontent-%COMP%]{--background:#121212}ion-footer[_ngcontent-%COMP%]{background:#121212}ion-item[_ngcontent-%COMP%]{--background:#121212}h3[_ngcontent-%COMP%]{color:#f3f2ed;margin-left:20px;font-family:Gotham-Medium;margin-top:20px}.descripcion-bebida[_ngcontent-%COMP%]{font-weight:700}.descripcion-bebida[_ngcontent-%COMP%], .tienda[_ngcontent-%COMP%]{color:#fff;font-family:SFUIDisplay-Regular;font-size:18px}.tienda[_ngcontent-%COMP%]{font-weight:lighter}.precio[_ngcontent-%COMP%]{color:#fff;font-family:SFUIDisplay-Regular;font-size:18px;font-weight:700;margin-top:10px}img[_ngcontent-%COMP%]{border-radius:10px;margin-left:5px;width:90px;height:90px}#btn-volver[_ngcontent-%COMP%]{--background:#108b3c;margin:20px 30px;--border-radius:10px}#btn-explorar[_ngcontent-%COMP%], #btn-volver[_ngcontent-%COMP%]{font-family:SFCompactText-Medium;--color:#fff;font-size:16px;height:50px}#btn-explorar[_ngcontent-%COMP%]{--background:#222121;margin-left:30px;margin-right:30px;margin-bottom:20px;border:3px solid #108b3c;border-radius:10px}"]}),t})()}];let h=(()=>{class t{}return t.\u0275mod=l.Gb({type:t}),t.\u0275inj=l.Fb({factory:function(e){return new(e||t)},imports:[[s.i.forChild(g)],s.i]}),t})(),p=(()=>{class t{}return t.\u0275mod=l.Gb({type:t}),t.\u0275inj=l.Fb({factory:function(e){return new(e||t)},imports:[[i.c,n.d,r.gb,h]]}),t})()}}]);