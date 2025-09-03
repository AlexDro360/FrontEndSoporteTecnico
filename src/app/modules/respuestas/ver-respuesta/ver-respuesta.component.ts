import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RespuestaService } from '../service/respuesta.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-ver-respuesta',
  templateUrl: './ver-respuesta.component.html',
  styleUrls: ['./ver-respuesta.component.scss']
})
export class VerRespuestaComponent {


  @Output() RespuestaV: EventEmitter<any> = new EventEmitter();
  @Input() tipoServicio: any;
  @Input() tipoMantenimiento: any;
  @Input() respuesta: any;
  @Input() solicitud: any;

  isLoading: any;
  loading: boolean = false;

  constructor(
    public modal: NgbActiveModal,
    public respuestaService: RespuestaService,
    public toast: ToastrService,
  ) {
  }
  verPdf() {
    this.loading = true;
    this.respuestaService.obtenerPDF(this.respuesta.id)
    .pipe(finalize(() => this.loading = false))
    .subscribe({
      next: (resp) => {
        const fileURL = URL.createObjectURL(resp);
        window.open(fileURL);
      },
      error: (err) => {
        console.error('Error al generar el pdf', err);
        this.toast.error('Error al abrir el pdf', 'Error');
      }
    })
  }


}
