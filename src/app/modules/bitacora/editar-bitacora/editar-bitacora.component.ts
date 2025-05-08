import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BitacoraService } from '../service/bitacora.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-editar-bitacora',
  templateUrl: './editar-bitacora.component.html',
  styleUrls: ['./editar-bitacora.component.scss']
})
export class EditarBitacoraComponent {

  @Output() RespuestaA: EventEmitter<any> = new EventEmitter();
  @Input() bitacora: any;

  isLoading: any;

  constructor(

    public modal: NgbActiveModal,
    public bitacoraService: BitacoraService,
    public toast: ToastrService,


  ) {

  }

  ngOnInit(): void {
  }

  update() {
    if (!this.bitacora.descFalla) {
      this.toast.error("Validación", "Es necesario describir la falla.");
      return false;
    }

    if (!this.bitacora.descSolucion) {
      this.toast.error("Validación", "Es necesario describir la solución.");
      return false;
    }

    if (!this.bitacora.materialReq) {
      this.toast.error("Validación", "Ingrese los materiales que utilizó.");
      return false;
    }

    if (this.bitacora.descFalla.length < 10) {
      this.toast.warning("Validación", "Es necesario, mas descripción de la falla.");
      return false;
    }

    if (this.bitacora.descSolucion.length < 10) {
      this.toast.warning("Validación", "Es necesario, mas descripción de la solución.");
      return false;
    }

    this.bitacoraService.editarBitacora(this.bitacora).subscribe({
      next: (resp) => {
        this.toast.success("Éxito", "Se Actualizó la bitácora correctamente");
        this.RespuestaA.emit(resp);
        this.modal.close();
      },
      error: (err) => {
        console.log(err);
        console.error('Error al cargar los datos', err);
        this.toast.error('Error al actualizar los datos', 'Error');
      }
    })
  }
}

// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-editar-bitacora',
//   templateUrl: './editar-bitacora.component.html',
//   styleUrls: ['./editar-bitacora.component.scss']
// })
// export class EditarBitacoraComponent {

// }
