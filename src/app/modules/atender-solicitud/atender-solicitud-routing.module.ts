import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtenderSolicitudComponent } from './atender-solicitud.component';

const routes: Routes = [
  {
      path: '',
      component: AtenderSolicitudComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtenderSolicitudRoutingModule {

  
 }
