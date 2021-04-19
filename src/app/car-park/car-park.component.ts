import { Component, OnInit } from '@angular/core';
import {VehicleTable} from '../table-vehicle-config';
import {VehicleClass} from '../vehicle-class';
import {VehicleService} from '../vehicle.service';

@Component({
  selector: 'app-car-park',
  templateUrl: './car-park.component.html',
  styleUrls: ['./car-park.component.css']
})
export class CarParkComponent implements OnInit {

  vehicleTable = VehicleTable;
  vehicles: VehicleClass[];

  constructor(private vehicleService: VehicleService) {}

  getVehicles(): void {
    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  ngOnInit(): void {
    this.getVehicles();
  }

}
