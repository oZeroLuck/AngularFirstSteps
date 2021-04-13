import {Component, Input, OnInit} from '@angular/core';
import {CustomTableConfig} from '../tableConfig';
import {MyButtonConfig} from '../button-config';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})

export class CustomTableComponent implements OnInit {
  @Input() tableConfig: CustomTableConfig;
  @Input() dataSource: any[];
  @Input() buttons: MyButtonConfig[];

  constructor() { }

  ngOnInit(): void {
  }

}
