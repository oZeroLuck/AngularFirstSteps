import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private api = 'http://localhost:8050/auth';

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): any {

    const AuthString =  'Basic ' + window.btoa(username + ':' + password);

    const headers = new HttpHeaders(
      {Authorization: AuthString }
    );
    return this.http.get(`${this.api}/login/${username}`, {headers}).pipe(
      map(
        userData => {
          console.log(userData);
          this.checkPassword(userData, window.btoa(password));
          sessionStorage.setItem('AuthToken', 'ss');
          return userData;
        }
      )
    );
  }

  getCurrentUserId(): number {
    return parseInt(sessionStorage.getItem('id'), 10);
  }

  getCurrentUserName(): string {
    return sessionStorage.getItem('username');
  }

  getAuthToken(): string {
    if (this.isUserLoggedIn()) {
      return sessionStorage.getItem('AuthToken');
    } else {
      return '';
    }
  }

  isUserLoggedIn(): boolean {
    return !(sessionStorage.getItem('id') === null);
  }

  logOut(): void {
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('AuthToken');
  }

  checkPassword(user: any, password: string): void {
    console.log(password);

    sessionStorage.setItem('username', user.username);
    sessionStorage.setItem('id', user.id.toString());
    if (user.isAdmin) {
        console.log('Setting admin');
        sessionStorage.setItem('role', 'ADMIN');
      } else {
        console.log('Setting customer');
        sessionStorage.setItem('role', 'CUSTOMER');
      }
    // if (user.password === password) {}
    console.log(user);
  }

}

export class User{
  constructor(
    public status: string
  ) {}
}
