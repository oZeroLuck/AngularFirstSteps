import {Component, Input, OnInit} from '@angular/core';
import {CustomTableConfig} from '../tableConfig';
import {PrimaryButton} from '../primaryBtn';
import {SecondaryButton} from '../secondaryBtn';
import {WarningButton} from '../warningBtn';
import {TableService} from '../table-service.service';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})

export class CustomTableComponent implements OnInit {
  @Input() tableConfig: CustomTableConfig;
  @Input() dataSource: any[];
  primaryBtn = PrimaryButton;
  secondaryBtn = SecondaryButton;
  warningBtn = WarningButton;
  displayedColumns: string[] = [];

  constructor(private tableService: TableService) { }

  ngOnInit(): void {
    this.displayedColumns = this.tableService.getKeys(this.tableConfig);
    this.displayedColumns.push('action');
  }

}
