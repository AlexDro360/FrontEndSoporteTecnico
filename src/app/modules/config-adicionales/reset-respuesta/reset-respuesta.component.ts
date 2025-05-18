import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigAdicionalesService } from '../service/config-adicionales.service';

@Component({
  selector: 'app-reset-respuesta',
  templateUrl: './reset-respuesta.component.html',
  styleUrls: ['./reset-respuesta.component.scss']
})
export class ResetRespuestaComponent {
  @Output() ResetR: EventEmitter<any> = new EventEmitter();

  isLoading: any;

  constructor(
    public modalService: NgbModal,
    public modal: NgbActiveModal,
    public configService: ConfigAdicionalesService,
    public toast: ToastrService,
  ) {

  }

  reiniciar() {
    this.configService.resetRespuesta().subscribe({
      next: (resp) => {
        this.toast.success("Éxito", "Se reinicio el folio para Respuesta correctamente");
        this.ResetR.emit(resp);
        this.modal.close();
      },
      error: (err) => {
        console.log(err);
        console.error('Error al cargar los datos', err);
        this.toast.error('Error al guardar los cambios', 'Error');
      }
    })
  }
}
