import { Component } from '@angular/core';
import { EditSolicitudComponent } from '../edit-solicitud/edit-solicitud.component';
import { DeleteSolicitudComponent } from '../delete-solicitud/delete-solicitud.component';
import { SolicitudService } from '../service/solicitud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateSolicitudComponent } from '../create-solicitud/create-solicitud.component';
import { CrearBitacoraComponent } from '../../bitacora/crear-bitacora/crear-bitacora.component';
import { AsignarPersonalComponent } from '../../atender-solicitud/asignar-personal/asignar-personal.component';
import { CrearRespuestaComponent } from '../../respuestas/crear-respuesta/crear-respuesta.component';
import { forkJoin } from 'rxjs';
import { VerRespuestaComponent } from '../../respuestas/ver-respuesta/ver-respuesta.component';
import { VerSolicitudComponent } from '../ver-solicitud/ver-solicitud.component';
import { Toast } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { RechazarSolicitudComponent } from '../rechazar-solicitud/rechazar-solicitud.component';
import { isPermission } from 'src/app/config/config';
import { myRol } from 'src/app/config/config';
import { VerBitacoraComponent } from '../../bitacora/ver-bitacora/ver-bitacora.component';
import { EditarBitacoraComponent } from '../../bitacora/editar-bitacora/editar-bitacora.component';

@Component({
  selector: 'app-list-solicitud',
  templateUrl: './list-solicitud.component.html',
  styleUrls: ['./list-solicitud.component.scss']
})
export class ListSolicitudComponent {
  search: string = '';
  estatu: number = 0;
  SOLICITUDES: any = [];
  isLoading$: any;

  tipos: any[];
  estatus: any[];
  user: any;

  totalElements: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  constructor(
    public modalService: NgbModal,
    public solicitudesService: SolicitudService,
    public toast: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.solicitudesService.isLoading$;
    this.me();
    this.configAll();
    this.configFiltro();    
  }

  me() {
    this.solicitudesService.listme().subscribe((resp: any) => {
      this.user = resp;
      this.listSolicitudes();
    })
  }

  listSolicitudes(page = 1) {
    if (myRol() != 2) {
      this.solicitudesService.listSolicitud(page, this.pageSize, this.search, this.estatu).subscribe((resp: any) => {
        this.SOLICITUDES = resp.solicitudes;
        this.totalElements = resp.total;
        this.currentPage = page;
        this.SOLICITUDES.forEach((SOLICITUD: any) => {
      if (SOLICITUD.user.avatar) {
        SOLICITUD.user.avatar = SOLICITUD.user.avatar.replace(
          "http://10.168.0.108/storage",
          "http://10.168.0.108:8000/storage"
        );
      }
    });
      });
    } else {
      this.solicitudesService.misSolicitudesAtendidas(page, this.pageSize, this.search, this.user.id).subscribe((resp: any) => {
        this.SOLICITUDES = resp.solicitudes;
        this.totalElements = resp.total;
        this.currentPage = page;
        this.SOLICITUDES.forEach((SOLICITUD: any) => {
      if (SOLICITUD.user.avatar) {
        SOLICITUD.user.avatar = SOLICITUD.user.avatar.replace(
          "http://10.168.0.108/storage",
          "http://10.168.0.108:8000/storage"
        );
      }
    });
      });
    }
  }

  loadPage($event: any) {
    this.listSolicitudes($event);
  }

  crearBitacora(id: any) {
    const modalRef = this.modalService.open(CrearBitacoraComponent, { centered: false, size: 'bg' });
    modalRef.componentInstance.idSolicitud = id;
    modalRef.componentInstance.BitacoraN.subscribe((resp: any) => {
      this.listSolicitudes();
    });
  }

  verBitacora(solicitud: any) {
    this.solicitudesService.getBitacora(solicitud.id).subscribe({
      next: (resp: any) => {
        const modalRef = this.modalService.open(VerBitacoraComponent, { centered: true, size: 'md' });
        modalRef.componentInstance.bitacora = resp;
      },
      error: (err) => {
        console.error('Error al obtener la bitácora:', err);
        this.toast.error("Error", "Error al obtener datos de la bitácora");
      }
    });
  }

  editarBitacora(solicitud: any) {
    this.solicitudesService.getBitacora(solicitud.id).subscribe({
      next: (resp: any) => {
        const modalRef = this.modalService.open(EditarBitacoraComponent, { centered: true, size: 'md' });
        modalRef.componentInstance.bitacora = resp;
      },
      error: (err) => {
        console.error('Error al obtener la bitácora:', err);
        this.toast.error("Error", "Error al obtener datos de la bitácora");
      }
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

  verSolicitud(SOLICITUD: any) {
    const modalRef = this.modalService.open(VerSolicitudComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.solicitud = SOLICITUD;
    modalRef.componentInstance.user = this.user;

    modalRef.componentInstance.SolicitudV.subscribe((tipo: any) => {
      this.listSolicitudes();
    });
  }

  asignarTecnicos(SOLICITUD: any) {
    this.solicitudesService.listTecnicos().subscribe({
      next: (resp: any) => {
        const tecnicos = resp;

        const modalRef = this.modalService.open(AsignarPersonalComponent, { centered: true, size: 'md' });
        modalRef.componentInstance.solicitud = SOLICITUD;
        modalRef.componentInstance.tecnicos = tecnicos;

        modalRef.componentInstance.AsigTec.subscribe((resp: any) => {
          this.listSolicitudes();
        });
      },
      error: (err) => {
        console.error('Error al obtener técnicos:', err);
        this.toast.error("Error", "Error al obtener datos de los técnicos");
      }
    });
  }


  createRespuesta(solicitud: any) {
    forkJoin({
      tipoServicio: this.solicitudesService.tiposServicios(),
      tipoMantenimiento: this.solicitudesService.tiposMantenimientos(),
      bitacora: this.solicitudesService.getBitacora(solicitud.id),
      jefe: this.solicitudesService.obtenerJefe(),
    }).subscribe({
      next: (result) => {
        const bitacoraVacia = !result.bitacora || Object.keys(result.bitacora).length === 0;
        const jefeVacio = !result.jefe || Object.keys(result.jefe).length === 0;

        const modalSize = bitacoraVacia ? 'md' : 'xl';

        const modalRef = this.modalService.open(CrearRespuestaComponent, {
          centered: true,
          size: modalSize
        });

        modalRef.componentInstance.solicitud = solicitud;
        modalRef.componentInstance.tipoMantenimiento = result.tipoMantenimiento;
        modalRef.componentInstance.tipoServicio = result.tipoServicio;
        // modalRef.componentInstance.jefeCC = result.jefe ?? null;


        if (!bitacoraVacia) {
          modalRef.componentInstance.bitacora = result.bitacora;
        }
        if (!jefeVacio) {
          modalRef.componentInstance.jefeCC = result.jefe;
        }

        modalRef.componentInstance.RespuestaN.subscribe((res: any) => {
          this.listSolicitudes();
        });
      },
      error: (err) => {
        console.error('Error al cargar los datos', err);
        this.toast.error("Error", "Error al cargar datos");
      }
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

  rechazarSolicitud(solicitud: any) {
    const modalRef = this.modalService.open(RechazarSolicitudComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.solicitud = solicitud;

    modalRef.componentInstance.SolicitudR.subscribe((res: any) => {
      this.listSolicitudes();
    })
  }

  configAll() {
    this.solicitudesService.configAll().subscribe((resp: any) => {
      this.tipos = resp.tipos;
    })
  }

  configFiltro() {
    this.solicitudesService.getEstatus().subscribe((resp: any) => {
      this.estatus = resp;
    })
  }

  padFolio(folio: number): string {
    return folio.toString().padStart(3, '0');
  }

  isPermission(permission: string) {
    return isPermission(permission);
  }

  myRole() {
    return myRol();
  }

  onChangeItemsPerPage() {
    this.listSolicitudes();
  }
}
