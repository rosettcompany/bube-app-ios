(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"0tkQ":function(t,n,o){"use strict";o.r(n),o.d(n,"MensajePageModule",(function(){return d}));var e=o("ofXK"),i=o("3Pt+"),r=o("tyNb"),a=o("TEn/"),c=o("j1ZV"),s=o("fXoL"),b=o("54vc");function l(t,n){1&t&&(s.Mb(0,"ion-row",10),s.Mb(1,"a",11),s.Mb(2,"ion-button",12),s.uc(3," Actualizar "),s.Lb(),s.Lb(),s.Lb())}function p(t,n){1&t&&(s.Mb(0,"ion-row",10),s.Mb(1,"a",13),s.Mb(2,"ion-button",12),s.uc(3," Actualizar "),s.Lb(),s.Lb(),s.Lb())}const u=[{path:"",component:(()=>{class t{constructor(t,n,o,e){this.menu=t,this.splashScreen=n,this.platform=o,this.router=e,this.android=!1,this.ios=!1}ionViewDidEnter(){this.splashScreen.hide(),this.subscription=this.platform.backButton.subscribeWithPriority(9999,()=>{navigator.app.exitApp()}),this.platform.is("android")?(this.android=!0,this.ios=!1,console.log("android")):this.platform.is("ios")?(this.android=!1,this.ios=!0,console.log("ios")):(console.log("nada"),this.ios=!1,this.android=!1)}ngOnInit(){}}return t.\u0275fac=function(n){return new(n||t)(s.Ib(a.jb),s.Ib(b.a),s.Ib(a.mb),s.Ib(r.g))},t.\u0275cmp=s.Cb({type:t,selectors:[["app-mensaje"]],decls:17,vars:4,consts:[[3,"translucent"],[3,"fullscreen"],[1,"conteiner-logo"],["src","./assets/Iconos/LogoBube_final.png","alt","logo bube",1,"img-logo"],[1,"titulo-login"],["id","container"],[1,"titulo"],[2,"margin-top","20px"],[1,"descrip"],["style","justify-content: center; margin-top: 40px;",4,"ngIf"],[2,"justify-content","center","margin-top","40px"],["href","https://play.google.com/store/apps/details?id=com.rosettcompany.bube"],[1,"actualizar"],["href","https://apps.apple.com/pe/app/bube-buscador-de-bebidas/id1580449502?l=en"]],template:function(t,n){1&t&&(s.Jb(0,"ion-header",0),s.Mb(1,"ion-content",1),s.Mb(2,"ion-row"),s.Mb(3,"div",2),s.Jb(4,"ion-img",3),s.Jb(5,"ion-label",4),s.Lb(),s.Lb(),s.Mb(6,"div",5),s.Mb(7,"ion-row"),s.Mb(8,"ion-col"),s.Mb(9,"ion-label",6),s.uc(10,"Versi\xf3n desactualizada"),s.Lb(),s.Lb(),s.Lb(),s.Mb(11,"ion-row",7),s.Mb(12,"ion-col"),s.Mb(13,"ion-label",8),s.uc(14,"Hay una nueva versi\xf3n de BUBE porfavor actualice para poder seguir comprando tus tragos favoritos"),s.Lb(),s.Lb(),s.Lb(),s.sc(15,l,4,0,"ion-row",9),s.sc(16,p,4,0,"ion-row",9),s.Lb(),s.Lb()),2&t&&(s.ec("translucent",!0),s.yb(1),s.ec("fullscreen",!0),s.yb(14),s.ec("ngIf",1==n.android),s.yb(1),s.ec("ngIf",1==n.ios))},directives:[a.v,a.q,a.Q,a.x,a.G,a.p,e.k,a.h],styles:["ion-content[_ngcontent-%COMP%]{--background:#121212;color:#fff}.conteiner-logo[_ngcontent-%COMP%]{text-align:center;position:absolute;left:0;right:0;top:10%}.img-logo[_ngcontent-%COMP%]{width:120px;height:120px;margin:auto auto 20px}#container[_ngcontent-%COMP%]{text-align:center;margin-top:10px;position:absolute;left:0;right:0;top:50%;transform:translateY(-50%)}.actualizar[_ngcontent-%COMP%]{margin-left:10px;margin-right:10px;margin-bottom:10px;--padding-bottom:15px;--padding-top:15px;text-transform:none;height:-webkit-max-content;height:-moz-max-content;height:max-content;font-size:16px;--background:#12632e}.btn-terminos[_ngcontent-%COMP%]{--color:#fcac19;background:transparent;font-size:14px;text-decoration:underline;height:-webkit-fit-content;height:-moz-fit-content;height:fit-content;text-transform:none;width:-webkit-min-content;width:-moz-min-content;width:min-content}.btn-terminos[_ngcontent-%COMP%]:hover{background:transparent;color:#fcbd48}.titulo-login[_ngcontent-%COMP%]{color:#f3f2ed;font-family:SF-UI-Display-Black;font-size:20px;margin-top:20px}.titulo[_ngcontent-%COMP%]{font-size:22px}.descrip[_ngcontent-%COMP%], .titulo[_ngcontent-%COMP%]{color:#fff;font-family:Gotham-Medium}"]}),t})()}];let d=(()=>{class t{}return t.\u0275mod=s.Gb({type:t}),t.\u0275inj=s.Fb({factory:function(n){return new(n||t)},imports:[[e.c,i.d,a.gb,r.i.forChild(u),c.a]]}),t})()},"Kt/9":function(t,n,o){"use strict";o.d(n,"a",(function(){return a}));var e=o("fXoL"),i=o("vkgz"),r=o("tk/3");let a=(()=>{class t{constructor(t){this.http=t}load(){const n="./assets/config/app-shell.config"+(Object(e.U)()?"":".prod")+".json";return this.http.get(n).pipe(Object(i.a)(n=>{t.settings=n})).toPromise().catch(t=>{console.log(`Could not load file '${n}'`,t)})}}return t.\u0275fac=function(n){return new(n||t)(e.Qb(r.a))},t.\u0275prov=e.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},j1ZV:function(t,n,o){"use strict";o.d(n,"a",(function(){return l}));var e=o("ofXK"),i=o("3Pt+"),r=o("TEn/"),a=o("fXoL"),c=o("tk/3"),s=o("Kt/9");let b=(()=>{class t{}return t.\u0275mod=a.Gb({type:t}),t.\u0275inj=a.Fb({factory:function(n){return new(n||t)},providers:[{provide:a.d,useFactory:t=>()=>t.load(),deps:[s.a],multi:!0}],imports:[[e.c,c.b,r.gb]]}),t})(),l=(()=>{class t{}return t.\u0275mod=a.Gb({type:t}),t.\u0275inj=a.Fb({factory:function(n){return new(n||t)},imports:[[e.c,i.d,b,r.gb],b]}),t})()}}]);