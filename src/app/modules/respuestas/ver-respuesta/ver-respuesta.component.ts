import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RespuestaService } from '../service/respuesta.service';
import { ToastrService } from 'ngx-toastr';

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

  isLoading: any;

  constructor(
    public modal: NgbActiveModal,
    public respuestaService: RespuestaService,
    public toast: ToastrService,
  ) {
  }
  verPdf() {
    this.respuestaService.obtenerPDF(this.respuesta.id).subscribe({
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


}
