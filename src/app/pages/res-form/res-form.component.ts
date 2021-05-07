import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../resources/services/model-services/reservations.service';
import { ReservationClass } from '../../resources/models/reservation-class';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from '../../resources/services/model-services/vehicle.service';
import { VehicleClass } from '../../resources/models/vehicle-class';
import * as moment from 'moment';
import * as _ from 'lodash';
import { NewResTable } from '../../resources/custom-configs/table-cfg/table-new-reservation-config';
import { BackBtn } from '../../resources/custom-configs/buttons/back-btn';
import { SaveBtn } from '../../resources/custom-configs/buttons/save-btn';
import { EditResTable } from '../../resources/custom-configs/table-cfg/table-edit-res';
import { ResEdit } from '../../resources/models/res-edit';


@Component({
  selector: 'app-res-form',
  templateUrl: './res-form.component.html',
  styleUrls: ['./res-form.component.css']
})
export class ResFormComponent implements OnInit {

  tableConfig = NewResTable;
  editConfig = EditResTable;

  editBtn = SaveBtn;
  backBtn = BackBtn;

  currentUser: string;
  reservation: ReservationClass;
  allRes: ResEdit[];
  filteredRes: ResEdit[];
  allVehicle: VehicleClass[];
  action: string;
  minDate: string;

  available: VehicleClass[] = [];
  selectedVehicle: VehicleClass;

  error = false;
  errMsg = 'Start date is equal or after end date';

  constructor(
    private vehicleService: VehicleService,
    private resService: ReservationsService,
    private router: Router,
    private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.getReservation();
  }

  getAvailable(startDate, endDate): void {
    console.log('Getting available');
    this.available = [];
    if (moment(startDate).isBefore(moment(endDate))) {
      // tslint:disable-next-line:only-arrow-functions
      this.filteredRes = _.filter(this.allRes, function(r): any {
        return moment(startDate).isAfter(moment(r.endDate)) || moment(endDate).isBefore(moment(r.startDate));
      });
      this.available = this.allVehicle.filter(v => _.find(this.filteredRes, ['vehicleId', v.id]));
    }
    console.log(this.available);
  }

  /*getAvailable(startDate, endDate): void {
    this.available = [];
    if (moment(startDate).isBefore(moment(endDate))) {
      this.resService.getResByDates(startDate, endDate).subscribe(x => {
        const ids = x.map(o => o.vehicleId);
        this.getAvailableVehicles(ids);
      });
    } else {
      this.error = true;
    }
  }*/

  /*getAvailableVehicles(ids: number[]): void {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < ids.length; i++ ) {
      this.vehicleService.getById(ids[i]).subscribe(
        v => this.available.push(v)
      );
    }
    this.error = false;
  }*/

  getAll(): void {
    this.resService.getResByDates().subscribe(res => this.allRes = res);
  }

  getReservation(): void {
    this.currentUser = this.route.snapshot.paramMap.get('userId');
    this.action = this.route.snapshot.paramMap.get('action');
    if (this.action === 'edit') {
      const id = this.route.snapshot.paramMap.get('id');
      this.resService.getResById(id)
        .subscribe(res => {
          this.reservation = res;
          this.vehicleService.getById(res.vehicleId).subscribe(
            v => this.selectedVehicle = v
          );
        });
    } else {
      this.reservation = {
        id: null,
        userId: parseInt(this.currentUser, 10),
        vehicleId: null,
        startDate: moment(new Date()).add(2, 'days').format('YYYY-MM-DD'),
        endDate: moment(new Date()).add(3, 'days').format('YYYY-MM-DD'),
        status: 'pending'
      };
      this.resService.getResByDates().subscribe(res => {
        this.allRes = res;
        this.vehicleService.getVehicles().subscribe(vs => {
          this.allVehicle = vs;
          this.getAvailable(this.reservation.startDate, this.reservation.endDate);
        });
      });
      this.minDate = this.reservation.startDate;
    }
  }

  btnAction(event: any): void {
    if (typeof event !== 'string') {
      switch (event.action) {
        case 'book':
          this.reservation.vehicleId = event.obj.id;
          this.addReservation(this.reservation);
          this.back();
          break;
        case 'select':
          this.reservation.vehicleId = event.obj.id;
          this.selectedVehicle = event.obj;
          break;
        default:
          console.log('error');
      }
    } else {
      if (event === 'save') {
        this.reservation.status = 'pending';
        this.updateReservation(this.reservation);
      }
      this.back();
    }
  }

  updateReservation(reservation: ReservationClass): void {
    if (this.checkDates(reservation)) {
      this.resService.update(reservation)
        .subscribe();
    } else {
      console.log('Error');
    }
  }

  addReservation(reservation: ReservationClass): void {
    if (this.checkDates(reservation)) {
      this.resService.add(reservation)
        .subscribe();
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
    /*if (
        _.find(this.available, ['vehicleId', reservation.vehicleId]))) {
      message = 'There are other reservations by the same dates';
      noError = false;
    }*/
    if (mStartDate.isBefore(moment(new Date()).add(1, 'days'))) {
      message = 'Dates are before today + 2';
      noError = false;
    }
    console.log(message);
    return noError;
  }

  back(): void {
    if (this.action === 'add') {
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../../'], {relativeTo: this.route});
    }
  }

  errorReset(event: boolean): void {
    this.error = event;
  }
}
