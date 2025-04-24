import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RespuestasComponent } from './respuestas.component';
import { ListRespuestaComponent } from './list-respuesta/list-respuesta.component';

const routes: Routes = [
  {
      path: '',
      component: RespuestasComponent,
      children:[
        {
          path: 'list',
          component: ListRespuestaComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RespuestasRoutingModule { }
