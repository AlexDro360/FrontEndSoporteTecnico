import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { Toast } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MisSolicitudesService } from '../service/mis-solicitudes.service';
import { CrearSolicitudComponent } from '../crear-solicitud/crear-solicitud.component';
import { VerSolicitudComponent } from '../ver-solicitud/ver-solicitud.component';
import { VerRespuestaComponent } from '../../respuestas/ver-respuesta/ver-respuesta.component';

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
    const modalRef = this.modalService.open(CrearSolicitudComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.tipos = this.tipos;
    modalRef.componentInstance.user = this.user;

    modalRef.componentInstance.SolicitudC.subscribe((tipo: any) => {
      this.listSolicitudes();
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
}
