import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BitacoraService } from '../service/bitacora.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-bitacora',
  templateUrl: './crear-bitacora.component.html',
  styleUrls: ['./crear-bitacora.component.scss']
})
export class CrearBitacoraComponent {
  @Output() BitacoraN: EventEmitter<any> = new EventEmitter();
  @Input() idSolicitud: any;
  @Input() user: any;


  isLoading: any;

  falla: string = '';
  solucion: string = '';
  materiales: string = '';
  horas: number = 0;
  minutos: number = 0;
  duracion: number = 0;

  estadoDF: boolean = false;
  estadoDS: boolean = false;
  estadoDM: boolean = false;
  estadoD: boolean = false;

  constructor(
    public modal: NgbActiveModal,
    public bitacoraService: BitacoraService,
    public toast: ToastrService) { }

  ngOnInit(): void {
    console.log(this.user);
  }

  reiniciarAlertas() {
    this.estadoDF = false;
    this.estadoDS = false;
    this.estadoDM = false;
    this.estadoD = false;
  }

  store() {
    this.duracion = (this.horas * 60) + this.minutos;
    this.reiniciarAlertas();
    let error: boolean = false;
    if (!this.falla) {
      // this.toast.error("Validación", "Es necesario describir la falla");
      // return false;
      error = true;
      this.estadoDF = true;
    }

    if (this.duracion == 0) {
      // this.toast.error("Validación", "Es necesario describir la falla");
      // return false;
      error = true;
      this.estadoD = true;
    }

    if (!this.solucion) {
      // this.toast.error("Validación", "Es necesario describir la solución");
      // return false;
      error = true;
      this.estadoDS = true;
    }

    if (!this.materiales) {
      // this.toast.error("Validación", "Es necesario escribir los materiales ocupados");
      // return false;
      error = true;
      this.estadoDM = true;
    }

    if (error) {
      return false;
    }

    let formData = new FormData();
    formData.append('descFalla', this.falla)
    formData.append('descSolucion', this.solucion);
    formData.append('materialReq', this.materiales);
    formData.append('duracion', this.duracion.toString());
    formData.append('idSolicitud', this.idSolicitud);

    this.bitacoraService.crearBitacora(formData).subscribe({
      next: (resp) => {
        this.toast.success("Éxito", "Se creo la bitacora correctamente");
        this.BitacoraN.emit(resp);
        this.modal.close();
      },
      error: (err) => {
        console.log(err);
        console.error('Error al cargar los datos', err);
        this.toast.error('Error al guardar los datos', 'Error');
      }
    })
  }
}
// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-crear-bitacora',
//   templateUrl: './crear-bitacora.component.html',
//   styleUrls: ['./crear-bitacora.component.scss']
// })
// export class CrearBitacoraComponent {

// }
