import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { finalize, forkJoin } from 'rxjs';
import { VerRespuestaComponent } from '../../respuestas/ver-respuesta/ver-respuesta.component';
import { MisSolicitudesService } from '../service/mis-solicitudes.service';
import { isPermission } from 'src/app/config/config';
import { EditSolicitudComponent } from '../../solicitudes/edit-solicitud/edit-solicitud.component';
@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.component.html',
  styleUrls: ['./ver-solicitud.component.scss']
})
export class VerSolicitudComponent {
  @Output() SolicitudV: EventEmitter<any> = new EventEmitter();
  @Input() solicitud: any;
  @Input() user: any;
  @Input() tipos: any[];

  isLoading: any;
  loading: boolean = false;

  constructor(
    public modalService: NgbModal,
    public modal: NgbActiveModal,
    public solicitudService: MisSolicitudesService,
    public toast: ToastrService,
  ) {
  }
  verPdf(): void {
    this.loading = true;
    this.solicitudService.obtenerPDF(this.solicitud.id)
      .pipe(finalize(() => this.loading = false))
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

  editSolicitud() {
    const modalRef = this.modalService.open(EditSolicitudComponent, {
      centered: true,
      size: 'md'
    });

    // Inputs del modal
    modalRef.componentInstance.solicitud = this.solicitud;
    modalRef.componentInstance.tipos = this.tipos;
    modalRef.componentInstance.user = this.user;

    // Escuchar cuando se edita correctamente
    modalRef.componentInstance.SolicitudE.subscribe((solicitudEditada: any) => {
      this.SolicitudV.emit(solicitudEditada);
      this.modal.close();
    });
  }
  isPermission(permission: string) {
    return isPermission(permission);
  }
}
