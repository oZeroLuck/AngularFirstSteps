import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ReservationClass } from '../../models/reservation-class';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map} from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private reservationUrl = 'api/reservationList';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getAll(): Observable<ReservationClass[]> {
    return this.http.get<ReservationClass[]>(this.reservationUrl).pipe(
      tap(_ => console.log(`Fetched all reservations`)),
      catchError(this.handleError<ReservationClass>(`getAll`))
    );
  }

  getResByCustomer(id: number): Observable<ReservationClass[]> {
    const url = `http://localhost:8050/reservation/getById/${id}`;
    return this.http.get<ReservationClass[]>(url).pipe(
      tap(_ => console.log(`Fetched reservations of userId = ${id}`)),
      catchError(this.handleError<ReservationClass>(`getReservations with userId`))
    );
  }

  getResByVehicle(id: number): Observable<ReservationClass[]> {
    const url = `${this.reservationUrl}/?vehicleId=${id}`;
    return this.http.get<ReservationClass[]>(url).pipe(
      tap(_ => console.log(`Fetched reservations of vehicleId = ${id}`)),
      catchError(this.handleError<ReservationClass>(`getReservations with vehicleId`))
    );
  }

  getResByDates(startDate: string, endDate: string): Observable<ReservationClass[]> {
    return this.http.get<ReservationClass[]>(this.reservationUrl).pipe(
      map((o) => o.filter(res => {
        if (!(moment(res.startDate).subtract(1, 'day').isBefore(endDate)
              && moment(startDate).add(1, 'day').isBefore(res.endDate))) {
          return res;
        }
      }))
    );
  }

  add(reservation: ReservationClass): Observable<ReservationClass> {
    return this.http.post<ReservationClass>(this.reservationUrl, reservation, this.httpOptions).pipe(
      tap(_ => console.log(`Added new Reservation`)),
      catchError(this.handleError<ReservationClass>(`Add reservation`))
    );
  }

  update(reservation: ReservationClass): Observable<ReservationClass> {
    return this.http.put(this.reservationUrl, reservation, this.httpOptions).pipe(
      tap(_ => console.log(`Update reservation`)),
      catchError(this.handleError<ReservationClass>(`Update reservation`))
    );
  }

  delete(res: ReservationClass): Observable<ReservationClass> {
    const url = `${this.reservationUrl}/${res.id}`;

    return this.http.delete<ReservationClass>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Deleting res id = ${res.id}`)),
        catchError(this.handleError<ReservationClass>(`Delete Reservation`))
      );
  }

  getResById(resId: string): Observable<ReservationClass> {
    const url = `${this.reservationUrl}/${resId}`;

    return this.http.get<ReservationClass>(url).pipe(
      tap(_ => console.log(`Fetching resv w/ id = ${resId}`)),
      catchError(this.handleError<ReservationClass>(`Fetch res by Id`))
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
