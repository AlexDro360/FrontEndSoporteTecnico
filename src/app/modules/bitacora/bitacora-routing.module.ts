import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BitacoraComponent } from './bitacora.component';
import { ListBitacoraComponent } from './list-bitacora/list-bitacora.component';

const routes: Routes = [
  {
      path: '',
      component: BitacoraComponent,
      children:[
        {
          path: 'list',
          component: ListBitacoraComponent
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BitacoraRoutingModule { }