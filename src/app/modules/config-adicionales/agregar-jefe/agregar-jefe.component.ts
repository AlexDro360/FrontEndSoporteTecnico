import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigAdicionalesService } from '../service/config-adicionales.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-agregar-jefe',
  templateUrl: './agregar-jefe.component.html',
  styleUrls: ['./agregar-jefe.component.scss']
})
export class AgregarJefeComponent {

  @Output() JefeA: EventEmitter<any> = new EventEmitter();

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
    if (!this.nombres) {
      // this.toast.error("Validación", "Es necesario describir la falla");
      // return false;
      error = true;
      this.estadoN = true;
    }

    if (!this.apellidoP) {
      // this.toast.error("Validación", "Es necesario describir la solución");
      // return false;
      error = true;
      this.estadoAP = true;
    }

    if (!this.apellidoM) {
      // this.toast.error("Validación", "Es necesario escribir los materiales ocupados");
      // return false;
      error = true;
      this.estadoAM = true;
    }

    if (error) {
      return false;
    }

    let formData = new FormData();
    formData.append('nombres', this.nombres)
    formData.append('apellidoP', this.apellidoP);
    formData.append('apellidoM', this.apellidoM);

    this.isLoading = true;
    this.configService.agregarJefe(formData)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (resp) => {
        this.toast.success("Éxito", "Se agregó el nuevo jefe correctamente");
        this.JefeA.emit(resp);
        this.modal.close();
      },
      error: (err) => {
        console.error('Error al cargar los datos', err);
        this.toast.error('Error al guardar los datos', 'Error');
      }
    })
  }
}
