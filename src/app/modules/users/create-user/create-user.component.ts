import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from '../service/users.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {

  @Output() UserC: EventEmitter<any> = new EventEmitter();
  
    isLoading:any;

    name:string = '';
    surname:string = '';
    email:string = '';
    phone:string = '';
    role_id:string = '';
    gender:string = '';
    n_document:string = '';
    type_document:string = 'DNI';
    address:string = '';

    constructor(
      public modal: NgbActiveModal,
      public userService: UsersService,
      public toast: ToastrService,
    ){
  
    }
  
    ngOnInit():void {
  
    }

    processFile($event: any){

    }
  
    store(){
      if(!this.name){
        this.toast.error("Validación", "El nombre es requerido");
        return false;
      }

      let data = {
        name: this.name,
      }
  
      
      this.userService.registerUser(data).subscribe((resp:any) => {
        if(resp.message == 403){
          this.toast.error("Validación", resp.message_text);
        }else{
          this.toast.success("Exito", "El Usuario se registro correctamento");
          this.UserC.emit(resp.user);
          this.modal.close();
        }
      })
    }
}
