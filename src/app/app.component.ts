import {Component} from '@angular/core';
import {TokenStorageService} from './resources/services/authentication/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'AngularFirstSteps';

  constructor() {}
}
