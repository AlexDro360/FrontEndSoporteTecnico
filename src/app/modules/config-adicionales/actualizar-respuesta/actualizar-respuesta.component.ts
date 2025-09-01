import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigAdicionalesService } from '../service/config-adicionales.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-actualizar-respuesta',
  templateUrl: './actualizar-respuesta.component.html',
  styleUrls: ['./actualizar-respuesta.component.scss']
})
export class ActualizarRespuestaComponent {
  @Input() folios:any;
  @Output() FolioR: EventEmitter<any> = new EventEmitter();

   isLoading: boolean = false;

   estadoF: boolean = false;

   constructor(
    public modal: NgbActiveModal,
    public configService: ConfigAdicionalesService,
    public toast: ToastrService) { }

  ngOnInit(): void {
  }

  reiniciarAlertas() {
    this.estadoF = false;
  }

  guardar() {
    // this.reiniciarAlertas();
    // let error: boolean = false;
    // if (!this.folios.FolioRespuesta) {
    //   // this.toast.error("Validación", "Es necesario describir la falla");
    //   // return false;
    //   error = true;
    //   this.estadoF = true;
    // }

    // if (error) {
    //   return false;
    // }

    this.isLoading = true;
    this.configService.EditRespuesta(this.folios)
    .pipe(finalize(() => this.isLoading = false))
    .subscribe({
      next: (resp) => {
        this.toast.success("Éxito", "Se edito el folio de respuesta correctamente");
        this.FolioR.emit(resp);
        this.modal.close();
      },
      error: (err) => {
        console.error('Error al cargar los datos', err);
        this.toast.error('Error al guardar los datos', 'Error');
      }
    })
  }
}
