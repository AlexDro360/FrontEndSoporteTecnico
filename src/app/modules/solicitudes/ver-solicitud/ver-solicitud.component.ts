import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudService } from '../service/solicitud.service';
import { ToastrService } from 'ngx-toastr';
import { AsignarPersonalComponent } from '../../atender-solicitud/asignar-personal/asignar-personal.component';
import { CrearBitacoraComponent } from '../../bitacora/crear-bitacora/crear-bitacora.component';
import { forkJoin } from 'rxjs';
import { CrearRespuestaComponent } from '../../respuestas/crear-respuesta/crear-respuesta.component';
import { VerRespuestaComponent } from '../../respuestas/ver-respuesta/ver-respuesta.component';
import { VerBitacoraComponent } from '../../bitacora/ver-bitacora/ver-bitacora.component';
import { RechazarSolicitudComponent } from '../rechazar-solicitud/rechazar-solicitud.component';

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
    public solicitudService: SolicitudService,
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
        console.log(err);
        console.error('Error al generar el pdf', err);
        this.toast.error('Error al abrir el pdf', 'Error');
      }
    })
  }

  responder(): void {
    forkJoin({
      tipoServicio: this.solicitudService.tiposServicios(),
      tipoMantenimiento: this.solicitudService.tiposMantenimientos(),
      bitacora: this.solicitudService.getBitacora(this.solicitud.id),
      jefe: this.solicitudService.obtenerJefe(),
    }).subscribe({
      next: (result) => {

        const bitacoraVacia = !result.bitacora || Object.keys(result.bitacora).length === 0;
        const jefeVacio = !result.jefe || Object.keys(result.jefe).length === 0;

        const modalSize = bitacoraVacia ? 'md' : 'xl';

        const modalRef = this.modalService.open(CrearRespuestaComponent, {
          centered: true,
          size: modalSize
        });

        modalRef.componentInstance.solicitud = this.solicitud;
        modalRef.componentInstance.tipoMantenimiento = result.tipoMantenimiento;
        modalRef.componentInstance.tipoServicio = result.tipoServicio;

        if (!bitacoraVacia) {
          modalRef.componentInstance.bitacora = result.bitacora;
          console.log("bitacora no está vacía");
        }
        if (!jefeVacio) {
          modalRef.componentInstance.jefeCC = result.jefe;
        }
        

        modalRef.componentInstance.RespuestaN.subscribe((resp: any) => {
          this.SolicitudV.emit(resp);
          this.modal.close();
        });
      },
      error: (err) => {
        console.error('Error al cargar los datos', err);
        this.toast.error("Error", "Error al cargar datos");
      }
    });
  }

  verRespuesta(): void {
    forkJoin({
      tipoServicio: this.solicitudService.tiposServicios(),
      tipoMantenimiento: this.solicitudService.tiposMantenimientos(),
      respuesta: this.solicitudService.getRespuesta(this.solicitud.id)
    }).subscribe({
      next: (result) => {
        console.log(result.respuesta);
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

  hacerBitacora(): void {
    const modalRef = this.modalService.open(CrearBitacoraComponent, { centered: false, size: 'bg' });
    modalRef.componentInstance.idSolicitud = this.solicitud.id;
    modalRef.componentInstance.BitacoraN.subscribe((resp: any) => {
      this.SolicitudV.emit(resp);
      this.modal.close();
    });
  }

  verBitacora(): void {
    // const modalRef = this.modalService.open(VerBitacoraComponent, { centered: true, size: 'md' });
    // modalRef.componentInstance.bitacora = bitacora;
    // modalRef.componentInstance.descripcion = this.descripcion;

    // modalRef.componentInstance.RespuestaV.subscribe((res: any) => {
    // })
  }

  asignarTecnicos(): void {
    this.solicitudService.listTecnicos().subscribe({
      next: (resp: any) => {
        const tecnicos = resp;

        const modalRef = this.modalService.open(AsignarPersonalComponent, { centered: true, size: 'md' });
        modalRef.componentInstance.solicitud = this.solicitud;
        modalRef.componentInstance.tecnicos = tecnicos;

        modalRef.componentInstance.AsigTec.subscribe((resp: any) => {
          this.SolicitudV.emit(resp);
          this.modal.close();
        });
      },
      error: (err) => {
        console.error('Error al obtener técnicos:', err);
        this.toast.error("Error", "Error al obtener datos de los técnicos");
      }
    });
  }

  rechazar(): void {
    const modalRef = this.modalService.open(RechazarSolicitudComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.solicitud = this.solicitud;

    modalRef.componentInstance.SolicitudR.subscribe({
      next: (resp: any) => {
        this.SolicitudV.emit(resp);
        this.modal.close();
      }
    })
  }

}
