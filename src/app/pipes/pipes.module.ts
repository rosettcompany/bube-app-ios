import { NgModule } from '@angular/core';
import { FiltroamigoPipe } from './filtroamigo.pipe';


@NgModule({
  declarations: [FiltroamigoPipe],
  exports:[FiltroamigoPipe]
})
export class PipesModule { }
