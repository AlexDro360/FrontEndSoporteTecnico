import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigAdicionalesService } from '../service/config-adicionales.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-editar-jefe',
  templateUrl: './editar-jefe.component.html',
  styleUrls: ['./editar-jefe.component.scss']
})
export class EditarJefeComponent {

  @Input() jefe: any;
  @Output() JefeE: EventEmitter<any> = new EventEmitter();

  isLoading: boolean = false;

  nombres: string = '';
  apellidoP: string = '';
  apellidoM: string = '';

  estadoN: boolean = false;
  estadoAP: boolean = false;
  estadoAM: boolean = false;

  constructor(
    public modal: NgbActiveModal,
    public configService: ConfigAdicionalesService,
    public toast: ToastrService) { }

  ngOnInit(): void {
  }

  reiniciarAlertas() {
    this.estadoN = false;
    this.estadoAP = false;
    this.estadoAM = false;
  }

  guardar() {
    this.reiniciarAlertas();
    let error: boolean = false;
    if (!this.jefe.nombres) {
      // this.toast.error("Validación", "Es necesario describir la falla");
      // return false;
      error = true;
      this.estadoN = true;
    }

    if (!this.jefe.apellidoP) {
      // this.toast.error("Validación", "Es necesario describir la solución");
      // return false;
      error = true;
      this.estadoAP = true;
    }

    if (!this.jefe.apellidoM) {
      // this.toast.error("Validación", "Es necesario escribir los materiales ocupados");
      // return false;
      error = true;
      this.estadoAM = true;
    }

    if (error) {
      return false;
    }

    this.isLoading = true;
    this.configService.editarJefe(this.jefe)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (resp) => {
          this.toast.success("Éxito", "Se edito la información del jefe correctamente");
          this.JefeE.emit(resp);
          this.modal.close();
        },
        error: (err) => {
          console.error('Error al cargar los datos', err);
          this.toast.error('Error al guardar los datos', 'Error');
        }
      })
  }
}
