import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class PermissionGeneralInterceptor implements HttpInterceptor {

  constructor(
    public router: Router,
    public toast: ToastrService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        console.error(response);
        if(response.status == 403){
          if(response.error.message == "This action is unauthorized."){
            this.router.navigate(['/']);
            this.toast.error("NO PERMITIDO", "No está autorizado para realizar esta acción");
          }
        }
        return throwError(response);
      })
    );
  }
}
