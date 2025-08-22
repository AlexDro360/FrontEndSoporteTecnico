import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BitacoraService } from '../service/bitacora.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-borrar-bitacora',
  templateUrl: './borrar-bitacora.component.html',
  styleUrls: ['./borrar-bitacora.component.scss']
})
export class BorrarBitacoraComponent {
  @Output() BitacoraE: EventEmitter<any> = new EventEmitter();
  @Input() bitacora: any;
  isLoading: any;
  
  constructor(
    public modal: NgbActiveModal,
    public bitacoraService: BitacoraService,
    public toast: ToastrService,
  ) {}
  
  ngOnInit(): void {
    
  }
  
  delete() {
    this.bitacoraService.borrarBitacora(this.bitacora.id).subscribe({
      next: (resp) => {
        this.toast.success("Éxito", "Se elimino la bitacora correctamente");
        this.BitacoraE.emit(resp);
        this.modal.close();
      },
      error: (err) => {
        
        console.error('Error al cargar los datos', err);
        this.toast.error('Error al eliminar la bitácora', 'Error');
      }
    })
  }
}
