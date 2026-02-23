import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MisSolicitudesService } from '../service/mis-solicitudes.service';
import { RespuestaService } from '../../respuestas/service/respuesta.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-confirmar-solicitud',
  templateUrl: './confirmar-solicitud.component.html',
  styleUrls: ['./confirmar-solicitud.component.scss']
})
export class ConfirmarSolicitudComponent implements OnInit{

  @Output() SolicitudC: EventEmitter<any> = new EventEmitter();
  @Input() solicitud: any;
  @Input() respuesta: any;

  isPdfLoading: boolean = false;
  isConfirming: boolean = false;

  constructor(
    public modal: NgbActiveModal,
    public misSolicitudesService: MisSolicitudesService,
    public toast: ToastrService,
    public respuestaService: RespuestaService,
  ) { }

  ngOnInit(): void {
  }

  confirmar() {
    this.isConfirming = true;
    this.misSolicitudesService.confirmarSolucion(this.solicitud.id)
    .pipe(finalize(() => this.isConfirming = false))
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

  verPdf() {
      this.isPdfLoading = true;
      this.respuestaService.obtenerPDF(this.respuesta.id)
      .pipe(finalize(() => this.isPdfLoading = false))
      .subscribe({
        next: (resp) => {
          const fileURL = URL.createObjectURL(resp);
          window.open(fileURL);
        },
        error: (err) => {
          console.error('Error al generar el pdf', err);
          this.toast.error('Error al abrir el pdf', 'Error');
        }
      })
    }
}
