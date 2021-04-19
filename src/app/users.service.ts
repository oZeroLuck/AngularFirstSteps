import { Injectable } from '@angular/core';
import { UsersClass } from './usersClass';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'api/usersList';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UsersClass[]> {
    return this.http.get<UsersClass[]>(this.usersUrl)
      .pipe(
        tap(_ => console.log('Fetched Users')),
        catchError(this.handleError<UsersClass[]>('getUsers', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
