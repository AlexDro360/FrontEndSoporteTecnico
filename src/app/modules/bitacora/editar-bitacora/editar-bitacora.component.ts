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

  @Output() BitacoraE: EventEmitter<any> = new EventEmitter();
  @Input() bitacora: any;

  horas: number = 0;
  minutos: number = 0;

  estadoDF: boolean = false;
  estadoDS: boolean = false;
  estadoDM: boolean = false;
  estadoD: boolean = false;

  isLoading: any;

  constructor(

    public modal: NgbActiveModal,
    public bitacoraService: BitacoraService,
    public toast: ToastrService,


  ) {

  }

  ngOnInit(): void {
    this.horas = Math.floor(this.bitacora.duracion / 60);
    this.minutos = this.bitacora.duracion % 60;
  }

  reiniciarAlertas() {
    this.estadoDF = false;
    this.estadoDS = false;
    this.estadoDM = false;
    this.estadoD = false;
  }

  update() {
    this.bitacora.duracion = (this.horas * 60) + this.minutos;
    this.reiniciarAlertas();
    let error: boolean = false;

    if (!this.bitacora.descFalla) {
      // this.toast.error("Validación", "Es necesario describir la falla.");
      // return false;
      error = true;
      this.estadoDF = true;
    }

    if (this.bitacora.duracion == 0) {
      // this.toast.error("Validación", "Es necesario describir la falla");
      // return false;
      error = true;
      this.estadoD = true;
    }

    if (!this.bitacora.descSolucion) {
      // this.toast.error("Validación", "Es necesario describir la solución.");
      // return false;
      error = true;
      this.estadoDS = true;
    }

    if (!this.bitacora.materialReq) {
      // this.toast.error("Validación", "Ingrese los materiales que utilizó.");
      // return false;
      error = true;
      this.estadoDM = true;
    }

    // if (this.bitacora.descFalla.length < 10) {
    //   this.toast.warning("Validación", "Es necesario, mas descripción de la falla.");
    //   return false;
    // }

    // if (this.bitacora.descSolucion.length < 10) {
    //   this.toast.warning("Validación", "Es necesario, mas descripción de la solución.");
    //   return false;
    // }
    
    if (error) {
      return false;
    }

    this.bitacoraService.editarBitacora(this.bitacora).subscribe({
      next: (resp) => {
        this.toast.success("Éxito", "Se Actualizó la bitácora correctamente");
        this.BitacoraE.emit(resp);
        this.modal.close();
      },
      error: (err) => {
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
