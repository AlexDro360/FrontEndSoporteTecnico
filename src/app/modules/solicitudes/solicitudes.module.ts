import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudesRoutingModule } from './solicitudes-routing.module';
import { CreateSolicitudComponent } from './create-solicitud/create-solicitud.component';
import { EditSolicitudComponent } from './edit-solicitud/edit-solicitud.component';
import { DeleteSolicitudComponent } from './delete-solicitud/delete-solicitud.component';
import { ListSolicitudComponent } from './list-solicitud/list-solicitud.component';
import { SolicitudesComponent } from './solicitudes.component';
import { AsignarPersonalComponent } from '../atender-solicitud/asignar-personal/asignar-personal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { VerSolicitudComponent } from './ver-solicitud/ver-solicitud.component';
import { RechazarSolicitudComponent } from './rechazar-solicitud/rechazar-solicitud.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearRespuestaComponent } from '../respuestas/crear-respuesta/crear-respuesta.component';
import { VerRespuestaComponent } from '../respuestas/ver-respuesta/ver-respuesta.component';


@NgModule({
  declarations: [
    CreateSolicitudComponent,
    EditSolicitudComponent,
    DeleteSolicitudComponent,
    ListSolicitudComponent,
    SolicitudesComponent,
    AsignarPersonalComponent,
    VerSolicitudComponent,
    RechazarSolicitudComponent,
    CrearRespuestaComponent,
    VerRespuestaComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    SolicitudesRoutingModule,
    
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
  ]
})
export class SolicitudesModule { }
