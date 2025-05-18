import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisSolicitudesComponent } from './mis-solicitudes.component';
import { ListSolicitudComponent } from './list-solicitud/list-solicitud.component';

const routes: Routes = [
  {
      path: '',
      component: MisSolicitudesComponent,
      children:[
        {
          path: 'list',
          component: ListSolicitudComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisSolicitudesRoutingModule { }
