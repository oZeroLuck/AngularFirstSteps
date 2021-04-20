import {Component, OnInit} from '@angular/core';
import {VehicleTable} from './table-cfg/table-vehicle-config';

import {VehicleClass} from '../models/vehicle-class';
import {VehicleService} from '../services/vehicle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'AngularFirstSteps';

  constructor() {}

}
