import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigAdicionalesComponent } from './config-adicionales.component';
import { JefesDepartamentoComponent } from './jefes-departamento/jefes-departamento.component';
import { ConfigFolioComponent } from './config-folio/config-folio.component';

const routes: Routes = [
  {
        path: '',
        component: ConfigAdicionalesComponent,
        // children:[
        //   {
        //     path: 'list-jefes-departamento',
        //     component: JefesDepartamentoComponent
        //   },
        //   {
        //     path: 'config-folio',
        //     component: ConfigFolioComponent
        //   }
        // ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigAdicionalesRoutingModule { }
