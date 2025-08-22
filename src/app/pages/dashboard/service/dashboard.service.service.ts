import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { AuthService } from 'src/app/modules/auth';
import { URL_SERVICIOS } from 'src/app/config/config';


@Injectable({
  providedIn: 'root'
})
export class DashboardServiceService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getDatos(filtros: any) {
    this.isLoadingSubject.next(true);

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authservice.token,
    });

    const params = new HttpParams()
      .set('idDepartamento', filtros.idDepartamento ? filtros.idDepartamento.toString() : '')
      .set('idTipo', filtros.idTipo ? filtros.idTipo.toString() : '')
      .set('fechaInicio', filtros.fechaInicio || '')
      .set('fechaFin', filtros.fechaFin || '');

    const URL = `${URL_SERVICIOS}/reporte/datos-graficas`;

    return this.http.get(URL, { headers: headers, params: params }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  getFiltro() {
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + this.authservice.token,
    });
    const URL = `${URL_SERVICIOS}/reporte/filtro`;
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

}
