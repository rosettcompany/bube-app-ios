(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{CLgd:function(t,e,i){"use strict";i.r(e),i.d(e,"TarjetasPageModule",(function(){return x}));var o=i("ofXK"),n=i("3Pt+"),a=i("TEn/"),r=i("tyNb"),c=i("mrSG"),s=i("yR4b"),l=i("R0Ic"),b=i("fXoL"),d=i("CmMg"),g=i("Q4mC"),h=i("M2bA");const p=["lista"];function u(t,e){1&t&&(b.Mb(0,"ion-row"),b.Mb(1,"div",11),b.Jb(2,"ion-spinner",12),b.Lb(),b.Lb())}function f(t,e){if(1&t){const t=b.Nb();b.Mb(0,"ion-item-sliding"),b.Mb(1,"ion-item"),b.Mb(2,"ion-row"),b.Mb(3,"ion-col"),b.Mb(4,"div"),b.Jb(5,"img",17),b.Jb(6,"img",18),b.Mb(7,"ion-label",19),b.uc(8),b.Lb(),b.Mb(9,"ion-label",20),b.uc(10,"Nombre titular"),b.Lb(),b.Mb(11,"ion-label",21),b.uc(12),b.Lb(),b.Mb(13,"ion-label",22),b.uc(14,"Fecha vencimiento"),b.Lb(),b.Mb(15,"ion-label",23),b.uc(16),b.Lb(),b.Lb(),b.Lb(),b.Mb(17,"ion-col"),b.Mb(18,"ion-item"),b.Mb(19,"ion-label",24),b.uc(20,"Usar como m\xe9todo de pago"),b.Lb(),b.Mb(21,"ion-radio",25),b.Ub("click",(function(){b.mc(t);const i=e.$implicit;return b.Xb(2).EvnetotarjetaSeleccionada(i.numero)})),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Mb(22,"ion-item-options",26),b.Mb(23,"ion-item-option",27),b.Ub("click",(function(){b.mc(t);const i=e.$implicit;return b.Xb(2).editar(i)})),b.Jb(24,"ion-icon",28),b.Lb(),b.Lb(),b.Mb(25,"ion-item-options",29),b.Mb(26,"ion-item-option",27),b.Ub("click",(function(){b.mc(t);const i=e.$implicit;return b.Xb(2).eliminar(i)})),b.Jb(27,"ion-icon",30),b.Lb(),b.Lb(),b.Lb()}if(2&t){const t=e.$implicit,i=b.Xb(2);b.yb(4),b.qc(t.color),b.yb(2),b.gc("src","./assets/Iconos/",t.tipo,".png",b.nc),b.yb(2),b.yc("",i.n1(t.numero)," ",i.n2(t.numero),"*** **** ",i.n3(t.numero),""),b.yb(4),b.vc(t.titular),b.yb(4),b.vc(t.fecha),b.yb(5),b.fc("value",t.numero)}}function m(t,e){if(1&t){const t=b.Nb();b.Mb(0,"ion-list",13,14),b.Mb(2,"ion-radio-group",15),b.Ub("ngModelChange",(function(e){return b.mc(t),b.Xb().tarjetaSeleccionada=e}))("ionChange",(function(e){return b.mc(t),b.Xb().seleccionar(e)})),b.sc(3,f,28,10,"ion-item-sliding",16),b.Lb(),b.Lb()}if(2&t){const t=b.Xb();b.ec("@visibilityChanged",t.animation),b.yb(2),b.ec("ngModel",t.tarjetaSeleccionada),b.yb(1),b.ec("ngForOf",t.tarjetas[0])}}const M=[{path:"",component:(()=>{class t{constructor(t,e,i,o,n,a,r){this.router=t,this.apiServicio=e,this.navCtrl=i,this.servicioAES=o,this.firebaseAnalytics=n,this.modalController=a,this.route=r,this.tarjetas=[],this.checkedTaretas=[],this.oculto=!0,this.total=0,this.tiendasAhorro=[],this.spinner=!0,this.animation="hidden",this.tarjetaSeleccionada=0,this.keyJScrypto="123456$#@$^@1ERF",this.route.queryParams.subscribe(t=>{this.router.getCurrentNavigation().extras.state&&(this.carrito=this.router.getCurrentNavigation().extras.state.carrito,this.establecimientosCoincidencia=this.router.getCurrentNavigation().extras.state.establecimientosCoincidencia,this.delivery=this.router.getCurrentNavigation().extras.state.delivery)})}ionViewDidEnter(){this.tarjetaSeleccionada=0,this.oculto=0==this.tarjetaSeleccionada;let t=0;console.log("CARRITO"),console.log(this.carrito),console.log(this.carrito.bebidas);for(let e of this.carrito.bebidas)console.log("t"+e.preciobebidasocio),t+=e.cantidad*e.preciobebidasocio;this.t=t,this.carrito.modalidad=this.delivery.modalidad,this.total=Number("1"==this.delivery.modalidad?(this.delivery.precio+t).toFixed(2):t.toFixed(2)),console.log("CANTIDAD SUMADA"),console.log(t),this.apiServicio.getStorage("idusuario").then(t=>{this.obtenerTarjetas(t),console.log(t)}).catch(t=>{console.log("no hay idusuario")}),this.googleAnalytics()}obtenerTarjetas(t){this.animation="hidden",this.apiServicio.getTarjetas(t).subscribe(t=>{if(this.tarjetas=[t],console.log(this.tarjetas),null!=this.tarjetas[0]){this.hayTarjetas="Tus tarjetas";for(let t of this.tarjetas[0])t.numero=this.servicioAES.get(this.keyJScrypto,t.numero),t.cvv=this.servicioAES.get(this.keyJScrypto,t.cvv),t.fecha=this.servicioAES.get(this.keyJScrypto,t.fecha),t.color="visa"==t.tipo?"background:#1c3a24;":"background:#464545;";this.spinner=!1,this.animation="show"}else console.log("no tiene tarjetas agregadas"),this.hayTarjetas="No tiene tarjetas agregadas",this.spinner=!1,this.animation="show"},t=>{console.log("no tiene tarjetas agregadas"),this.hayTarjetas="No tiene tarjetas agregadas"})}regresar(){document.getElementById("volver2").disabled=!0}nuevaTarjeta(){this.lista.closeSlidingItems(),this.router.navigate(["agregar-tarjeta"],{state:{tarjeta:"0",pantalla:2}})}seleccionar(t){let e=t.detail.value;this.oculto=0==this.tarjetaSeleccionada;for(let i of this.tarjetas[0])i.numero==e&&(this.tarjet=i);console.log(this.tarjet)}EvnetotarjetaSeleccionada(t){this.tarjetaSeleccionada=t}siguiente(){if(null==this.carrito.idpromocion){let e=[],i=0;if(null==this.establecimientosCoincidencia)i=0;else{for(let t of this.establecimientosCoincidencia)t.idsociocomercial!=this.carrito.bebidas[0].idsociocomercial&&t.total>this.t&&this.tiendasAhorro.push(t.total);var t;e=this.tiendasAhorro.sort(),i=0==e.length?0:e[e.length-1]-this.t,console.log(e),console.log("prom"+i),console.log(e[e.length-1]),(t=0==i||i<0?0:i/2)<0&&(t=0),this.apiServicio.setStorage("ahorro",t.toFixed(2))}}else this.apiServicio.setStorage("ahorro",0);this.router.navigate(["finalizar-compra"],{state:{carrito:this.carrito,total:this.total,tarjeta:this.tarjet,delivery:this.delivery}})}editar(t){console.log("editar "+t),this.lista.closeSlidingItems(),this.router.navigate(["agregar-tarjeta"],{state:{tarjeta:t,pantalla:2}})}eliminar(t){console.log("eliminar "+t),this.lista.closeSlidingItems(),this.apiServicio.eliminarTarjeta(t.idtarjeta).then(t=>{console.log("tarjeta eliminada"),console.log(t),this.ionViewDidEnter()}).catch(t=>{console.log("error al eliminar tarjeta"),console.log(t)})}tutorial(){return Object(c.a)(this,void 0,void 0,(function*(){const t=yield this.modalController.create({component:s.a,cssClass:"small-modal",componentProps:{pagina:2}});yield t.present();const{data:e}=yield t.onDidDismiss();console.log(e),this.apiServicio.setStorage("guia_tarjetas",1)}))}googleAnalytics(){this.firebaseAnalytics.logEvent("pantalla",{pantalla:"pasarela_Tarjetas"}).then(t=>{console.log(t),console.log("firebase ok")}).catch(t=>{console.log(t),console.log("firebase no")})}n1(t){return String(t).substring(0,4)}n2(t){return String(t).substring(4,5)}n3(t){return String(t).substring(12)}}return t.\u0275fac=function(e){return new(e||t)(b.Ib(r.g),b.Ib(d.a),b.Ib(a.lb),b.Ib(g.a),b.Ib(h.a),b.Ib(a.kb),b.Ib(r.a))},t.\u0275cmp=b.Cb({type:t,selectors:[["app-tarjetas"]],viewQuery:function(t,e){var i;1&t&&b.zc(p,!0),2&t&&b.jc(i=b.Vb())&&(e.lista=i.first)},decls:21,vars:5,consts:[["slot","start",2,"color","#f3f2ed"],["id","volver2",3,"click"],[1,"title-toolbar"],["size","large","slot","end","name","help-circle-outline",2,"color","#ffff","margin-right","10px",3,"click"],["slot","end",1,"label-toolbar"],[4,"ngIf"],["no-border","","style","opacity: 0",4,"ngIf"],[1,"btn-add",3,"click"],["name","add"],["slot","end","fill","clear","id","btn-siguiente","mode","ios",3,"disabled","click"],["name","chevron-forward-outline",1,"icono-inferiores"],[1,"div-spinner-style"],["name","circles"],["no-border","",2,"opacity","0"],["lista",""],[3,"ngModel","ngModelChange","ionChange"],[4,"ngFor","ngForOf"],["src","./assets/Iconos/chip.png",1,"chip"],["id","tipo-tarjeta",1,"tipo-tarjeta",3,"src"],[1,"numero-tarjeta"],[1,"titulo-titular"],[1,"titular"],[1,"titulo-fecha"],[1,"fecha"],[1,"select-tarjeta"],["slot","start","color","success",3,"value","click"],["side","start"],[3,"click"],["slot","icon-only","name","create-sharp"],["side","end"],["slot","icon-only","name","trash"]],template:function(t,e){1&t&&(b.Mb(0,"ion-header"),b.Mb(1,"ion-toolbar"),b.Mb(2,"ion-buttons",0),b.Mb(3,"ion-back-button",1),b.Ub("click",(function(){return e.regresar()})),b.Lb(),b.Lb(),b.Mb(4,"ion-title",2),b.uc(5,"M\xe9todo de pago"),b.Lb(),b.Mb(6,"ion-icon",3),b.Ub("click",(function(){return e.tutorial()})),b.Lb(),b.Mb(7,"ion-label",4),b.uc(8),b.Lb(),b.Lb(),b.Lb(),b.Mb(9,"ion-content"),b.Mb(10,"h3"),b.uc(11),b.Lb(),b.sc(12,u,3,0,"ion-row",5),b.sc(13,m,4,3,"ion-list",6),b.Mb(14,"ion-fab-button",7),b.Ub("click",(function(){return e.nuevaTarjeta()})),b.Jb(15,"ion-icon",8),b.Lb(),b.Lb(),b.Mb(16,"ion-footer"),b.Mb(17,"ion-toolbar"),b.Mb(18,"ion-button",9),b.Ub("click",(function(){return e.siguiente()})),b.uc(19,"Siguiente"),b.Jb(20,"ion-icon",10),b.Lb(),b.Lb(),b.Lb()),2&t&&(b.yb(8),b.wc("S/ ",e.total.toFixed(2),""),b.yb(3),b.vc(e.hayTarjetas),b.yb(1),b.ec("ngIf",e.spinner),b.yb(1),b.ec("ngIf",!e.spinner),b.yb(5),b.fc("disabled",e.oculto))},directives:[a.v,a.fb,a.i,a.e,a.f,a.eb,a.w,a.G,a.q,o.k,a.s,a.t,a.h,a.Q,a.Z,a.H,a.M,a.qb,n.h,n.k,o.j,a.F,a.B,a.p,a.L,a.ob,a.E,a.D],styles:["ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:#108b3c}.title-toolbar[_ngcontent-%COMP%]{color:#fff;font-family:Gotham-Medium;font-size:23px}.label-toolbar[_ngcontent-%COMP%]{color:#fff;font-family:SFCompactText-Medium;font-size:20px;margin-right:10px}ion-content[_ngcontent-%COMP%]{--background:#121212}ion-list[_ngcontent-%COMP%]{background:#121212}ion-item[_ngcontent-%COMP%]{--background:#121212;--border-color:#121212}h3[_ngcontent-%COMP%]{color:#f3f2ed;margin-top:30px;margin-left:20px;font-family:Gotham-Medium}#btn-anterior[_ngcontent-%COMP%]{left:0}#btn-anterior[_ngcontent-%COMP%], #btn-siguiente[_ngcontent-%COMP%]{--color:#fff;font-family:SFCompactText-Medium;font-size:20px;height:50px}#btn-siguiente[_ngcontent-%COMP%]{right:0}.iconos-inferiores[_ngcontent-%COMP%]{color:#f3f2ed}.chip[_ngcontent-%COMP%]{width:70px;left:10px;top:20px}.chip[_ngcontent-%COMP%], .tipo-tarjeta[_ngcontent-%COMP%]{height:30px;position:absolute}.tipo-tarjeta[_ngcontent-%COMP%]{width:40px;right:20px;top:10px}div[_ngcontent-%COMP%]{border-radius:10px;width:100%;height:230px}ion-col[_ngcontent-%COMP%], ion-row[_ngcontent-%COMP%]{--padding:0;--margin:0}.numero-tarjeta[_ngcontent-%COMP%]{font-family:Gotham-Medium;color:#fff;top:45%;font-size:28px;position:relative;text-align:center;align-items:center;align-content:center;margin:auto}.titular[_ngcontent-%COMP%]{font-size:16px;bottom:20px}.titular[_ngcontent-%COMP%], .titulo-titular[_ngcontent-%COMP%]{color:#fff;font-family:SFUIDisplay-Regular;position:absolute;left:20px}.titulo-titular[_ngcontent-%COMP%]{font-size:14px;bottom:40px}.fecha[_ngcontent-%COMP%]{font-size:16px;right:40px;bottom:20px}.fecha[_ngcontent-%COMP%], .titulo-fecha[_ngcontent-%COMP%]{color:#fff;font-family:SFUIDisplay-Regular;position:absolute}.titulo-fecha[_ngcontent-%COMP%]{font-size:14px;right:20px;bottom:40px}.select-tarjeta[_ngcontent-%COMP%]{color:#fff}.btn-add[_ngcontent-%COMP%]{position:-webkit-sticky;position:sticky;left:85%;bottom:30px;--background:#108b3c}ion-footer[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%], ion-item-option[_ngcontent-%COMP%]{--background:#121212}.div-spinner-style[_ngcontent-%COMP%]{width:100%;text-align:center;height:50px;display:flex;justify-content:center;align-items:center}.div-spinner-style[_ngcontent-%COMP%]   ion-spinner[_ngcontent-%COMP%]{color:#108b3c}","@media screen and (device-width:360px) and (device-height:640px) and (-webkit-device-pixel-ratio:4) and (orientation:portrait){.title-toolbar[_ngcontent-%COMP%]{font-size:23px}.label-toolbar[_ngcontent-%COMP%]{font-size:20px}}@media screen and (device-width:360px) and (device-height:640px) and (-webkit-device-pixel-ratio:3) and (orientation:portrait){.title-toolbar[_ngcontent-%COMP%]{font-size:21px}.label-toolbar[_ngcontent-%COMP%]{font-size:18px}}@media screen and (device-width:320px) and (device-height:640px) and (-webkit-device-pixel-ratio:2) and (orientation:portrait){.title-toolbar[_ngcontent-%COMP%]{font-size:20px}.label-toolbar[_ngcontent-%COMP%]{font-size:17px}}@media screen and (device-width:320px) and (device-height:640px) and (-webkit-device-pixel-ratio:1) and (orientation:portrait){.title-toolbar[_ngcontent-%COMP%]{font-size:20px}.label-toolbar[_ngcontent-%COMP%]{font-size:17px}}@media only screen and (min-device-width:320px) and (max-device-width:480px) and (-webkit-min-device-pixel-ratio:2) and (orientation:portrait){.title-toolbar[_ngcontent-%COMP%]{font-size:21px}.label-toolbar[_ngcontent-%COMP%]{font-size:18px}}@media only screen and (min-device-width:320px) and (max-device-width:568px) and (-webkit-min-device-pixel-ratio:2) and (orientation:portrait){.title-toolbar[_ngcontent-%COMP%]{font-size:21px}.label-toolbar[_ngcontent-%COMP%]{font-size:18px}}@media only screen and (min-device-width:375px) and (max-device-width:667px) and (-webkit-min-device-pixel-ratio:2) and (orientation:portrait){.title-toolbar[_ngcontent-%COMP%]{font-size:22px}.label-toolbar[_ngcontent-%COMP%]{font-size:19px}}@media only screen and (min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3) and (orientation:portrait){.title-toolbar[_ngcontent-%COMP%]{font-size:22px}.label-toolbar[_ngcontent-%COMP%]{font-size:19px}}@media only screen and (min-device-width:375px) and (max-device-width:812px) and (-webkit-min-device-pixel-ratio:3) and (orientation:portrait){.title-toolbar[_ngcontent-%COMP%]{font-size:22px}.label-toolbar[_ngcontent-%COMP%]{font-size:19px}}"],data:{animation:[Object(l.j)("visibilityChanged",[Object(l.g)("show",Object(l.h)({opacity:1})),Object(l.g)("hidden",Object(l.h)({opacity:0})),Object(l.i)("* => show",Object(l.e)("1000ms ease-in-out")),Object(l.i)("* => hidden",Object(l.e)("100ms ease-in-out"))])]}}),t})()}];let v=(()=>{class t{}return t.\u0275mod=b.Gb({type:t}),t.\u0275inj=b.Fb({factory:function(e){return new(e||t)},imports:[[r.i.forChild(M)],r.i]}),t})(),x=(()=>{class t{}return t.\u0275mod=b.Gb({type:t}),t.\u0275inj=b.Fb({factory:function(e){return new(e||t)},providers:[g.a],imports:[[o.c,n.d,a.gb,v]]}),t})()}}]);