import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitudesComponent } from './solicitudes.component';
import { ListSolicitudComponent } from './list-solicitud/list-solicitud.component';
import { PlaneacionListComponent } from './planeacion-list/planeacion-list.component';
import { AuthGuard } from '../auth/services/auth.guard';
import { PermissionGuard } from 'src/app/guards/permission.guard';

const routes: Routes = [
  {
    path: '',
    component: SolicitudesComponent,
    children: [
      {
        path: 'list',
        component: ListSolicitudComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: { permission: 'view_solicitud' }
      },
      {
        path: 'expedientes-cerrados',
        component: PlaneacionListComponent,
        canActivate: [AuthGuard, PermissionGuard],
        data: { permission: 'view_closed_tickets' }
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
