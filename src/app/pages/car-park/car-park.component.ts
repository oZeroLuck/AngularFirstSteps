import { Component, OnInit } from '@angular/core';
import { VehicleTable } from '../../resources/custom-configs/table-cfg/table-vehicle-config';
import { VehicleClass } from '../../resources/models/vehicle-class';
import { VehicleService } from '../../resources/services/model-services/vehicle.service';
import { ActionWrapper } from '../../resources/models/action-wrapper';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerVehicleTable } from '../../resources/custom-configs/table-cfg/table-customer-vehicle-config';
import { ReservationsService } from '../../resources/services/model-services/reservations.service';

@Component({
  selector: 'app-car-park',
  templateUrl: './car-park.component.html',
  styleUrls: ['./car-park.component.css']
})
export class CarParkComponent implements OnInit {

  cVehicleTable = CustomerVehicleTable;
  vehicleTable = VehicleTable;
  vehicles$: Observable<VehicleClass[]>;
  error: boolean;
  errMsg: string;

  constructor(
    private vehicleService: VehicleService,
    private resService: ReservationsService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.error = false;
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
    const reservation = this.resService.getResByVehicle(vehicle.id);
    if (reservation === undefined) {
      this.vehicleService.delete(vehicle)
        .subscribe();
    } else {
      this.error = true;
      this.errMsg = 'There are reservations for this vehicle :' + vehicle.id;
    }
    this.getVehicles();
  }

  currentUserRole(): boolean {
    return sessionStorage.getItem('role') === 'ADMIN';
  }

  resetError(event: boolean): void {
    this.error = event;
  }
}
