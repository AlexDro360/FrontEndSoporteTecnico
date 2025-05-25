import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { ModalsModule, WidgetsModule } from '../../_metronic/partials';
import { CantidadesComponent } from './cartas/cantidades/cantidades.component';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { BarrasComponent } from './graficas/barras/barras.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { GraficaTipoSoliComponent } from './graficas/grafica-tipo-soli/grafica-tipo-soli.component';
import { FormsModule } from '@angular/forms';
import { GraficaFrecuenciaComponent } from './graficas/grafica-frecuencia/grafica-frecuencia.component';
import { GraficaFechasComponent } from './graficas/grafica-fechas/grafica-fechas.component';


@NgModule({
  declarations: [DashboardComponent, CantidadesComponent, BarrasComponent, GraficaTipoSoliComponent, GraficaFrecuenciaComponent, GraficaFechasComponent],
  imports: [
    SharedModule,
    NgApexchartsModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
    WidgetsModule,
    ModalsModule,
  ],
})
export class DashboardModule {}
