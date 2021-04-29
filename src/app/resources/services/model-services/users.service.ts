import { Injectable } from '@angular/core';
import { UserClass } from '../../models/user-class';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = 'api/usersList';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserClass[]> {
    const url = `${this.usersUrl}/?isAdmin=false`;
    return this.http.get<UserClass[]>(url)
      .pipe(
        tap(_ => console.log('Fetched Users')),
        catchError(this.handleError<UserClass[]>('getUsers', []))
      );
  }

  getById(id: number): Observable<UserClass> {
    const url = `${this.usersUrl}/${id}`;
    return this.http.get<UserClass>(url).pipe(
      tap(_ => console.log(`Fetched user-id=${id}`)),
      catchError(this.handleError<UserClass>(`User getById id=${id}`))
    );
  }

  getByUsername(username: string): Observable<UserClass> {
    const url = `${this.usersUrl}/?username=${username}`;
    return this.http.get<UserClass>(url).pipe(
      tap(_ => console.log(`Fetched username=${username}`)),
      catchError(this.handleError<UserClass>(`User usename=${username}`))
    );
  }

  add(customer: UserClass): Observable<UserClass> {
    return this.http.post<UserClass>(this.usersUrl, customer, this.httpOptions).pipe(
      tap((newCustomer: UserClass) => console.log(`Added new Customer w/ id=${newCustomer.id}`)),
      catchError(this.handleError<UserClass>(`Add Customer`))
    );
  }

  update(user: UserClass): Observable<any> {
    return this.http.put(this.usersUrl, user, this.httpOptions).pipe(
      tap(_ => console.log(`Updated user w/ id=${user.id}`)),
      catchError(this.handleError(`updateUser id=${user.id}`))
    );
  }

  delete(user: UserClass): Observable<UserClass> {
    const url = `${this.usersUrl}/${user.id}`;

    return this.http.delete<UserClass>(url, this.httpOptions)
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
