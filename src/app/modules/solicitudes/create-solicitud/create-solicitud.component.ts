import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SolicitudService } from '../service/solicitud.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-solicitud',
  templateUrl: './create-solicitud.component.html',
  styleUrls: ['./create-solicitud.component.scss']
})
export class CreateSolicitudComponent {
  @Output() SolicitudC: EventEmitter<any> = new EventEmitter();
  @Input() tipos: any[];
  @Input() user: any;

  departamentos: any[] = [];
  isLoading: boolean = false;

  textoUser: string = '';
  phone: string = '';
  tipo_id: string = '';

  constructor(
    public modal: NgbActiveModal,
    public solicitudService: SolicitudService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void { }

  store(){
    // if(!this.tipo_id){
    //   this.toast.error("Validación", "El Tipo de Problema es requerido");
    //   return false;
    // }

    // if(!this.textoUser){
    //   this.toast.error("Validación", "La Descripción del Problema es requerida");
    //   return false;
    // }

    // if(this.textoUser.length < 15){
    //   this.toast.warning("Validación", "Es necesario, mas Descripción del Problema");
    //   return false;
    // }
    

    let formData = new FormData();
    formData.append('idUser', this.user.id);
    formData.append('descripcionUser', this.textoUser);
    formData.append('idTipo', this.tipo_id);
    this.isLoading = true;
    this.solicitudService.registerSolicitud(formData).subscribe((resp:any) => {
      if(resp.message == 403){
        this.toast.error("Validación", resp.message_text);
      }else{
        this.toast.success("Éxito", "Se Creo la Solicitud correctamente");
        this.SolicitudC.emit(resp.solicitud);
        this.modal.close();
      }
      this.isLoading = false;
    })
  }

}
