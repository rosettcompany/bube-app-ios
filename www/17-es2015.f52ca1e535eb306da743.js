(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"2gss":function(e,n,o){"use strict";o.d(n,"a",(function(){return l}));var i=o("fXoL"),t=o("ofXK"),a=o("Kt/9"),r=o("TEn/");function s(e,n){1&e&&i.cc(0,0,["*ngIf","_display === 'cover'"])}const c=["*"];let l=(()=>{class e{constructor(e){this.platformId=e,this.debugDisplay=!(!a.a.settings||!a.a.settings.debug)&&a.a.settings.debug,this._src="",this._alt="",this._display="",this.imageLoaded=!1}set display(e){this._display=null!=e?e:""}get display(){return this._display}set src(e){this.debugDisplay||(this._src=null!=e?e:""),"cover"===this._display&&(this.backgroundImage="unset"),this.imageLoaded=!!Object(t.s)(this.platformId)}set alt(e){this._alt=null!=e?e:""}_imageLoaded(){this.imageLoaded=!0,"cover"===this._display&&(this.backgroundImage="url("+this._src+")")}}return e.\u0275fac=function(n){return new(n||e)(i.Ib(i.B))},e.\u0275cmp=i.Cb({type:e,selectors:[["app-image-shell"]],hostVars:5,hostBindings:function(e,n){2&e&&(i.zb("display",n.display),i.rc("background-image",n.backgroundImage),i.Ab("img-loaded",n.imageLoaded))},inputs:{display:"display",src:"src",alt:"alt"},ngContentSelectors:c,decls:3,vars:3,consts:[[1,"spinner"],[1,"inner-img",3,"src","alt","load"],[4,"ngIf"]],template:function(e,n){1&e&&(i.dc(),i.Jb(0,"ion-spinner",0),i.Mb(1,"img",1),i.Ub("load",(function(){return n._imageLoaded()})),i.Lb(),i.sc(2,s,1,0,"ng-content",2)),2&e&&(i.yb(1),i.ec("src",n._src,i.nc)("alt",n._alt),i.yb(1),i.ec("ngIf","cover"===n._display))},directives:[r.Z,t.k],styles:['[_nghost-%COMP%]{--image-shell-loading-background:#eee;--image-shell-border-radius:0px;display:block;position:relative;height:100%;border-radius:var(--image-shell-border-radius);transition:all .3s ease-in-out;z-index:2}[_nghost-%COMP%] > .spinner[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]:before{content:"";background:var(--image-shell-loading-background);border-radius:var(--image-shell-border-radius);position:absolute;top:0;bottom:0;left:0;right:0}[_nghost-%COMP%]:not([display=cover]){width:100%;overflow:hidden}[_nghost-%COMP%]:not([display=cover]) > .inner-img[_ngcontent-%COMP%]{transition:visibility 0s linear,opacity .5s linear;opacity:0;visibility:hidden;width:100%;height:100%;border-radius:var(--image-shell-border-radius)}[_nghost-%COMP%]:not([display=cover]).img-loaded:before{display:none}[_nghost-%COMP%]:not([display=cover]).img-loaded > .inner-img[_ngcontent-%COMP%]{opacity:1;visibility:visible}[display=cover][_nghost-%COMP%]{background-size:cover;background-repeat:no-repeat}[display=cover][_nghost-%COMP%]:before, [display=cover][_nghost-%COMP%] > .spinner[_ngcontent-%COMP%]{z-index:-1}[display=cover][_nghost-%COMP%] > .inner-img[_ngcontent-%COMP%]{display:none;visibility:hidden}[display=cover].img-loaded[_nghost-%COMP%]:before{display:none}[animation=gradient][_nghost-%COMP%]{--image-shell-loading-background:#eee;--image-shell-animation-color:#ddd}[animation=gradient][_nghost-%COMP%]:before{background:linear-gradient(90deg,var(--image-shell-loading-background) 8%,var(--image-shell-animation-color) 18%,var(--image-shell-loading-background) 33%);background-size:800px 104px;-webkit-animation:animateBackground 2s ease-in-out infinite;animation:animateBackground 2s ease-in-out infinite}[animation=gradient].img-loaded[_nghost-%COMP%]:before{background:none;-webkit-animation:0;animation:0}@-webkit-keyframes animateBackground{0%{background-position:-468px 0}to{background-position:468px 0}}@keyframes animateBackground{0%{background-position:-468px 0}to{background-position:468px 0}}[animation=spinner][_nghost-%COMP%]{--image-shell-spinner-size:28px;--image-shell-spinner-color:#ccc}[animation=spinner][_nghost-%COMP%] > .spinner[_ngcontent-%COMP%]{display:block;position:absolute;top:calc(50% - calc(var(--image-shell-spinner-size) / 2));left:calc(50% - calc(var(--image-shell-spinner-size) / 2));width:var(--image-shell-spinner-size);height:var(--image-shell-spinner-size);font-size:var(--image-shell-spinner-size);line-height:var(--image-shell-spinner-size);color:var(--image-shell-spinner-color)}[animation=spinner].img-loaded[_nghost-%COMP%] > .spinner[_ngcontent-%COMP%]{display:none;visibility:hidden}.add-overlay[_nghost-%COMP%]{--image-shell-overlay-background:rgba(0,0,0,0.4)}.add-overlay.img-loaded[_nghost-%COMP%]:before{display:block;background:var(--image-shell-overlay-background)}']}),e})()},B7gC:function(e,n,o){"use strict";o.d(n,"a",(function(){return a}));var i=o("fXoL");const t=["*"];let a=(()=>{class e{constructor(){this.ratioPadding="0px"}set ratio(e){this.ratioPadding="0px 0px "+(e=null!=e?e:{w:1,h:1}).h/e.w*100+"% 0px"}}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=i.Cb({type:e,selectors:[["app-aspect-ratio"]],hostVars:2,hostBindings:function(e,n){2&e&&i.rc("padding",n.ratioPadding)},inputs:{ratio:"ratio"},ngContentSelectors:t,decls:2,vars:0,consts:[[1,"content-wrapper"]],template:function(e,n){1&e&&(i.dc(),i.Mb(0,"div",0),i.cc(1),i.Lb())},styles:["[_nghost-%COMP%]{display:block;overflow:hidden;position:relative;width:100%}[_nghost-%COMP%]   .content-wrapper[_ngcontent-%COMP%]{position:absolute;top:0;bottom:0;left:0;right:0}"]}),e})()},"Kt/9":function(e,n,o){"use strict";o.d(n,"a",(function(){return r}));var i=o("fXoL"),t=o("vkgz"),a=o("tk/3");let r=(()=>{class e{constructor(e){this.http=e}load(){const n="./assets/config/app-shell.config"+(Object(i.U)()?"":".prod")+".json";return this.http.get(n).pipe(Object(t.a)(n=>{e.settings=n})).toPromise().catch(e=>{console.log(`Could not load file '${n}'`,e)})}}return e.\u0275fac=function(n){return new(n||e)(i.Qb(a.a))},e.\u0275prov=i.Eb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()},j1ZV:function(e,n,o){"use strict";o.d(n,"a",(function(){return d}));var i=o("ofXK"),t=o("3Pt+"),a=o("TEn/"),r=o("fXoL"),s=o("tk/3"),c=o("Kt/9");let l=(()=>{class e{}return e.\u0275mod=r.Gb({type:e}),e.\u0275inj=r.Fb({factory:function(n){return new(n||e)},providers:[{provide:r.d,useFactory:e=>()=>e.load(),deps:[c.a],multi:!0}],imports:[[i.c,s.b,a.gb]]}),e})(),d=(()=>{class e{}return e.\u0275mod=r.Gb({type:e}),e.\u0275inj=r.Fb({factory:function(n){return new(n||e)},imports:[[i.c,t.d,l,a.gb],l]}),e})()},qC7h:function(e,n,o){"use strict";o.r(n),o.d(n,"DetalleamigoPageModule",(function(){return y}));var i=o("ofXK"),t=o("3Pt+"),a=o("j1ZV"),r=o("TEn/"),s=o("tyNb"),c=o("mrSG"),l=o("fXoL"),d=o("e8h1"),g=o("zZ42"),b=o("B7gC"),u=o("2gss");function h(e,n){if(1&e){const e=l.Nb();l.Mb(0,"ion-chip",21,22),l.Ub("click",(function(){l.mc(e);const o=n.$implicit;return l.Xb().buscarBebida(o.nombrebebida,o.idusuario)})),l.Jb(2,"ion-icon",23),l.Mb(3,"ion-label",24),l.uc(4),l.Lb(),l.Lb()}if(2&e){const e=n.$implicit;l.yb(4),l.wc(" ",e.nombrebebida," ")}}function p(e,n){if(1&e&&(l.Mb(0,"ion-label",25),l.uc(1),l.Lb()),2&e){const e=l.Xb();l.yb(1),l.wc("Selecciona la bebida favorita de ",e.amigo.nombresusuario," y obsequiasela con Bube compartiendole el voucher de compra o enviandole el delivery")}}function m(e,n){1&e&&(l.Mb(0,"ion-button",26),l.uc(1," Ok!\n"),l.Lb())}const f=function(){return{w:1,h:1}},v=[{path:"",component:(()=>{class e{constructor(e,n,o,i,t,a,r,s){this.router=e,this.storage=n,this.route=o,this.navCtrl=i,this.platform=t,this.joyrideService=a,this.toastController=r,this.loadingController=s,this.tourActivo=!1,this.route.queryParams.subscribe(e=>{this.router.getCurrentNavigation().extras.state&&(this.amigo=this.router.getCurrentNavigation().extras.state.amigo,console.log(this.amigo))})}ionViewWillEnter(){console.log(this.amigo),this.fotoAmigo="https://graph.facebook.com/"+this.amigo.idfacebook+"/picture?type=large",this.obtenerFecha()}ionViewDidEnter(){this.platform.is("android")?0==this.tourActivo&&(this.IniciarTour(),this.tourActivo=!0):this.platform.is("ios")||(console.log("nada"),0==this.tourActivo&&(this.IniciarTour(),this.tourActivo=!0))}IniciarTour(){this.joyrideService.startTour({steps:["firstStep"],themeColor:"#212f23",showCounter:!1,customTexts:{next:">>",prev:"<<",done:"Ok"}})}ionViewDidLeave(){document.getElementById("volverAmigo").disabled=!1,this.joyrideService.closeTour()}obtenerFecha(){if("2099"!=this.amigo.anionacimiento||"2100"!=this.amigo.anionacimiento)switch(this.amigo.mesnacimiento){case 1:this.fecha=this.amigo.dianacimiento+" de Enero";break;case 2:this.fecha=this.amigo.dianacimiento+" de Febrero";break;case 3:this.fecha=this.amigo.dianacimiento+" de Marzo";break;case 4:this.fecha=this.amigo.dianacimiento+" de Abril";break;case 5:this.fecha=this.amigo.dianacimiento+" de Mayo";break;case 6:this.fecha=this.amigo.dianacimiento+" de Junio";break;case 7:this.fecha=this.amigo.dianacimiento+" de Julio";break;case 8:this.fecha=this.amigo.dianacimiento+" de Agosto";break;case 9:this.fecha=this.amigo.dianacimiento+" de Setiembre";break;case 10:this.fecha=this.amigo.dianacimiento+" de Octubre";break;case 11:this.fecha=this.amigo.dianacimiento+" de Noviembre";break;case 12:this.fecha=this.amigo.dianacimiento+" de Diciembre"}else this.fecha=""}regresar(){document.getElementById("volverAmigo").disabled=!0}buscarBebida(e,n){this.storage.get("latitud").then(o=>{console.log(o),null!=o?this.storage.get("km").then(o=>{this.router.navigate(["busquedaProducto"],{state:{bebida:e,km:o,regalo:n,amigo:this.amigo.nombresusuario}})}).catch(e=>{console.log("no Km")}):this.presentToast()}).catch(e=>{console.log("no hay ubicacion")})}presentToast(){return Object(c.a)(this,void 0,void 0,(function*(){(yield this.toastController.create({message:"Porfavor debe ingresar una direccion",duration:2e3,color:"danger"})).present()}))}}return e.\u0275fac=function(n){return new(n||e)(l.Ib(s.g),l.Ib(d.b),l.Ib(s.a),l.Ib(r.lb),l.Ib(r.mb),l.Ib(g.c),l.Ib(r.sb),l.Ib(r.ib))},e.\u0275cmp=l.Cb({type:e,selectors:[["app-detalleamigo"]],decls:36,vars:9,consts:[[1,"ion-no-border"],["slot","start",2,"color","#f3f2ed"],["id","volverAmigo",3,"click"],[2,"color","#ffff"],[1,"conteiner"],[3,"ratio"],["animation","spinner",1,"user-avatar",3,"src"],[1,"conteiner-nombre"],["id","amigo-nombre",1,"user-nombre"],[1,"conteiner-datos"],["size","auto"],["src","../../assets/Iconos/cumple.svg",2,"margin-left","5px"],[2,"margin-top","7px"],["id","cumple",1,"user-cumplea\xf1os"],[2,"margin-top","10px"],["name","heart","size","large",2,"margin-left","5px"],["joyrideStep","firstStep",1,"favoritas",3,"stepContent","doneTemplate"],[1,"ion-card"],["outline","","color","success",3,"click",4,"ngFor","ngForOf"],["customContent",""],["doneButton",""],["outline","","color","success",3,"click"],["chip",""],["name","gift-outline",2,"color","#ffffff"],[1,"user-bebidas"],[1,"label-tour"],["hidden","",1,"button-tour"]],template:function(e,n){if(1&e&&(l.Mb(0,"ion-header",0),l.Mb(1,"ion-toolbar"),l.Mb(2,"ion-buttons",1),l.Mb(3,"ion-back-button",2),l.Ub("click",(function(){return n.regresar()})),l.Lb(),l.Lb(),l.Mb(4,"ion-title",3),l.uc(5,"Amigo"),l.Lb(),l.Lb(),l.Lb(),l.Mb(6,"ion-content"),l.Jb(7,"div",4),l.Mb(8,"ion-avatar"),l.Mb(9,"app-aspect-ratio",5),l.Jb(10,"app-image-shell",6),l.Lb(),l.Lb(),l.Mb(11,"div",7),l.Mb(12,"ion-label",8),l.uc(13),l.Lb(),l.Lb(),l.Mb(14,"div",9),l.Mb(15,"ion-grid"),l.Mb(16,"ion-row"),l.Mb(17,"ion-col",10),l.Jb(18,"ion-img",11),l.Lb(),l.Mb(19,"ion-col",12),l.Mb(20,"ion-label",13),l.uc(21),l.Lb(),l.Lb(),l.Lb(),l.Mb(22,"ion-row",14),l.Mb(23,"ion-col",10),l.Jb(24,"ion-icon",15),l.Lb(),l.Mb(25,"ion-col",12),l.Mb(26,"ion-label",16),l.uc(27," Tragos Favoritos"),l.Lb(),l.Lb(),l.Lb(),l.Mb(28,"ion-row"),l.Mb(29,"ion-card",17),l.sc(30,h,5,1,"ion-chip",18),l.Lb(),l.Lb(),l.Jb(31,"div"),l.Lb(),l.Lb(),l.sc(32,p,2,1,"ng-template",null,19,l.tc),l.sc(34,m,2,0,"ng-template",null,20,l.tc),l.Lb()),2&e){const e=l.kc(33),o=l.kc(35);l.yb(9),l.ec("ratio",l.hc(8,f)),l.yb(1),l.ec("src",n.fotoAmigo),l.yb(3),l.xc("",n.amigo.nombresusuario," ",n.amigo.apellidosusuario,""),l.yb(8),l.vc(n.fecha),l.yb(5),l.ec("stepContent",e)("doneTemplate",o),l.yb(4),l.ec("ngForOf",n.amigo.bebidas)}},directives:[r.v,r.fb,r.i,r.e,r.f,r.eb,r.q,r.d,b.a,u.a,r.G,r.u,r.Q,r.p,r.x,r.w,g.a,r.j,i.j,r.o,r.h],styles:['@charset "UTF-8";ion-content[_ngcontent-%COMP%]{--background:#121212;--border:none}ion-toolbar[_ngcontent-%COMP%]{--background:#108b3c}.conteiner[_ngcontent-%COMP%]{background:#108b3c;height:15%;border:none}ion-avatar[_ngcontent-%COMP%]{height:120px;width:120px;margin:-20% auto auto}ion-icon[_ngcontent-%COMP%]{color:#fff}.conteiner-nombre[_ngcontent-%COMP%]{text-align:center}.user-nombre[_ngcontent-%COMP%]{font-size:20px;margin:auto;font-family:SF-UI-Display-Black;color:#fff}.user-cumplea\xf1os[_ngcontent-%COMP%]{font-size:16px}.user-bebidas[_ngcontent-%COMP%], .user-cumplea\xf1os[_ngcontent-%COMP%]{margin:auto;font-family:SFUIDisplay-Regular;color:#fff}.user-bebidas[_ngcontent-%COMP%]{font-size:12px}.conteiner-datos[_ngcontent-%COMP%]{margin-top:30px}#cumple[_ngcontent-%COMP%], .favoritas[_ngcontent-%COMP%]{margin-left:10px;margin-top:10px;color:#fff}.favoritas[_ngcontent-%COMP%]{font-size:18px;font-family:SFCompactText-Medium}.favoritas[_ngcontent-%COMP%]   ion-icon[_ngcontent-%COMP%]{width:20px;height:20px}.ion-card[_ngcontent-%COMP%]{box-shadow:none!important;background-color:transparent!important;width:90%;margin:10px auto auto}.ion-card[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%]{color:#f3f2ed;font-size:12px;font-family:SFUIDisplay-Regular;background-color:#108b3c;border-radius:15px}.ion-card[_ngcontent-%COMP%]   ion-chip[_ngcontent-%COMP%]   ion-label[_ngcontent-%COMP%]{color:#fff}@media only screen and (min-device-width:768px) and (max-device-width:1024px){.conteiner[_ngcontent-%COMP%]{background:#108b3c;height:15%;border:none}.conteiner[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:#108b3c}ion-icon[_ngcontent-%COMP%]{height:20px;width:20px}ion-avatar[_ngcontent-%COMP%]{height:150px;width:150px;margin:-10% auto auto}}@media only screen and (min-device-width:768px) and (max-device-width:1024px){.conteiner[_ngcontent-%COMP%]{background:#108b3c;height:15%;border:none}.conteiner[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:#108b3c}ion-icon[_ngcontent-%COMP%]{height:20px;width:20px}ion-avatar[_ngcontent-%COMP%]{height:150px;width:150px;margin:-8% auto auto}}ion-img[_ngcontent-%COMP%]{width:30px;height:30px}.label-tour[_ngcontent-%COMP%]{color:#108b3c;letter-spacing:.25px;font-family:SFCompactText-Medium}.button-tour[_ngcontent-%COMP%]{--background:#108b3c;text-transform:none;--border-radius:10px}',"app-image-shell.user-avatar[_ngcontent-%COMP%]{--image-shell-loading-background:#fff;--image-shell-border-radius:50%;--image-shell-spinner-color:var(--ion-color-dark-shade)}"]}),e})()}];let M=(()=>{class e{}return e.\u0275mod=l.Gb({type:e}),e.\u0275inj=l.Fb({factory:function(n){return new(n||e)},imports:[[s.i.forChild(v)],s.i]}),e})(),y=(()=>{class e{}return e.\u0275mod=l.Gb({type:e}),e.\u0275inj=l.Fb({factory:function(n){return new(n||e)},imports:[[i.c,t.d,r.gb,a.a,g.b.forChild(),M]]}),e})()}}]);