import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { UsersService } from './users.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'api/tokenDb';

  constructor(
    private http: HttpClient,
    private userService: UsersService) { }

  authenticate(username: string, password: string): Observable<any> {
    if (this.userService.getByUsername(username)) {
    return this.http.post<any>(this.apiUrl, {username, password})
      .pipe(
        map(
          userData => {
            sessionStorage.setItem('username', username);
            const tokenStr = 'Bearer ' + userData.token;
            sessionStorage.setItem('token', tokenStr);
            if (this.userService.getByUsername(username).pipe(
              map(user => user.isAdmin)
            )) {
              sessionStorage.setItem('role', 'ADMIN');
            } else {
              sessionStorage.setItem('role', 'CUSTOMER');
            }
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
