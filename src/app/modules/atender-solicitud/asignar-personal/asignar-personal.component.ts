import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AtenderSolicitudService } from '../service/atender-solicitud.service';
import { Time } from '@angular/common';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-asignar-personal',
  templateUrl: './asignar-personal.component.html',
  styleUrls: ['./asignar-personal.component.scss']
})
export class AsignarPersonalComponent {
  @Output() AsigTec: EventEmitter<any> = new EventEmitter();
  @Input() tecnicos: any;
  @Input() solicitud: any;

  isLoading: boolean = false;

  personalAtencion: number[] = [];
  horaAtencion: any;
  fechaAtencion: any;

  estadoPA: boolean = false;
  estadoFA: boolean = true;
  estadoHA: boolean = true;

  constructor(
    public atenderService: AtenderSolicitudService,
    public modal: NgbActiveModal,
    public toast: ToastrService,
  ) {
  }

  onTecnicoChange(event: any) {
    const tecnicoId = +event.target.value;

    if (event.target.checked) {
      if (this.personalAtencion.length < 4) {
        this.personalAtencion.push(tecnicoId);
      } else {
        event.target.checked = false;
        this.toast.warning("Técnicos", "Solo de pueden seleccionar maximo 4 técnicos");
      }
    } else {
      this.personalAtencion = this.personalAtencion.filter(id => id !== tecnicoId);
    }
  }

  isMaxSelected(tecnicoId: number): boolean {
    return this.personalAtencion.length >= 4 && !this.personalAtencion.includes(tecnicoId);
  }

  reiniciarAlertas(){
    this.estadoPA = false;
    this.estadoFA = false;
    this.estadoHA = false;
  }

  asignarTecnicos() {
    this.reiniciarAlertas();
    let error: boolean = false;

    if (this.personalAtencion.length === 0) {
      error = true;
      this.estadoPA = true;
    }

    if(error){
      return false;
    }
    
    const payload = {
      personalAtencion: this.personalAtencion,
      horaAtencion: this.horaAtencion,
      fechaAtencion: this.fechaAtencion
    };

    this.isLoading = true;
    this.atenderService.asignarTecnicos(payload, this.solicitud.id)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (resp: any) => {
        this.toast.success("Éxito", "Se asignaron los técnicos correctamente");
        this.AsigTec.emit(resp);
        this.modal.close();
      },
      error: (err: any) => {
        this.toast.error("Error", "Ocurrió un error al asignar técnicos");
        console.error(err);
      }
    });
  }

}
