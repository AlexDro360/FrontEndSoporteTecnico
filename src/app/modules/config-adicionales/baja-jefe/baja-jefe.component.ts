import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigAdicionalesService } from '../service/config-adicionales.service';

@Component({
  selector: 'app-baja-jefe',
  templateUrl: './baja-jefe.component.html',
  styleUrls: ['./baja-jefe.component.scss']
})
export class BajaJefeComponent {
  @Input() jefe: any;
  @Output() JefeB: EventEmitter<any> = new EventEmitter();

  isLoading: any;

  constructor(
    public modal: NgbActiveModal,
    public configService: ConfigAdicionalesService,
    public toast: ToastrService) { }

  ngOnInit(): void {
  }

  aceptar() {
    this.jefe.estado = false;
    this.configService.editarJefe(this.jefe).subscribe({
      next: (resp) => {
        this.toast.success("Éxito", "Se dio de baja al jefe correctamente");
        this.JefeB.emit(resp);
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
