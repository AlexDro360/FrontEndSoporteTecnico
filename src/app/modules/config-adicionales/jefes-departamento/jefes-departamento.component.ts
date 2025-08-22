import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfigAdicionalesService } from '../service/config-adicionales.service';
import { ToastrService } from 'ngx-toastr';
import { AgregarJefeComponent } from '../agregar-jefe/agregar-jefe.component';
import { EditarJefeComponent } from '../editar-jefe/editar-jefe.component';
import { AltaJefeComponent } from '../alta-jefe/alta-jefe.component';
import { BajaJefeComponent } from '../baja-jefe/baja-jefe.component';
import { isPermission } from 'src/app/config/config';

@Component({
  selector: 'app-jefes-departamento',
  templateUrl: './jefes-departamento.component.html',
  styleUrls: ['./jefes-departamento.component.scss']
})
export class JefesDepartamentoComponent {

  search: string = '';
  jefes: any = [];
  isLoading$: any;
  descripcion: any;
  user: any;
  solicitud: string = '1';

  totalPages: number = 0;
  currentPage: number = 1;
  pageSize:number = 10;

  constructor(
    public modalService: NgbModal,
    public configService: ConfigAdicionalesService,
    public toast: ToastrService,
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.configService.isLoading$;
    this.listJefes();
  }

  onChangeItemsPerPage() {
    this.listJefes();
  }

  listJefes(page = 1) {
    this.configService.listarJefes(page, this.pageSize).subscribe((resp: any) => {
      this.jefes = resp;
    });
  }

  loadPage($event: any) {
    this.listJefes($event);
  }

  agregarJefe() {
    const modalRef = this.modalService.open(AgregarJefeComponent, { centered: true, size: 'mb' });

    modalRef.componentInstance.JefeA.subscribe((res: any) => {
      this.listJefes();
    });
  }

  darAlta(jefe: any) {
    const modalRef = this.modalService.open(AltaJefeComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.jefe = JSON.parse(JSON.stringify(jefe));
    modalRef.componentInstance.JefeAl.subscribe((res: any) => {
      this.listJefes();
    })
  }

  darBaja(jefe: any) {
    const modalRef = this.modalService.open(BajaJefeComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.jefe = JSON.parse(JSON.stringify(jefe));
    modalRef.componentInstance.JefeB.subscribe((res: any) => {
      this.listJefes();
    })
  }
  editarJefe(jefe: any) {
    const modalRef = this.modalService.open(EditarJefeComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.jefe = JSON.parse(JSON.stringify(jefe));
    modalRef.componentInstance.JefeE.subscribe((res: any) => {
      this.listJefes();
    })
  }

  isPermission(permission:string){
    return isPermission(permission);
  }
}
