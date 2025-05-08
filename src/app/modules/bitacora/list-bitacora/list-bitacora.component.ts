import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BitacoraService } from '../service/bitacora.service';
import { CrearBitacoraComponent } from '../crear-bitacora/crear-bitacora.component';
import { forkJoin } from 'rxjs';
import { EditarBitacoraComponent } from '../editar-bitacora/editar-bitacora.component';
import { BorrarBitacoraComponent } from '../borrar-bitacora/borrar-bitacora.component';
import { VerBitacoraComponent } from '../ver-bitacora/ver-bitacora.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-bitacora',
  templateUrl: './list-bitacora.component.html',
  styleUrls: ['./list-bitacora.component.scss']
})
export class ListBitacoraComponent {
  search: string = '';
  bitacora: any = [];
  isLoading$: any;
  descripcion:any;
  user: any;
  solicitud: string = '1';
  
  totalPages: number = 0;
  currentPage: number = 1;
  constructor(
    public modalService: NgbModal,
    public bitacoraService: BitacoraService,
    public toast: ToastrService,
  ) {
  
    }
  
    ngOnInit(): void {
      this.isLoading$ = this.bitacoraService.isLoading$;
      this.listBitacora();
      this.me();
    }
  
    me() {
      this.bitacoraService.listme().subscribe((resp: any) => {
        this.user = resp;
      })
    }
  
    listBitacora(page = 1) {
      this.bitacoraService.listarBitacora(page).subscribe((resp: any) => {
        console.log(resp);
        this.bitacora = resp;
      });
    }
  
    loadPage($event: any) {
      this.listBitacora($event);
    }
  
    createBitacora() {
      const modalRef = this.modalService.open(CrearBitacoraComponent, { centered: true, size: 'mb' });
      modalRef.componentInstance.idSolicitud = this.solicitud;
      modalRef.componentInstance.descripcion = this.descripcion;
      modalRef.componentInstance.user = this.user;
  
      modalRef.componentInstance.BitacoraN.subscribe((res: any) => {
        console.log(res);
        this.listBitacora();
      });
    }
  
    editBitacora(bitacora: any) {
      const modalRef = this.modalService.open(EditarBitacoraComponent, { centered: true, size: 'md' });
      modalRef.componentInstance.bitacora = JSON.parse(JSON.stringify(bitacora));
      modalRef.componentInstance.descripcion = this.descripcion;  
      modalRef.componentInstance.BitacoraA.subscribe((res: any) => {
        this.listBitacora();
      })
    }
  
    deleteBitacora(bitacora: any) {
      const modalRef = this.modalService.open(BorrarBitacoraComponent, { centered: true, size: 'md' });
      modalRef.componentInstance.bitacora = bitacora;
  
      modalRef.componentInstance.BitacoraE.subscribe((res: any) => {
        this.listBitacora();
      })
    }
  
    watchBitacora(bitacora: any) {
      const modalRef = this.modalService.open(VerBitacoraComponent, { centered: true, size: 'md' });
      modalRef.componentInstance.bitacora = bitacora;
      modalRef.componentInstance.descripcion = this.descripcion;
  
      modalRef.componentInstance.RespuestaV.subscribe((res: any) => {
      })
    }

}
