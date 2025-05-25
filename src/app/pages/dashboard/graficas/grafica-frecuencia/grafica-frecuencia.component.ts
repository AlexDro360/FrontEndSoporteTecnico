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
  selector: 'app-grafica-frecuencia',
  templateUrl: './grafica-frecuencia.component.html',
  styleUrls: ['./grafica-frecuencia.component.scss']
})
export class GraficaFrecuenciaComponent {

  @Input() chartHeight: string = '425px';
  @Input() chartHeightNumber: number = 425;
  @Input() cssClass: string = '';
  @Input() nombreLabel: string = '';
  @Input() data: any[] = [];
  @Input() labels: any[] = [];
  chartOptions: any = {};
  hadDelay: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setupCharts();
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['labels']) {
      this.init();
    }
  }

  init() {
    this.chartOptions = getChart2Options(this.chartHeightNumber, this.data, this.labels, this.nombreLabel);
  }

  setupCharts() {
    setTimeout(() => {
      this.hadDelay = true;
      this.init();
      this.cdr.detectChanges();
    }, 100);
  }
}

function getChart2Options(chartHeightNumber: number, data: any, labels: any, nombreLabel: any) {
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
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
          zoom: false
        }
      }
    },
    dataLabels: {
      enabled: false
    },
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
      categories: labels,
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
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
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
      style: {
        fontSize: '16px',
      },
      x: {
        formatter: function (val: string) {
          return nombreLabel + ': ' + val;
        }
      },
      y: {
        formatter: function (val: number) {
          return val + ' solicitudes';
        }
      }
    },
    grid: {
      borderColor: getCSSVariableValue('--bs-border-dashed-color'),
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        right: 20,
      }
    },
    colors: [
      getCSSVariableValue('--bs-primary'),
    ]
  };

  return options;

}
