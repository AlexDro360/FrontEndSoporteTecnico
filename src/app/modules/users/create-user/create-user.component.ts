import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  
    @Input() roles:any[];
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
    password:string = '';
    password_repit:string ='';

    file_name:any;
    imagen_previzualiza:any;

    constructor(
      public modal: NgbActiveModal,
      public userService: UsersService,
      public toast: ToastrService,
    ){
  
    }
  
    ngOnInit():void {
  
    }

    processFile($event: any) {
      
      if ($event.target.files[0].type.indexOf("image") <0) {
        this.toast.warning("WARN", "El archivo no es una imagen");
        return;
      }
    
      this.file_name = $event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(this.file_name);
      reader.onloadend = () => this.imagen_previzualiza = reader.result;
    }
    
  
    store(){
      if(!this.name){
        this.toast.error("Validación", "El nombre es requerido");
        return false;
      }

      if(!this.surname){
        this.toast.error("Validación", "El apellido es requerido");
        return false;
      }

      if(!this.email){
        this.toast.error("Validación", "El correo es requerido");
        return false;
      }

      if(!this.phone){
        this.toast.error("Validación", "El telefono es requerido");
        return false;
      }

      if(!this.role_id){
        this.toast.error("Validación", "El rol es requerido");
        return false;
      }

      if(!this.gender){
        this.toast.error("Validación", "El genero es requerido");
        return false;
      }

      if(!this.n_document){
        this.toast.error("Validación", "El tipo de documento es requerido");
        return false;
      }

      if(!this.type_document){
        this.toast.error("Validación", "El tipo de documento es requerido");
        return false;
      }

      if(!this.address){
        this.toast.error("Validación", "La direccion es requerida");
        return false;
      }

      if(!this.password){
        this.toast.error("Validación", "La contraseña es requerida");
        return false;
      }

      if(!this.password && this.password != this.password_repit){
        this.toast.error("Validación", "Las contraseña no son iguales");
        return false;
      }


      let formData = new FormData();
      formData.append("name",this.name);
      formData.append("surname",this.surname);
      formData.append("email",this.email);
      formData.append("phone",this.phone);
      formData.append("role_id",this.role_id);
      formData.append("gender",this.gender);
      formData.append("n_document",this.n_document);
      formData.append("type_document",this.type_document);
      formData.append("address",this.address);


      formData.append("imagen",this.file_name);
      formData.append("password",this.password);




  
      
      this.userService.registerUser(formData).subscribe((resp:any) => {
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
