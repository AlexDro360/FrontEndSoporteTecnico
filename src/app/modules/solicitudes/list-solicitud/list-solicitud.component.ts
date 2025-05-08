import { Component } from '@angular/core';
import { EditSolicitudComponent } from '../edit-solicitud/edit-solicitud.component';
import { DeleteSolicitudComponent } from '../delete-solicitud/delete-solicitud.component';
import { SolicitudService } from '../service/solicitud.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateSolicitudComponent } from '../create-solicitud/create-solicitud.component';
import { CrearBitacoraComponent } from '../../bitacora/crear-bitacora/crear-bitacora.component';

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
  constructor(
    public modalService: NgbModal,
    public solicitudesService: SolicitudService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.solicitudesService.isLoading$;
    this.listSolicitudes();
    this.configAll();
    this.me();
  }

  me() {
    this.solicitudesService.listme().subscribe((resp: any) => {
      //console.log(resp);
      this.user = resp;
    })
  }

  listSolicitudes(page = 1) {
    this.solicitudesService.listSolicitud(page, this.search).subscribe((resp: any) => {
      console.log(resp);
      this.SOLICITUDES = resp.solicitudes;
      this.totalPages = resp.total;
      this.currentPage = page;
    });
  }

  loadPage($event: any) {
    this.listSolicitudes($event);
  }

  crearBitacora(id:any){
    const modalRef=this.modalService.open(CrearBitacoraComponent,{centered: false, size:'bg'});
    modalRef.componentInstance.idSolicitud=id;
  }

  createSolicitud() {
    const modalRef = this.modalService.open(CreateSolicitudComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.tipos = this.tipos;
    modalRef.componentInstance.user = this.user;
  
    modalRef.componentInstance.SolicitudC.subscribe((tipo: any) => {
      console.log(tipo);
      this.SOLICITUDES.unshift(tipo);
    });
  }

  editSolicitud(SOLICITUD: any) {
    const modalRef = this.modalService.open(EditSolicitudComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.SOLICITUD_SELECTED = SOLICITUD;

    modalRef.componentInstance.RoleE.subscribe((role: any) => {
      let INDEX = this.SOLICITUDES.findIndex((rol: any) => rol.id == SOLICITUD.id);
      if (INDEX != -1) {
        this.SOLICITUDES[INDEX] = role;
      }
    })
  }

  deleteRole(SOLICITUD: any) {
    const modalRef = this.modalService.open(DeleteSolicitudComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.SOLICITUD_SELECTED = SOLICITUD;

    modalRef.componentInstance.RoleD.subscribe((role: any) => {
      let INDEX = this.SOLICITUDES.findIndex((rol: any) => rol.id == SOLICITUD.id);
      if (INDEX != -1) {
        this.SOLICITUDES.splice(INDEX, 1);
      }
    })
  }

  configAll() {
    this.solicitudesService.configAll().subscribe((resp: any) => {
      this.tipos = resp.tipos;
    })
  }
}
