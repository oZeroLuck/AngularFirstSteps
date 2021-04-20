import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  // tslint:disable-next-line:typedef
  createDb() {
    const usersList = [
      {id: 1, name: 'Giada', lastName: 'Sborchia'},
      {id: 2, name: 'Francesca', lastName: 'Mecca'},
      {id: 3, name: 'Alice', lastName: 'Erba'},
      {id: 4, name: 'Manuel', lastName: 'Tocchi'},
      {id: 5, name: 'Luigi', lastName: 'Durso'},
      {id: 6, name: 'Lorenzo', lastName: 'Gaggero'},
      {id: 7, name: 'Francesca', lastName: 'Serratore'},
      {id: 8, name: 'Aurora', lastName: 'Pelizzoni'},
      {id: 9, name: 'Emma', lastName: 'Minoggio'},
      {id: 10, name: 'Carlo', lastName: 'Amante'},
      {id: 11, name: 'Alessandro', lastName: 'De Benedettis'},
      {id: 12, name: 'Milena', lastName: 'Coffetti'},
      {id: 13, name: 'Stefano', lastName: 'Viscardi'}
    ];
    const vehicleList = [
      {id: 1, plate: 'DS635TD', brand: 'Ford', model: 'Fiesta'},
      {id: 2, plate: 'AS231FS', brand: 'Suzuki', model: 'Swift'},
      {id: 3, plate: 'ER268DS', brand: 'Hyundai', model: 'Kona'},
      {id: 4, plate: 'YT632BA', brand: 'Toyota', model: 'Yaris'}
    ];
    return { usersList, vehicleList };
    }
  constructor() { }
}
