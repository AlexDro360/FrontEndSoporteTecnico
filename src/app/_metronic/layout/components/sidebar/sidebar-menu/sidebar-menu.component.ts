import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/modules/auth';

@Component({
  selector: 'app-sidebar-menu',
  templateUrl: './sidebar-menu.component.html',
  styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.showMenu();
  }

  showMenu(permisos: any = []) {
    let user = JSON.parse(localStorage.getItem('user') ?? '');
    if(this.isRole()) {
      return true;
    }
    let permissions = user.permissions;
    let is_show = false;
    permisos.forEach((permiso:any) => {
      if(permissions.includes(permiso)) {
        is_show = true;
      }
    });
    return is_show;
  }

  isRole(){
    let user = JSON.parse(localStorage.getItem('user') ?? '{}');
    return user.role_name == 'Super-Admin' ? true : false;
  }

}
