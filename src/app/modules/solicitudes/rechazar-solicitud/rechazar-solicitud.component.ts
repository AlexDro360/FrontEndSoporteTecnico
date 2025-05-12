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
        forkJoin({
          tipoServicio: this.solicitudService.tiposServicios(),
          tipoMantenimiento: this.solicitudService.tiposMantenimientos(),
          bitacora: this.solicitudService.getBitacora(this.solicitud.id)
        }).subscribe({
          next: (result) => {
            const modalRef = this.modalService.open(CrearRespuestaComponent, { centered: true, size: 'md' });
            modalRef.componentInstance.idSolicitud = this.solicitud.id;
            modalRef.componentInstance.tipoMantenimiento = result.tipoMantenimiento;
            modalRef.componentInstance.tipoServicio = result.tipoServicio;
            if (!(result.bitacora && Object.keys(result.bitacora).length === 0)) {
              modalRef.componentInstance.bitacora = result.bitacora;
              console.log("entro");
            }

            modalRef.componentInstance.RespuestaN.subscribe((res: any) => {
              this.SolicitudR.emit(resp);
            });
          },
          error: (err) => {
            console.error('Error al cargar los datos', err);
            this.toast.error("Error", "Error al cargar datos");
          }
        })
      },
      error: (error) => {
        console.error("Error al rechazar la solicitud:", error);
        this.toast.error("Error del servidor", "Ocurrió un error inesperado al procesar la solicitud.");
      }
    });
  }


}
