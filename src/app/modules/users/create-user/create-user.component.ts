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
  departamentos:any[]=[];
  isLoading:any;

    name:string = '';
    surnameM:string = '';
    surnameP:string = '';
    email:string = '';
    phone:string = '';
    role_id:string = '';
    n_empleado:string = '';
    departamento_id: any=null;

    
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
      this.userService.getDepartamentos().subscribe((data)=>{
        this.departamentos=data.departamento;
        const id_dep = this.departamentos.find(d => d.nombre === this.departamento_id);
        if (id_dep) {
          this.departamento_id = id_dep.id;
        }
      });
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

      if(!this.surnameP){
        this.toast.error("Validación", "El apellido paterno es requerido");
        return false;
      }

      if(!this.surnameM){
        this.toast.error("Validación", "El apellido materno es requerido");
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

      if (!this.n_empleado) {
        this.toast.error("Validación", "El Número de empleado es requerido");
        return false;
      }
    
      if (!this.departamento_id) {
        this.toast.error("Validación", "El Departamento es requerido");
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
      formData.append("surnameP",this.surnameP);
      formData.append("surnameM",this.surnameM);
      formData.append("email",this.email);
      formData.append("phone",this.phone);
      formData.append("role_id",this.role_id);
      formData.append("num_empleado", this.n_empleado);
      formData.append("departamento_id", this.departamento_id);


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
