import { Component} from '@angular/core';
import { MenuController, ModalController } from '@ionic/angular';
import { ApiServiceService} from '../../api-service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-inicio',
  templateUrl: './filtrarCategorias.page.html',
  styleUrls: [
    './styles/filtrarCategorias.page.scss'
  ]
})
export class filtrarCategoriasPage{
    
constructor(public menu: MenuController,
             public storage: Storage,
            private modalCtrl:ModalController, 
             public apiService:ApiServiceService,) { } 

       input:any;
       categoria:any;
       establecimiento:any;

       subcategorias: any;
      // Disable side menu for this page
  ionViewDidEnter(): void {
    this.menu.enable(false);
  }

  ngOnInit() {
    console.log(this.categoria);
    if(this.input != null){
      this.getSubCategoriasPrincipal();
    }else{
      if(this.categoria != null){
        this.getSubCategoriasCategoria();
      }else{
        if(this.establecimiento != null){
          this.getSubCategoriasEstablecimiento();
        }
      }
    }
    
  }
  // Restore to default when leaving this page
  ionViewDidLeave(): void {
    this.menu.enable(true);
  }

  closeModal(){
    this.modalCtrl.dismiss(0);
  }


getSubCategoriasPrincipal(){
    this.apiService.getSubCategoriasPrincipal(this.input)
    .subscribe(
      (data) => {
           this.subcategorias = data;
      },(error) =>{
      console.error(error);
    });
}

getSubCategoriasCategoria(){
  this.apiService.getSubCategoriasCategoria(this.categoria)
  .subscribe(
    (data) => {
         this.subcategorias = data;
         console.log(this.subcategorias);
    },(error) =>{
    console.error(error);
  });
}

getSubCategoriasEstablecimiento(){
  this.apiService.getSubCategoriasEstablecimiento(this.establecimiento)
  .subscribe(
    (data) => {
         this.subcategorias = data;
    },(error) =>{
    console.error(error);
  });
}


clickCategoria(item){
  let idsubcategoria = item.idsubcategoria;
  let subcategoria = 'AND D.idsubcategoria IN('+idsubcategoria+')';
  let filtroSubCategoria = {subcategoria: subcategoria};
  this.storage.set('subcategoria',item);
  this.modalCtrl.dismiss(filtroSubCategoria);
}

}