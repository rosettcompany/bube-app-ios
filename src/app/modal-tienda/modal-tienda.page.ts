import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-modal-tienda',
  templateUrl: './modal-tienda.page.html',
  styleUrls: ['./modal-tienda.page.scss',
              './modal-tienda.responsive.scss',
              './modal-tienda.shell.scss'],
})
export class ModalTiendaPage implements OnInit {

    bebidas = [];
    datos:any=[];
    total;
    num_bebidas;
    buttonDisabled = 'false';
    estado_dia;

    constructor(private modalControler: ModalController,private apiServicio:ApiServiceService) { 
     
    }
  
    ngOnInit() {
     
    }
    
    ionViewWillEnter(): void {
      
      if(this.datos.estadosocio == 2){
        this.buttonDisabled = 'true';
        let texto = document.getElementById('texto_nodisponible') as HTMLParagraphElement;
        texto.textContent = "Actualmente este establecimiento no cuenta con opción de compra con Bube";
        texto.hidden = false;
      }else{
        if(this.estado_dia == 0){
          this.buttonDisabled = 'true';
          let texto = document.getElementById('texto_nodisponible') as HTMLParagraphElement;
          texto.textContent = "Cerrado por Hoy";
          texto.hidden = false;
        }
      }
      this.calcularTotal();
      console.log(this.datos);
    }
  
    cerrarModal(){
      this.modalControler.dismiss(null);
    }
  
    mas(index: number) {
      this.bebidas[index].cantidad += 1;
      this.calcularTotal();
    }
  
    menos(index: number) {
      console.log(this.bebidas);
      if(this.bebidas[index].cantidad==1){
        this.bebidas.splice(index,1);
        // this.bebidas=this.bebidas;
        this.calcularTotal();
      }else{
        this.bebidas[index].cantidad -= 1;
        console.log(this.bebidas);
        this.calcularTotal();
      }
    }

    calcularTotal(){

      this.bebidas=this.datos.bebidas;
      var subtotal=0;
      this.num_bebidas = this.bebidas.length;

      if(this.num_bebidas == 0){
        this.buttonDisabled = 'true';
      }
      for(let bebida of this.bebidas){
        subtotal += bebida.cantidad*bebida.preciobebidasocio;
      }
      console.log(subtotal);
      this.total=subtotal.toFixed(2);
    }


    agregarAlcarrito(){

      this.apiServicio.getStorage('idusuario')
        .then(id =>{
          console.log(id);
          for(let dato of this.datos.bebidas){
            var carrito ={"idbebida": dato.idbebida,"idusuario":id,"idsocio":dato.idsociocomercial,"cantidadcompra":1,"estadocompra":1,"preciobebida":dato.preciobebidasocio};
            this.apiServicio.PostCarrito(carrito)
             .then(res =>{
               console.log(res);
             })
             .catch(er =>{
              console.log(er);
               console.log("no se guardo");
             });
            }
        })
        .catch(e =>{
          console.log("no hay idusuario guardado");
        });
     
     this.modalControler.dismiss(
       this.datos
     );

    }
}
