(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{"Kt/9":function(t,o,i){"use strict";i.d(o,"a",(function(){return a}));var n=i("fXoL"),e=i("vkgz"),r=i("tk/3");let a=(()=>{class t{constructor(t){this.http=t}load(){const o="./assets/config/app-shell.config"+(Object(n.U)()?"":".prod")+".json";return this.http.get(o).pipe(Object(e.a)(o=>{t.settings=o})).toPromise().catch(t=>{console.log(`Could not load file '${o}'`,t)})}}return t.\u0275fac=function(o){return new(o||t)(n.Qb(r.a))},t.\u0275prov=n.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},MDF5:function(t,o,i){"use strict";i.r(o),i.d(o,"validacionCorreoPagePageModule",(function(){return y}));var n=i("ofXK"),e=i("3Pt+"),r=i("tyNb"),a=i("TEn/"),l=i("j1ZV"),s=i("mrSG"),c=i("zohi"),d=i("fXoL"),u=i("CmMg"),g=i("54vc"),b=i("e8h1");function m(t,o){1&t&&(d.Mb(0,"h3",9),d.uc(1,"Confirma tu correo electr\xf3nico"),d.Lb())}function p(t,o){1&t&&(d.Mb(0,"h3",9),d.uc(1,"Confirma tu n\xfamero de celular"),d.Lb())}function h(t,o){1&t&&(d.Mb(0,"span",14),d.Mb(1,"ion-label",15),d.Jb(2,"ion-icon",16),d.uc(3," Email es requerido"),d.Lb(),d.Lb())}function f(t,o){1&t&&(d.Mb(0,"span",14),d.Mb(1,"ion-label",15),d.Jb(2,"ion-icon",16),d.uc(3," Ingrese un email v\xe1lido"),d.Lb(),d.Lb())}function v(t,o){if(1&t&&(d.Mb(0,"div"),d.Mb(1,"ion-row"),d.Mb(2,"ion-col",2),d.Mb(3,"h5",10),d.uc(4),d.Lb(),d.Lb(),d.Lb(),d.Mb(5,"ion-row"),d.Mb(6,"ion-item",11),d.Jb(7,"ion-input",12),d.Lb(),d.Mb(8,"div",7),d.sc(9,h,4,0,"span",13),d.sc(10,f,4,0,"span",13),d.Lb(),d.Lb(),d.Lb()),2&t){const t=d.Xb();d.yb(4),d.wc("Por favor, confirma que ",t.myForm.value.email," es el correo que usas actualmente"),d.yb(5),d.ec("ngIf",t.submitted&&(null==t.errorControl.email.errors?null:t.errorControl.email.errors.required)),d.yb(1),d.ec("ngIf",t.submitted&&(null==t.errorControl.email.errors?null:t.errorControl.email.errors.pattern))}}function C(t,o){1&t&&(d.Mb(0,"span",14),d.Mb(1,"ion-label",15),d.Jb(2,"ion-icon",16),d.uc(3,"Celular es requerido (Solo n\xfameros)"),d.Lb(),d.Lb())}function M(t,o){1&t&&(d.Mb(0,"span",14),d.Mb(1,"ion-label",15),d.Jb(2,"ion-icon",16),d.uc(3,"M\xednimo 9 d\xedgitos (Solo n\xfameros)"),d.Lb(),d.Lb())}function x(t,o){1&t&&(d.Mb(0,"span",14),d.Mb(1,"ion-label",15),d.Jb(2,"ion-icon",16),d.uc(3,"Ingrese un n\xfamero v\xe1lido (Solo n\xfameros)"),d.Lb(),d.Lb())}function P(t,o){if(1&t&&(d.Mb(0,"div"),d.Mb(1,"ion-row"),d.Mb(2,"ion-col",2),d.Mb(3,"h5",10),d.uc(4),d.Lb(),d.Lb(),d.Lb(),d.Mb(5,"ion-row"),d.Mb(6,"ion-item",11),d.Jb(7,"ion-input",17),d.Lb(),d.Mb(8,"div",7),d.sc(9,C,4,0,"span",13),d.sc(10,M,4,0,"span",13),d.sc(11,x,4,0,"span",13),d.Lb(),d.Lb(),d.Lb()),2&t){const t=d.Xb();d.yb(4),d.wc("N\xb0 de celular ",t.myForm.value.celular,""),d.yb(5),d.ec("ngIf",t.submitted&&(null==t.errorControl.celular.errors?null:t.errorControl.celular.errors.required)),d.yb(1),d.ec("ngIf",t.submitted&&(null==t.errorControl.celular.errors?null:t.errorControl.celular.errors.min)),d.yb(1),d.ec("ngIf",t.submitted&&(null==t.errorControl.celular.errors?null:t.errorControl.celular.errors.max))}}const w=[{path:"",component:(()=>{class t{constructor(t,o,i,n,e,r,a,l,s){this.menu=t,this.router=o,this.modalCtrl=i,this.formBuilder=n,this.route=e,this.apiService=r,this.splashScreen=a,this.storage=l,this.alertController=s,this.correo="",this.tagCorreo={},this.estado={},this.submitted=!1,this.Usuario={},this.emailVisible=!1,this.telVisible=!1,this.route.queryParams.subscribe(t=>{this.router.getCurrentNavigation().extras.state&&(this.Usuario=this.router.getCurrentNavigation().extras.state.nuevoUsuario,this.tipoRegistro=this.router.getCurrentNavigation().extras.state.tipoRegistro)})}ngOnInit(){this.myForm=this.formBuilder.group({email:["",[e.n.required,e.n.pattern("[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")]],celular:["",[e.n.required,e.n.max(999999999),e.n.min(111111111)]]})}ionViewDidEnter(){this.menu.enable(!1),this.splashScreen.hide(),this.validarTipoRegistro(this.tipoRegistro)}validarTipoRegistro(t){"email"==t?(this.myForm.setValue({email:this.Usuario.email,celular:""}),this.emailVisible=!1,this.telVisible=!0):"tel"==t?(this.myForm.setValue({email:"",celular:this.Usuario.telefono}),this.telVisible=!1,this.emailVisible=!0):"fb"==t?(this.myForm.setValue({email:this.Usuario.email,celular:this.Usuario.telefono}),this.telVisible=!0,this.emailVisible=!0):"apple"==t&&(this.myForm.setValue({email:this.Usuario.email,celular:this.Usuario.telefono}),this.emailVisible=!0,this.telVisible=!0)}get errorControl(){return this.myForm.controls}onSubmit(){if(this.submitted=!0,!this.myForm.valid)return console.log("Llena todos los datos!"),!1;this.inicio()}ModalTour(){return Object(s.a)(this,void 0,void 0,(function*(){const t=yield this.modalCtrl.create({component:c.a,componentProps:{indicador:2}});return t.onDidDismiss(),yield t.present()}))}ionViewDidLeave(){this.menu.enable(!0)}inicio(){let t;this.storage.get("idusuario").then(o=>{t=o,this.tagCorreo={idUsuario:t,emailUsuario:this.myForm.value.email,telefonoUsuario:String(this.myForm.value.celular)},this.estado={idUsuario:t,estado:2},console.log(this.tagCorreo),this.PutCorreo()})}PutCorreo(){this.apiService.PutCorreo(this.tagCorreo).then(t=>{console.log("CORREO ACTUALIZADO"),console.log(this.tagCorreo),this.PutEstado()}).catch(t=>{console.log(t)})}PutEstado(){this.apiService.PutEstado(this.estado).then(t=>{console.log("ESTADO ACTUALIZADO"),this.apiService.setStorage("ind_user",2),this.router.navigate(["app/inicio"])}).catch(t=>{console.log(t)})}}return t.\u0275fac=function(o){return new(o||t)(d.Ib(a.jb),d.Ib(r.g),d.Ib(a.kb),d.Ib(e.a),d.Ib(r.a),d.Ib(u.a),d.Ib(g.a),d.Ib(b.b),d.Ib(a.a))},t.\u0275cmp=d.Cb({type:t,selectors:[["app-validacionCorreo"]],decls:15,vars:6,consts:[[1,"imagenLogo",3,"src"],[2,"margin-top","5%"],[1,"info-col"],[1,"info-wrapper"],["class","info-title",4,"ngIf"],["novalidate","",3,"formGroup","ngSubmit"],[4,"ngIf"],[2,"width","100%"],["type","submit","expand","block",1,"button-continuar"],[1,"info-title"],[1,"info-paragraph"],["lines","none",1,"input-item",2,"text-align","center"],["type","text","formControlName","email","text-right","","id","input","placeholder","usuario@example.com"],["class","error ion-padding error-input",4,"ngIf"],[1,"error","ion-padding","error-input"],[1,"label-error"],["name","alert-circle-outline"],["oninput","this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\\..*?)\\..*/g, '$1');","type","tel","formControlName","celular","maxlength","9","text-right","","id","input","placeholder","Celular"]],template:function(t,o){1&t&&(d.Mb(0,"ion-content"),d.Mb(1,"ion-row"),d.Jb(2,"ion-img",0),d.Lb(),d.Mb(3,"ion-row",1),d.Mb(4,"ion-col",2),d.Mb(5,"div",3),d.sc(6,m,2,0,"h3",4),d.sc(7,p,2,0,"h3",4),d.Lb(),d.Lb(),d.Lb(),d.Mb(8,"form",5),d.Ub("ngSubmit",(function(){return o.onSubmit()})),d.sc(9,v,11,3,"div",6),d.sc(10,P,12,4,"div",6),d.Mb(11,"ion-row"),d.Mb(12,"div",7),d.Mb(13,"ion-button",8),d.uc(14,"Confirmar y continuar"),d.Lb(),d.Lb(),d.Lb(),d.Lb(),d.Lb()),2&t&&(d.yb(2),d.ec("src","./assets/Iconos/LogoBube_final.png"),d.yb(4),d.ec("ngIf",o.emailVisible),d.yb(1),d.ec("ngIf",o.telVisible),d.yb(1),d.ec("formGroup",o.myForm),d.yb(1),d.ec("ngIf",o.emailVisible),d.yb(1),d.ec("ngIf",o.telVisible))},directives:[a.q,a.Q,a.x,a.p,n.k,e.o,e.i,e.c,a.h,a.B,a.A,a.rb,e.h,e.b,a.G,a.w,e.e],styles:["[_nghost-%COMP%]{--page-margin:var(--app-broad-margin);--page-background:var(--app-background);--page-swiper-pagination-space:40px;--page-swiper-pagination-height:18px;--page-pagination-bullet-size:10px;--page-first-slide-background:#121212;--page-second-slide-background:#121212;--page-third-slide-background:#121212;--page-last-slide-background:#121212;--page-vector-decoration-fill:var(--ion-color-light-shade)}ion-content[_ngcontent-%COMP%]{--background:var(--page-first-slide-background)}ion-footer[_ngcontent-%COMP%]{background:var(--page-first-slide-background)}ion-footer[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{--color:var(--ion-color-lightest);text-transform:none;--box-shadow:none!important}ion-content[_ngcontent-%COMP%]{position:relative;top:0}.info-paragraph[_ngcontent-%COMP%]{margin-top:5px;margin-bottom:var(--page-margin);color:#f3f2ed;text-align:center;font-family:SFCompactText-Medium;font-size:16px}.info-paragraph[_ngcontent-%COMP%]:last-child{margin-bottom:0}.info-title[_ngcontent-%COMP%]{margin:0;margin-bottom:var(--page-margin);color:#f3f2ed;text-align:center;font-family:Gotham-Medium;font-size:20px}.imagenLogo[_ngcontent-%COMP%]{width:120px;height:120px;margin:5% auto auto;display:block}.button-continuar[_ngcontent-%COMP%]{--background:#108b3c;margin-left:10%;margin-right:10%;position:absolute;bottom:20px;font-size:16px;text-transform:none;height:50px;width:80%;--border-radius:16px;font-family:SFCompactText-Medium;--color:#fff;color:#fff}.input-item[_ngcontent-%COMP%]{margin:15px auto 5px;color:var(--ion-color-dark);color:#121212!important;--border-radius:10px;--background:#f3f2ed;--highlight-background:#000!important;width:80%}.error-input[_ngcontent-%COMP%]{margin-left:8%}.error-input[_ngcontent-%COMP%]   .label-error[_ngcontent-%COMP%]{font-family:SFCompactText-Medium;font-style:Regular;font-weight:400;font-size:14px;line-height:19px;color:red}","app-image-shell.illustration-image[_ngcontent-%COMP%]{--image-shell-loading-background:transparent;--image-shell-spinner-color:var(--ion-color-lightest)}","@media only screen and (min-device-width:320px) and (max-device-width:480px) and (-webkit-min-device-pixel-ratio:2) and (device-aspect-ratio:2/3){.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{max-width:30vh;padding:0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{min-height:12vh}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .info-wrapper[_ngcontent-%COMP%]   .info-title[_ngcontent-%COMP%]{margin-bottom:calc(var(--page-margin) / 2);font-size:20px}}@media only screen and (min-device-width:320px) and (max-device-width:568px) and (-webkit-min-device-pixel-ratio:2) and (device-aspect-ratio:40/71){.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{max-width:32vh;padding:0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{min-height:12vh}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .info-wrapper[_ngcontent-%COMP%]   .info-title[_ngcontent-%COMP%]{margin-bottom:calc(var(--page-margin) / 2);font-size:20px}}@media only screen and (min-device-width:375px) and (max-device-width:667px) and (-webkit-min-device-pixel-ratio:2){.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{max-width:36vh;padding:2vh 0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{min-height:14vh}}@media only screen and (min-device-width:375px) and (max-device-width:812px) and (-webkit-min-device-pixel-ratio:3){.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{max-width:34vh;padding:6vh 0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{min-height:12vh}}@media only screen and (min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3){.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{max-width:38vh;padding:4vh 0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{min-height:14vh}}"]}),t})()}];let y=(()=>{class t{}return t.\u0275mod=d.Gb({type:t}),t.\u0275inj=d.Fb({factory:function(o){return new(o||t)},imports:[[n.c,e.d,e.m,a.gb,r.i.forChild(w),l.a]]}),t})()},j1ZV:function(t,o,i){"use strict";i.d(o,"a",(function(){return d}));var n=i("ofXK"),e=i("3Pt+"),r=i("TEn/"),a=i("fXoL"),l=i("tk/3"),s=i("Kt/9");let c=(()=>{class t{}return t.\u0275mod=a.Gb({type:t}),t.\u0275inj=a.Fb({factory:function(o){return new(o||t)},providers:[{provide:a.d,useFactory:t=>()=>t.load(),deps:[s.a],multi:!0}],imports:[[n.c,l.b,r.gb]]}),t})(),d=(()=>{class t{}return t.\u0275mod=a.Gb({type:t}),t.\u0275inj=a.Fb({factory:function(o){return new(o||t)},imports:[[n.c,e.d,c,r.gb],c]}),t})()}}]);