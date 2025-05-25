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
  selector: 'app-grafica-fechas',
  templateUrl: './grafica-fechas.component.html',
  styleUrls: ['./grafica-fechas.component.scss']
})
export class GraficaFechasComponent {

  @Input() chartHeight: string = '425px';
  @Input() chartHeightNumber: number = 425;
  @Input() cssClass: string = '';
  @Input() nombreLabel: string = '';
  @Input() data: any[] = [];
  chartOptions: any = {};
  hadDelay: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setupCharts();
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.init();
    }
  }

  init() {
    this.chartOptions = getChart2Options(this.chartHeightNumber, this.data, this.nombreLabel);
  }

  setupCharts() {
    setTimeout(() => {
      this.hadDelay = true;
      this.init();
      this.cdr.detectChanges();
    }, 100);
  }
}

function getChart2Options(chartHeightNumber: number, data: { x: string; y: number }[], nombreLabel: string) {
  const height = chartHeightNumber;
  const borderColor = getCSSVariableValue('--bs-border-dashed-color');

  const options = {
    series: [{
      name: 'Solicitudes',
      data: data
    }],
    chart: {
      type: 'area',
      height: height,
      toolbar: {
        show: true,
        tools: {
          download: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          zoom: false
        },
        autoSelected: 'pan'
      }
    },
    dataLabels: { enabled: false },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: nombreLabel,
        style: {
          color: getCSSVariableValue('--bs-gray-500'),
          fontSize: '15px',
          fontWeight: 700,
        }
      },
      labels: {
        style: {
          colors: getCSSVariableValue('--bs-gray-500'),
          fontSize: '13px',
        },
        formatter: function (value: string) {
          const date = new Date(value);
          const day = date.getDate().toString().padStart(2, '0');
          const month = date.toLocaleString('default', { month: 'short' });
          const year = date.getFullYear().toString().slice(-2); // Abreviado
          return `${day} ${month} ${year}`;
        }
      },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      title: {
        text: 'Cantidad de solicitudes',
        style: {
          color: getCSSVariableValue('--bs-gray-500'),
          fontSize: '15px',
          fontWeight: 700,
        }
      },
      labels: {
        style: {
          colors: getCSSVariableValue('--bs-gray-500'),
          fontSize: '13px',
        }
      }
    },
    tooltip: {
      style: { fontSize: '16px' },
      x: {
        format: 'dd MMM yyyy'
      },
      y: {
        formatter: function (val: number) {
          return val + ' solicitudes';
        }
      }
    },
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
      padding: { right: 20 }
    },
    colors: [getCSSVariableValue('--bs-primary')]
  };

  return options;
}

