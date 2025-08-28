import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class AtenderSolicitudService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  asignarTecnicos(data: any, idSolicitud: any) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/atencion_solicitud/asignar/${idSolicitud}`;
    return this.http.post(URL, data, { headers: headers });
  }
}
