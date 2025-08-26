import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsersService } from 'src/app/modules/users/service/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})

export class ProfileComponent implements OnInit {
  USER: any;

  fullname: string = '';
  email: string = '';
  avatar: string = '';
  phone: string = '';
  role: string = '';
  departamento:string = '';
  n_empleado: string = '';
  fecha_create: string = '';


  constructor(
    public usersService: UsersService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.me();
  }

  me(){
    this.usersService.listme().subscribe((data: any) =>{
      this.fullname = data.full_name;
      this.email = data.email;
      this.avatar = data.avatar;
      this.phone = data.phone;
      this.role = data.role_name;
      this.departamento = data.departamento;
      this.n_empleado = data.num_empleado;
      this.cd.detectChanges();
    });
  
  }
  get avatarUrl(){
    if(this.avatar === 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'){
      return this.avatar;
    }else{

      this.avatar = this.avatar.replace(
          "http://10.168.0.108/storage",
          "http://10.168.0.108:8000/storage"
        );
      return this.avatar
    }
  }
}
