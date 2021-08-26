!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{zyjd:function(e,o,i){"use strict";i.r(o),i.d(o,"CodigoEmailPageModule",(function(){return C}));var r,a,c=i("ofXK"),u=i("3Pt+"),s=i("TEn/"),l=i("tyNb"),g=i("mrSG"),d=i("fXoL"),b=i("CmMg"),h=["input1"],p=["input2"],f=["input3"],v=["input4"],m=[{path:"",component:(r=function(){function e(t,o,i,r,a,c){var u=this;n(this,e),this.router=t,this.alertController=o,this.route=i,this.platform=r,this.navCtrl=a,this.apiServicio=c,this.code1="",this.code2="",this.code3="",this.code4="",this.eventoPropagacion=!1,this.desctividarContador=!0,this.n=30,this.route.queryParams.subscribe((function(n){u.router.getCurrentNavigation().extras.state&&(u.codigo=u.router.getCurrentNavigation().extras.state.codigo,u.correo=u.router.getCurrentNavigation().extras.state.correo,u.nuevoUsuario=u.router.getCurrentNavigation().extras.state.nuevoUsuario)}))}var o,i,r;return o=e,(i=[{key:"ngOnInit",value:function(){var n=this;window.setInterval((function(){0==n.contador?n.desctividarContador=!1:(n.contador=n.n,n.n--)}),1e3)}},{key:"focusInput1",value:function(){var n=this;String(this.code1).length>0&&(1==String(this.code1).length?this.focusInput2():setTimeout((function(){n.input1.setFocus()}),100))}},{key:"focusInput2",value:function(){var n=this;String(this.code1).length>0?1==String(this.code2).length?this.focusInput3():setTimeout((function(){n.input2.setFocus()}),100):this.focusInput1()}},{key:"focusInput3",value:function(){var n=this;String(this.code1).length>0?1==String(this.code3).length?this.focusInput4():setTimeout((function(){n.input3.setFocus()}),100):this.focusInput1()}},{key:"focusInput4",value:function(){var n=this;String(this.code1).length>0?1==String(this.code4).length?this.compararCodigo():setTimeout((function(){n.input4.setFocus()}),100):this.focusInput1()}},{key:"compararCodigo",value:function(){this.codigo==String(this.code1+this.code2+this.code3+this.code4).toUpperCase()?this.irValidacionFechaNacimieto():this.AlertError()}},{key:"borrarCodigos",value:function(){this.code4="",this.code3="",this.code2="",this.code1=""}},{key:"irValidacionFechaNacimieto",value:function(){this.router.navigate(["validacion-fecha-nacimiento"],{state:{nuevoUsuario:this.nuevoUsuario,tipoRegistro:"email"}})}},{key:"AlertError",value:function(){return Object(g.a)(this,void 0,void 0,regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.alertController.create({cssClass:"my-custom-class",message:"C\xf3digo incorrecto intentelo de nuevo",buttons:["OK"]});case 2:return t=n.sent,n.next=5,t.present();case 5:case"end":return n.stop()}}),n,this)})))}},{key:"enviarCodigo",value:function(){var n=this;this.desctividarContador=!0,this.n=30,this.contador=30,this.borrarCodigos();var t=this.generaCodigo();this.apiServicio.enviarCorreo({email:this.nuevoUsuario.email,content:"<h4>Hola "+this.nuevoUsuario.nombreCompleto+"</h4><p>Este es el c\xf3digo que necesitas para su registro en Bube:</p><h3 style='color:#000'>"+t+"</h3><p>Este correo electr\xf3nico se genera autom\xe1ticamente. Por favor, no respondas a \xe9l. Si necesitas ayuda adicional, por favor, visita el Soporte de Bube.</p>",subject:"C\xf3digo de verificaci\xf3n Bube"}).then((function(e){n.codigo=t,n.alertaCorreoEnviado()})).catch((function(t){n.AlertErrorEnviar(),console.log(t)}))}},{key:"AlertErrorEnviar",value:function(){return Object(g.a)(this,void 0,void 0,regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.alertController.create({cssClass:"my-custom-class",message:"Ocurrio un problema al enviar el correo",buttons:["OK"]});case 2:return t=n.sent,n.next=5,t.present();case 5:case"end":return n.stop()}}),n,this)})))}},{key:"alertaCorreoEnviado",value:function(){return Object(g.a)(this,void 0,void 0,regeneratorRuntime.mark((function n(){var t;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,this.alertController.create({cssClass:"my-custom-class",message:"Su c\xf3digo de recuperaci\xf3n ha sido enviado",buttons:["OK"]});case 2:return t=n.sent,n.next=5,t.present();case 5:case"end":return n.stop()}}),n,this)})))}},{key:"generaCodigo",value:function(){for(var n="",t="0123456789".length,e=0;e<4;e++)n+="0123456789".charAt(Math.floor(Math.random()*t));return n}}])&&t(o.prototype,i),r&&t(o,r),e}(),r.\u0275fac=function(n){return new(n||r)(d.Ib(l.g),d.Ib(s.a),d.Ib(l.a),d.Ib(s.mb),d.Ib(s.lb),d.Ib(b.a))},r.\u0275cmp=d.Cb({type:r,selectors:[["app-codigo-email"]],viewQuery:function(n,t){var e;1&n&&(d.zc(h,!0),d.zc(p,!0),d.zc(f,!0),d.zc(v,!0)),2&n&&(d.jc(e=d.Vb())&&(t.input1=e.first),d.jc(e=d.Vb())&&(t.input2=e.first),d.jc(e=d.Vb())&&(t.input3=e.first),d.jc(e=d.Vb())&&(t.input4=e.first))},decls:36,vars:8,consts:[["no-shadow","","no-border","",1,"ion-no-border"],["no-bounce","",3,"fullscreen"],["src","./assets/Iconos/LogoBube_final.png",1,"img-login"],[2,"width","100%","text-align","center","padding-top","15%"],[1,"label-page"],[2,"width","100%","text-align","center"],["lines","none",1,"input-login"],["type","tel","inputmode","numeric","pattern","[0-9]","maxlength","1",1,"input-text",3,"ngModel","ngModelChange","ionChange"],["input1",""],["input2",""],["input3",""],["input4",""],[2,"width","90%","text-align","right","padding-top","3%"],[1,"button-back-letter",3,"click"],["slot","icon-only","name","backspace-outline"],[2,"width","100%","text-align","center","padding-top","3%"],[1,"label-page2"],[2,"color","#b8b7b7","text-decoration","underline",3,"hidden","click"],[3,"hidden"]],template:function(n,t){1&n&&(d.Jb(0,"ion-header",0),d.Mb(1,"ion-content",1),d.Mb(2,"ion-row"),d.Jb(3,"ion-img",2),d.Lb(),d.Mb(4,"ion-row"),d.Mb(5,"div",3),d.Mb(6,"ion-label"),d.Mb(7,"h2",4),d.Mb(8,"b"),d.uc(9,"Ingresa el c\xf3digo que te hemos enviado a tu correo"),d.Lb(),d.Lb(),d.Lb(),d.Lb(),d.Lb(),d.Mb(10,"ion-row"),d.Mb(11,"div",5),d.Mb(12,"ion-item",6),d.Mb(13,"ion-input",7,8),d.Ub("ngModelChange",(function(n){return t.code1=n}))("ionChange",(function(){return t.focusInput1()})),d.Lb(),d.Mb(15,"ion-input",7,9),d.Ub("ngModelChange",(function(n){return t.code2=n}))("ionChange",(function(){return t.focusInput2()})),d.Lb(),d.Mb(17,"ion-input",7,10),d.Ub("ngModelChange",(function(n){return t.code3=n}))("ionChange",(function(){return t.focusInput3()})),d.Lb(),d.Mb(19,"ion-input",7,11),d.Ub("ngModelChange",(function(n){return t.code4=n}))("ionChange",(function(){return t.focusInput4()})),d.Lb(),d.Lb(),d.Lb(),d.Lb(),d.Mb(21,"ion-row"),d.Mb(22,"div",12),d.Mb(23,"ion-button",13),d.Ub("click",(function(){return t.borrarCodigos()})),d.Jb(24,"ion-icon",14),d.Lb(),d.Lb(),d.Lb(),d.Mb(25,"ion-row"),d.Mb(26,"div",15),d.Mb(27,"ion-label"),d.Mb(28,"h3",16),d.uc(29,"Te hemos enviado un c\xf3digo de seguridad. Si no encuentras el correo en tu bandeja de entrada, revisa la carpeta de Spam o haz clic en "),d.Mb(30,"ion-label",17),d.Ub("click",(function(){return t.enviarCodigo()})),d.uc(31,"volver a enviar "),d.Lb(),d.Mb(32,"ion-label",18),d.uc(33),d.Lb(),d.Lb(),d.Lb(),d.Lb(),d.Lb(),d.Lb(),d.Mb(34,"ion-footer",0),d.Jb(35,"ion-toolbar"),d.Lb()),2&n&&(d.yb(1),d.ec("fullscreen",!0),d.yb(12),d.ec("ngModel",t.code1),d.yb(2),d.ec("ngModel",t.code2),d.yb(2),d.ec("ngModel",t.code3),d.yb(2),d.ec("ngModel",t.code4),d.yb(11),d.ec("hidden",t.desctividarContador),d.yb(2),d.ec("hidden",!t.desctividarContador),d.yb(1),d.wc("Volver a enviar en: ",t.contador,""))},directives:[s.v,s.q,s.Q,s.x,s.G,s.B,s.A,s.rb,u.l,u.e,u.h,u.k,s.h,s.w,s.t,s.fb],styles:["ion-content[_ngcontent-%COMP%]{position:absolute;top:0;--background:#121212}ion-content[_ngcontent-%COMP%]   .label-page[_ngcontent-%COMP%]{font-size:18px;line-height:21px}ion-content[_ngcontent-%COMP%]   .label-page[_ngcontent-%COMP%], ion-content[_ngcontent-%COMP%]   .label-page2[_ngcontent-%COMP%]{color:#fff;padding-left:10%;padding-right:10%;font-family:SFUIDisplay-Regular;font-style:normal;font-weight:500}ion-content[_ngcontent-%COMP%]   .label-page2[_ngcontent-%COMP%]{font-size:16px;line-height:19px}ion-content[_ngcontent-%COMP%]   .input-email[_ngcontent-%COMP%]{margin:10px auto;width:86%;height:50px;--background:transparent!important;border:1.6px solid #c5c3c3;border-radius:8px!important;--highlight-color-focused:none}ion-content[_ngcontent-%COMP%]   .input-email[_ngcontent-%COMP%]   .input-text[_ngcontent-%COMP%], ion-content[_ngcontent-%COMP%]   .label-input[_ngcontent-%COMP%]{color:#fff;font-family:SFUIDisplay-Regular;font-style:Regular;font-weight:400}ion-content[_ngcontent-%COMP%]   .label-input[_ngcontent-%COMP%]{margin-left:7%;padding-top:10%;font-size:16px;line-height:19px}ion-content[_ngcontent-%COMP%]   .button-modal-enviar[_ngcontent-%COMP%]{--background:#708070;--color-activated:#fff;--background-activated:#708070;text-transform:none;--box-shadow:none;width:86%;--border-radius:25px;height:50px}ion-content[_ngcontent-%COMP%]   .label-button-enviar[_ngcontent-%COMP%]{font-family:SFUIDisplay-Regular;font-style:normal;font-weight:500;font-size:20px;line-height:23px;color:#fff}.img-login[_ngcontent-%COMP%]{margin:15% auto auto;width:120px;height:120px}.input-login[_ngcontent-%COMP%]{margin:10px auto 5px;width:86%;height:50px;--background:transparent!important;box-sizing:border-box;border-radius:8px!important;--highlight-color-focused:none}.input-login[_ngcontent-%COMP%]   .input-text[_ngcontent-%COMP%]{color:#fff;font-family:SFUIDisplay-Regular;font-style:Regular;font-size:18px;font-weight:700;margin-left:10px;margin-right:10px;text-align:center;border-bottom:1px solid #108b3c}.button-back-letter[_ngcontent-%COMP%]{--background:transparent!important;--background-activated:transparent!important;--box-shadow:none}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:#fff!important}ion-footer[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:transparent!important}"]}),r)}],C=((a=function t(){n(this,t)}).\u0275mod=d.Gb({type:a}),a.\u0275inj=d.Fb({factory:function(n){return new(n||a)},imports:[[c.c,u.d,s.gb,l.i.forChild(m)]]}),a)}}])}();