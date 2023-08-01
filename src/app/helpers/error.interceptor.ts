import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MenuService } from '../services/menu.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private menuService: MenuService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if ([401, 403].includes(err.status)) {
          // auto logout if 401 or 403 response returned from api

          this.menuService.logout();
        }

        // let error =
        //   (err && err.error && err.error.message) ||
        //   err.error.data ||
        //   err.statusText;
        // if (error.includes('Firebase: Error (auth/user-not-found).'))
        //   error = 'User Not Found';
        // if (error.includes('Firebase: Error (auth/wrong-password).'))
        //   error = 'Please enter the correct Password';
        return throwError(() => err);
      })
    );
  }
}
