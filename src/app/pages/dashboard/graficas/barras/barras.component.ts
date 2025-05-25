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
  selector: 'app-barras',
  templateUrl: './barras.component.html',
  styleUrls: ['./barras.component.scss']
})
export class BarrasComponent implements OnChanges{

  @Input() chartHeight: string = '425px';
  @Input() chartHeightNumber: number = 425;
  @Input() cssClass: string = '';
  @Input() x: any[] = [];
  @Input() y: any[] = [];
  chart2Options: any = {};
  hadDelay: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setupCharts();
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['x'] || changes['y']) {
      this.init();
    }
  }

  init() {
    this.chart2Options = getChart2Options(this.chartHeightNumber, this.x, this.y);
  }

  setupCharts() {
    setTimeout(() => {
      this.hadDelay = true;
      this.init();
      this.cdr.detectChanges();
    }, 100);
  }
}

function getChart2Options(chartHeightNumber: number, x: any, y: any) {
  const height = chartHeightNumber;
  const borderColor = getCSSVariableValue('--bs-border-dashed-color');

  const options = {
    series: [{
      name: 'Solicitudes',
      data: y
    }],

    chart: {
      type: 'bar',
      height: height
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        barHeight: '80%',
      },
    },
    stroke: {
      show: false,
      width: 0,
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: x,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: true,
        height: 0,
      },
      labels: {
        show: true,
        trim: false,
        style: {
          colors: getCSSVariableValue('--bs-gray-500'),
          fontSize: '13px',
        },
      },
      title: {
        text: 'Cantidad de solicitudes',
        style: {
          color: getCSSVariableValue('--bs-gray-500'),
          fontSize: '15px',
          fontWeight: 700,
        }
      },
    },
    yaxis: {
      // tickAmount: 7,
      // min: 0,
      // max: 700
      title: {
        text: 'Departamento',
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
      },
    },
    tooltip: {
      style: {
        fontSize: '16px',
      },
      x: {
        formatter: function (val: string) {
          return 'Departamento: ' + val;
        },
      },
      y: {
        formatter: function (val: string) {
          return '' + val + '';
        },
      }
    },
    crosshairs: {
      show: true,
      position: 'front',
      stroke: {
        color: getCSSVariableValue('--bs-border-dashed-color'),
        width: 1,
        dashArray: 0,
      },
    },
    colors: [
      getCSSVariableValue('--bs-primary'),
      getCSSVariableValue('--bs-success'),
      getCSSVariableValue('--bs-warning'),
      getCSSVariableValue('--bs-danger'),
      getCSSVariableValue('--bs-info'),
      '#43CED7',
    ],
    fill: {
      opacity: 1,
    },
    markers: {
      strokeWidth: 0,
    },
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      padding: {
        right: 20,
      },
      xaxis: {
        lines: {
          show: true 
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
  };
  return options;
}
