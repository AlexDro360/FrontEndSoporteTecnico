import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudService } from '../service/solicitud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-solicitud',
  templateUrl: './edit-solicitud.component.html',
  styleUrls: ['./edit-solicitud.component.scss']
})
export class EditSolicitudComponent {

  @Output() SolicitudE: EventEmitter<any> = new EventEmitter();

  @Input() solicitud: any;   // 👈 solicitud a editar
  @Input() tipos: any[];     // 👈 tipos de problema
  @Input() user: any;        // 👈 usuario logueado

  isLoading: boolean = false;

  textoUser: string = '';
  textoRes: string = '';
  textoHora: string = '';
  tipo_id: string = '';

  constructor(
    public modal: NgbActiveModal,
    public solicitudService: SolicitudService,
    public toast: ToastrService,
  ) {}

  ngOnInit(): void {
    this.cargarSolicitud();
  }

  cargarSolicitud() {
    if (!this.solicitud) return;

    this.tipo_id = this.solicitud.idTipo;

    if (this.solicitud.descripcionUser) {
      const partes = this.solicitud.descripcionUser.split(' - ');
      this.textoUser = partes[0] || '';
      this.textoRes  = partes[1] || '';
      this.textoHora = partes[2] || '';
    }
  }

  update() {
    // 1. Validaciones (opcional)
    if (!this.tipo_id) {
       this.toast.error("Error", "El tipo es requerido");
       return;
    }

    this.isLoading = true;

    // ✅ CORRECCIÓN 1: Usar un Objeto JSON normal, NO FormData
    // Angular lo convertirá automáticamente a JSON y Laravel lo entenderá con PUT
    const data = {
      descripcionUser: `${this.textoUser} - ${this.textoRes} - ${this.textoHora}`,
      idTipo: this.tipo_id
    };

    this.solicitudService
      .updateSolicitud(this.solicitud.id, data)
      .subscribe({
        next: (resp: any) => {
          this.toast.success('Éxito', 'La solicitud fue actualizada correctamente');

          // ✅ CORRECCIÓN 2: Asegúrate de leer la propiedad correcta que envía Laravel.:

          const solicitudActualizada = resp.solicitud || resp.user; // Prevención de error

          this.SolicitudE.emit(solicitudActualizada);
          this.modal.close();
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err); // Para ver el error en consola
          this.toast.error('Error', 'No se pudo actualizar la solicitud');
          this.isLoading = false;
        }
      });
  }

}

