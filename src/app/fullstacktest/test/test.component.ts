import { Component, OnInit } from '@angular/core';
import {FullstacktestService} from '../fullstacktest.service';
import {ActivatedRoute} from '@angular/router';
import {VehicleClass} from '../../resources/models/vehicle-class';
import {ReservationClass} from '../../resources/models/reservation-class';
import {ReservationsService} from '../../resources/services/model-services/reservations.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  message = '';
  userName = '';
  vehicle: VehicleClass;
  reservations: ReservationClass[] = [];

  constructor(
    private fstck: FullstacktestService,
    private resService: ReservationsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName');
  }

  getGreetings(): void {
    this.fstck.getGreetings(this.userName)
      .subscribe(
        response => this.handleResponse(response),
        error => this.handleError(error));
  }

  getVehicle(): void {
    this.fstck.getVehicle(1)
      .subscribe(
        response => this.handleVehicle(response)
      );
  }

  getReservations(): void {
    this.fstck.getReservations()
      .subscribe(
        response => {
          this.reservations = response;
          console.log(response);
        }
      );
  }

  getReservationsById(): void {
    this.resService.getResByCustomer(parseInt(this.userName, 10))
      .subscribe(
        response => this.reservations = response
      );
  }

  handleVehicle(response: VehicleClass): void {
    this.vehicle = response;
    console.log(response);
    console.log(typeof response);
  }

  handleResponse(response: any): void {
    this.message = response;
    console.log(response);
  }

  handleError(error: any): void {
    this.message = error.error.message;
  }
}
