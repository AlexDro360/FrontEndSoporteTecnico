import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigAdicionalesService } from '../service/config-adicionales.service';
import { finalize } from 'rxjs';
import { AuthService } from '../../auth';

@Component({
  selector: 'app-actualizar-solicitud',
  templateUrl: './actualizar-solicitud.component.html',
  styleUrls: ['./actualizar-solicitud.component.scss']
})
export class ActualizarSolicitudComponent implements OnInit {
  @Input() folio: any;
  @Output() FolioS: EventEmitter<any> = new EventEmitter();

  isLoading: boolean = false;
  folioOriginal: number = 0;
  
  folioClonado: any; 

  constructor(
    public modal: NgbActiveModal,
    public configService: ConfigAdicionalesService,
    public toast: ToastrService,
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    if(this.authService.isRoles([3])){
      this.folioOriginal = this.folio.folio;
    }else{
      this.folioOriginal = 1
    }
    
    this.folioClonado = { ...this.folio }; 
  }

  guardar() {
    if (this.folioClonado.folio === null || this.folioClonado.folio === undefined) {
      this.toast.error("Validación", "Por favor ingrese un folio válido.");
      return; 
    }

    if (this.folioClonado.folio < this.folioOriginal) {
      this.toast.warning(
        "Acción no permitida", 
        `El nuevo folio debe ser igual o mayor al folio actual (${this.folioOriginal}).`
      );
      this.folioClonado.folio = this.folioOriginal; 
      return; 
    }

    this.isLoading = true;
    
    this.configService.editarFolio(this.folioClonado)
      .pipe(finalize(() => this.isLoading = false))
      .subscribe({
        next: (resp) => {
          this.toast.success("Éxito", "Se editó el folio para el departamento " + this.folioClonado.nombre + " correctamente");
          this.FolioS.emit(resp);
          this.modal.close();
        },
        error: (err) => {
          console.error('Error al guardar los datos', err);
          if (err.error && err.error.message) {
             this.toast.warning("Atención", err.error.message);
          } else {
             this.toast.error('Error al guardar los datos', 'Error');
          }
        }
      });
  }
}