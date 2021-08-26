import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroamigo'
})
export class FiltroamigoPipe implements PipeTransform {

  transform(arreglo: any[], texto: String): any[] {

    if(texto === ''){
      return arreglo;
    }

    texto = texto.toLowerCase();

    return arreglo.filter( item =>{
     return item.nombresusuario.toLowerCase()
            .includes( texto );
    });


    
  }

}
