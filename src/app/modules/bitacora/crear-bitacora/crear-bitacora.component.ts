import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BitacoraService } from '../service/bitacora.service';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-crear-bitacora',
  templateUrl: './crear-bitacora.component.html',
  styleUrls: ['./crear-bitacora.component.scss']
})
export class CrearBitacoraComponent {
  @Output() BitacoraN: EventEmitter<any> = new EventEmitter();
  @Input() solicitud: any;
  @Input() tiposProblemas: any;
  @Input() user: any;


  isLoading: boolean = false;

  estadoSolucion: boolean = true;
  idTipoSeleccionado: number;

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
    if (this.solicitud && this.solicitud.idTipo) {
      this.idTipoSeleccionado = this.solicitud.idTipo;
    }
  }

  reiniciarAlertas() {
    this.estadoDF = false;
    this.estadoDS = false;
    this.estadoDM = false;
    this.estadoD = false;
  }

  store() {
    if (this.estadoSolucion) {
      this.duracion = (this.horas * 60) + this.minutos;
      // this.reiniciarAlertas();
      // let error: boolean = false;
      // if (!this.falla) {
      //   error = true;
      //   this.estadoDF = true;
      // }

      // if (this.duracion == 0) {
      //   error = true;
      //   this.estadoD = true;
      // }

      // if (!this.solucion) {
      //   error = true;
      //   this.estadoDS = true;
      // }

      // if (!this.materiales) {
      //   error = true;
      //   this.estadoDM = true;
      // }

      // if (error) {
      //   return false;
      // }

      let formData = new FormData();
      formData.append('descFalla', this.falla)
      formData.append('descSolucion', this.solucion);
      formData.append('materialReq', this.materiales);
      formData.append('duracion', this.duracion.toString());
      formData.append('idSolicitud', this.solicitud.id);
      formData.append('idTipo', this.idTipoSeleccionado.toString());

      this.isLoading = true;
      this.bitacoraService.crearBitacora(formData)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (resp) => {
            this.toast.success("Éxito", "Se creo la bitacora correctamente");
            this.BitacoraN.emit(resp);
            this.modal.close();
          },
          error: (err) => {
            console.error('Error al cargar los datos', err);
            this.toast.error('Error al guardar los datos', 'Error');
          }
        })
    } else {
      this.bitacoraService.noSolucionada(this.solicitud.id)
        .pipe(finalize(() => this.isLoading = false))
        .subscribe({
          next: (resp) => {
            this.toast.success("Éxito", "Solicitud asignada como no solucionada");
            this.BitacoraN.emit(resp);
            this.modal.close();
          },
          error: (err) => {
            console.error('Error al cambiar el estado de la solicitud', err);
            this.toast.error('Error al guardar los datos', 'Error');
          }
        })
    }
  }

}
