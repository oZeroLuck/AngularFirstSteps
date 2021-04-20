import { Component, OnInit } from '@angular/core';
import { VehicleTable } from '../../../configs/table-cfg/table-vehicle-config';
import { VehicleClass } from '../../../models/vehicle-class';
import { VehicleService } from '../../../services/vehicle.service';
import { ActionWrapper } from '../../../models/action-wrapper';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-car-park',
  templateUrl: './car-park.component.html',
  styleUrls: ['./car-park.component.css']
})
export class CarParkComponent implements OnInit {

  vehicleTable = VehicleTable;
  vehicles$: Observable<VehicleClass[]>;

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getVehicles();
  }

  getVehicles(): void {
    this.vehicles$ = this.vehicleService.getVehicles();
  }

  dispatch($event: ActionWrapper): void {
    switch ($event.action) {
      case 'add':
        this.router.navigate(['./vehicle/add'], {relativeTo: this.route});
        break;
      case 'edit':
        this.router.navigate(['./vehicle/edit/' + $event.obj.id], {relativeTo: this.route});
        break;
      case 'delete':
        this.delete($event.obj);
        break;
      default:
        console.log('WRONG OP CODE');
        break;
    }
  }

  delete(vehicle: VehicleClass): void {
    this.vehicleService.delete(vehicle)
      .subscribe();
    this.getVehicles();
  }
}
