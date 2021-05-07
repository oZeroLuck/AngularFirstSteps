import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private api = 'http://localhost:8050/auth';

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({'Content-type': 'application/json'});
    return this.http.post(`${this.api}/login`, {username, password}, {headers});
  }

  isUserLoggedIn(): boolean {
    return !(sessionStorage.getItem('auth-token') === null);
  }

  logOut(): void {
    window.sessionStorage.clear();
  }

}
