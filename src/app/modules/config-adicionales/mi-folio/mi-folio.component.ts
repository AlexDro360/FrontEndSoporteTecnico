import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigAdicionalesService } from '../service/config-adicionales.service';
import { ToastrService } from 'ngx-toastr';
import { ResetSolicitudComponent } from '../reset-solicitud/reset-solicitud.component';
import { ActualizarSolicitudComponent } from '../actualizar-solicitud/actualizar-solicitud.component';
import { isPermission } from 'src/app/config/config';

@Component({
  selector: 'app-mi-folio',
  templateUrl: './mi-folio.component.html',
  styleUrls: ['./mi-folio.component.scss']
})
export class MiFolioComponent {
  isLoading$: any;
  user: any;
  depto: any;


  constructor(
    public modalService: NgbModal,
    public configService: ConfigAdicionalesService,
    public toast: ToastrService,
  ) { }


  ngOnInit(): void {
    this.isLoading$ = this.configService.isLoading$;
    this.user = JSON.parse(localStorage.getItem('user') ?? '');
    this.getMyFolio();
  }

  reiniciarMiFolio() {
    const modalRef = this.modalService.open(ResetSolicitudComponent, { centered: true, size: 'md' });
        modalRef.componentInstance.folio = this.depto;
        modalRef.componentInstance.ResetS.subscribe((res: any) => {
        this.getMyFolio();
    })
  }
  editarMiFolio() {
    const modalRef = this.modalService.open(ActualizarSolicitudComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.folio = this.depto;
    modalRef.componentInstance.FolioS.subscribe((res: any) => {
      this.getMyFolio();
    })
  }

  getMyFolio() {
    this.configService.getMyFolio(this.user.departamento_id).subscribe((resp: any) => {
      this.depto = resp;
    });
    
  }
  isPermission(permission: string) {
    return isPermission(permission);
  }
  canModifiedFolio(){
    return !(this.depto.numIntentosEditarFolio == 0);
      
  }
}
