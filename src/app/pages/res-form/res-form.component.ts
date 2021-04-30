import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../resources/services/model-services/reservations.service';
import { ReservationClass } from '../../resources/models/reservation-class';
import { ActivatedRoute, Router } from '@angular/router';
import { CancelBtn } from '../../resources/custom-configs/buttons/cancel-btn';
import { VehicleService } from '../../resources/services/model-services/vehicle.service';
import { VehicleClass } from '../../resources/models/vehicle-class';
import * as moment from 'moment';
import * as _ from 'lodash';
import { Observable, of } from 'rxjs';
import { ReservationTable } from '../../resources/custom-configs/table-cfg/table-reservation-config';
import { NewResTable } from '../../resources/custom-configs/table-cfg/table-new-reservation-config';
import {ActionWrapper} from '../../resources/models/action-wrapper';
import {EditBtn} from '../../resources/custom-configs/buttons/edit-btn';


@Component({
  selector: 'app-res-form',
  templateUrl: './res-form.component.html',
  styleUrls: ['./res-form.component.css']
})
export class ResFormComponent implements OnInit {

  tableConfig = NewResTable;
  resTable = ReservationTable;

  editBtn = EditBtn;
  cancelBtn = CancelBtn;

  currentUser: string;
  reservation: ReservationClass;
  action: string;
  available$: Observable<VehicleClass[]>;
  allRes$: Observable<ReservationClass[]>;
  finalList$: Observable<VehicleClass[]>;

  allVehicles: VehicleClass[];
  allReservations: ReservationClass[];

  test: VehicleClass[];

  constructor(
    private vehicleService: VehicleService,
    private resService: ReservationsService,
    private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getReservation();
  }

  getAvailable(startDate, endDate): void {
    this.available$ = this.vehicleService.getVehicles();
    this.allRes$ = this.resService.getResByDates(startDate, endDate);

    console.log(this.test);
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
      this.getAvailable(this.reservation.startDate, this.reservation.endDate);
    }
  }

  btnAction($event: ActionWrapper): void {
    if ($event.action === 'book') {
      this.reservation.vehicleId = $event.obj.id;
      this.addReservation(this.reservation);
    } else {
      this.reservation.status = 'Pending';
      this.updateReservation(this.reservation);
    }
  }

  updateReservation(reservation: ReservationClass): void {
    if (this.checkDates(reservation)) {
      this.resService.update(reservation)
        .subscribe();
      this.router.navigate(['../../'], {relativeTo: this.route});
    } else {
      console.log('Error');
    }
  }

  addReservation(reservation: ReservationClass): void {
    if (this.checkDates(reservation)) {
      this.resService.add(reservation)
        .subscribe();
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      console.log('Error');
    }
  }

  checkDates(reservation: ReservationClass): boolean {
    let noError = true;
    let message = 'No errors';
    const mStartDate = moment(reservation.startDate);
    const mEndDate = moment(reservation.endDate);
    if (mEndDate.isBefore(mStartDate) || mStartDate === mEndDate) {
      message = 'End is before start';
      noError = false;
    }
    if (this.resService.getResByDates(reservation.startDate, reservation.endDate).pipe(
      (rs) => _.find(rs, ['vehicleId', reservation.vehicleId]))) {
      message = 'There are other reservations by the same dates';
      noError = false;
    }
    if (mStartDate.isBefore(moment(new Date()).add(1, 'days'))) {
      message = 'Dates are before today + 2';
      noError = false;
    }
    console.log(message);
    return noError;
  }
}

/*

  getAvailable(startDate: string, endDate: string): void {
    this.allRes$ = this.resService.getResByDates(startDate, endDate);
    this.available$ = this.vehicleService.getVehicles();
    this.available$.pipe(
      map((vehicles) => vehicles.forEach( (vehicle, index) => {
        this.allRes$.pipe(
          map(res => { if (_.find(res, ['vehicleId', vehicle.id]))
            {
            }})
        );
         this.available$ = of(vehicles); })));
  }

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

        console.log('pipeday');
    this.available$.pipe(
      map((vs) => { vs.forEach((v, index) => { if (this.allRes$.pipe(
        map((rs) => _.find(rs, ['vehicleId', v.id])))) {
        console.log('hello');
        vs.splice(index, 1);
      } else {console.log('nosplice'); }}); this.available$ = of(vs); }));
*/
