import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateUserComponent } from '../create-user/create-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { WatchUserComponent } from '../watch-user/watch-user.component';
import { UsersService } from '../service/users.service';
import { isPermission } from 'src/app/config/config';
import { CommonModule } from '@angular/common';
import { UpUserComponent } from '../up-user/up-user.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent {
  search: string = '';
  USERS: any = [];
  isLoading$: any;
  imagen:any[];
  roles: any[];

  totalPages: number = 0;
  currentPage: number = 1;
  pageSize: number = 10;
  constructor(
    public modalService: NgbModal,
    public usersService: UsersService,
    private sanitizer: DomSanitizer,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$ = this.usersService.isLoading$;
    this.listUsers();
    this.configAll();
  }

  onChangeItemsPerPage() {
    this.listUsers();
  }

  listUsers(page = 1) {
  this.usersService.listUsers(page, this.pageSize, this.search).subscribe((resp: any) => {
    this.USERS = resp.users;
    this.totalPages = resp.total;
    this.currentPage = page;

    this.USERS.forEach((user: any) => {
      if (user.avatar) {
        user.avatar = user.avatar.replace(
          "http://10.168.0.108/storage",
          "http://10.168.0.108:8000/storage"
        );
      }
    });
  });
}

  configAll() {
    this.usersService.configAll().subscribe((resp: any) => {
      this.roles = resp.roles;
    })
  }

  loadPage($event: any) {
    this.listUsers($event);
  }

  createUser() {
    const modalRef = this.modalService.open(CreateUserComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.roles = this.roles;

    modalRef.componentInstance.UserC.subscribe((role: any) => {
      this.USERS.unshift(role);
    })
  }

  editUser(USER: any) {
    const modalRef = this.modalService.open(EditUserComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.USER_SELECTED = USER;
    modalRef.componentInstance.roles = this.roles;

    modalRef.componentInstance.UserE.subscribe((user: any) => {
      let INDEX = this.USERS.findIndex((user: any) => user.id == USER.id);
      if (INDEX != -1) {
        this.USERS[INDEX] = user;
      }
    })
  }

  deleteUser(USER: any) {
    const modalRef = this.modalService.open(DeleteUserComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.USER_SELECTED = USER;

    modalRef.componentInstance.UserD.subscribe((user: any) => {
      let INDEX = this.USERS.findIndex((user: any) => user.id == USER.id);
      if (INDEX != -1) {
        this.USERS.splice(INDEX, 1);
      }
    })
  }

  altaUser(USER: any) {
    const modalRef = this.modalService.open(UpUserComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.USER_SELECTED = USER;

    modalRef.componentInstance.UserD.subscribe((user: any) => {
      let INDEX = this.USERS.findIndex((user: any) => user.id == USER.id);
      if (INDEX != -1) {
        this.USERS.splice(INDEX, 1);
      }
    })
  }

  watchUser(USER: any) {
    const modalRef = this.modalService.open(WatchUserComponent, { centered: true, size: 'md' });
    modalRef.componentInstance.USER_SELECTED = USER;
  }

  isPermission(permission: string) {
    return isPermission(permission);
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
