import {Component, Input, OnInit} from '@angular/core';
import {CustomTableConfig} from '../tableConfig';
import {UsersClass} from '../usersClass';
import {PrimaryButton} from '../primaryBtn';
import {SecondaryButton} from '../secondaryBtn';
import {WarningButton} from '../warningBtn';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})

// TODO: Think of how to use data
export class CustomTableComponent implements OnInit {
  @Input() tableConfig: CustomTableConfig;
  @Input() data: UsersClass[];
  primaryBtn = PrimaryButton;
  secondaryBtn = SecondaryButton;
  warningBtn = WarningButton;

  constructor() { }

  ngOnInit(): void {
  }

}
