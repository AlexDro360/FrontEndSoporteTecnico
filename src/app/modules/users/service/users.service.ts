import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  id :string = "";

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
    this.me();
  }

  registerUser(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/users";
    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  listUsers(page = 1, perPage = 10, search: string = '') {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/users?page=" + page + "&search=" + search + "&perPage=" + perPage;
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  configAll() {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/users/config";
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateUser(ID_USER: String, data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/users/" + ID_USER;
    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  deleteUser(ID_ROLE: String) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/users/" + ID_ROLE;
    return this.http.delete(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  listme() {
    let headers = new HttpHeaders({ 'Authorization':'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS +"/auth/me";

    return this.http.post(URL, {}, { headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  me(){
    this.listme().subscribe((data: any) =>{
      this.id = data.id;
    });
  }

    getDepartamentos(): Observable<any>{
      let URL = URL_SERVICIOS +"/departamentos";
      return this.http.get<any[]>(URL);
    }
  

}
