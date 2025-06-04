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
  @Input() folio: any;
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
    if (!this.folio.folio) {
      error = true;
      this.estadoF = true;
    }

    if (error) {
      return false;
    }

    this.configService.editarFolio(this.folio).subscribe({
      next: (resp) => {
        this.toast.success("Éxito", "Se edito el folio para el depertamento " + this.folio.nombre + " correctamente");
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
