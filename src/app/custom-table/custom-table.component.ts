import {Component, Input, OnInit} from '@angular/core';
import {CustomTableConfig, MyHeaders} from '../tableConfig';
import {MyButtonConfig} from '../button-config';
import * as _ from 'lodash';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})

export class CustomTableComponent implements OnInit {
  @Input() tableConfig: CustomTableConfig;
  @Input() dataSource: any[];
  @Input() buttons: MyButtonConfig[];
  firstHeader: string;
  lastSortedColumn: string;
  orderType: boolean;
  filteredList: any[];

  constructor() { }

  ngOnInit(): void {
    this.getFirstKey(this.tableConfig.headers);
    this.lastSortedColumn = this.tableConfig.order.defaultColumn;
    this.orderType = this.getType(this.tableConfig.order.orderType);
    this.searchBy('', '');
    this.orderBy(this.lastSortedColumn);
  }

  getFirstKey(header: MyHeaders[]): void {
    this.firstHeader = header[0].key;
  }

  getType(type: string): boolean {
    return !(type === 'ascending');
  }

  searchBy(filter: string, type: string): void {
    if (filter.trim()) {
      // tslint:disable-next-line:only-arrow-functions
      this.filteredList = _.filter(this.filteredList, function(ob): any {
        return ob[type].toLowerCase().indexOf(filter.toLocaleLowerCase()) > -1;
      });
    } else {
      this.filteredList = this.dataSource;
    }

  }

  orderBy(label: string): void {
    if (this.lastSortedColumn === label) {
      this.orderType = !this.orderType;
    } else {
      this.lastSortedColumn = label;
      this.orderType = true;
    }

    if (this.orderType) {
      this.filteredList = this.filteredList.sort((a, b) => {
        if (a[label] < b[label]) {
          return -1;
        }

        if (a[label] > b[label]) {
          return 1;
        }

        return 0;
      });
    } else {
      this.filteredList = this.filteredList.sort((a, b) => {
        if (a[label] < b[label]) {
          return 1;
        }

        if (a[label] > b[label]) {
          return -1;
        }

        return 0;
      });
    }
  }

}
