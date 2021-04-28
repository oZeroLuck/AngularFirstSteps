import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {of, throwError} from 'rxjs';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  // tslint:disable-next-line:typedef
  createDb() {
    const usersList = [
      {id: -1, name: 'Fabio', lastName: 'Hu', dateOfBirth: '1997-12-29',
        email: 'fabio@mail.com', isAdmin: true, username: 'Admin', password: 'dddd'},
      {id: 1, name: 'Giada', lastName: 'Sborchia', dateOfBirth: '1999-12-16',
        email: 'giada@mail.com', isAdmin: false, username: 'User.Giada', password: 'dddd'},
      {id: 2, name: 'Francesca', lastName: 'Mecca', dateOfBirth: '1998-12-18',
        email: 'francesca@mail.com', isAdmin: false, username: 'User.Franci', password: 'dddd'},
      {id: 3, name: 'Alice', lastName: 'Erba', dateOfBirth: '2005-09-07',
        email: 'alice@mail.com', isAdmin: false, username: 'User.Alice', password: 'dddd'},
      {id: 4, name: 'Manuel', lastName: 'Tocchi', dateOfBirth: '1989-06-23',
        email: 'manuel@mail.com', isAdmin: false, username: 'User.Manuel', password: 'dddd'},
      {id: 5, name: 'Luigi', lastName: 'Durso', dateOfBirth: '1990-05-14',
        email: 'luigi@mail.com', isAdmin: false, username: 'User.Luigi', password: 'dddd'},
      {id: 6, name: 'Lorenzo', lastName: 'Gaggero', dateOfBirth: '1993-08-12',
        email: 'lorenzo@mail.com', isAdmin: false, username: 'User.Lorenzo', password: 'dddd'},
      {id: 7, name: 'Francesca', lastName: 'Serratore', dateOfBirth: '1970-03-15',
        email: 'francescaS@mail.com', isAdmin: false, username: 'User.Francesca', password: 'dddd'},
      {id: 8, name: 'Aurora', lastName: 'Pelizzoni', dateOfBirth: '2001-07-16',
        email: 'aurora@mail.com', isAdmin: false, username: 'User.Aurora', password: 'dddd'},
      {id: 9, name: 'Emma', lastName: 'Minoggio', dateOfBirth: '1997-11-21',
        email: 'emma@mail.com', isAdmin: false, username: 'User.Emma', password: 'dddd'},
      {id: 10, name: 'Carlo', lastName: 'Amante', dateOfBirth: '1995-02-21',
        email: 'carlo@mail.com', isAdmin: false, username: 'User.Carlo', password: 'dddd'},
      {id: 11, name: 'Alessandro', lastName: 'De Benedettis', dateOfBirth: '1980-01-18',
        email: 'alessandro@mail.com', isAdmin: false, username: 'User.Alessandro', password: 'dddd'},
      {id: 12, name: 'Milena', lastName: 'Coffetti', dateOfBirth: '1994-03-13',
        email: 'milena@mail.com', isAdmin: false, username: 'User.Milena', password: 'dddd'},
      {id: 13, name: 'Stefano', lastName: 'Viscardi', dateOfBirth: '1987-06-02',
        email: 'stefano@mail.com', isAdmin: false, username: 'User.Stefano', password: 'dddd'}
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

  authenticate(body: any): any {
    const { username, password } = body;
    const user = this.createDb().usersList.find(x => x.username === username && x.password === password);
    if (!user) {
      return this.error('Username or password is incorrect');
    }
    if (user.isAdmin) {
      return this.ok({
        id: user.id,
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        admin: user.isAdmin,
        role: 'ADMIN'
      });
    } else {
      return this.ok({
        id: user.id,
        username: user.username,
        name: user.name,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        admin: user.isAdmin,
        role: 'CUSTOMER'
      });
    }
  }

  ok(body?): any {
    return of(new HttpResponse({ status: 200, body }));
  }

  error(message): any {
    return throwError({ error: { message } });
  }

  constructor() { }
}
