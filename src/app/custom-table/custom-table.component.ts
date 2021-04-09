import {Component, Input, OnInit} from '@angular/core';
import {CustomTableConfig} from '../tableConfig';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})

// TODO: Think of how to use data
export class CustomTableComponent implements OnInit {
  @Input() tableConfig: CustomTableConfig;
  @Input() data: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
