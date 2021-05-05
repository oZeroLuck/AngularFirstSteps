import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptService implements HttpInterceptor{

  constructor(private BasicAuth: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const AuthToken = this.BasicAuth.getAuthToken();
    const User = this.BasicAuth.getCurrentUserName();

    if (AuthToken && User) {
      req = req.clone({
          setHeaders :
            {
              Authorization: AuthToken
            }
        }
      );
    }

    return next.handle(req);
  }
}
