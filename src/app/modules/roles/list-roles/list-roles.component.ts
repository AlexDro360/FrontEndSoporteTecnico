import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateRolesComponent } from '../create-roles/create-roles.component';
import { RolesService } from '../service/roles.service';
import { EditRolesComponent } from '../edit-roles/edit-roles.component';
import { DeleteRolesComponent } from '../delete-roles/delete-roles.component';
import { isPermission } from 'src/app/config/config';
import { CommonModule } from '@angular/common';
import { WatchRolesComponent } from '../watch-roles/watch-roles.component';


@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.scss']
})
export class ListRolesComponent {
  
  search:string = '';
  ROLES:any = [];
  isLoading$:any;
  myRoleId:any;

  totalPages:number = 0 ;
  currentPage:number = 1 ;
  pageSize: number = 10;

  constructor(
    public modalService: NgbModal,
    public rolesService: RolesService,
  ) {

  }

  ngOnInit(): void {
    this.isLoading$=this.rolesService.isLoading$;
    this.listRoles();
    this.myRole();
  }

  onChangeItemsPerPage() {
    this.listRoles();
  }

  listRoles(page =1){
    this.rolesService.listRoles(page, this.pageSize, this.search).subscribe((resp:any) => {
      console.log(resp);
      this.ROLES = resp.roles;
      this.totalPages = resp.total;
      this.currentPage = page;
    })
  }

  loadPage($event:any){
    this.listRoles($event);
  }

  createRol(){
    const modalRef = this.modalService.open(CreateRolesComponent,{centered:true, size: 'md'});

    modalRef.componentInstance.RoleC.subscribe((role:any) =>{
      this.ROLES.unshift(role);
    })
  }

  editRole(ROL:any){
    const modalRef = this.modalService.open(EditRolesComponent,{centered:true, size: 'md'});
    modalRef.componentInstance.ROLE_SELECTED = ROL;

    modalRef.componentInstance.RoleE.subscribe((role:any) =>{
      let INDEX = this.ROLES.findIndex((rol:any) => rol.id == ROL.id);
      if(INDEX != -1){
        this.ROLES[INDEX] = role;
      }
      //this.ROLES.unshift(role);
    })
  }

  watchRole(ROL:any){
    const modalRef = this.modalService.open(WatchRolesComponent,{centered:true, size: 'md'});
    modalRef.componentInstance.ROLE_SELECTED = ROL;
  }

  deleteRole(ROL:any){
    const modalRef = this.modalService.open(DeleteRolesComponent,{centered:true, size: 'md'});
    modalRef.componentInstance.ROLE_SELECTED = ROL;

    modalRef.componentInstance.RoleD.subscribe((role:any) =>{
      let INDEX = this.ROLES.findIndex((rol:any) => rol.id == ROL.id);
      if(INDEX != -1){
        this.ROLES.splice(INDEX,1);
      }
      //this.ROLES.unshift(role);
    })
  }

  isPermission(permission:string){
    return isPermission(permission);
  }

  myRole(){
    let USER_AUTH = JSON.parse(localStorage.getItem('user') ?? '');
    this.myRoleId=USER_AUTH.role_id;
  }
}
