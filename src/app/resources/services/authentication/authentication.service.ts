import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import {UsersService} from '../model-services/users.service';
import {UserClass} from '../../models/user-class';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // Future usage?
  private api = 'http://localhost:8050/auth';

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): any {
    return this.http.get(`${this.api}/login/${username}`).pipe(
      map(
        (userData: any) => {
          this.checkPassword(userData, password);
          return userData;
        }
      )
    );
  }

  getCurrentUser(): number {
    return parseInt(sessionStorage.getItem('id'), 10);
  }

  isUserLoggedIn(): boolean {
    return !(sessionStorage.getItem('id') === null);
  }

  logOut(): void {
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('token');
  }

  checkPassword(user: any, password: string): void {
    if (user.password === password) {
      sessionStorage.setItem('id', user.id.toString());
      if (user.isAdmin) {
        sessionStorage.setItem('role', 'ADMIN');
      } else {
        sessionStorage.setItem('role', 'CUSTOMER');
      }
    }
    console.log(user);
  }

}

export class User{
  constructor(
    public status: string
  ) {}
}
