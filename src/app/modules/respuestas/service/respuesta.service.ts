import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, finalize } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  private loadingCounter = 0;

  constructor(
    private http: HttpClient,
    public authservice: AuthService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  crearRespuestas(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/respuesta/agregar";
    return this.http.post(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  editarRespuesta(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/respuesta/editar/${data.id}`;
    return this.http.put(URL, data, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  borrarRespuesta(data: any) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = `${URL_SERVICIOS}/respuesta/borrar/${data}`;
    return this.http.delete(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  listarRespuestas(page = 1) {
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/respuesta?page=" + page;
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  tiposServicios() {
    this.setLoading(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/tiposervicios";
    return this.http.get(URL, { headers: headers }).pipe(
      finalize(() => this.setLoading(false))
    );
  }

  tiposMantenimientos() {
    this.setLoading(true);
    // this.setLoading(true);
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/tipomantenimientos";
    return this.http.get(URL, { headers: headers }).pipe(
      // finalize(() => this.setLoading(false))
      finalize(() => this.setLoading(false))

    );
  }

  listme() {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.authservice.token });
    let URL = URL_SERVICIOS + "/auth/me";

    return this.http.post(URL, {}, { headers }).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  private setLoading(estado: boolean) {
    if ((estado && this.loadingCounter == 0)) {
      this.loadingCounter++;
      this.isLoadingSubject.next(estado);
    } else if (!estado && this.loadingCounter == 1) {
      this.loadingCounter--;
      this.isLoadingSubject.next(estado);
    }
  }
}
