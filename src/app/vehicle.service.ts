import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { VehicleClass } from './vehicle-class';
import { VEHICLE_LIST } from './mock-vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  getVehicles(): Observable<VehicleClass[]> {
    return of(VEHICLE_LIST);
  }

  constructor() { }
}
