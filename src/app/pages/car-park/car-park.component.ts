import { Component, OnInit } from '@angular/core';
import { VehicleTable } from '../../resources/custom-configs/table-cfg/table-vehicle-config';
import { VehicleClass } from '../../resources/models/vehicle-class';
import { VehicleService } from '../../resources/services/vehicle.service';
import { ActionWrapper } from '../../resources/models/action-wrapper';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {CustomerVehicleTable} from '../../resources/custom-configs/table-cfg/table-customer-vehicle-config';

@Component({
  selector: 'app-car-park',
  templateUrl: './car-park.component.html',
  styleUrls: ['./car-park.component.css']
})
export class CarParkComponent implements OnInit {

  cVehicleTable = CustomerVehicleTable;
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
        if (confirm('Are you sure?')) {
          this.delete($event.obj);
        }
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

  currentUserRole(): boolean {
    return sessionStorage.getItem('role') === 'ADMIN';
  }
}
