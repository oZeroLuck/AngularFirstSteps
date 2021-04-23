import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../resources/services/reservations.service';
import { ReservationClass } from '../resources/models/reservation-class';
import { ActivatedRoute, Router } from '@angular/router';
import { CancelBtn } from '../resources/custom-configs/buttons/cancel-btn';
import { VehicleService } from '../resources/services/vehicle.service';
import { VehicleClass } from '../resources/models/vehicle-class';
import * as moment from 'moment';
import * as _ from 'lodash';
import {VehicleTable} from '../resources/custom-configs/table-cfg/table-vehicle-config';
import {Observable, of} from 'rxjs';
import {ReservationTable} from '../resources/custom-configs/table-cfg/table-reservation-config';
import {map} from 'rxjs/operators';


@Component({
  selector: 'app-res-form',
  templateUrl: './res-form.component.html',
  styleUrls: ['./res-form.component.css']
})
export class ResFormComponent implements OnInit {

  tableConfig = VehicleTable;
  resTable = ReservationTable;

  cancelBtn = CancelBtn;
  currentUser: string;
  reservation: ReservationClass;
  action: string;
  available$: Observable<VehicleClass[]>;
  allRes$: Observable<ReservationClass[]>;
  finalList$: Observable<VehicleClass[]>;

  test: VehicleClass[];

  constructor(
    private vehicleService: VehicleService,
    private resService: ReservationsService,
    private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getReservation();
    this.available$ = this.vehicleService.getVehicles();
    this.getAvailable(this.reservation.startDate, this.reservation.endDate);
  }

  getReservation(): void {
    this.currentUser = this.route.snapshot.paramMap.get('userId');
    this.action = this.route.snapshot.paramMap.get('action');
    if (this.action === 'edit') {
      const id = this.route.snapshot.paramMap.get('id');
      this.resService.getResById(id)
        .subscribe(res => this.reservation = res);
    } else {
      console.log('New class');
      this.reservation = {
        id: null,
        userId: parseInt(this.currentUser, 10),
        vehicleId: null,
        startDate: moment(new Date()).add(2, 'days').format('YYYY-MM-DD'),
        endDate: moment(new Date()).add(3, 'days').format('YYYY-MM-DD'),
        status: 'pending'
      };
      console.log(this.reservation.startDate);
      console.log(this.reservation.endDate);
    }
  }

  getAvailable(startDate: string, endDate: string): void {
    this.allRes$ = this.resService.getResByDates(startDate, endDate);
    this.available$.forEach((vehicles) => vehicles.forEach( (vehicle, index) => {
        if (this.allRes$.pipe(
          map(res => { res.find(r => { if (r.vehicleId === vehicle.id) { return true; } }); return true; })
        )) {
          console.log('');
          console.log('Splice at' + index);
          vehicles.splice(index, 1);
        } this.available$ = of(vehicles); }));
  }

  btnAction($event: string): void {
    if ($event === 'add') {
      console.log('Added res');
    } else {
      this.router.navigate(['../'], {relativeTo: this.route});
    }
  }
}

/*
available.filter(
        (v, index) => {
          if (this.allRes$.pipe(
            map(res => res.findIndex(vId => !(vId.vehicleId === v.id)))
          )) {
            available = available.splice(index, 1);
          }
        }
      ))
    ).subscribe(available => this.test = available);


    this.available$.pipe(
      map((available) => available.filter((v) => {
        if (this.allRes$.pipe(
          map((res) => res.find(found => !(v.id === found.vehicleId)))
        )) { return true;
        }
    })));
*/
