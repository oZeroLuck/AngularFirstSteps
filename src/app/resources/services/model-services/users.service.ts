import {Injectable} from '@angular/core';
import {UserClass} from '../../models/user-class';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {UpPswrdRequest} from '../../models/up-pswrd-request';

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

  add(customer: UserClass): Observable<UserClass> {
    return this.http.post<UserClass>(`${this.usersUrl}/create`, customer, {headers});
  }

  update(user: UserClass): Observable<any> {
    return this.http.put(`${this.usersUrl}/update`, user, {headers}).pipe(
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

  updatePwrd(req: UpPswrdRequest): Observable<UpPswrdRequest> {
    return this.http.put<UpPswrdRequest>(`${this.usersUrl}/update/password`, req, {headers})
      .pipe(
        tap(_ => console.log(`Updating pass`)),
        catchError(this.handleError<UserClass>(`updatePwrd`))
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

/*
.pipe(
      tap(_ => console.log(`Added new Customer`)),
      catchError(this.handleError<UserClass>(`Add Customer`)),
    )
 */
