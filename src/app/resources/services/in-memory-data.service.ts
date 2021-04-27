import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  // tslint:disable-next-line:typedef
  createDb() {
    const usersList = [
      {id: -1, name: 'Fabio', lastName: 'Hu', dateOfBirth: '1997-12-29', isAdmin: true, username: 'Admin'},
      {id: 1, name: 'Giada', lastName: 'Sborchia', dateOfBirth: '1999-12-16', isAdmin: false, username: 'User.Giada'},
      {id: 2, name: 'Francesca', lastName: 'Mecca', dateOfBirth: '1998-12-18', isAdmin: false, username: 'User.Franci'},
      {id: 3, name: 'Alice', lastName: 'Erba', dateOfBirth: '2005-09-07', isAdmin: false, username: 'User.Alice'},
      {id: 4, name: 'Manuel', lastName: 'Tocchi', dateOfBirth: '1989-06-23', isAdmin: false, username: 'User.Manuel'},
      {id: 5, name: 'Luigi', lastName: 'Durso', dateOfBirth: '1990-05-14', isAdmin: false, username: 'User.Luigi'},
      {id: 6, name: 'Lorenzo', lastName: 'Gaggero', dateOfBirth: '1993-08-12', isAdmin: false, username: 'User.Lorenzo'},
      {id: 7, name: 'Francesca', lastName: 'Serratore', dateOfBirth: '1970-03-15', isAdmin: false, username: 'User.Francesca'},
      {id: 8, name: 'Aurora', lastName: 'Pelizzoni', dateOfBirth: '2001-07-16', isAdmin: false, username: 'User.Aurora'},
      {id: 9, name: 'Emma', lastName: 'Minoggio', dateOfBirth: '1997-11-21', isAdmin: false, username: 'User.Emma'},
      {id: 10, name: 'Carlo', lastName: 'Amante', dateOfBirth: '1995-02-21', isAdmin: false, username: 'User.Carlo'},
      {id: 11, name: 'Alessandro', lastName: 'De Benedettis', dateOfBirth: '1980-01-18', isAdmin: false, username: 'User.Alessandro'},
      {id: 12, name: 'Milena', lastName: 'Coffetti', dateOfBirth: '1994-03-13', isAdmin: false, username: 'User.Milena'},
      {id: 13, name: 'Stefano', lastName: 'Viscardi', dateOfBirth: '1987-06-02', isAdmin: false, username: 'User.Stefano'}
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
    const tokenDb = [{id: 1, username: 'null', password: 'null'}];
    return { usersList, vehicleList, reservationList, tokenDb };
    }

  constructor() { }
}
