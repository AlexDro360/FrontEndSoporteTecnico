import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SolicitudService } from '../service/solicitud.service';
import { CrearRespuestaComponent } from '../../respuestas/crear-respuesta/crear-respuesta.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-rechazar-solicitud',
  templateUrl: './rechazar-solicitud.component.html',
  styleUrls: ['./rechazar-solicitud.component.scss']
})
export class RechazarSolicitudComponent {

  @Output() SolicitudR: EventEmitter<any> = new EventEmitter();
  @Input() solicitud: any;

  name: string = '';
  isLoading: any;

  constructor(
    public modalService: NgbModal,
    public modal: NgbActiveModal,
    public solicitudService: SolicitudService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {


  }

  rechazar() {
    this.solicitudService.rechazarSolicitud(this.solicitud.id).subscribe({
      next: (resp: any) => {
        this.toast.success("Éxito", "La solicitud se rechazó correctamente");
        this.SolicitudR.emit(resp);
        this.modal.close();
      },
      error: (error) => {
        console.error("Error al rechazar la solicitud:", error);
        this.toast.error("Error del servidor", "Ocurrió un error inesperado al procesar la solicitud.");
      }
    });
  }


}
