import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const access_token: any = sessionStorage.getItem('access_token'); //this.authenticationService.userValue;

    const isApiUrl = request.url.includes('rest'); //startsWith(environment.apiUrl)
    if (access_token && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: access_token, //"beaarer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjgyMDkwNTUyLCJzdWIiOiI0YmE5YTFjOC0xZmY4LTQ3MDgtOWZkMi03MzFjMTExMTAxNzgiLCJlbWFpbCI6ImRvZGRhcGFuaXJvaGl0MTIzQGdtYWlsLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnt9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNjgyMDg2ODQ3fV0sInNlc3Npb25faWQiOiJhMGYzMDY2Zi05MjU3LTRiNDItYjI2MC1hMWMzMDhjOGI4ODUifQ.j_3cqMms6NnPhpp8UIPxJuu-oHWb1653d_T5MDVglJI",
        }, //access_token },
      });
    }
    // request = request.clone({
    //   setHeaders: {
    //     apiKey: environment.apiKey,
    //     'Content-Type': 'application/json',
    //   },
    // });
    return next.handle(request);
  }
}
