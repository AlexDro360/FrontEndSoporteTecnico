import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigAdicionalesRoutingModule } from './config-adicionales-routing.module';
import { JefesDepartamentoComponent } from './jefes-departamento/jefes-departamento.component';
import { ConfigFolioComponent } from './config-folio/config-folio.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ConfigAdicionalesComponent } from './config-adicionales.component';
import { AgregarJefeComponent } from './agregar-jefe/agregar-jefe.component';
import { EditarJefeComponent } from './editar-jefe/editar-jefe.component';
import { AltaJefeComponent } from './alta-jefe/alta-jefe.component';
import { BajaJefeComponent } from './baja-jefe/baja-jefe.component';
import { ResetSolicitudComponent } from './reset-solicitud/reset-solicitud.component';
import { ResetRespuestaComponent } from './reset-respuesta/reset-respuesta.component';
import { ActualizarRespuestaComponent } from './actualizar-respuesta/actualizar-respuesta.component';
import { ActualizarSolicitudComponent } from './actualizar-solicitud/actualizar-solicitud.component';
import { FolioRespuestaComponent } from './folio-respuesta/folio-respuesta.component';


@NgModule({
  declarations: [
    JefesDepartamentoComponent,
    ConfigFolioComponent,
    ConfigAdicionalesComponent,
    AgregarJefeComponent,
    EditarJefeComponent,
    AltaJefeComponent,
    BajaJefeComponent,
    ResetSolicitudComponent,
    ResetRespuestaComponent,
    ActualizarRespuestaComponent,
    ActualizarSolicitudComponent,
    FolioRespuestaComponent
  ],
  imports: [
    CommonModule,
    ConfigAdicionalesRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
  ]
})
export class ConfigAdicionalesModule { }
