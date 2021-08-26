import { Component} from '@angular/core';
import { Router ,NavigationExtras, ActivatedRoute} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-modal-carrito',
  templateUrl: './modal-carrito.page.html',
  styleUrls: ['./modal-carrito.page.scss',
              './modal-carrito.responsive.scss',
             './modal-carrito.shell.scss'],
})
export class ModalCarritoPage {
  bebidasCarrito:any = [];

  establecimientosCoincidencia:any;
  buttonDisabled = 'false';
 
  total;
  num_bebidas;

  spinner = true;

  constructor(
    private modalControler: ModalController,
    public route: ActivatedRoute,
    private storage:Storage,
    private router: Router ) {
      
     
  }



  ionViewWillEnter(): void { 
    this.storage.get('carrito')
    .then(car =>{
       
      this.spinner = false;
      this.bebidasCarrito=car;
      console.log(this.bebidasCarrito);        
      this.calcularTotal();

    });
  }

  calcularTotal(){
    var subtotal=0;
    console.log("bebias")
    console.log(this.bebidasCarrito);
    this.num_bebidas = this.bebidasCarrito.bebidas.length;
    this.storage.set('num_bebidas',this.num_bebidas);

    if(this.num_bebidas == 0){
      this.buttonDisabled = 'true';
    }

    for(let bebida of this.bebidasCarrito.bebidas){
      subtotal += bebida.cantidad*bebida.preciobebidasocio;
    }
    console.log(subtotal);
    this.total=subtotal.toFixed(2);
    this.storage.set('total',this.total);
    console.log(this.bebidasCarrito);
  }

  cerrarModal(){
    this.modalControler.dismiss(0);
  }

  mas(index: number) {
    this.bebidasCarrito.bebidas[index].cantidad += 1;
    this.calcularTotal();
  }


  menos(index: number) {
    
    if(this.bebidasCarrito.bebidas[index].cantidad==1){
      this.bebidasCarrito.bebidas.splice(index,1);
      // this.bebidas=this.bebidas;
      this.calcularTotal();
    }else{
      this.bebidasCarrito.bebidas[index].cantidad -= 1;
      console.log(this.bebidasCarrito);
      this.calcularTotal();
    }
  }

  metodosPago(){
    
    console.log(this.bebidasCarrito);

    let datos = {
        carrito:this.bebidasCarrito,
        establecimientosCoincidencia:this.establecimientosCoincidencia
      }
    
    //this.router.navigate(['tarjetas'],navigationExtras);
    this.modalControler.dismiss(datos);
  }


  
}
