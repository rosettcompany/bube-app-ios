!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var i=0;i<t.length;i++){var o=t[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function i(n,i,o){return i&&t(n.prototype,i),o&&t(n,o),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"2gss":function(t,o,e){"use strict";e.d(o,"a",(function(){return g}));var a=e("fXoL"),r=e("ofXK"),l=e("Kt/9"),c=e("TEn/");function s(n,t){1&n&&a.cc(0,0,["*ngIf","_display === 'cover'"])}var d=["*"],g=function(){var t=function(){function t(i){n(this,t),this.platformId=i,this.debugDisplay=!(!l.a.settings||!l.a.settings.debug)&&l.a.settings.debug,this._src="",this._alt="",this._display="",this.imageLoaded=!1}return i(t,[{key:"_imageLoaded",value:function(){this.imageLoaded=!0,"cover"===this._display&&(this.backgroundImage="url("+this._src+")")}},{key:"display",set:function(n){this._display=null!=n?n:""},get:function(){return this._display}},{key:"src",set:function(n){this.debugDisplay||(this._src=null!=n?n:""),"cover"===this._display&&(this.backgroundImage="unset"),this.imageLoaded=!!Object(r.s)(this.platformId)}},{key:"alt",set:function(n){this._alt=null!=n?n:""}}]),t}();return t.\u0275fac=function(n){return new(n||t)(a.Ib(a.B))},t.\u0275cmp=a.Cb({type:t,selectors:[["app-image-shell"]],hostVars:5,hostBindings:function(n,t){2&n&&(a.zb("display",t.display),a.rc("background-image",t.backgroundImage),a.Ab("img-loaded",t.imageLoaded))},inputs:{display:"display",src:"src",alt:"alt"},ngContentSelectors:d,decls:3,vars:3,consts:[[1,"spinner"],[1,"inner-img",3,"src","alt","load"],[4,"ngIf"]],template:function(n,t){1&n&&(a.dc(),a.Jb(0,"ion-spinner",0),a.Mb(1,"img",1),a.Ub("load",(function(){return t._imageLoaded()})),a.Lb(),a.sc(2,s,1,0,"ng-content",2)),2&n&&(a.yb(1),a.ec("src",t._src,a.nc)("alt",t._alt),a.yb(1),a.ec("ngIf","cover"===t._display))},directives:[c.Z,r.k],styles:['[_nghost-%COMP%]{--image-shell-loading-background:#eee;--image-shell-border-radius:0px;display:block;position:relative;height:100%;border-radius:var(--image-shell-border-radius);transition:all .3s ease-in-out;z-index:2}[_nghost-%COMP%] > .spinner[_ngcontent-%COMP%]{display:none}[_nghost-%COMP%]:before{content:"";background:var(--image-shell-loading-background);border-radius:var(--image-shell-border-radius);position:absolute;top:0;bottom:0;left:0;right:0}[_nghost-%COMP%]:not([display=cover]){width:100%;overflow:hidden}[_nghost-%COMP%]:not([display=cover]) > .inner-img[_ngcontent-%COMP%]{transition:visibility 0s linear,opacity .5s linear;opacity:0;visibility:hidden;width:100%;height:100%;border-radius:var(--image-shell-border-radius)}[_nghost-%COMP%]:not([display=cover]).img-loaded:before{display:none}[_nghost-%COMP%]:not([display=cover]).img-loaded > .inner-img[_ngcontent-%COMP%]{opacity:1;visibility:visible}[display=cover][_nghost-%COMP%]{background-size:cover;background-repeat:no-repeat}[display=cover][_nghost-%COMP%]:before, [display=cover][_nghost-%COMP%] > .spinner[_ngcontent-%COMP%]{z-index:-1}[display=cover][_nghost-%COMP%] > .inner-img[_ngcontent-%COMP%]{display:none;visibility:hidden}[display=cover].img-loaded[_nghost-%COMP%]:before{display:none}[animation=gradient][_nghost-%COMP%]{--image-shell-loading-background:#eee;--image-shell-animation-color:#ddd}[animation=gradient][_nghost-%COMP%]:before{background:linear-gradient(90deg,var(--image-shell-loading-background) 8%,var(--image-shell-animation-color) 18%,var(--image-shell-loading-background) 33%);background-size:800px 104px;-webkit-animation:animateBackground 2s ease-in-out infinite;animation:animateBackground 2s ease-in-out infinite}[animation=gradient].img-loaded[_nghost-%COMP%]:before{background:none;-webkit-animation:0;animation:0}@-webkit-keyframes animateBackground{0%{background-position:-468px 0}to{background-position:468px 0}}@keyframes animateBackground{0%{background-position:-468px 0}to{background-position:468px 0}}[animation=spinner][_nghost-%COMP%]{--image-shell-spinner-size:28px;--image-shell-spinner-color:#ccc}[animation=spinner][_nghost-%COMP%] > .spinner[_ngcontent-%COMP%]{display:block;position:absolute;top:calc(50% - calc(var(--image-shell-spinner-size) / 2));left:calc(50% - calc(var(--image-shell-spinner-size) / 2));width:var(--image-shell-spinner-size);height:var(--image-shell-spinner-size);font-size:var(--image-shell-spinner-size);line-height:var(--image-shell-spinner-size);color:var(--image-shell-spinner-color)}[animation=spinner].img-loaded[_nghost-%COMP%] > .spinner[_ngcontent-%COMP%]{display:none;visibility:hidden}.add-overlay[_nghost-%COMP%]{--image-shell-overlay-background:rgba(0,0,0,0.4)}.add-overlay.img-loaded[_nghost-%COMP%]:before{display:block;background:var(--image-shell-overlay-background)}']}),t}()},B7gC:function(t,o,e){"use strict";e.d(o,"a",(function(){return l}));var a=e("fXoL"),r=["*"],l=function(){var t=function(){function t(){n(this,t),this.ratioPadding="0px"}return i(t,[{key:"ratio",set:function(n){this.ratioPadding="0px 0px "+(n=null!=n?n:{w:1,h:1}).h/n.w*100+"% 0px"}}]),t}();return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=a.Cb({type:t,selectors:[["app-aspect-ratio"]],hostVars:2,hostBindings:function(n,t){2&n&&a.rc("padding",t.ratioPadding)},inputs:{ratio:"ratio"},ngContentSelectors:r,decls:2,vars:0,consts:[[1,"content-wrapper"]],template:function(n,t){1&n&&(a.dc(),a.Mb(0,"div",0),a.cc(1),a.Lb())},styles:["[_nghost-%COMP%]{display:block;overflow:hidden;position:relative;width:100%}[_nghost-%COMP%]   .content-wrapper[_ngcontent-%COMP%]{position:absolute;top:0;bottom:0;left:0;right:0}"]}),t}()},"Kt/9":function(t,o,e){"use strict";e.d(o,"a",(function(){return c}));var a=e("fXoL"),r=e("vkgz"),l=e("tk/3"),c=function(){var t=function(){function t(i){n(this,t),this.http=i}return i(t,[{key:"load",value:function(){var n="./assets/config/app-shell.config"+(Object(a.U)()?"":".prod")+".json";return this.http.get(n).pipe(Object(r.a)((function(n){t.settings=n}))).toPromise().catch((function(t){console.log("Could not load file '".concat(n,"'"),t)}))}}]),t}();return t.\u0275fac=function(n){return new(n||t)(a.Qb(l.a))},t.\u0275prov=a.Eb({token:t,factory:t.\u0275fac,providedIn:"root"}),t}()},fE2E:function(t,o,e){"use strict";e.r(o),e.d(o,"WalkthroughPageModule",(function(){return v}));var a,r,l=e("ofXK"),c=e("3Pt+"),s=e("tyNb"),d=e("TEn/"),g=e("j1ZV"),b=e("fXoL"),u=e("54vc"),p=e("B7gC"),h=e("2gss"),f=function(){return{w:915,h:849}},M=function(){return["/login"]},m=[{path:"",component:(a=function(){function t(i,o,e){n(this,t),this.menu=i,this.splashScreen=o,this.platform=e,this.slidesOptions={zoom:{toggle:!1}},this.isFirstSlide=!0,this.isLastSlide=!1}return i(t,[{key:"ionViewDidEnter",value:function(){this.menu.enable(!1)}},{key:"ionViewDidLeave",value:function(){this.menu.enable(!0)}},{key:"ngAfterViewInit",value:function(){var n=this;this.slides.isBeginning().then((function(t){n.isFirstSlide=t})),this.slides.isEnd().then((function(t){n.isLastSlide=t})),this.slides.ionSlideWillChange.subscribe((function(t){n.slides.isBeginning().then((function(t){n.isFirstSlide=t})),n.slides.isEnd().then((function(t){n.isLastSlide=t}))})),this.splashScreen.hide()}},{key:"skipWalkthrough",value:function(){var n=this;this.slides.length().then((function(t){n.slides.slideTo(t)}))}},{key:"skipPage",value:function(){var n=this;this.slides.length().then((function(t){n.slides.slideTo(1)}))}},{key:"skipPage2",value:function(){var n=this;this.slides.length().then((function(t){n.slides.slideTo(2)}))}},{key:"backPage",value:function(){var n=this;this.slides.length().then((function(t){n.slides.slideTo(0)}))}},{key:"skipPage3",value:function(){var n=this;this.slides.length().then((function(t){n.slides.slideTo(3)}))}},{key:"backPage2",value:function(){var n=this;this.slides.length().then((function(t){n.slides.slideTo(1)}))}}]),t}(),a.\u0275fac=function(n){return new(n||a)(b.Ib(d.jb),b.Ib(u.a),b.Ib(d.mb))},a.\u0275cmp=b.Cb({type:a,selectors:[["app-walkthrough"]],viewQuery:function(n,t){var i;1&n&&b.pc(d.Y,!0),2&n&&b.jc(i=b.Vb())&&(t.slides=i.first)},hostVars:4,hostBindings:function(n,t){2&n&&b.Ab("first-slide-active",t.isFirstSlide)("last-slide-active",t.isLastSlide)},decls:91,vars:15,consts:[[1,"ion-no-border"],["slot","end"],["fill","clear",1,"skip-walkthrough-button",3,"click"],[1,"font-button"],["pager","true",1,"walkthrough-slides",3,"options"],[1,"first-slide","illustration-and-decoration-slide"],[1,"slide-inner-row"],[1,"font-tittle"],[1,"illustration-col"],[3,"ratio"],["animation","spinner",1,"illustration-image",2,"max-width","100%","min-height","100%",3,"src","alt"],[1,"info-wrapper"],[1,"info-title"],[2,"height","40%"],[1,"call-to-actions-wrapper"],["expand","block","color","transparent",1,"get-started-button",3,"click"],[1,"second-slide","illustration-and-decoration-slide"],["expand","block","color","transparent",1,"get-started-button","font-button",3,"click"],[1,"last-slide","illustration-and-decoration-slide"],["animation","spinner",1,"illustration-image",3,"src","alt"],["expand","block",1,"button-aplicar",2,"width","80%","margin","auto",3,"routerLink"]],template:function(n,t){1&n&&(b.Mb(0,"ion-header",0),b.Mb(1,"ion-toolbar"),b.Mb(2,"ion-buttons",1),b.Mb(3,"ion-button",2),b.Ub("click",(function(){return t.skipWalkthrough()})),b.Mb(4,"ion-label",3),b.uc(5,"Saltar"),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Mb(6,"ion-content"),b.Mb(7,"ion-slides",4),b.Mb(8,"ion-slide",5),b.Mb(9,"ion-row",6),b.Mb(10,"div"),b.Mb(11,"h1",7),b.Mb(12,"b"),b.uc(13,"BUSCA Y"),b.Jb(14,"br"),b.uc(15," COMPARA"),b.Lb(),b.Lb(),b.Lb(),b.Mb(16,"ion-col",8),b.Mb(17,"app-aspect-ratio",9),b.Jb(18,"app-image-shell",10),b.Lb(),b.Lb(),b.Mb(19,"ion-row"),b.Mb(20,"div",11),b.Mb(21,"p",12),b.uc(22,"PRECIOS DE TUS"),b.Jb(23,"br"),b.uc(24," BEBIDAS EN"),b.Jb(25,"br"),b.uc(26," DIFERENTES ESTABLECIMIENTOS"),b.Lb(),b.Lb(),b.Lb(),b.Mb(27,"ion-col"),b.Jb(28,"ion-row",13),b.Mb(29,"ion-row"),b.Jb(30,"ion-col",14),b.Mb(31,"ion-col",14),b.Mb(32,"ion-button",15),b.Ub("click",(function(){return t.skipPage()})),b.Mb(33,"ion-label",3),b.uc(34,"Siguiente"),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Mb(35,"ion-slide",16),b.Mb(36,"ion-row",6),b.Mb(37,"div"),b.Mb(38,"h1",7),b.Mb(39,"b"),b.uc(40,"CONECTA Y "),b.Jb(41,"br"),b.uc(42," COMPARTE"),b.Lb(),b.Lb(),b.Lb(),b.Mb(43,"ion-col",8),b.Mb(44,"app-aspect-ratio",9),b.Jb(45,"app-image-shell",10),b.Lb(),b.Lb(),b.Mb(46,"ion-row"),b.Mb(47,"div",11),b.Mb(48,"p",12),b.uc(49,"CON LOS GUSTOS Y PREFERENCIAS"),b.Jb(50,"br"),b.uc(51,"DE TUS PERSONAS"),b.Jb(52,"br"),b.uc(53,"FAVORITAS"),b.Lb(),b.Lb(),b.Lb(),b.Mb(54,"ion-col"),b.Jb(55,"ion-row",13),b.Mb(56,"ion-row"),b.Mb(57,"ion-col",14),b.Mb(58,"ion-button",17),b.Ub("click",(function(){return t.backPage()})),b.Mb(59,"ion-label",3),b.uc(60,"Anterior"),b.Lb(),b.Lb(),b.Lb(),b.Mb(61,"ion-col",14),b.Mb(62,"ion-button",17),b.Ub("click",(function(){return t.skipPage2()})),b.Mb(63,"ion-label",3),b.uc(64,"Siguiente"),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Mb(65,"ion-slide",18),b.Mb(66,"ion-row",6),b.Mb(67,"div"),b.Mb(68,"h1",7),b.Mb(69,"b"),b.uc(70,"AHORRA Y "),b.Jb(71,"br"),b.uc(72," DISFRUTA"),b.Lb(),b.Lb(),b.Lb(),b.Mb(73,"ion-col",8),b.Mb(74,"app-aspect-ratio",9),b.Jb(75,"app-image-shell",19),b.Lb(),b.Lb(),b.Mb(76,"ion-row"),b.Mb(77,"div",11),b.Mb(78,"p",12),b.uc(79,"CON UN FILTRO HECHO"),b.Jb(80,"br"),b.uc(81,"A LA MEDIDA PARA QUE ENCUENTRES"),b.Jb(82,"br"),b.uc(83," TU BEBIDA FAVORITA"),b.Lb(),b.Lb(),b.Lb(),b.Mb(84,"ion-col"),b.Jb(85,"ion-row",13),b.Mb(86,"ion-row"),b.Mb(87,"ion-col"),b.Mb(88,"ion-button",20),b.Mb(89,"ion-label",3),b.uc(90,"Aplicar"),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb(),b.Lb()),2&n&&(b.yb(7),b.ec("options",t.slidesOptions),b.yb(10),b.ec("ratio",b.hc(11,f)),b.yb(1),b.ec("src","./assets/Onboarding/Onboarding_1.png")("alt","walkthrough"),b.yb(26),b.ec("ratio",b.hc(12,f)),b.yb(1),b.ec("src","./assets/Onboarding/Onboarding_2.png")("alt","walkthrough"),b.yb(29),b.ec("ratio",b.hc(13,f)),b.yb(1),b.ec("src","./assets/Onboarding/Onboarding_3.png")("alt","walkthrough"),b.yb(13),b.ec("routerLink",b.hc(14,M)))},directives:[d.v,d.fb,d.i,d.h,d.G,d.q,d.Y,d.X,d.Q,d.p,p.a,h.a,d.pb,s.h],styles:["[_nghost-%COMP%]{--page-margin:var(--app-broad-margin);--page-background:var(--app-background);--page-swiper-pagination-space:40px;--page-swiper-pagination-height:18px;--page-pagination-bullet-size:10px;--page-first-slide-background:#121212;--page-second-slide-background:#121212;--page-third-slide-background:#121212;--page-last-slide-background:#121212;--button-color-transparent:transparent;--page-vector-decoration-fill:var(--ion-color-light-shade)}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]{--ion-toolbar-background:transparent}ion-header[_ngcontent-%COMP%]   ion-toolbar[_ngcontent-%COMP%]   ion-button[_ngcontent-%COMP%]{--color:#f3f2ed;text-transform:none}ion-content[_ngcontent-%COMP%]{position:absolute;top:0}ion-button[_ngcontent-%COMP%]{--color:#f3f2ed;text-transform:none;--box-shadow:none!important}.walkthrough-slides[_ngcontent-%COMP%]{--bullet-background:var(--ion-color-dark);--bullet-background-active:var(--ion-color-dark);height:100%}.walkthrough-slides[_ngcontent-%COMP%]   .slide-inner-row[_ngcontent-%COMP%]{height:100%;width:100%;padding:0;padding-top:var(--app-header-height);border-bottom:var(--page-swiper-pagination-space) solid transparent;background-clip:padding-box;background-color:var(--page-vector-decoration-fill)}.walkthrough-slides[_ngcontent-%COMP%]   .slide-inner-row[_ngcontent-%COMP%]   .font-tittle[_ngcontent-%COMP%]{font-family:Gotham-Back-Regular;color:#ffc30b;font-size:36px}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .slide-inner-row[_ngcontent-%COMP%]{--ion-grid-column-padding:0px;flex-flow:column;justify-content:flex-start;align-items:center}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{flex-grow:0;flex-shrink:0;min-height:auto;min-height:-webkit-fit-content;min-height:-moz-fit-content;min-height:fit-content;max-width:30vh;padding:0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{flex-grow:0;flex-shrink:1;min-height:12vh;transform:translateZ(0)}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]   .vector-decoration[_ngcontent-%COMP%]{fill:currentColor;color:var(--page-vector-decoration-fill);background-color:var(--page-background);padding-bottom:4px;transform:translateZ(0);shape-rendering:geometricprecision;height:calc(100% + 1px)}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]{flex-grow:1;flex-shrink:0;min-height:auto;background-color:#121212;margin-bottom:-1px;transform:translateZ(0)}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .info-wrapper[_ngcontent-%COMP%]{margin:calc(var(--page-margin) * -1) var(--page-margin) 0;text-align:left}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .info-wrapper[_ngcontent-%COMP%]   .info-paragraph[_ngcontent-%COMP%]{color:var(--ion-color-medium-shade);font-size:14px;margin:0 0 calc(var(--page-margin) / 2)}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .info-wrapper[_ngcontent-%COMP%]   .info-paragraph[_ngcontent-%COMP%]:last-child{margin-bottom:0}.info-title[_ngcontent-%COMP%]{margin:4%;margin-bottom:var(--page-margin);color:#f3f2ed;font-family:Gotham-Bold;font-size:20px}.first-slide[_ngcontent-%COMP%]{--page-vector-decoration-fill:var(--page-first-slide-background)}.button-aplicar[_ngcontent-%COMP%]{--background:var(--ion-color-botonNuevo);--border-radius:40px;--color:#f3f2ed}.second-slide[_ngcontent-%COMP%]{--page-vector-decoration-fill:var(--page-second-slide-background)}.third-slide[_ngcontent-%COMP%]{--page-vector-decoration-fill:var(--page-third-slide-background)}.last-slide[_ngcontent-%COMP%]{--page-vector-decoration-fill:var(--page-last-slide-background)}.last-slide[_ngcontent-%COMP%]   .slide-inner-row[_ngcontent-%COMP%]{border-width:0}.last-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]{padding:var(--page-margin)}.last-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .info-outer[_ngcontent-%COMP%]{height:100%;align-items:flex-end;flex-direction:column}.last-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .info-outer[_ngcontent-%COMP%]   .info-wrapper[_ngcontent-%COMP%]{margin:calc(var(--page-margin) * -1) 0 0}.last-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .info-outer[_ngcontent-%COMP%]   .call-to-actions-wrapper[_ngcontent-%COMP%]{max-height:-webkit-fit-content;max-height:-moz-fit-content;max-height:fit-content}.last-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .get-started-button[_ngcontent-%COMP%]{visibility:hidden;margin:0}.last-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .background-button[_ngcontent-%COMP%]{--color:var(--ion-color-lightest)}.last-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .alt-call-to-action-row[_ngcontent-%COMP%]{padding-top:5px;align-items:center;justify-content:space-evenly}.last-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .alt-call-to-action-row[_ngcontent-%COMP%]   .cta-leading-text[_ngcontent-%COMP%]{color:var(--ion-color-medium);font-size:16px}.last-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .alt-call-to-action-row[_ngcontent-%COMP%]   .login-button[_ngcontent-%COMP%]{--color:var(--ion-color-secondary);margin:0}.font-button[_ngcontent-%COMP%]{font-family:SFCompactText-Medium;color:#f3f2ed}.last-slide-active[_nghost-%COMP%]     .walkthrough-slides .swiper-pagination{display:none}.last-slide-active[_nghost-%COMP%]   .skip-walkthrough-button[_ngcontent-%COMP%]{visibility:hidden;text-transform:none}[_nghost-%COMP%]     .walkthrough-slides{background-color:#121212}[_nghost-%COMP%]     .walkthrough-slides .swiper-pagination{height:var(--page-swiper-pagination-height);line-height:1;background-color:#121212;bottom:calc((var(--page-swiper-pagination-space) - var(--page-swiper-pagination-height)) / 2)}[_nghost-%COMP%]     .walkthrough-slides .swiper-pagination .swiper-pagination-bullet{background-color:#108b3c;width:var(--page-pagination-bullet-size);height:var(--page-pagination-bullet-size)}","app-image-shell.illustration-image[_ngcontent-%COMP%]{--image-shell-loading-background:transparent;--image-shell-spinner-color:var(--ion-color-lightest)}","@media only screen and (min-device-width:320px) and (max-device-width:480px) and (-webkit-min-device-pixel-ratio:2) and (device-aspect-ratio:2/3){.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{max-width:30vh;padding:0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{min-height:12vh}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .info-wrapper[_ngcontent-%COMP%]   .info-title[_ngcontent-%COMP%]{margin-bottom:calc(var(--page-margin) / 2);font-size:20px}}@media only screen and (min-device-width:320px) and (max-device-width:568px) and (-webkit-min-device-pixel-ratio:2) and (device-aspect-ratio:40/71){.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{max-width:32vh;padding:0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{min-height:12vh}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .info-col[_ngcontent-%COMP%]   .info-wrapper[_ngcontent-%COMP%]   .info-title[_ngcontent-%COMP%]{margin-bottom:calc(var(--page-margin) / 2);font-size:20px}}@media only screen and (min-device-width:375px) and (max-device-width:667px) and (-webkit-min-device-pixel-ratio:2){.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{max-width:36vh;padding:2vh 0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{min-height:14vh}}@media only screen and (min-device-width:375px) and (max-device-width:812px) and (-webkit-min-device-pixel-ratio:3){.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{max-width:34vh;padding:6vh 0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{min-height:12vh}}@media only screen and (min-device-width:414px) and (max-device-width:736px) and (-webkit-min-device-pixel-ratio:3){.illustration-and-decoration-slide[_ngcontent-%COMP%]   .illustration-col[_ngcontent-%COMP%]{max-width:38vh;padding:4vh 0}.illustration-and-decoration-slide[_ngcontent-%COMP%]   .decoration-col[_ngcontent-%COMP%]{min-height:14vh}}"]}),a)}],v=((r=function t(){n(this,t)}).\u0275mod=b.Gb({type:r}),r.\u0275inj=b.Fb({factory:function(n){return new(n||r)},imports:[[l.c,c.d,d.gb,s.i.forChild(m),g.a]]}),r)},j1ZV:function(t,i,o){"use strict";o.d(i,"a",(function(){return u}));var e,a,r=o("ofXK"),l=o("3Pt+"),c=o("TEn/"),s=o("fXoL"),d=o("tk/3"),g=o("Kt/9"),b=((a=function t(){n(this,t)}).\u0275mod=s.Gb({type:a}),a.\u0275inj=s.Fb({factory:function(n){return new(n||a)},providers:[{provide:s.d,useFactory:function(n){return function(){return n.load()}},deps:[g.a],multi:!0}],imports:[[r.c,d.b,c.gb]]}),a),u=((e=function t(){n(this,t)}).\u0275mod=s.Gb({type:e}),e.\u0275inj=s.Fb({factory:function(n){return new(n||e)},imports:[[r.c,l.d,b,c.gb],b]}),e)}}])}();