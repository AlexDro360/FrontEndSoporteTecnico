import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { SolicitudService } from '../service/solicitud.service';

@Component({
  selector: 'app-archivar-solicitud',
  templateUrl: './archivar-solicitud.component.html',
  styleUrls: ['./archivar-solicitud.component.scss']
})
export class ArchivarSolicitudComponent {

  @Output() SolicitudC: EventEmitter<any> = new EventEmitter();
  @Input() solicitud: any;

  isLoading: boolean = false;

  constructor(
    public modal: NgbActiveModal,
    public toast: ToastrService,
    public solicitdService: SolicitudService,
  ) { }

  ngOnInit(): void {
  }

  archivar() {
    this.isLoading = true;
    this.solicitdService.archivarSolicitud(this.solicitud.id)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (resp: any) => {
          this.toast.success("Éxito", resp.message || "El trabajo se confirmó correctamente y la solicitud fue cerrada.");
          this.SolicitudC.emit(resp);
          this.modal.close();
        },
        error: (error) => {
          console.error("Error al confirmar la solicitud:", error);

          if (error.error && error.error.message) {
            this.toast.warning("Atención", error.error.message);
          } else {
            this.toast.error("Error del servidor", "Ocurrió un error inesperado al procesar la solicitud.");
          }
        }
      });
  }
}
