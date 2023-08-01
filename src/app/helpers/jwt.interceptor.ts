import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { MenuService } from '../services/menu.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private menuService: MenuService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const user: any = sessionStorage.getItem(`accessToken`);
    const isLoggedIn: any = user;
    if (
      (request.url.includes('login') == false ||
        request.url.includes('signup') == false) &&
      isLoggedIn
    ) {
      const isApiUrl = request.url.startsWith(environment.baseURL);
      if (isLoggedIn) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${isLoggedIn}` },
        });
      }
    }

    return next.handle(request);
  }
}
