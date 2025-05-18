import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisSolicitudesRoutingModule } from './mis-solicitudes-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { SharedModule } from 'src/app/shared/shared.module';
import { MisSolicitudesComponent } from './mis-solicitudes.component';
import { ListSolicitudComponent } from './list-solicitud/list-solicitud.component';
import { VerSolicitudComponent } from './ver-solicitud/ver-solicitud.component';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';


@NgModule({
  declarations: [
    MisSolicitudesComponent,
    ListSolicitudComponent,
    VerSolicitudComponent,
    CrearSolicitudComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    MisSolicitudesRoutingModule,

    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
  ]
})
export class MisSolicitudesModule { }
