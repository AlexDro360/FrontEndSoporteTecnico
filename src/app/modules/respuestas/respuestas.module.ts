import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RespuestasComponent } from './respuestas.component';
import { CrearRespuestaComponent } from './crear-respuesta/crear-respuesta.component';
import { ListRespuestaComponent } from './list-respuesta/list-respuesta.component';
import { EditarRespuestaComponent } from './editar-respuesta/editar-respuesta.component';
import { BorrarRespuestaComponent } from './borrar-respuesta/borrar-respuesta.component';
import { RespuestasRoutingModule } from './respuestas-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { VerRespuestaComponent } from './ver-respuesta/ver-respuesta.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    RespuestasComponent,
    // CrearRespuestaComponent,
    ListRespuestaComponent,
    EditarRespuestaComponent,
    BorrarRespuestaComponent,
    VerRespuestaComponent,
  ],
  imports: [
    SharedModule,
    CommonModule,
    RespuestasRoutingModule,

    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
  ]
})

export class RespuestasModule { }
