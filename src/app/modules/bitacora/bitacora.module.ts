import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BitacoraComponent } from './bitacora.component';
import { CrearBitacoraComponent } from './crear-bitacora/crear-bitacora.component';
import { ListBitacoraComponent } from './list-bitacora/list-bitacora.component';
import { EditarBitacoraComponent } from './editar-bitacora/editar-bitacora.component';
import { BorrarBitacoraComponent } from './borrar-bitacora/borrar-bitacora.component';
import { BitacoraRoutingModule } from './bitacora-routing.module';
import { VerBitacoraComponent } from './ver-bitacora/ver-bitacora.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InlineSVGModule } from 'ng-inline-svg-2';


@NgModule({
  declarations: [
    BitacoraComponent,
    CrearBitacoraComponent,
    ListBitacoraComponent,
    EditarBitacoraComponent,
    BorrarBitacoraComponent,
    VerBitacoraComponent,
  ],
  imports: [
    CommonModule,
    BitacoraRoutingModule,

    HttpClientModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    InlineSVGModule,
    NgbModalModule,
    NgbPaginationModule,
  ]
})

export class BitacoraModule { }

