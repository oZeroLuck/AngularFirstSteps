import {Injectable} from '@angular/core';
import {UserClass} from '../../models/user-class';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';

const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  private usersUrl = 'http://localhost:8050/user';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserClass[]> {
    return this.http.get<UserClass[]>(`${this.usersUrl}/get/all`, {headers})
      .pipe(
        tap(_ => console.log('Fetched Users')),
        catchError(this.handleError<UserClass[]>('getUsers', []))
      );
  }

  getById(id: number): Observable<UserClass> {
    const url = `${this.usersUrl}/get/${id}`;
    return this.http.get<UserClass>(url).pipe(
      tap(_ => console.log(`Fetched user-id=${id}`)),
      catchError(this.handleError<UserClass>(`User getById id=${id}`))
    );
  }

  getByUsername(username: string): Observable<UserClass> {
    const url = `${this.usersUrl}/login/${username}`;
    return this.http.get<UserClass>(url).pipe(
      tap(_ => console.log(`Fetched username=${username}`)),
      catchError(this.handleError<UserClass>(`User usename=${username}`))
    );
  }

  add(customer: UserClass): Observable<UserClass> {
    return this.http.post<UserClass>(`${this.usersUrl}/create`, customer, {headers}).pipe(
      tap(_ => console.log(`Added new Customer`)),
      catchError(this.handleError<UserClass>(`Add Customer`))
    );
  }

  update(user: UserClass): Observable<any> {
    return this.http.put(`${this.usersUrl}/edit`, user, {headers}).pipe(
      tap(_ => console.log(`Updated user w/ id=${user.id}`)),
      catchError(this.handleError(`updateUser id=${user.id}`))
    );
  }

  delete(user: UserClass): Observable<UserClass> {
    const url = `${this.usersUrl}/delete/${user.id}`;

    return this.http.delete<UserClass>(url, {headers})
      .pipe(
        tap(_ => console.log(`Deleting user id=${user.id}`)),
        catchError(this.handleError<UserClass>(`deleteUser`))
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
