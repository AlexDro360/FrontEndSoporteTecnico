import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  
  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  registerRole(data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/roles";
    return this.http.post(URL,data,{headers: headers});
  }

  listRoles(page=1, perPage = 10, search:string = ''){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/roles?page="+page+"&search="+search + "&perPage=" + perPage;
    return this.http.get(URL,{headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    );
  }

  updateRole(ID_ROLE:String,data:any){
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/roles/"+ID_ROLE;
    return this.http.put(URL,data,{headers: headers});
  }

  deleteRole(ID_ROLE:String){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'Authorization': 'Bearer '+this.authservice.token});
    let URL = URL_SERVICIOS+"/roles/"+ID_ROLE;
    return this.http.delete(URL,{headers: headers}).pipe(
      finalize(()=> this.isLoadingSubject.next(false))
    );
  }
}
