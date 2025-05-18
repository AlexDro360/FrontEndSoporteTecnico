import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigAdicionalesService } from '../service/config-adicionales.service';

@Component({
  selector: 'app-actualizar-solicitud',
  templateUrl: './actualizar-solicitud.component.html',
  styleUrls: ['./actualizar-solicitud.component.scss']
})
export class ActualizarSolicitudComponent {
  @Input() folios: any;
  @Output() FolioS: EventEmitter<any> = new EventEmitter();

   isLoading: any;

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
    this.reiniciarAlertas();
    let error: boolean = false;
    if (!this.folios.FolioSolicitud) {
      // this.toast.error("Validación", "Es necesario describir la falla");
      // return false;
      error = true;
      this.estadoF = true;
    }

    if (error) {
      return false;
    }

    this.configService.editarFolio(this.folios).subscribe({
      next: (resp) => {
        this.toast.success("Éxito", "Se edito el folio de solicitud correctamente");
        this.FolioS.emit(resp);
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
