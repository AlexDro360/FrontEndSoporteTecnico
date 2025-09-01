import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BienvenidoComponent } from './bienvenido.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    BienvenidoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: BienvenidoComponent,
      },
    ]),
  ]
})

export class BienvenidoModule { }
