import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RespuestaService } from '../service/respuesta.service';
import { CrearRespuestaComponent } from '../crear-respuesta/crear-respuesta.component';
import { forkJoin } from 'rxjs';
import { EditarRespuestaComponent } from '../editar-respuesta/editar-respuesta.component';
import { BorrarRespuestaComponent } from '../borrar-respuesta/borrar-respuesta.component';
import { VerRespuestaComponent } from '../ver-respuesta/ver-respuesta.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-respuesta',
  templateUrl: './list-respuesta.component.html',
  styleUrls: ['./list-respuesta.component.scss']
})
export class ListRespuestaComponent {

  search: string = '';
  respuesta: any = [];
  isLoading$: any;

  // tipoServicio: any;
  // tipoMantenimiento: any;
  user: any;
  solicitud: string = '1';

  totalPages: number = 0;
  currentPage: number = 1;
  constructor(
    public modalService: NgbModal,
    public respuestaService: RespuestaService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.respuestaService.isLoading$;
    this.listRespuestas();
    // this.configAll();
    this.me();
  }

  me() {
    this.respuestaService.listme().subscribe((resp: any) => {
      //console.log(resp);
      this.user = resp;
    })
  }

  listRespuestas(page = 1) {
    this.respuestaService.listarRespuestas(page).subscribe((resp: any) => {
      console.log(resp);
      this.respuesta = resp;
    });
  }

  loadPage($event: any) {
    this.listRespuestas($event);
  }

  createRespuesta() {
    forkJoin({
      tipoServicio: this.respuestaService.tiposServicios(),
      tipoMantenimiento: this.respuestaService.tiposMantenimientos()
    }).subscribe({
      next: (result) => {
        const modalRef = this.modalService.open(CrearRespuestaComponent, { centered: true, size: 'mb' });
        modalRef.componentInstance.solicitud = this.solicitud;
        modalRef.componentInstance.tipoMantenimiento = result.tipoMantenimiento;
        modalRef.componentInstance.tipoServicio = result.tipoServicio;
        modalRef.componentInstance.user = this.user;

        modalRef.componentInstance.RespuestaN.subscribe((res: any) => {
          console.log(res);
          this.listRespuestas();
        });
      },
      error: (err) => {
        console.error('Error al cargar los datos', err);
      }
    });



  }

  editRespuesta(respuesta: any) {
    forkJoin({
      tipoServicio: this.respuestaService.tiposServicios(),
      tipoMantenimiento: this.respuestaService.tiposMantenimientos()
    }).subscribe({
      next: (result) => {
        const modalRef = this.modalService.open(EditarRespuestaComponent, { centered: true, size: 'md' });
        modalRef.componentInstance.respuesta = JSON.parse(JSON.stringify(respuesta));
        modalRef.componentInstance.tipoMantenimiento = result.tipoMantenimiento;
        modalRef.componentInstance.tipoServicio = result.tipoServicio;

        modalRef.componentInstance.RespuestaA.subscribe((res: any) => {
          this.listRespuestas();
        })
      },
      error: (err) => {
        console.error('Error al cargar los datos', err);
      }
    });



  }

  deleteRespuesta(respuesta: any) {
    const modalRef = this.modalService.open(BorrarRespuestaComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.respuesta = respuesta;

    modalRef.componentInstance.RespuestaE.subscribe((res: any) => {
      this.listRespuestas();
    })
  }

  watchRespuesta(respuesta: any) {
    forkJoin({
      tipoServicio: this.respuestaService.tiposServicios(),
      tipoMantenimiento: this.respuestaService.tiposMantenimientos()
    }).subscribe({
      next: (result) => {
        const modalRef = this.modalService.open(VerRespuestaComponent, { centered: true, size: 'md' });
        modalRef.componentInstance.respuesta = respuesta;
        modalRef.componentInstance.tipoMantenimiento = result.tipoMantenimiento;
        modalRef.componentInstance.tipoServicio = result.tipoServicio;

        modalRef.componentInstance.RespuestaV.subscribe((res: any) => {
        })
      },
      error: (err) => {
        console.error('Error al cargar los datos', err);
      }
    });
  }

  verPdf(respuesta: any) {
    this.respuestaService.obtenerPDF(respuesta.id).subscribe({
      next: (resp) => {
        const fileURL = URL.createObjectURL(resp);
        window.open(fileURL);
      },
      error: (err) => {
        console.log(err);
        console.error('Error al generar el pdf', err);
        this.toast.error('Error al abrir el pdf', 'Error');
      }
    })
  }

  // configAll() {
  //   forkJoin({
  //     tipoServicio: this.respuestaService.tiposServicios(),
  //     tipoMantenimiento: this.respuestaService.tiposMantenimientos()
  //   }).subscribe({
  //     next: (result) => {
  //       this.tipoServicio = result.tipoServicio;
  //       this.tipoMantenimiento = result.tipoMantenimiento;
  //     },
  //     error: (err) => {
  //       console.error('Error al cargar los datos', err);
  //     }
  //   });
  // }


}
