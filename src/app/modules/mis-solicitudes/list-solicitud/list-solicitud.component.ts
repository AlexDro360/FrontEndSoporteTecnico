import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { Toast } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MisSolicitudesService } from '../service/mis-solicitudes.service';
import { VerSolicitudComponent } from '../ver-solicitud/ver-solicitud.component';
import { VerRespuestaComponent } from '../../respuestas/ver-respuesta/ver-respuesta.component';
import { isPermission } from 'src/app/config/config';
import { CreateSolicitudComponent } from '../../solicitudes/create-solicitud/create-solicitud.component';
import { EditSolicitudComponent } from '../../solicitudes/edit-solicitud/edit-solicitud.component';
import { ConfirmarSolicitudComponent } from '../confirmar-solicitud/confirmar-solicitud.component';
import { DESCRIPCIONES_ESTADO } from './descripcion.data';

@Component({
  selector: 'app-list-solicitud',
  templateUrl: './list-solicitud.component.html',
  styleUrls: ['./list-solicitud.component.scss']
})
export class ListSolicitudComponent {

  search: string = '';
  SOLICITUDES: any = [];
  isLoading$: any;

  tipos: any[];
  user: any;

  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  descripcionesEstado = DESCRIPCIONES_ESTADO;

  constructor(
    public modalService: NgbModal,
    public solicitudesService: MisSolicitudesService,
    public toast: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.solicitudesService.isLoading$;
    this.solicitudesService.listme().subscribe((resp: any) => {
      this.user = resp;
      this.listSolicitudes();
    });
    this.configAll();

  }

  onChangeItemsPerPage() {
    this.listSolicitudes();
  }

  listSolicitudes(page = 1) {
    this.solicitudesService.listSolicitud(page, this.pageSize, this.search, this.user.id,).subscribe((resp: any) => {
      this.SOLICITUDES = resp.solicitudes;
      this.totalPages = resp.total;
      this.currentPage = page;
    });
  }

  createSolicitud() {
    const modalRef = this.modalService.open(CreateSolicitudComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.tipos = this.tipos;
    modalRef.componentInstance.user = this.user;

    modalRef.componentInstance.SolicitudC.subscribe((tipo: any) => {
      this.listSolicitudes();
    });
  }

  editSolicitud(solicitud: any) {
    const modalRef = this.modalService.open(EditSolicitudComponent, {
      centered: true,
      size: 'md'
    });

    // Inputs del modal
    modalRef.componentInstance.solicitud = solicitud;
    modalRef.componentInstance.tipos = this.tipos;
    modalRef.componentInstance.user = this.user;

    // Escuchar cuando se edita correctamente
    modalRef.componentInstance.SolicitudE.subscribe((solicitudEditada: any) => {
      this.listSolicitudes(this.currentPage);
    });
  }

  watchRespuesta(solicitud: any) {
    forkJoin({
      tipoServicio: this.solicitudesService.tiposServicios(),
      tipoMantenimiento: this.solicitudesService.tiposMantenimientos(),
      respuesta: this.solicitudesService.getRespuesta(solicitud.id)
    }).subscribe({
      next: (result) => {
        const modalRef = this.modalService.open(VerRespuestaComponent, { centered: true, size: 'md' });
        modalRef.componentInstance.respuesta = result.respuesta;
        modalRef.componentInstance.tipoMantenimiento = result.tipoMantenimiento;
        modalRef.componentInstance.tipoServicio = result.tipoServicio;
        modalRef.componentInstance.solicitud = solicitud;

        modalRef.componentInstance.RespuestaV.subscribe((res: any) => {
        })
      },
      error: (err) => {
        console.error('Error al cargar los datos', err);
        this.toast.error("Error", "Error al obtener la respuesta");
      }
    });
  }

  verSolicitud(SOLICITUD: any) {
    const modalRef = this.modalService.open(VerSolicitudComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.solicitud = SOLICITUD;
    modalRef.componentInstance.user = this.user;
    modalRef.componentInstance.tipos = this.tipos;

    modalRef.componentInstance.SolicitudV.subscribe((tipo: any) => {
      this.listSolicitudes();
    });
  }

  configAll() {
    this.solicitudesService.configAll().subscribe((resp: any) => {
      this.tipos = resp.tipos;
    })
  }

  loadPage($event: any) {
    this.listSolicitudes($event);
  }
  get avatarUrl() {
    if (this.user.avatar === 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg') {
      return this.user.avatar;
    } else {

      this.user.avatar = this.user.avatar.replace(
        "http://10.168.0.108/storage",
        "http://10.168.0.108:8000/storage"
      );
      return this.user.avatar
    }
  }
  isPermission(permission: string) {
    return isPermission(permission);
  }

  

  confirmarSolucion(solicitud: any) {
    this.solicitudesService.getRespuesta(solicitud.id).subscribe({
        next: (respuestaServidor: any) => {
            const modalRef = this.modalService.open(ConfirmarSolicitudComponent, { centered: true, size: 'md' });
            
            modalRef.componentInstance.solicitud = solicitud;
            modalRef.componentInstance.respuesta = respuestaServidor;

            modalRef.componentInstance.SolicitudC.subscribe(() => {
                this.listSolicitudes();
            });
        },
        error: (err) => {
            console.error('Error al cargar la respuesta', err);
            this.toast.error("Error", "No se pudo obtener el reporte de la solución.");
        }
    });
}
}
