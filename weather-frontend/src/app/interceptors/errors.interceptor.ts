import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {
  constructor (private userService: UserService) {}

  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if ([401, 403].includes(err.status) && localStorage.getItem('user')) {
        this.userService.signOut();
      }

      const error = err.error?.message || err.statusText;
      console.error(err);
      return throwError(() => { throw (error); });
    }));
  }
}