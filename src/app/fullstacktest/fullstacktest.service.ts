import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {VehicleClass} from '../resources/models/vehicle-class';
import {ReservationClass} from '../resources/models/reservation-class';

@Injectable({
  providedIn: 'root'
})
export class FullstacktestService {

  constructor(
    private httpClient: HttpClient) { }

  getGreetings(name: string): Observable<any> {
    return this.httpClient.get(`http://localhost:8050/api/hello/${name}`);
  }

  getVehicle(id: number): Observable<VehicleClass> {
    return this.httpClient.get<VehicleClass>(`http://localhost:8050/jpa/find`);
  }

  getReservations(): Observable<ReservationClass[]> {
    return this.httpClient.get<ReservationClass[]>(`http://localhost:8050/reservation/getAll`);
  }
}
