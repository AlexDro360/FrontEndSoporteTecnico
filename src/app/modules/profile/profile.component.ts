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
      this.departamento = data.departamento_id;
      this.n_empleado = data.num_empleado;
      this.fecha_create = data.created_format_at;
      this.cd.detectChanges();
    });
    //console.log(this.n_empleado);
  }
}
