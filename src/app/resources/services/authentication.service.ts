import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { UserClass } from '../models/user-class';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private userService: UsersService) { }

  authenticate(username: string, password: string): Observable<any> {
    if (this.userService.getByUsername(username)) {
    return this.http.post<any>('api/authenticate', {username, password})
      .pipe(
        map(
          userData => {
            sessionStorage.setItem('username', username);
            const tokenStr = 'Bearer ' + userData.token;
            sessionStorage.setItem('token', tokenStr);
            return userData;
          }
        )
      );
    }
  }

  getCurrentUser(): any {
    return sessionStorage.getItem('username');
  }

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem('username');
    console.log(!(user === null));
    return !(user === null);
  }

  logOut(): void {
    sessionStorage.removeItem('username');
  }

}

export class User{
  constructor(
    public status: string
  ) {}
}

export class JwtResponse{
  constructor(
    public jwttoken: string
  ) {}
}
