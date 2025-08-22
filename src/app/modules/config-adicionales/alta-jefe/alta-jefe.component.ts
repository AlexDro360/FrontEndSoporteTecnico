import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ConfigAdicionalesService } from '../service/config-adicionales.service';

@Component({
  selector: 'app-alta-jefe',
  templateUrl: './alta-jefe.component.html',
  styleUrls: ['./alta-jefe.component.scss']
})
export class AltaJefeComponent {
  @Input() jefe: any;
  @Output() JefeAl: EventEmitter<any> = new EventEmitter();

  isLoading: any;

  constructor(
    public modal: NgbActiveModal,
    public configService: ConfigAdicionalesService,
    public toast: ToastrService) { }

  ngOnInit(): void {
  }

  aceptar() {
    this.jefe.estado = true;
    this.configService.editarJefe(this.jefe).subscribe({
      next: (resp) => {
        this.toast.success("Éxito", "Se dio de alta al jefe correctamente");
        this.JefeAl.emit(resp);
        this.modal.close();
      },
      error: (err) => {
        console.error('Error al cargar los datos', err);
        this.toast.error('Error al guardar los datos', 'Error');
      }
    })
  }
}
