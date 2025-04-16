import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudesComponent } from './solicitudes.component';
import { ListSolicitudComponent } from './list-solicitud/list-solicitud.component';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesComponent,
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
export class SolicitudesRoutingModule { }
