!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function e(n,e,o){return e&&t(n.prototype,e),o&&t(n,o),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{"Kt/9":function(t,o,i){"use strict";i.d(o,"a",(function(){return c}));var r=i("fXoL"),a=i("vkgz"),l=i("tk/3"),c=function(){var t=function(){function t(e){n(this,t),this.http=e}return e(t,[{key:"load",value:function(){var n="./assets/config/app-shell.config"+(Object(r.U)()?"":".prod")+".json";return this.http.get(n).pipe(Object(a.a)((function(n){t.settings=n}))).toPromise().catch((function(t){console.log("Could not load file '".concat(n,"'"),t)}))}}]),t}();return t.\u0275fac=function(n){return new(n||t)(r.Qb(l.a))},t.\u0275prov=r.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},MDF5:function(t,o,i){"use strict";i.r(o),i.d(o,"validacionCorreoPagePageModule",(function(){return k}));var r=i("ofXK"),a=i("3Pt+"),l=i("tyNb"),c=i("TEn/"),s=i("j1ZV"),u=i("mrSG"),d=i("zohi"),b=i("fXoL"),g=i("CmMg"),m=i("54vc"),p=i("e8h1");function h(n,t){1&n&&(b.Mb(0,"h3",9),b.uc(1,"Confirma tu correo electr\xf3nico"),b.Lb())}function f(n,t){1&n&&(b.Mb(0,"h3",9),b.uc(1,"Confirma tu n\xfamero de celular"),b.Lb())}function v(n,t){1&n&&(b.Mb(0,"span",14),b.Mb(1,"ion-label",15),b.Jb(2,"ion-icon",16),b.uc(3," Email es requerido"),b.Lb(),b.Lb())}function C(n,t){1&n&&(b.Mb(0,"span",14),b.Mb(1,"ion-label",15),b.Jb(2,"ion-icon",16),b.uc(3," Ingrese un email v\xe1lido"),b.Lb(),b.Lb())}function M(n,t){if(1&n&&(b.Mb(0,"div"),b.Mb(1,"ion-row"),b.Mb(2,"ion-col",2),b.Mb(3,"h5",10),b.uc(4),b.Lb(),b.Lb(),b.Lb(),b.Mb(5,"ion-row"),b.Mb(6,"ion-item",11),b.Jb(7,"ion-input",12),b.Lb(),b.Mb(8,"div",7),b.sc(9,v,4,0,"span",13),b.sc(10,C,4,0,"span",13),b.Lb(),b.Lb(),b.Lb()),2&n){var e=b.Xb();b.yb(4),b.wc("Por favor, confirma que ",e.myForm.value.email," es el correo que usas actualmente"),b.yb(5),b.ec("ngIf",e.submitted&&(null==e.errorControl.email.errors?null:e.errorControl.email.errors.required)),b.yb(1),b.ec("ngIf",e.submitted&&(null==e.errorControl.email.errors?null:e.errorControl.email.errors.pattern))}}function x(n,t){1&n&&(b.Mb(0,"span",14),b.Mb(1,"ion-label",15),b.Jb(2,"ion-icon",16),b.uc(3,"Celular es requerido (Solo n\xfameros)"),b.Lb(),b.Lb())}function y(n,t){1&n&&(b.Mb(0,"span",14),b.Mb(1,"ion-label",15),b.Jb(2,"ion-icon",16),b.uc(3,"M\xednimo 9 d\xedgitos (Solo n\xfameros)"),b.Lb(),b.Lb())}function w(n,t){1&n&&(b.Mb(0,"span",14),b.Mb(1,"ion-label",15),b.Jb(2,"ion-icon",16),b.uc(3,"Ingrese un n\xfamero v\xe1lido (Solo n\xfameros)"),b.Lb(),b.Lb())}function P(n,t){if(1&n&&(b.Mb(0,"div"),b.Mb(1,"ion-row"),b.Mb(2,"ion-col",2),b.Mb(3,"h5",10),b.uc(4),b.Lb(),b.Lb(),b.Lb(),b.Mb(5,"ion-row"),b.Mb(6,"ion-item",11),b.Jb(7,"ion-input",17),b.Lb(),b.Mb(8,"div",7),b.sc(9,x,4,0,"span",13),b.sc(10,y,4,0,"span",13),b.sc(11,w,4,0,"span",13),b.Lb(),b.Lb(),b.Lb()),2&n){var e=b.Xb();b.yb(4),b.wc("N\xb0 de celular ",e.myForm.value.celular,""),b.yb(5),b.ec("ngIf",e.submitted&&(null==e.errorControl.celular.errors?null:e.errorControl.celular.errors.required)),b.yb(1),b.ec("ngIf",e.submitted&&(null==e.errorControl.celular.errors?null:e.errorControl.celular.errors.min)),b.yb(1),b.ec("ngIf",e.submitted&&(null==e.errorControl.celular.errors?null:e.errorControl.celular.errors.max))}}var O,_,L=[{path:"",component:(O=function(){function t(e,o,i,r,a,l,c,s,u){var d=this;n(this,t),this.menu=e,this.router=o,this.modalCtrl=i,this.formBuilder=r,this.route=a,this.apiService=l,this.splashScreen=c,this.storage=s,this.alertController=u,this.correo="",this.tagCorreo={},this.estado={},this.submitted=!1,this.Usuario={},this.emailVisible=!1,this.telVisible=!1,this.route.queryParams.subscribe((function(n){d.router.getCurrentNavigation().extras.state&&(d.Usuario=d.router.getCurrentNavigation().extras.state.nuevoUsuario,d.tipoRegistro=d.router.getCurrentNavigation().extras.state.tipoRegistro)}))}return e(t,[{key:"ngOnInit",value:function(){this.myForm=this.formBuilder.group({email:["",[a.n.required,a.n.pattern("[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")]],celular:["",[a.n.required,a.n.max(999999999),a.n.min(111111111)]]})}},{key:"ionViewDidEnter",value:function(){this.menu.enable(!1),this.splashScreen.hide(),this.validarTipoRegistro(this.tipoRegistro)}},{key:"validarTipoRegistro",value:function(n){"email"==n?(this.myForm.setValue({email:this.Usuario.email,celular:""}),this.emailVisible=!1,this.telVisible=!0):"tel"==n?(this.myForm.setValue({email:"",celular:this.Usuario.telefono}),this.telVisible=!1,this.emailVisible=!0):"fb"==n?(this.myForm.setValue({email:this.Usuario.email,celular:this.Usuario.telefono}),this.telVisible=!0,this.emailVisible=!0):"apple"==n&&(this.myForm.setValue({email:this.Usuario.email,celular:this.Usuario.telefono}),this.emailVisible=!0,this.telVisible=!0)}},{key:"onSubmit",value:function(){if(this.submitted=!0,!this.myForm.valid)return console.log("Llena todos los datos!"),!1;this.inicio()}},{key:"ModalTour",value:function(){return Object(u.a)(this,void 0,void 0,regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.modalCtrl.create({component:d.a,componentProps:{indicador:2}});case 2:return(t=n.sent).onDidDismiss(),n.next=6,t.present();case 6:return n.abrupt("return",n.sent);case 7:case"end":return n.stop()}}),n,this)})))}},{key:"ionViewDidLeave",value:function(){this.menu.enable(!0)}},{key:"inicio",value:function(){var n,t=this;this.storage.get("idusuario").then((function(e){n=e,t.tagCorreo={idUsuario:n,emailUsuario:t.myForm.value.email,telefonoUsuario:String(t.myForm.value.celular)},t.estado={idUsuario:n,estado:2},console.log(t.tagCorreo),t.PutCorreo()}))}},{key:"PutCorreo",value:function(){var n=this;this.apiService.PutCorreo(this.tagCorreo).then((function(t){console.log("CORREO ACTUALIZADO"),console.log(n.tagCorreo),n.PutEstado()})).catch((function(n){console.log(n)}))}},{key:"PutEstado",value:function(){var n=this;this.apiService.PutEstado(this.estado).then((function(t){console.log("ESTADO ACTUALIZADO"),n.apiService.setStorage("ind_user",2),n.router.navigate(["app/inicio"])})).catch((function(n){console.log(n)}))}},{key:"errorControl",get:function(){return this.myForm.controls}}]),t}(),O.\u0275fac=function(n){return new(n||O)(b.Ib(c.jb),b.Ib(l.g),b.Ib(c.kb),b.Ib(a.a),b.Ib(l.a),b.Ib(g.a),b.Ib(m.a),b.Ib(p.b),b.Ib(c.a))},O.\u0275cmp=b.Cb({type:O,selectors:[["app-validacionCorreo"]],decls:15,vars:6,consts:[[1,"imagenLogo",3,"src"],[2,"margin-top","5%"],[1,"info-col"],[1,"info-wrapper"],["class","info-title",4,"ngIf"],["novalidate","",3,"formGroup","ngSubmit"],[4,"ngIf"],[2,"width","100%"],["type","submit","expand","block",1,"button-continuar"],[1,"info-title"],[1,"info-paragraph"],["lines","none",1,"input-item",2,"text-align","center"],["type","text","formControlName","email","text-right","","id","input","placeholder","usuario@example.com"],["class","error ion-padding error-input",4,"ngIf"],[1,"error","ion-padding","error-input"],[1,"label-error"],["name","alert-circle-outline"],["oninput","this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*?)\\..*/g, '$1');","type","tel","formControlName","celular","maxlength","9","text-right","","id","input","placeholder","Celular"]],template:function(n,t){1&n&&(b.Mb(0,"ion-content"),b.Mb(1,"ion-row"),b.Jb(2,"ion-img",0),b.Lb(),b.Mb(3,"ion-row",1),b.Mb(4,"ion-col",2),b.Mb(5,"div",3),b.sc(6,h,2,0,"h3",4),b.sc(7,f,2,0,"h3",4),b.Lb(),b.Lb(),b.Lb(),b.Mb(8,"form",5),b.Ub("ngSubmit",(function(){return t.onSubmit()})),b.sc(9,M,11,3,"div",6),b.sc(10,P,12,4,"div",6),b.Mb(11,"ion-row"),b.Mb(12,"div",7),b.Mb(13,"ion-button",8),b.uc(14,"Confirmar y continuar"),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb()),2&n&&(b.yb(2),b.ec("src","./assets/Iconos/LogoBube_final.png"),b.yb(4),b.ec("ngIf",t.emailVisible),b.yb(1),b.ec("ngIf",t.telVisible),b.yb(1),b.ec("formGroup",t.myForm),b.yb(1),b.ec("ngIf",t.emailVisible),b.yb(1),b.ec("ngIf",t.telVisible))},directives:[c.q,c.Q,c.x,c.p,r.k,a.o,a.i,a.c,c.h,c.B,c.A,c.rb,a.h,a.b,c.G,c.w,a.e],styles:["[_nghost-%COMP%]{--page-margin:var(--app-broad-margin);--page-background:var(--app-background);--page-swiper-pagination-space:40px;--page-swiper-pagination-height:18px;--page-pagination-bullet-size:10px;--page-first-slide-background:#121212;--page-second-slide-background:#121212;--page-third-slide-background:#121212;--page-last-slide-background:#121212;--page-vector-decoration-fill:var(--ion-color-light-shade)}ion-content[_ngcontent-%COMP%]{--background:var(--page-first-slide-background)}ion-footer[_ngcontent-%COMP%]{background:var(--page-first-slide-background)}ion-footer[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{--color:var(--ion-color-lightest);text-transform:none;--box-shadow:none!important}ion-content[_ngcontent-%COMP%]{position:relative;top:0}.info-paragraph[_ngcontent-%COMP%]{margin-top:5px;margin-bottom:var(--page-margin);color:#f3f2ed;text-align:center;font-family:SFCompactText-Medium;font-size:16px}.info-paragraph[_ngcontent-%COMP%]:last-child{margin-bottom:0}.info-title[_ngcontent-%COMP%]{margin:0;margin-bottom:var(--page-margin);color:#f3f2ed;text-align:center;font-family:Gotham-Medium;font-size:20px}.imagenLogo[_ngcontent-%COMP%]{width:120px;height:120px;margin:5% auto auto;display:block}.button-continuar[_ngcontent-%COMP%]{--background:#108b3c;margin-left:10%;margin-right:10%;position:absolute;bottom:20px;font-size:16px;text-transform:none;height:50px;width:80%;--border-radius:16px;font-family:SFCompactText-Medium;--color:#fff;color:#fff}.input-item[_ngcontent-%COMP%]{margin:15px auto 5px;color:var(--ion-color-dark);color:#121212!important;--border-radius:10px;--background:#f3f2ed;--highlight-background:#000!important;width:80%}.error-input[_ngcontent-%COMP%]{margin-left:8%}.error-input[_ngcontent-%COMP%]   .label-error[_ngcontent-%COMP%]{font-family:SFCompactText-Medium;font-style:Regular;font-weight:400;font-size:14px;line-height:19px;color:red}","app-image-shell.illustration-image[_ngcontent-%COMP%]{--image-shell-loading-background:transparent;--image-shell-spinner-color:var(--ion-color-lightest)}","@media only screen and (min-device-width:320px) and (max-device-width:480px) and (-webkit-min-device-pixel-ratio:2) and (device-aspect-ratio:2/3){.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{max-width:30vh;padding:0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{min-height:12vh}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .info-wrapper[_ngcontent-%COMP%]   .info-title[_ngcontent-%COMP%]{margin-bottom:calc(var(--page-margin) / 2);font-size:20px}}@media only screen and (min-device-width:320px) and (max-device-width:568px) and (-webkit-min-device-pixel-ratio:2) and (device-aspect-ratio:40/71){.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{max-width:32vh;padding:0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{min-height:12vh}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .info-wrapper[_ngcontent-%COMP%]   .info-title[_ngcontent-%COMP%]{margin-bottom:calc(var(--page-margin) / 2);font-size:20px}}@media only screen and (min-device-width:375px) and (max-device-width:667px) and (-webkit-min-device-pixel-ratio:2){.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{max-width:36vh;padding:2vh 0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{min-height:14vh}}@media only screen and (min-device-width:375px) and (max-device-width:812px) and (-webkit-min-device-pixel-ratio:3){.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{max-width:34vh;padding:6vh 0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{min-height:12vh}}@media only screen and (min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3){.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{max-width:38vh;padding:4vh 0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{min-height:14vh}}"]}),O)}],k=((_=function t(){n(this,t)}).\u0275mod=b.Gb({type:_}),_.\u0275inj=b.Fb({factory:function(n){return new(n||_)},imports:[[r.c,a.d,a.m,c.gb,l.i.forChild(L),s.a]]}),_)},j1ZV:function(t,e,o){"use strict";o.d(e,"a",(function(){return g}));var i,r,a=o("ofXK"),l=o("3Pt+"),c=o("TEn/"),s=o("fXoL"),u=o("tk/3"),d=o("Kt/9"),b=((r=function t(){n(this,t)}).\u0275mod=s.Gb({type:r}),r.\u0275inj=s.Fb({factory:function(n){return new(n||r)},providers:[{provide:s.d,useFactory:function(n){return function(){return n.load()}},deps:[d.a],multi:!0}],imports:[[a.c,u.b,c.gb]]}),r),g=((i=function t(){n(this,t)}).\u0275mod=s.Gb({type:i}),i.\u0275inj=s.Fb({factory:function(n){return new(n||i)},imports:[[a.c,l.d,b,c.gb],b]}),i)}}])}();