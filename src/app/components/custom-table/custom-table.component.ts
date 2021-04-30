import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { CustomTableConfig } from '../../resources/custom-configs/table-cfg/table-config';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})

export class CustomTableComponent implements OnChanges {
  @Input() tableConfig: CustomTableConfig;
  @Input() dataSource: any[];

  @Output() emitter = new EventEmitter<any>();

  lastSortedColumn: string;
  orderType: boolean;
  filteredList: any[];

  addBtn: any;
  start: number;
  end: number;
  currentPage: number;
  pagesNumber: number;
  currentElementPerPage: number;
  linkNumber: number[] = [];
  found: number;
  dateKeys = [];

  constructor() { }

  ngOnChanges(): void {
    this.hasAddBtn(this.tableConfig.actions);
    this.lastSortedColumn = this.tableConfig.order.defaultColumn;
    this.orderType = this.getType(this.tableConfig.order.orderType);
    this.currentElementPerPage = this.tableConfig.pagination.itemPerPage;
    this.searchBy('', '');
    this.orderBy(this.lastSortedColumn);
  }

  hasAddBtn(buttons: any[]): void {
    // tslint:disable-next-line:only-arrow-functions
    this.addBtn = _.find(buttons, function(ob): any { return ob.action === 'add'; });
  }

  getType(type: string): boolean {
    return !(type === 'ascending');
  }

  searchBy(filter: string, type: string): void {
    let doSearch = true;
    if (filter.trim()) {
      // tslint:disable-next-line:only-arrow-functions
      if (this.isInDate(type)) {
        filter = moment(filter).format('yyyy-MM-dd');
        doSearch = moment(filter).isValid();
      }
      if (doSearch) {
        // tslint:disable-next-line:only-arrow-functions
        this.filteredList = _.filter(this.dataSource, function(ob): any {
          return ob[type].toLowerCase().indexOf(filter.toLocaleLowerCase()) > -1;
        });
      }
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
      this.filteredList.sort((a, b) => {
        if (a[label] < b[label]) {
          return -1;
        }

        if (a[label] > b[label]) {
          return 1;
        }

        return 0;
      });
    } else {
      this.filteredList.sort((a, b) => {
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

  btnClicked(actionType: any, item: any): void {
    const obj = {obj: item, action: actionType};
    this.emitter.emit(obj);
  }

  countElements(): void {
    this.found = this.filteredList.length;
  }

  isDate(value: any, key: string): boolean {
    const datedValue = moment(value);
    if (datedValue.isValid() && isNaN(value)) {
      if (!_.includes(this.dateKeys, key)) {
        this.dateKeys.push(key);
      }
      return true;
    } else {
      return false;
    }
  }

  isInDate(key: string): boolean {
    return _.includes(this.dateKeys, key);
  }
}
