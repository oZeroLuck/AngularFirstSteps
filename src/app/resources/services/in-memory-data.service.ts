import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  // tslint:disable-next-line:typedef
  createDb() {
    const usersList = [
      {id: 1, name: 'Giada', lastName: 'Sborchia', dateOfBirth: '1999-12-16'},
      {id: 2, name: 'Francesca', lastName: 'Mecca', dateOfBirth: new Date(1998, 12, 18)},
      {id: 3, name: 'Alice', lastName: 'Erba', dateOfBirth: new Date(2005, 9, 7)},
      {id: 4, name: 'Manuel', lastName: 'Tocchi', dateOfBirth: new Date(1989, 6, 23)},
      {id: 5, name: 'Luigi', lastName: 'Durso', dateOfBirth: new Date(1990, 5, 14)},
      {id: 6, name: 'Lorenzo', lastName: 'Gaggero', dateOfBirth: new Date(1993, 8, 12)},
      {id: 7, name: 'Francesca', lastName: 'Serratore', dateOfBirth: new Date(1970, 3, 15)},
      {id: 8, name: 'Aurora', lastName: 'Pelizzoni', dateOfBirth: new Date(2001, 7, 16)},
      {id: 9, name: 'Emma', lastName: 'Minoggio', dateOfBirth: new Date(1997, 11, 21)},
      {id: 10, name: 'Carlo', lastName: 'Amante', dateOfBirth: new Date(1995, 2, 21)},
      {id: 11, name: 'Alessandro', lastName: 'De Benedettis', dateOfBirth: new Date(1980, 1, 18)},
      {id: 12, name: 'Milena', lastName: 'Coffetti', dateOfBirth: new Date(1994, 3, 13)},
      {id: 13, name: 'Stefano', lastName: 'Viscardi', dateOfBirth: new Date(1987, 6, 28)}
    ];
    const vehicleList = [
      {id: 1, plate: 'DS635TD', brand: 'Ford', model: 'Fiesta', regYear: '2007'},
      {id: 2, plate: 'AS231FS', brand: 'Suzuki', model: 'Swift', regYear: '2012'},
      {id: 3, plate: 'ER268DS', brand: 'Hyundai', model: 'Kona', regYear: '2013'},
      {id: 4, plate: 'YT632BA', brand: 'Toyota', model: 'Yaris', regYear: '2005'}
    ];
    const reservationList = [
      {id: 1, userId: 1, vehicleId: 1, startDate: '2021-04-21', endDate: '2021-04-23', status: 'pending'},
      {id: 2, userId: 1, vehicleId: 2, startDate: '2021-04-22', endDate: '2021-05-28', status: 'approved'},
      {id: 3, userId: 1, vehicleId: 3, startDate: '2021-04-23', endDate: '2021-05-29', status: 'denied'},
      {id: 4, userId: 2, vehicleId: 4, startDate: '2021-04-24', endDate: '2021-05-30', status: 'pending'},
    ];
    return { usersList, vehicleList, reservationList };
    }
  constructor() { }
}
