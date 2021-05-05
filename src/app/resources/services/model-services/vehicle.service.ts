import { Injectable } from '@angular/core';
import { VehicleClass } from '../../models/vehicle-class';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class VehicleService {
  private vehicleUrl = 'http://localhost8050/vehicle';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  getVehicles(): Observable<VehicleClass[]> {
    return this.http.get<VehicleClass[]>(`${this.vehicleUrl}/get/all`)
      .pipe(
        tap(_ => console.log('Fetched Vehicles')),
        catchError(this.handleError<VehicleClass[]>('getVehicles', []))
      );
  }

  getById(id: number): Observable<VehicleClass> {
    const url = `${this.vehicleUrl}/get/${id}`;
    return this.http.get<VehicleClass>(url).pipe(
      tap(_ => console.log(`Fetched vehicle-id=${id}`)),
      catchError(this.handleError<VehicleClass>(`Vehicle getById id=${id}`))
    );
  }

  add(vehicle: VehicleClass): Observable<VehicleClass> {
    return this.http.post<VehicleClass>(`${this.vehicleUrl}/create`, vehicle, this.httpOptions).pipe(
      tap((newVehicle: VehicleClass) => console.log(`Added new Vehicle w/ id=${newVehicle.id}`)),
      catchError(this.handleError<VehicleClass>(`Add Customer`))
    );
  }

  update(vehicle: VehicleClass): Observable<any> {
    return this.http.put(`${this.vehicleUrl}/update`, vehicle, this.httpOptions).pipe(
      tap(_ => console.log(`Updated vehicle w/ id=${vehicle.id}`)),
      catchError(this.handleError(`update vehicle id=${vehicle.id}`))
    );
  }

  delete(vehicle: VehicleClass): Observable<VehicleClass> {
    const url = `${this.vehicleUrl}/delete/${vehicle.id}`;

    return this.http.delete<VehicleClass>(url, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Deleting vehicle id=${vehicle.id}`)),
        catchError(this.handleError<VehicleClass>(`deleteVehicle`))
      );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: error` + error);
      return of(result as T);
    };
  }
}
