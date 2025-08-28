import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SIDEBAR } from 'src/app/config/config';
import { RolesService } from '../service/roles.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-roles',
  templateUrl: './delete-roles.component.html',
  styleUrls: ['./delete-roles.component.scss']
})
export class DeleteRolesComponent {
  @Output() RoleD: EventEmitter<any> = new EventEmitter();

  @Input() ROLE_SELECTED: any;

  name: string = '';

  isLoading: any;

  SIDEBAR: any = SIDEBAR;

  permisions: any = [];

  constructor(
    public modal: NgbActiveModal,
    public rolesService: RolesService,
    public toast: ToastrService,
  ) {

  }

  ngOnInit(): void {
    
  }

  delete2() {

    this.rolesService.deleteRole(this.ROLE_SELECTED.id).subscribe((resp: any) => {

      if (resp.message == 403) {
         this.toast.error("Validación", resp.message_text);
       } 
      if (resp.status == 200)
      {
        this.toast.warning("Exito", "El rol se eliminò correctamente");
        this.RoleD.emit(resp.role);
        this.modal.close();
      }
      else {
        this.toast.success("No se elimino ");
        this.RoleD.emit(resp.role);
        this.modal.close();
      }
    })
  }

  delete() {
  this.rolesService.deleteRole(this.ROLE_SELECTED.id).subscribe({
    next: (resp: any) => {
      if (resp.status === 200) {
        this.toast.success("Éxito se elimino", resp.message);  
        this.RoleD.emit(resp.role);
        this.modal.close();
      } 
      else if (resp.status === 300) {
        this.toast.warning("Atención tienes usuarios con este rol", resp.message); 
        this.RoleD.emit(resp.role);
        this.modal.close();
      } 
      else {
        this.toast.error("Error", "Ocurrió un problema al eliminar el rol.");
      }
    },
    
  });
}


}
