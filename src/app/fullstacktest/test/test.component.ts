import { Component, OnInit } from '@angular/core';
import {FullstacktestService} from '../fullstacktest.service';
import {ActivatedRoute} from '@angular/router';
import {VehicleClass} from '../../resources/models/vehicle-class';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  message = '';
  userName = '';
  vehicle: VehicleClass;

  constructor(
    private fstck: FullstacktestService,
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

  handleVehicle(response: VehicleClass): void {
    this.vehicle = response;
  }

  handleResponse(response: any): void {
    this.message = response;
    console.log(response);
  }

  handleError(error: any): void {
    this.message = error.error.message;
  }
}
