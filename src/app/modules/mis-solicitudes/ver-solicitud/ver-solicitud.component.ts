import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { VerRespuestaComponent } from '../../respuestas/ver-respuesta/ver-respuesta.component';
import { MisSolicitudesService } from '../service/mis-solicitudes.service';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.scss']
})
export class VerSolicitudComponent {
  @Output() SolicitudV: EventEmitter<any> = new EventEmitter();
  @Input() solicitud: any;
  @Input() user: any;

  isLoading: any;

  constructor(
    public modalService: NgbModal,
    public modal: NgbActiveModal,
    public solicitudService: MisSolicitudesService,
    public toast: ToastrService,
  ) {
  }
  verPdf(): void {
    this.solicitudService.obtenerPDF(this.solicitud.id).subscribe({
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

  verRespuesta(): void {
    forkJoin({
      tipoServicio: this.solicitudService.tiposServicios(),
      tipoMantenimiento: this.solicitudService.tiposMantenimientos(),
      respuesta: this.solicitudService.getRespuesta(this.solicitud.id)
    }).subscribe({
      next: (result) => {
        const modalRef = this.modalService.open(VerRespuestaComponent, { centered: true, size: 'md' });
        modalRef.componentInstance.respuesta = result.respuesta;
        modalRef.componentInstance.tipoMantenimiento = result.tipoMantenimiento;
        modalRef.componentInstance.tipoServicio = result.tipoServicio;
        modalRef.componentInstance.solicitud = this.solicitud;

        modalRef.componentInstance.RespuestaV.subscribe((res: any) => {
        })
      },
      error: (err) => {
        console.error('Error al cargar los datos', err);
        this.toast.error("Error", "Error al obtener la respuesta");
      }
    });
  }
}
