import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { getCSSVariableValue } from 'src/app/_metronic/kt/_utils';

@Component({
  selector: 'app-grafica-tipo-soli',
  templateUrl: './grafica-tipo-soli.component.html',
  styleUrls: ['./grafica-tipo-soli.component.scss']
})
export class GraficaTipoSoliComponent implements OnInit, OnChanges {

  @ViewChild('weekChart') weekChart: ElementRef<HTMLDivElement>;
  @ViewChild('monthChart') monthChart: ElementRef<HTMLDivElement>;

  @Input() chartHeight: string = '425px';
  @Input() chartHeightNumber: number = 425;
  @Input() cssClass: string = '';
  @Input() categorias: any[] = [];
  @Input() datos: any[] = [];

  chart2Options: any = {};
  hadDelay: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setupCharts();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categorias'] || changes['datos']) {
      this.chart2Options = getChart2Options(this.chartHeightNumber, this.categorias, this.datos);
      this.cdr.detectChanges(); // 🔄 fuerza redibujo
    }
  }

  setupCharts() {
    setTimeout(() => {
      this.hadDelay = true;
      this.chart2Options = getChart2Options(this.chartHeightNumber, this.categorias, this.datos);
      this.cdr.detectChanges();
    }, 100);
  }
}

function getChart2Options(chartHeightNumber: number, categorias: any, datos: any) {
  const height = chartHeightNumber;
  const borderColor = getCSSVariableValue('--bs-border-dashed-color');

  const options = {
    series: datos,
    chart: {
      type: 'pie',
      height: height,
      toolbar: {
        show: true,
        tools: {
          download: true
        }
      }
    },
    labels: categorias,
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '20px',
        fontWeight: 'bold',
      },
    },
    tooltip: {
      style: {
        fontSize: '16px'
      },
      y: {
        formatter: function (val: number) {
          return `${val} solicitudes`;
        }
      }
    },
    colors: [
      getCSSVariableValue('--bs-primary'),
      getCSSVariableValue('--bs-success'),
      getCSSVariableValue('--bs-warning'),
      getCSSVariableValue('--bs-danger'),
      getCSSVariableValue('--bs-info'),
      '#43CED7',
    ],
    legend: {
      show: true,
      position: 'bottom',
      labels: {
        colors: getCSSVariableValue('--bs-gray-500'),
        useSeriesColors: false,
      },
      fontSize: '14px',
      fontWeight: 600,
    },

    fill: {
      opacity: 1
    },

  };

  return options;
}
