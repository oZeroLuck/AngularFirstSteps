import {Component, OnInit} from '@angular/core';
import {VehicleTable} from './table-vehicle-config';

import {VehicleClass} from './vehicle-class';
import {VehicleService} from './vehicle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'AngularFirstSteps';

  constructor() {}

}
