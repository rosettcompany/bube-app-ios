(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{zyjd:function(t,n,o){"use strict";o.r(n),o.d(n,"CodigoEmailPageModule",(function(){return p}));var e=o("ofXK"),i=o("3Pt+"),r=o("TEn/"),a=o("tyNb"),c=o("mrSG"),s=o("fXoL"),u=o("CmMg");const l=["input1"],d=["input2"],g=["input3"],h=["input4"],b=[{path:"",component:(()=>{class t{constructor(t,n,o,e,i,r){this.router=t,this.alertController=n,this.route=o,this.platform=e,this.navCtrl=i,this.apiServicio=r,this.code1="",this.code2="",this.code3="",this.code4="",this.eventoPropagacion=!1,this.desctividarContador=!0,this.n=30,this.route.queryParams.subscribe(t=>{this.router.getCurrentNavigation().extras.state&&(this.codigo=this.router.getCurrentNavigation().extras.state.codigo,this.correo=this.router.getCurrentNavigation().extras.state.correo,this.nuevoUsuario=this.router.getCurrentNavigation().extras.state.nuevoUsuario)})}ngOnInit(){let t=this;window.setInterval((function(){0==t.contador?t.desctividarContador=!1:(t.contador=t.n,t.n--)}),1e3)}focusInput1(){String(this.code1).length>0&&(1==String(this.code1).length?this.focusInput2():setTimeout(()=>{this.input1.setFocus()},100))}focusInput2(){String(this.code1).length>0?1==String(this.code2).length?this.focusInput3():setTimeout(()=>{this.input2.setFocus()},100):this.focusInput1()}focusInput3(){String(this.code1).length>0?1==String(this.code3).length?this.focusInput4():setTimeout(()=>{this.input3.setFocus()},100):this.focusInput1()}focusInput4(){String(this.code1).length>0?1==String(this.code4).length?this.compararCodigo():setTimeout(()=>{this.input4.setFocus()},100):this.focusInput1()}compararCodigo(){this.codigo==String(this.code1+this.code2+this.code3+this.code4).toUpperCase()?this.irValidacionFechaNacimieto():this.AlertError()}borrarCodigos(){this.code4="",this.code3="",this.code2="",this.code1=""}irValidacionFechaNacimieto(){this.router.navigate(["validacion-fecha-nacimiento"],{state:{nuevoUsuario:this.nuevoUsuario,tipoRegistro:"email"}})}AlertError(){return Object(c.a)(this,void 0,void 0,(function*(){const t=yield this.alertController.create({cssClass:"my-custom-class",message:"C\xf3digo incorrecto intentelo de nuevo",buttons:["OK"]});yield t.present()}))}enviarCodigo(){this.desctividarContador=!0,this.n=30,this.contador=30,this.borrarCodigos();let t=this.generaCodigo();this.apiServicio.enviarCorreo({email:this.nuevoUsuario.email,content:"<h4>Hola "+this.nuevoUsuario.nombreCompleto+"</h4><p>Este es el c\xf3digo que necesitas para su registro en Bube:</p><h3 style='color:#000'>"+t+"</h3><p>Este correo electr\xf3nico se genera autom\xe1ticamente. Por favor, no respondas a \xe9l. Si necesitas ayuda adicional, por favor, visita el Soporte de Bube.</p>",subject:"C\xf3digo de verificaci\xf3n Bube"}).then(n=>{this.codigo=t,this.alertaCorreoEnviado()}).catch(t=>{this.AlertErrorEnviar(),console.log(t)})}AlertErrorEnviar(){return Object(c.a)(this,void 0,void 0,(function*(){const t=yield this.alertController.create({cssClass:"my-custom-class",message:"Ocurrio un problema al enviar el correo",buttons:["OK"]});yield t.present()}))}alertaCorreoEnviado(){return Object(c.a)(this,void 0,void 0,(function*(){const t=yield this.alertController.create({cssClass:"my-custom-class",message:"Su c\xf3digo de recuperaci\xf3n ha sido enviado",buttons:["OK"]});yield t.present()}))}generaCodigo(){let t="";const n="0123456789".length;for(let o=0;o<4;o++)t+="0123456789".charAt(Math.floor(Math.random()*n));return t}}return t.\u0275fac=function(n){return new(n||t)(s.Ib(a.g),s.Ib(r.a),s.Ib(a.a),s.Ib(r.mb),s.Ib(r.lb),s.Ib(u.a))},t.\u0275cmp=s.Cb({type:t,selectors:[["app-codigo-email"]],viewQuery:function(t,n){var o;1&t&&(s.zc(l,!0),s.zc(d,!0),s.zc(g,!0),s.zc(h,!0)),2&t&&(s.jc(o=s.Vb())&&(n.input1=o.first),s.jc(o=s.Vb())&&(n.input2=o.first),s.jc(o=s.Vb())&&(n.input3=o.first),s.jc(o=s.Vb())&&(n.input4=o.first))},decls:36,vars:8,consts:[["no-shadow","","no-border","",1,"ion-no-border"],["no-bounce","",3,"fullscreen"],["src","./assets/Iconos/LogoBube_final.png",1,"img-login"],[2,"width","100%","text-align","center","padding-top","15%"],[1,"label-page"],[2,"width","100%","text-align","center"],["lines","none",1,"input-login"],["type","tel","inputmode","numeric","pattern","[0-9]","maxlength","1",1,"input-text",3,"ngModel","ngModelChange","ionChange"],["input1",""],["input2",""],["input3",""],["input4",""],[2,"width","90%","text-align","right","padding-top","3%"],[1,"button-back-letter",3,"click"],["slot","icon-only","name","backspace-outline"],[2,"width","100%","text-align","center","padding-top","3%"],[1,"label-page2"],[2,"color","#b8b7b7","text-decoration","underline",3,"hidden","click"],[3,"hidden"]],template:function(t,n){1&t&&(s.Jb(0,"ion-header",0),s.Mb(1,"ion-content",1),s.Mb(2,"ion-row"),s.Jb(3,"ion-img",2),s.Lb(),s.Mb(4,"ion-row"),s.Mb(5,"div",3),s.Mb(6,"ion-label"),s.Mb(7,"h2",4),s.Mb(8,"b"),s.uc(9,"Ingresa el c\xf3digo que te hemos enviado a tu correo"),s.Lb(),s.Lb(),s.Lb(),s.Lb(),s.Lb(),s.Mb(10,"ion-row"),s.Mb(11,"div",5),s.Mb(12,"ion-item",6),s.Mb(13,"ion-input",7,8),s.Ub("ngModelChange",(function(t){return n.code1=t}))("ionChange",(function(){return n.focusInput1()})),s.Lb(),s.Mb(15,"ion-input",7,9),s.Ub("ngModelChange",(function(t){return n.code2=t}))("ionChange",(function(){return n.focusInput2()})),s.Lb(),s.Mb(17,"ion-input",7,10),s.Ub("ngModelChange",(function(t){return n.code3=t}))("ionChange",(function(){return n.focusInput3()})),s.Lb(),s.Mb(19,"ion-input",7,11),s.Ub("ngModelChange",(function(t){return n.code4=t}))("ionChange",(function(){return n.focusInput4()})),s.Lb(),s.Lb(),s.Lb(),s.Lb(),s.Mb(21,"ion-row"),s.Mb(22,"div",12),s.Mb(23,"ion-button",13),s.Ub("click",(function(){return n.borrarCodigos()})),s.Jb(24,"ion-icon",14),s.Lb(),s.Lb(),s.Lb(),s.Mb(25,"ion-row"),s.Mb(26,"div",15),s.Mb(27,"ion-label"),s.Mb(28,"h3",16),s.uc(29,"Te hemos enviado un c\xf3digo de seguridad. Si no encuentras el correo en tu bandeja de entrada, revisa la carpeta de Spam o haz clic en "),s.Mb(30,"ion-label",17),s.Ub("click",(function(){return n.enviarCodigo()})),s.uc(31,"volver a enviar "),s.Lb(),s.Mb(32,"ion-label",18),s.uc(33),s.Lb(),s.Lb(),s.Lb(),s.Lb(),s.Lb(),s.Lb(),s.Mb(34,"ion-footer",0),s.Jb(35,"ion-toolbar"),s.Lb()),2&t&&(s.yb(1),s.ec("fullscreen",!0),s.yb(12),s.ec("ngModel",n.code1),s.yb(2),s.ec("ngModel",n.code2),s.yb(2),s.ec("ngModel",n.code3),s.yb(2),s.ec("ngModel",n.code4),s.yb(11),s.ec("hidden",n.desctividarContador),s.yb(2),s.ec("hidden",!n.desctividarContador),s.yb(1),s.wc("Volver a enviar en: ",n.contador,""))},directives:[r.v,r.q,r.Q,r.x,r.G,r.B,r.A,r.rb,i.l,i.e,i.h,i.k,r.h,r.w,r.t,r.fb],styles:["ion-content[_ngcontent-%COMP%]{position:absolute;top:0;--background:#121212}ion-content[_ngcontent-%COMP%]   .label-page[_ngcontent-%COMP%]{font-size:18px;line-height:21px}ion-content[_ngcontent-%COMP%]   .label-page[_ngcontent-%COMP%], ion-content[_ngcontent-%COMP%]   .label-page2[_ngcontent-%COMP%]{color:#fff;padding-left:10%;padding-right:10%;font-family:SFUIDisplay-Regular;font-style:normal;font-weight:500}ion-content[_ngcontent-%COMP%]   .label-page2[_ngcontent-%COMP%]{font-size:16px;line-height:19px}ion-content[_ngcontent-%COMP%]   .input-email[_ngcontent-%COMP%]{margin:10px auto;width:86%;height:50px;--background:transparent!important;border:1.6px solid #c5c3c3;border-radius:8px!important;--highlight-color-focused:none}ion-content[_ngcontent-%COMP%]   .input-email[_ngcontent-%COMP%]   .input-text[_ngcontent-%COMP%], ion-content[_ngcontent-%COMP%]   .label-input[_ngcontent-%COMP%]{color:#fff;font-family:SFUIDisplay-Regular;font-style:Regular;font-weight:400}ion-content[_ngcontent-%COMP%]   .label-input[_ngcontent-%COMP%]{margin-left:7%;padding-top:10%;font-size:16px;line-height:19px}ion-content[_ngcontent-%COMP%]   .button-modal-enviar[_ngcontent-%COMP%]{--background:#708070;--color-activated:#fff;--background-activated:#708070;text-transform:none;--box-shadow:none;width:86%;--border-radius:25px;height:50px}ion-content[_ngcontent-%COMP%]   .label-button-enviar[_ngcontent-%COMP%]{font-family:SFUIDisplay-Regular;font-style:normal;font-weight:500;font-size:20px;line-height:23px;color:#fff}.img-login[_ngcontent-%COMP%]{margin:15% auto auto;width:120px;height:120px}.input-login[_ngcontent-%COMP%]{margin:10px auto 5px;width:86%;height:50px;--background:transparent!important;box-sizing:border-box;border-radius:8px!important;--highlight-color-focused:none}.input-login[_ngcontent-%COMP%]   .input-text[_ngcontent-%COMP%]{color:#fff;font-family:SFUIDisplay-Regular;font-style:Regular;font-size:18px;font-weight:700;margin-left:10px;margin-right:10px;text-align:center;border-bottom:1px solid #108b3c}.button-back-letter[_ngcontent-%COMP%]{--background:transparent!important;--background-activated:transparent!important;--box-shadow:none}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:#fff!important}ion-footer[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--background:transparent!important}"]}),t})()}];let p=(()=>{class t{}return t.\u0275mod=s.Gb({type:t}),t.\u0275inj=s.Fb({factory:function(n){return new(n||t)},imports:[[e.c,i.d,r.gb,a.i.forChild(b)]]}),t})()}}]);