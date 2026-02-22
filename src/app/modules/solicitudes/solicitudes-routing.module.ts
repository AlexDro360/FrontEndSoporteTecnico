import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudesComponent } from './solicitudes.component';
import { ListSolicitudComponent } from './list-solicitud/list-solicitud.component';
import { PlaneacionListComponent } from './planeacion-list/planeacion-list.component';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesComponent,
    children:[
      {
        path: 'list',
        component: ListSolicitudComponent
      },
      {
        path: 'expedientes-cerrados',
        component: PlaneacionListComponent
      },
      {
        path: '', 
        redirectTo: 'list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudesRoutingModule { }
