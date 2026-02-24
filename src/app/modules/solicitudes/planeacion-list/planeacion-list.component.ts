import { ChangeDetectorRef, Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { isPermission, myRol } from 'src/app/config/config';
import { SolicitudService } from '../service/solicitud.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { RespuestaService } from '../../respuestas/service/respuesta.service';
import { AuthService } from 'src/app/modules/auth';
import { ArchivarSolicitudComponent } from '../archivar-solicitud/archivar-solicitud.component';

@Component({
  selector: 'app-planeacion-list',
  templateUrl: './planeacion-list.component.html',
  styleUrls: ['./planeacion-list.component.scss']
})
export class PlaneacionListComponent {

  search: string = '';
  SOLICITUDES: any = [];
  isLoading$: any;
  isDownloadR$: boolean = false;
  isDownloadS$: boolean = false;

  tipos: any[];
  estatus: any[];
  user: any;

  totalElements: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  constructor(
    public modalService: NgbModal,
    public solicitudesService: SolicitudService,
    public toast: ToastrService,
    public respuestaService: RespuestaService,
    private cdr: ChangeDetectorRef,
    public authService: AuthService

  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.solicitudesService.isLoading$;
    this.me();
    this.configAll();
  }

  me() {
    this.solicitudesService.listme().subscribe((resp: any) => {
      this.user = resp;
      this.listSolicitudes();
    })
  }

  listSolicitudes(page = 1) {
    this.solicitudesService.listSolicitudConcluidas(page, this.pageSize).subscribe((resp: any) => {
      this.SOLICITUDES = resp.solicitudes;
      this.totalElements = resp.total;
      this.currentPage = page;
    });
  }

  descargarRespuesta(solicitud: any) {
    solicitud.isDownloadingR = true;

    this.respuestaService.obtenerPDF(solicitud.respuestaData.id)
      .subscribe({
        next: (resp) => {
          const fileURL = URL.createObjectURL(resp);
          window.open(fileURL);

          solicitud.isDownloadingR = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al generar el pdf', err);
          this.toast.error('Error al abrir el pdf', 'Error');

          solicitud.isDownloadingR = false;
          this.cdr.detectChanges();
        }
      });
  }

  descargarSolicitud(solicitud: any) {
    solicitud.isDownloadingS = true;

    this.solicitudesService.obtenerPDF(solicitud.id)
      .subscribe({
        next: (resp) => {
          const fileURL = URL.createObjectURL(resp);
          window.open(fileURL);

          solicitud.isDownloadingS = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al obtener el pdf', err);
          this.toast.error('Error al abrir el pdf', 'Error');

          solicitud.isDownloadingS = false;
          this.cdr.detectChanges();
        }
      });
  }

  archivarSolicitud(solicitud: any) {
    // this.solicitudesService.getRespuesta(solicitud.id).subscribe({
    //   next: (respuestaServidor: any) => {
        const modalRef = this.modalService.open(ArchivarSolicitudComponent, { centered: true, size: 'md' });

        modalRef.componentInstance.solicitud = solicitud;

        modalRef.componentInstance.SolicitudC.subscribe(() => {
          this.listSolicitudes();
        });
    //   },
    //   error: (err) => {
    //     console.error('Error al cargar la respuesta', err);
    //     this.toast.error("Error", "No se pudo obtener el reporte de la solución.");
    //   }
    // });
  }

  loadPage($event: any) {
    this.listSolicitudes($event);
  }


  configAll() {
    this.solicitudesService.configAll().subscribe((resp: any) => {
      this.tipos = resp.tipos;
    })
  }

  padFolio(folio: number): string {
    return folio.toString().padStart(3, '0');
  }

  onChangeItemsPerPage() {
    this.listSolicitudes();
  }
}
