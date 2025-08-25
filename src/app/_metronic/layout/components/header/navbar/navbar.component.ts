import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsersService } from 'src/app/modules/users/service/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() appHeaderDefaulMenuDisplay: boolean;
  @Input() isRtl: boolean;

  avatar: string = '';

  itemClass: string = 'ms-1 ms-lg-3';
  btnClass: string = 'btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-35px h-35px w-md-40px h-md-40px';
  userAvatarClass: string = 'symbol-35px symbol-md-40px';
  btnIconClass: string = 'fs-2 fs-md-1';

  constructor(
    public usersService: UsersService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.loadUserFromStorage();
  }

  loadUserFromStorage() {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        this.avatar = user.avatar;
        this.cd.detectChanges();
      } catch (e) {
        console.error('Error parsing user from localStorage', e);
      }
    }
  }

  get avatarUrl(){
    if(this.avatar === 'https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg'){
      return this.avatar;
    }else{
      return 'http://10.168.0.108:8000' + this.avatar;
    }
  }

}
