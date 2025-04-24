import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RespuestaService } from '../service/respuesta.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-borrar-respuesta',
  templateUrl: './borrar-respuesta.component.html',
  styleUrls: ['./borrar-respuesta.component.scss']
})
export class BorrarRespuestaComponent {

  @Output() RespuestaE: EventEmitter<any> = new EventEmitter();
  @Input() respuesta: any;

  isLoading: any;

  constructor(
    public modal: NgbActiveModal,
    public respuestaService: RespuestaService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    console.log(this.respuesta.id)
  }

  delete() {
    this.respuestaService.borrarRespuesta(this.respuesta.id).subscribe({
      next: (resp) => {
        this.toast.success("Éxito", "Se elimino la respuesta correctamente");
        this.RespuestaE.emit(resp);
        this.modal.close();
      },
      error: (err) => {
        console.log(err);
        console.error('Error al cargar los datos', err);
        this.toast.error('Error al eliminar la respuesta', 'Error');
      }
    })
  }
}
