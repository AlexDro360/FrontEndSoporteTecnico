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
  folios: any;

  constructor(
    public modalService: NgbModal,
    public configService: ConfigAdicionalesService,
    public toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.configService.isLoading$;
    this.listFolios();
  }

  listFolios() {
    this.configService.listarFolios().subscribe((resp: any) => {
      console.log(resp);
      this.folios = resp;
      console.log(this.folios)
    });
  }

  reiniciarFolioRespuestas() {
    const modalRef = this.modalService.open(ResetRespuestaComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.ResetR.subscribe((res: any) => {
      this.listFolios();
    })
  }

  editarFolioRespuestas() {
    this.configService.listarFolios().subscribe({
      next: (resp) => {
        const modalRef = this.modalService.open(ActualizarRespuestaComponent, { centered: true, size: 'md' });
        modalRef.componentInstance.folios = resp;
        modalRef.componentInstance.FolioR.subscribe((res: any) => {
          this.listFolios();
        })
      },
      error: (err) => {
        console.log(err);
        console.error('Error al obtener los folios', err);
        this.toast.error('Error al obtener los folios', 'Error');
      }
    })
  }

  reiniciarFolioSolicitud() {
    const modalRef = this.modalService.open(ResetSolicitudComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.ResetS.subscribe((res: any) => {
      this.listFolios();
    })
  }


  editarFolioSolicitud() {
    this.configService.listarFolios().subscribe({
      next: (resp) => {
        const modalRef = this.modalService.open(ActualizarSolicitudComponent, { centered: true, size: 'md' });
        modalRef.componentInstance.folios = resp;
        modalRef.componentInstance.FolioS.subscribe((res: any) => {
          this.listFolios();
        })
      },
      error: (err) => {
        console.log(err);
        console.error('Error al obtener los folios', err);
        this.toast.error('Error al obtener los folios', 'Error');
      }
    })
  }
  isPermission(permission:string){
          return isPermission(permission);
  }
}
