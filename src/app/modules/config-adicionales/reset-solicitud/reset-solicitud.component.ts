import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigAdicionalesService } from '../service/config-adicionales.service';

@Component({
  selector: 'app-reset-solicitud',
  templateUrl: './reset-solicitud.component.html',
  styleUrls: ['./reset-solicitud.component.scss']
})
export class ResetSolicitudComponent {

  @Input() folio: any;
  @Output() ResetS: EventEmitter<any> = new EventEmitter();
  
    isLoading: any;
  
    constructor(
      public modalService: NgbModal,
      public modal: NgbActiveModal,
      public configService: ConfigAdicionalesService,
      public toast: ToastrService,
    ) {
  
    }
  
    reiniciar() {
      this.configService.resetSolicitud(this.folio.id).subscribe({
        next: (resp) => {
          this.toast.success("Éxito", "Se reinicio el folio de solicitudes para el departemento: " + this.folio.nombre + " correctamente");
          this.ResetS.emit(resp);
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
