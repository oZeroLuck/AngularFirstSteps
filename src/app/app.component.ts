import {Component, Input} from '@angular/core';
import {PrimaryButton} from './primaryBtn';
import {TestTable} from './tableTestConfig';
import {UserList} from './mock-data';
import {VehicleTable} from './table-vehicle-config';
import {VEHICLE_LIST} from './mock-vehicles';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  users = UserList;
  primaryButton = PrimaryButton;
  testTable = TestTable;
  vehicleTable = VehicleTable;
  vehicles = VEHICLE_LIST;

  constructor() {}

  title = 'AngularFistSteps';
}
