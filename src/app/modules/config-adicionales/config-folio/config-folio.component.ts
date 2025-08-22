import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigAdicionalesService } from '../service/config-adicionales.service';
import { ToastrService } from 'ngx-toastr';
import { ResetRespuestaComponent } from '../reset-respuesta/reset-respuesta.component';
import { ResetSolicitudComponent } from '../reset-solicitud/reset-solicitud.component';
import { ActualizarRespuestaComponent } from '../actualizar-respuesta/actualizar-respuesta.component';
import { ActualizarSolicitudComponent } from '../actualizar-solicitud/actualizar-solicitud.component';
import { isPermission } from 'src/app/config/config';

@Component({
  selector: 'app-config-folio',
  templateUrl: './config-folio.component.html',
  styleUrls: ['./config-folio.component.scss']
})
export class ConfigFolioComponent {

  isLoading$: any;
  folios: any = [];
  search: string = '';

  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;

  constructor(
    public modalService: NgbModal,
    public configService: ConfigAdicionalesService,
    public toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.configService.isLoading$;
    this.listFolios();
  }

  listFolios(page = 1) {
    this.configService.listarFolios(page, this.pageSize, this.search).subscribe((resp: any) => {
      this.folios = resp;
    });
  }

  reiniciarFolioSolicitud(folio: any) {
    const modalRef = this.modalService.open(ResetSolicitudComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.folio = folio;
    modalRef.componentInstance.ResetS.subscribe((res: any) => {
      this.listFolios();
    })
  }


  editarFolioSolicitud(folio: any) {
    const modalRef = this.modalService.open(ActualizarSolicitudComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.folio = folio;
    modalRef.componentInstance.FolioS.subscribe((res: any) => {
      this.listFolios();
    })
  }
  isPermission(permission: string) {
    return isPermission(permission);
  }

  onChangeItemsPerPage() {
    this.listFolios();
  }
  loadPage($event: any) {
    this.listFolios($event);
  }
}
