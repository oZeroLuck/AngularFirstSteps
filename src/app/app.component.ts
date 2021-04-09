import {Component, Input} from '@angular/core';
import {MyButtonConfig} from './button-config';
import {PrimaryButton} from './primaryBtn';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  primaryButton = PrimaryButton;

  constructor() {}

  title = 'AngularFistSteps';
}
