import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalConfig, ModalComponent } from '../../_metronic/partials';
import { DashboardServiceService } from './service/dashboard.service.service';

const mesesES: { [key: string]: string } = {
  January: 'Enero',
  February: 'Febrero',
  March: 'Marzo',
  April: 'Abril',
  May: 'Mayo',
  June: 'Junio',
  July: 'Julio',
  August: 'Agosto',
  September: 'Septiembre',
  October: 'Octubre',
  November: 'Noviembre',
  December: 'Diciembre'
};

const diasES: { [key: string]: string } = {
  Sunday: 'Domingo',
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'Miércoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sábado'
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})

export class DashboardComponent implements OnInit {
  datos: any;
  filtro: any;
  filtroDep: string = '';
  filtroTipo: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  fechaInvalida: boolean = false;
  btnEstado: boolean = false;
  cargando: boolean = true;

  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel'
  };
  @ViewChild('modal') private modalComponent: ModalComponent;
  constructor(
    public dashboardService: DashboardServiceService,
    private cdr: ChangeDetectorRef,
  ) { }

  validarFechas() {

    const desde = new Date(this.fechaInicio);
    const hasta = new Date(this.fechaFin);
    this.fechaInvalida = desde > hasta;
    this.btnEstado = desde > hasta;
    if (this.fechaInvalida) {
      setTimeout(() => {
        this.fechaInvalida = false;
        this.cdr.detectChanges();
      }, 3000);
    }
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  ngOnInit(): void {
    this.getFiltro();
    this.getDatos();
  }


  getFiltro() {
    this.dashboardService.getFiltro().subscribe((resp: any) => {
      this.filtro = resp;
    });
  }

  getDatos() {
    this.validarFechas();
    if (this.fechaInvalida) {
      return null
    }

    this.cargando = true;
    const filtros = {
      idDepartamento: this.filtroDep,
      idTipo: this.filtroTipo,
      fechaInicio: this.fechaInicio,
      fechaFin: this.fechaFin,
    };

    this.dashboardService.getDatos(filtros).subscribe((resp: any) => {
      resp.mes.mes = resp.mes.mes.map((mes: string) => mesesES[mes] || mes);
      resp.dia.dia = resp.dia.dia.map((dia: string) => diasES[dia] || dia);
      this.datos = resp;
      this.cargando = false;
      this.cdr.detectChanges();
    })
  }
}
