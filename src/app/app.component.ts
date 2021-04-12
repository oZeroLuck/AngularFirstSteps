import {Component, Input} from '@angular/core';
import {PrimaryButton} from './primaryBtn';
import {TestTable} from './tableTestConfig';
import {UserList} from './mock-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  data = UserList;
  primaryButton = PrimaryButton;
  testTable = TestTable;

  constructor() {}

  title = 'AngularFistSteps';
}
