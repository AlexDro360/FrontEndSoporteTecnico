import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RespuestaService } from '../service/respuesta.service';
import { ToastrService } from 'ngx-toastr';
import { min } from 'moment';
import { finalize } from 'rxjs';

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

  isLoading: boolean = false;

  user: any;
  asunto: string = '';
  trabajoRealizado: string = '';
  diagnostico: string = '';
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
    // this.nombreVerifico = this.solicitud.user.full_name;
  }

  reiniciarAlertas() {
    this.estadoA = false;
    this.estadoTS = false;
    this.estadoTM = false;
    this.estadoD = false;
    this.estadoNV = false;
  }

  store() {
    // this.reiniciarAlertas();
    // let error: boolean = false;


    // if (!this.user.full_names) {
    //   // this.toast.error("Validación", "La persona que aprovo es requerida");
    //   // return false;
    //   error = true;
    //   this.estadoNV = true;
    // }

    // if (!this.jefeCC) {
    //   this.toast.error("Validación", "Debe dar de alta a un Jefe de Departamento de Centro de Cómputo");
    //   error = true;
    // }

    // if (!this.asunto) {
    //   // this.toast.error("Validación", "El asunto en requerido");
    //   // return false;
    //   error = true;
    //   this.estadoA = true;
    // }

    // if (!this.descripcion) {
    //   // this.toast.error("Validación", "La Descripción de la solución es requerida");
    //   // return false;
    //   error = true;
    //   this.estadoD = true;
    // }

    // // if (this.descripcion.length < 15) {
    // //   this.toast.warning("Validación", "Es necesario, mas Descripción de la solución");
    // //   return false;
    // // }

    // if (!!this.bitacora && !this.idTipoServicio) {
    //   // this.toast.error("Validación", "El tipo de servicio es requerido");
    //   // return false;
    //   error = true;
    //   this.estadoTS = true;
    // }

    // if (!!this.bitacora && !this.idTipoMantenimiento) {
    //   // this.toast.error("Validación", "El tipo de mantenimiento es requerido");
    //   // return false;
    //   error = true;
    //   this.estadoTM = true;
    // }

    // if (error) {
    //   return false;
    // }

    let formData = new FormData();
    formData.append('nombreVerifico', this.solicitud.user.full_name)
    formData.append('asunto', this.asunto);
    formData.append('descripcion', 'Diagnostico: ' + this.diagnostico + ' - Trabajo Realizado: ' + this.trabajoRealizado);
    formData.append('idCentroComputoJefe', this.jefeCC.id)  
    formData.append('idSolicitud', this.solicitud.id);
    if (!!this.bitacora) {
      formData.append('idTipoMantenimiento', this.idTipoMantenimiento);
      formData.append('idTipoServicio', this.idTipoServicio);
    }

    this.isLoading = true;
    this.respuestaService.crearRespuestas(formData)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (resp) => {
          this.toast.success("Éxito", "Se creó la respuesta correctamente");
          this.RespuestaN.emit(resp);
          this.modal.close();
        },
        error: (err) => {
          console.error('Error al cargar los datos', err);
          this.toast.error('Error al guardar los datos', 'Error');
        }
      })
  }
  configAll() {

    this.respuestaService.tiposMantenimientos().subscribe((resp: any) => {
      this.tipoMantenimiento = resp;
    })
  }
}
