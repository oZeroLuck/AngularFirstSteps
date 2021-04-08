import {Component, Input} from '@angular/core';
import { ButtonServicesService } from './button-services.service';
import { MyButtonConfig } from './button-config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private buttonServices: ButtonServicesService) {}

  title = 'AngularFistSteps';

  getButton(configName: string): MyButtonConfig {
    return this.buttonServices.getButton(configName);
  }
}
