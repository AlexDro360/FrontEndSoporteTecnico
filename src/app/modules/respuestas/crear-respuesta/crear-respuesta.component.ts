import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RespuestaService } from '../service/respuesta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-respuesta',
  templateUrl: './crear-respuesta.component.html',
  styleUrls: ['./crear-respuesta.component.scss']
})
export class CrearRespuestaComponent {
  @Output() RespuestaN: EventEmitter<any> = new EventEmitter();
  @Input() idSolicitud: any;
  @Input() tipoServicio: any;
  @Input() tipoMantenimiento: any;
  @Input() user: any;

  isLoading: any;

  asunto: string = '';
  descripcion: string = '';
  nombreAprovo: string = '';
  idTipoMantenimiento: string = '';
  idTipoServicio: string = '';



  constructor(
    
    public modal: NgbActiveModal,
    public respuestaService: RespuestaService,
    public toast: ToastrService,
    
    
  ) {

  }

  ngOnInit(): void {
    console.log(this.user);
  }

  store() {
    if (!this.user.full_name) {
      this.toast.error("Validación", "La persona que aprovo es requerida");
      return false;
    }

    if (!this.asunto) {
      this.toast.error("Validación", "El asunto en requerido");
      return false;
    }

    if (!this.descripcion) {
      this.toast.error("Validación", "La Descripción de la solución es requerida");
      return false;
    }

    if (this.descripcion.length < 15) {
      this.toast.warning("Validación", "Es necesario, mas Descripción de la solución");
      return false;
    }

    if (!this.idTipoServicio) {
      this.toast.error("Validación", "El tipo de servicio es requerido");
      return false;
    }

    if (!this.idTipoMantenimiento) {
      this.toast.error("Validación", "El tipo de mantenimiento es requerido");
      return false;
    }


    let formData = new FormData();
    formData.append('nombreAprovo', this.user.full_name)
    formData.append('asunto', this.asunto);
    formData.append('descripcion', this.descripcion);
    formData.append('idSolicitud', this.idSolicitud);
    formData.append('idTipoMantenimiento', this.idTipoMantenimiento);
    formData.append('idTipoServicio', this.idTipoServicio);

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
