!function(){function n(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function e(n,e){for(var o=0;o<e.length;o++){var i=e[o];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(n,i.key,i)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{Tn6U:function(o,i,t){"use strict";t.r(i),t.d(i,"MisdatosPageModule",(function(){return C}));var a=t("ofXK"),r=t("3Pt+"),s=t("TEn/"),u=t("tyNb"),c=t("mrSG"),l=t("fXoL"),b=t("CmMg"),d=t("e8h1"),g=t("M2bA"),m=t("/XPu");function p(n,e){if(1&n){var o=l.Nb();l.Mb(0,"ion-chip",19,12),l.Ub("click",(function(){l.mc(o);var n=e.$implicit;return l.Xb().buscarBebida(n.nombreBebida)})),l.Mb(2,"ion-label"),l.uc(3),l.Lb(),l.Lb()}if(2&n){var i=e.$implicit;l.yb(3),l.vc(i.nombremarca)}}var h,f,v,M=[{path:"",component:(h=function(){function o(e,i,t,a,r,s,u,c){n(this,o),this.apiServicio=e,this.navCtrl=i,this.router=t,this.storage=a,this.firebaseAnalytics=r,this.socialSharing=s,this.loadingController=u,this.toastController=c,this.tagName=[],this.btn=!1,this.nombresBebidas=""}var i,t,a;return i=o,(t=[{key:"ionViewWillEnter",value:function(){var n=this;this.tagName=[],null==this.usuario&&this.presentLoading(),this.apiServicio.getStorage("idusuario").then((function(e){n.apiServicio.getDatosUsuario(e).subscribe((function(e){n.loading.dismiss(),n.usuario=e,console.log(n.usuario);var o,i=document.getElementById("idnombre"),t=document.getElementById("idapellido"),a=document.getElementById("idemail"),r=document.getElementById("idcelular"),s=document.getElementById("idfecha"),u=document.getElementById("iddni");o=n.usuario[0].fechanacimientousuario,console.log(o),""==n.usuario[0].fechanacimientousuario||"2099-12-31"==o.substring(0,10)?o="":(s.value=o,console.log(s.value)),r.value=0==n.usuario[0].telefonousuario?"":n.usuario[0].telefonousuario,u.value=null==n.usuario[0].dni?"":n.usuario[0].dni,i.value=n.usuario[0].nombresusuario,t.value=n.usuario[0].apellidosusuario,a.value=n.usuario[0].emailusuario}),(function(n){})),n.apiServicio.getBebidasFavoritas(e).subscribe((function(e){var o=e;console.log(o),o.forEach((function(e){n.tagName.push({idBebida:e.idbebida,nombreBebida:e.nombrebebida,nombre:e.nombre,idUsuario:e.idusuario,nombremarca:e.nombremarca}),console.log(n.tagName)}))}))}))}},{key:"ionViewDidEnter",value:function(){this.googleAnalytics()}},{key:"irBebidas",value:function(){this.router.navigate(["validacionInicio",2]),this.tagName=[]}},{key:"presentLoading",value:function(){return Object(c.a)(this,void 0,void 0,regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.loadingController.create({cssClass:"my-custom-class",message:"Cargando"});case 2:return this.loading=n.sent,n.next=5,this.loading.present();case 5:case"end":return n.stop()}}),n,this)})))}},{key:"botonGuardar",value:function(){var n=this;this.btn=!0,console.log(this.usuario);var e=document.getElementById("idnombre"),o=document.getElementById("idapellido"),i=document.getElementById("idemail"),t=document.getElementById("idcelular"),a=document.getElementById("idfecha"),r=document.getElementById("iddni");this.user={apellidosUsuario:o.value,codigoPais:this.usuario[0].codigopais,dni:r.value,email2Usuario:this.usuario[0].email2Usuario,emailUsuario:i.value,estadoUsuario:this.usuario[0].estadousuario,fechaNacimientoUsuario:a.value,fechaRegistro:this.usuario[0].fecharegistro,idFacebook:this.usuario[0].idfacebook,idUsuario:this.usuario[0].idusuario,nombresUsuario:e.value,rutaFotoUsuario:this.usuario[0].rutafotousuario,sexoUsuario:this.usuario[0].sexousuario,telefonoUsuario:t.value},console.log(this.user);var s=!1,u=!1,c=!1,l=!1,b=!1;0==String(e.value).length?(s=!1,this.presentToast("Ingrese su nombre","danger"),this.btn=!1):s=!0,0==String(o.value).length?(u=!1,this.presentToast("Ingrese su apellido","danger"),this.btn=!1):u=!0,0==String(t.value).length?(l=!1,this.presentToast("Ingrese su tel\xe9fono","danger"),this.btn=!1):l=!0,0==String(a.value).length?(b=!1,this.presentToast("Ingrese su Fecha de nacimiento","danger"),this.btn=!1):b=!0,8==String(r.value).length?isNaN(Number(String(r.value).substring(0,1)))||isNaN(Number(String(r.value).substring(1,2)))||isNaN(Number(String(r.value).substring(2,3)))||isNaN(Number(String(r.value).substring(3,4)))||isNaN(Number(String(r.value).substring(4,5)))||isNaN(Number(String(r.value).substring(5,6)))||isNaN(Number(String(r.value).substring(6,7)))||isNaN(Number(String(r.value).substring(7,8)))?(c=!1,this.presentToast("DNI invalido","danger"),this.btn=!1):c=!0:(c=!1,this.presentToast("Ingrese su DNI","danger"),this.btn=!1,console.log("toast")),1==s&&1==u&&1==l&&1==c&&1==b&&(console.log(this.usuario[0]),this.apiServicio.putUsuario(this.user).subscribe((function(e){n.tagName=[],n.presentToast("Sus datos se han actualizado","success"),n.btn=!1,n.ionViewWillEnter()})))}},{key:"presentToast",value:function(n,e){return Object(c.a)(this,void 0,void 0,regeneratorRuntime.mark((function o(){return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return o.next=2,this.toastController.create({message:n,duration:2e3,color:e});case 2:o.sent.present();case 3:case"end":return o.stop()}}),o,this)})))}},{key:"regresar",value:function(){this.router.navigate(["./app/perfil"]),this.tagName=[]}},{key:"buscarBebida",value:function(n){var e=this;this.storage.get("km").then((function(o){e.router.navigate(["busquedaProducto"],{state:{bebida:n,km:o}}),e.tagName=[]})).catch((function(n){console.log("no Km")}))}},{key:"invitarAmigos",value:function(){this.nombresBebidas="";for(var n=0;n<this.tagName.length;n++)console.log(n),this.nombresBebidas+=n!==this.tagName.length-1?this.tagName[n].nombre+", ":this.tagName[n].nombre+".";console.log(this.nombresBebidas),this.socialSharing.shareWithOptions({message:"Hola,Te quer\xeda pasar informaci\xf3n que te ayudara mucho para que puedas sorprenderme\ud83d\ude0c! Mis bebidas favoritas son : "+this.nombresBebidas+". Para ver los tragos favoritos de tus contactos y vivir la experiencia Bube descarga el app en:",subject:"the subject",url:"https://web.bube.com.pe"})}},{key:"googleAnalytics",value:function(){this.firebaseAnalytics.logEvent("pantallas",{pantalla:"perfil_MisDatos"}).then((function(n){console.log(n),console.log("firebase ok")})).catch((function(n){console.log(n),console.log("firebase no")}))}}])&&e(i.prototype,t),a&&e(i,a),o}(),h.\u0275fac=function(n){return new(n||h)(l.Ib(b.a),l.Ib(s.lb),l.Ib(u.g),l.Ib(d.b),l.Ib(g.a),l.Ib(m.a),l.Ib(s.ib),l.Ib(s.sb))},h.\u0275cmp=l.Cb({type:h,selectors:[["app-misdatos"]],decls:54,vars:2,consts:[["fill","clear","slot","start",3,"click"],["name","arrow-back-outline",2,"color","#f3f2ed"],["action","#"],["position","stacked",1,"tex-input"],["id","idnombre","type","name","placeholder","Nombres","maxlength","30"],["id","idapellido","type","name","placeholder","Apellidos","maxlength","30"],["id","iddni","type","tel","inputmode","numeric","pattern","[0-9]","placeholder","Dni","maxlength","8"],["id","idemail","type","email","placeholder","Correo electronico","maxlength","50"],["id","idcelular","type","tel","placeholder","Escribe tu n\xfamero","maxlength","9"],["id","idfecha","type","date","placeholder","Fecha de nacimiento"],["size","large","name","calendar-outline",2,"position","absolute","right","10px","color","#108b3c"],["outline","",3,"click"],["chip",""],["src","./assets/Iconos/Editar.svg","alt","editar"],["outline","",2,"background","transparent","margin-left","20px"],["name","share-social","size","large",2,"color","#fded0f","margin-right","10px",3,"click"],[1,"ion-card"],["outline","","color","success",3,"click",4,"ngFor","ngForOf"],["expand","block",1,"ion-button",3,"disabled","click"],["outline","","color","success",3,"click"]],template:function(n,e){1&n&&(l.Mb(0,"ion-header"),l.Mb(1,"ion-toolbar"),l.Mb(2,"ion-button",0),l.Ub("click",(function(){return e.regresar()})),l.Jb(3,"ion-icon",1),l.Lb(),l.Mb(4,"ion-title"),l.uc(5,"Mis datos"),l.Lb(),l.Lb(),l.Lb(),l.Mb(6,"ion-content"),l.Mb(7,"form",2),l.Mb(8,"ion-list"),l.Mb(9,"ion-row"),l.Mb(10,"ion-col"),l.Mb(11,"ion-label",3),l.uc(12,"Nombres"),l.Lb(),l.Jb(13,"ion-input",4),l.Lb(),l.Lb(),l.Mb(14,"ion-row"),l.Mb(15,"ion-col"),l.Mb(16,"ion-label",3),l.uc(17,"Apellidos"),l.Lb(),l.Jb(18,"ion-input",5),l.Lb(),l.Lb(),l.Mb(19,"ion-row"),l.Mb(20,"ion-col"),l.Mb(21,"ion-label",3),l.uc(22,"Documento de identidad (DNI)"),l.Lb(),l.Jb(23,"ion-input",6),l.Lb(),l.Lb(),l.Mb(24,"ion-row"),l.Mb(25,"ion-col"),l.Mb(26,"ion-label",3),l.uc(27,"Correo electr\xf3nico"),l.Lb(),l.Jb(28,"ion-input",7),l.Lb(),l.Lb(),l.Mb(29,"ion-row"),l.Mb(30,"ion-col"),l.Mb(31,"ion-label",3),l.uc(32,"Celular"),l.Lb(),l.Jb(33,"ion-input",8),l.Lb(),l.Lb(),l.Mb(34,"ion-row"),l.Mb(35,"ion-col"),l.Mb(36,"ion-label",3),l.uc(37,"Fecha de nacimiento"),l.Lb(),l.Mb(38,"ion-input",9),l.Jb(39,"ion-icon",10),l.Lb(),l.Lb(),l.Lb(),l.Mb(40,"ion-row"),l.Mb(41,"ion-col"),l.Mb(42,"ion-label",3),l.uc(43,"Mis favoritos "),l.Mb(44,"ion-chip",11,12),l.Ub("click",(function(){return e.irBebidas()})),l.Jb(46,"img",13),l.Lb(),l.Mb(47,"ion-chip",14),l.Mb(48,"ion-icon",15),l.Ub("click",(function(){return e.invitarAmigos()})),l.Lb(),l.Lb(),l.Lb(),l.Mb(49,"ion-card",16),l.sc(50,p,4,1,"ion-chip",17),l.Lb(),l.Lb(),l.Lb(),l.Lb(),l.Lb(),l.Lb(),l.Mb(51,"ion-footer"),l.Mb(52,"ion-button",18),l.Ub("click",(function(){return e.botonGuardar()})),l.uc(53,"Guardar"),l.Lb(),l.Lb()),2&n&&(l.yb(50),l.ec("ngForOf",e.tagName),l.yb(2),l.fc("disabled",e.btn))},directives:[s.v,s.fb,s.h,s.w,s.eb,s.q,r.o,r.i,r.j,s.H,s.Q,s.p,s.G,s.A,s.rb,s.o,s.j,a.j,s.t],styles:["ion-content[_ngcontent-%COMP%]{--background:#121212}ion-toolbar[_ngcontent-%COMP%]{--background:#108b3c}.tex-input[_ngcontent-%COMP%], ion-toolbar[_ngcontent-%COMP%]   ion-title[_ngcontent-%COMP%]{color:#fff;font-family:Gotham-Medium}.tex-input[_ngcontent-%COMP%]{font-size:18px;margin-bottom:10px}.tex-input[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%]{border:none;padding:0}ion-col[_ngcontent-%COMP%]{margin-left:20px;margin-right:20px}ion-row[_ngcontent-%COMP%]{margin-top:10px}ion-list[_ngcontent-%COMP%]{background:#121212;--padding-start:30px;--padding-end:30px}ion-list[_ngcontent-%COMP%], ion-list[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]{--padding-top:10px;--padding-bottom:10px}ion-list[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]{height:50px;border:none;border-radius:10px;--background:#fff;--color:#333;font-size:18px;--padding-start:20px;--padding-end:20px;margin-top:3px;font-family:SFCompactText-Medium}ion-list[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-moz-placeholder{color:#333}ion-list[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::-ms-input-placeholder{color:#333}ion-list[_ngcontent-%COMP%]   ion-input[_ngcontent-%COMP%]   [_ngcontent-%COMP%]::placeholder{color:#333}.ion-card[_ngcontent-%COMP%]{box-shadow:none!important;background-color:transparent!important;width:90%;margin:10px auto auto}.ion-card[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%]{background-color:#108b3c}.ion-card[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{color:#fff}.ion-button[_ngcontent-%COMP%]{--background:#108b3c;margin:20px 30px;font-size:16px;text-transform:none;height:50px;--border-radius:16px;font-family:SFCompactText-Medium;--color:#fff;color:#fff}ion-footer[_ngcontent-%COMP%]{background:#121212}.icon-date[_ngcontent-%COMP%]{position:absolute;right:10px;color:#108b3c;width:0;height:60px;font-weight:700}"]}),h)}],y=((v=function e(){n(this,e)}).\u0275mod=l.Gb({type:v}),v.\u0275inj=l.Fb({factory:function(n){return new(n||v)},imports:[[u.i.forChild(M)],u.i]}),v),C=((f=function e(){n(this,e)}).\u0275mod=l.Gb({type:f}),f.\u0275inj=l.Fb({factory:function(n){return new(n||f)},imports:[[a.c,r.d,s.gb,y]]}),f)}}])}();