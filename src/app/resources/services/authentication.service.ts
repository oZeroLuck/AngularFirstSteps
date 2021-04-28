import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { InMemoryDataService } from './in-memory-data.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiUrl = 'api/tokenDb';

  constructor(
    private http: HttpClient,
    private inMemory: InMemoryDataService) { }

  authenticate(username: string, password: string): any {
    return this.inMemory.authenticate({username, password}).pipe(
      map(
        (userData: any) => {
          console.log(userData.body);
          sessionStorage.setItem('id', userData.body.id);
          sessionStorage.setItem('role', userData.body.role);
          return userData;
        }
      )
    );
  }

  getCurrentUser(): number {
    return parseInt(sessionStorage.getItem('id'), 10);
  }

  isUserLoggedIn(): boolean {
    console.log('id: ' + sessionStorage.getItem('id'));
    console.log('role: ' + sessionStorage.getItem('role'));
    return !(sessionStorage.getItem('id') === null);
  }

  logOut(): void {
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('token');
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
