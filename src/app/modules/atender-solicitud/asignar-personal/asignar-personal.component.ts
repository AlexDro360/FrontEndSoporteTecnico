import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-asignar-personal',
  templateUrl: './asignar-personal.component.html',
  styleUrls: ['./asignar-personal.component.scss']
})
export class AsignarPersonalComponent {
  @Output() AsigTec: EventEmitter<any> = new EventEmitter();
  @Input() tecnicos: any;
  @Input() solicitud: any;

  isLoading: any;

  tecnicosSeleccionados: number[] = [];

  constructor(
  
      public modal: NgbActiveModal,
      public toast: ToastrService,
  
  
    ) {
  
    }
  


  onTecnicoChange(event: any) {
    const tecnicoId = +event.target.value;

    if (event.target.checked) {
      if (this.tecnicosSeleccionados.length < 4) {
        this.tecnicosSeleccionados.push(tecnicoId);
      } else {
        event.target.checked = false;
      }
    } else {
      this.tecnicosSeleccionados = this.tecnicosSeleccionados.filter(id => id !== tecnicoId);
    }
  }

  isMaxSelected(tecnicoId: number): boolean {
    return this.tecnicosSeleccionados.length >= 4 && !this.tecnicosSeleccionados.includes(tecnicoId);
  }

  asignarTecnicos(){

  }
}
