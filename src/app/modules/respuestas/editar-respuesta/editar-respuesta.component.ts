import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RespuestaService } from '../service/respuesta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-respuesta',
  templateUrl: './editar-respuesta.component.html',
  styleUrls: ['./editar-respuesta.component.scss']
})
export class EditarRespuestaComponent {

  @Output() RespuestaA: EventEmitter<any> = new EventEmitter();
  @Input() tipoServicio: any;
  @Input() tipoMantenimiento: any;
  @Input() respuesta: any;

  isLoading: any;

  constructor(

    public modal: NgbActiveModal,
    public respuestaService: RespuestaService,
    public toast: ToastrService,


  ) {

  }

  ngOnInit(): void {
  }

  update() {
    if (!this.respuesta.nombreAprovo) {
      this.toast.error("Validación", "La persona que aprovo es requerida");
      return false;
    }

    if (!this.respuesta.asunto) {
      this.toast.error("Validación", "El asunto en requerido");
      return false;
    }

    if (!this.respuesta.descripcion) {
      this.toast.error("Validación", "La Descripción de la solución es requerida");
      return false;
    }

    if (this.respuesta.descripcion.length < 15) {
      this.toast.warning("Validación", "Es necesario, mas Descripción de la solución");
      return false;
    }

    if (!this.respuesta.idTipoServicio) {
      this.toast.error("Validación", "El tipo de servicio es requerido");
      return false;
    }

    if (!this.respuesta.idTipoMantenimiento) {
      this.toast.error("Validación", "El tipo de mantenimiento es requerido");
      return false;
    }

    this.respuestaService.editarRespuesta(this.respuesta).subscribe({
      next: (resp) => {
        this.toast.success("Éxito", "Se Actualizo la respuesta correctamente");
        this.RespuestaA.emit(resp);
        this.modal.close();
      },
      error: (err) => {
        console.log(err);
        console.error('Error al cargar los datos', err);
        this.toast.error('Error al actualizar los datos', 'Error');
      }
    })
  }
  configAll() {
  }
}
