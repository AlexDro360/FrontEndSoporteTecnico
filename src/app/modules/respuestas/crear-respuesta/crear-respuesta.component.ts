import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RespuestaService } from '../service/respuesta.service';
import { ToastrService } from 'ngx-toastr';
import { min } from 'moment';

@Component({
  selector: 'app-crear-respuesta',
  templateUrl: './crear-respuesta.component.html',
  styleUrls: ['./crear-respuesta.component.scss']
})
export class CrearRespuestaComponent {
  @Output() RespuestaN: EventEmitter<any> = new EventEmitter();
  @Input() solicitud: any;
  @Input() tipoServicio: any;
  @Input() tipoMantenimiento: any;
  @Input() bitacora: any = "";
  @Input() jefeCC: any = "";

  isLoading: any;

  user: any;
  asunto: string = '';
  descripcion: string = '';
  nombreVerifico: string = '';
  idTipoMantenimiento: string = '';
  idTipoServicio: string = '';
  horas: number = 0;
  minutos: number = 0;

  estadoD: boolean = false;
  estadoA: boolean = false;
  estadoTS: boolean = false;
  estadoTM: boolean = false;
  estadoNV: boolean = false;

  constructor(
    public modal: NgbActiveModal,
    public respuestaService: RespuestaService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    const userString = localStorage.getItem('user');
    this.user = userString ? JSON.parse(userString) : null;
    this.horas = Math.floor(this.bitacora.duracion / 60);
    this.minutos = this.bitacora.duracion % 60;

    console.log(this.jefeCC);
  }

  reiniciarAlertas() {
    this.estadoA = false;
    this.estadoTS = false;
    this.estadoTM = false;
    this.estadoD = false;
    this.estadoNV = false;
  }

  store() {
    this.reiniciarAlertas();
    let error: boolean = false;


    if (!this.user.full_names) {
      // this.toast.error("Validación", "La persona que aprovo es requerida");
      // return false;
      error = true;
      this.estadoNV = true;
    }

    if (!this.jefeCC) {
      this.toast.error("Validación", "Debe dar de alta a un Jefe de Departamento de Centro de Cómputo");
      error = true;
    }

    if (!this.asunto) {
      // this.toast.error("Validación", "El asunto en requerido");
      // return false;
      error = true;
      this.estadoA = true;
    }

    if (!this.descripcion) {
      // this.toast.error("Validación", "La Descripción de la solución es requerida");
      // return false;
      error = true;
      this.estadoD = true;
    }

    // if (this.descripcion.length < 15) {
    //   this.toast.warning("Validación", "Es necesario, mas Descripción de la solución");
    //   return false;
    // }

    if (!!this.bitacora) {
      // this.toast.error("Validación", "El tipo de servicio es requerido");
      // return false;
      error = true;
      this.estadoTS = true;
    }

    if (!!this.bitacora) {
      // this.toast.error("Validación", "El tipo de mantenimiento es requerido");
      // return false;
      error = true;
      this.estadoTM = true;
    }

    if (error) {
      return false;
    }

    let formData = new FormData();
    formData.append('nombreVerifico', this.user.full_names)
    formData.append('asunto', this.asunto);
    formData.append('descripcion', this.descripcion);
    formData.append('idCentroComputoJefe', this.jefeCC.id)
    formData.append('idSolicitud', this.solicitud.id);
    if (!!this.bitacora) {
      formData.append('idTipoMantenimiento', this.idTipoMantenimiento);
      formData.append('idTipoServicio', this.idTipoServicio);
    }


    this.respuestaService.crearRespuestas(formData).subscribe({
      next: (resp) => {
        this.toast.success("Éxito", "Se creó la respuesta correctamente");
        this.RespuestaN.emit(resp);
        this.modal.close();
      },
      error: (err) => {
        console.log(err);
        console.error('Error al cargar los datos', err);
        this.toast.error('Error al guardar los datos', 'Error');
      }
    })
  }
  configAll() {

    this.respuestaService.tiposMantenimientos().subscribe((resp: any) => {
      console.log(resp);
      console.log("resso");
      this.tipoMantenimiento = resp;
    })


    // forkJoin({
    //   // tipoServicio: this.respuestaService.tiposServicios(),
    //   tipoMantenimiento: this.respuestaService.tiposMantenimientos()
    // }).subscribe({
    //   next: (result) => {
    //     // this.tipoServicio = result.tipoServicio;
    //     this.tipoMantenimiento = result.tipoMantenimiento;
    //   },
    //   error: (err) => {
    //     console.error('Error al cargar los datos', err);
    //     this.toast.error('Error al obtener datos de configuración', 'Error');
    //   }
    // });
  }
}
