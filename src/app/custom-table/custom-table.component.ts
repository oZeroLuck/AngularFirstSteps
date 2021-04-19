import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CustomTableConfig, MyHeaders} from '../tableConfig';
import * as _ from 'lodash';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})

export class CustomTableComponent implements OnInit {
  @Input() tableConfig: CustomTableConfig;
  @Input() dataSource: any[];

  @Output() emitter = new EventEmitter<any>();

  lastSortedColumn: string;
  orderType: boolean;
  filteredList: any[];

  pagedData: any[];
  start: number;
  end: number;
  currentPage: number;
  pagesNumber: number;
  currentElementPerPage: number;
  linkNumber: number[] = [];
  found: number;

  test: any;

  constructor() { }

  ngOnInit(): void {
    this.lastSortedColumn = this.tableConfig.order.defaultColumn;
    this.orderType = this.getType(this.tableConfig.order.orderType);
    this.currentElementPerPage = this.tableConfig.pagination.itemPerPage;
    this.searchBy('', '');
    this.orderBy(this.lastSortedColumn);
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
    this.countElements();
    this.countPages(this.currentElementPerPage.toString());
    this.setCurrentPage(0);
  }

  orderBy(label: string): void {
    if (this.lastSortedColumn === label) {
      this.orderType = !this.orderType;
    } else {
      this.lastSortedColumn = label;
      this.orderType = true;
    }

    if (this.orderType) {
      this.pagedData = this.filteredList.sort((a, b) => {
        if (a[label] < b[label]) {
          return -1;
        }

        if (a[label] > b[label]) {
          return 1;
        }

        return 0;
      });
    } else {
      this.pagedData = this.filteredList.sort((a, b) => {
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

  countPages(newNumber: string): void {
    const toInt = parseInt(newNumber, 10);
    if (this.currentElementPerPage !== toInt) {
      this.currentElementPerPage = toInt;
    }
    this.pagesNumber = _.ceil(this.found / this.currentElementPerPage);
    this.makePageLinks();
  }

  setCurrentPage(newPage: number): void {
    this.currentPage = newPage;
  }

  makePageLinks(): void {
    this.linkNumber = [];
    for (let i = 1; i <= this.pagesNumber; i++) {
      this.linkNumber.push(i);
    }
  }

  btnClicked(actionType: string, item: any): void {
    const obj = {obj: item, action: actionType};
    this.test = obj;
    this.emitter.emit(obj);
  }


  countElements(): void {
    this.found = this.filteredList.length;
  }
}
