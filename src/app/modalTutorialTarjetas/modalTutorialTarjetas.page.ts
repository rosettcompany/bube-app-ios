import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalTutorialTarjetas',
  templateUrl: './modalTutorialTarjetas.page.html',
  styleUrls: ['./modalTutorialTarjetas.page.scss'],
})
export class ModalTutorialTarjetasPage implements OnInit {
pagina;
editar;
eliminar;



  constructor(
    private modalController: ModalController
    ) { }

  ngOnInit() {
  }

  ionViewDidEnter(): void {
    let spinner = document.getElementById('spinner') as HTMLDivElement;
    let conteiner = document.getElementById('contenedor') as HTMLDivElement;

   if(this.pagina == 1){
     spinner.style.display='none';
     conteiner.style.display='block';
    this.editar = "../../assets/Tour/tutotarjetaDE.JPG";
    this.eliminar = "../../assets/Tour/tutotarjetaIZ.JPG";
   
   }else{
    spinner.style.display='none';
    conteiner.style.display='block';
    this.editar = "../../assets/Tour/tutotarjetaDE2.JPG";
    this.eliminar = "../../assets/Tour/tutotarjetaIZ2.JPG";
    
   }
  }

  cerrarModaL(){
    this.modalController.dismiss();
  }

}