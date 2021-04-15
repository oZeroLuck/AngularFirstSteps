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
  pagedData: any[];
  currentPage: number;
  pagesNumber: number;
  currentElementPerPage: number;
  linkNumber: number[] = [];

  test: any;
  test2: any;

  constructor() { }

  ngOnInit(): void {
    this.getFirstKey(this.tableConfig.headers);
    this.lastSortedColumn = this.tableConfig.order.defaultColumn;
    this.orderType = this.getType(this.tableConfig.order.orderType);
    this.searchBy('', '');
    this.orderBy(this.lastSortedColumn);
    this.currentPage = 1;
    this.currentElementPerPage = this.tableConfig.pagination.itemPerPage;
    this.selectPage(this.currentElementPerPage.toString(), this.currentPage);
    // this.makePageLinks();
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
    this.selectPage(this.tableConfig.pagination.itemPerPage.toString(), 1);
  }

  selectPage(pageSize: string, selectedPage: number): void {
    this.currentPage = selectedPage;
    this.pagesNumber = _.ceil(_.size(this.filteredList) / parseInt(pageSize, 10));
    this.currentElementPerPage = parseInt(pageSize, 10);
    const start = (selectedPage - 1) * 5;
    const end = start + parseInt(pageSize, 10);
    this.test = start;
    this.test2 = end;
    this.pagedData = _.slice(this.filteredList, start, end);
    this.makePageLinks();
  }

  nextPage(): void {
    this.currentPage += 1;
    this.selectPage(this.currentElementPerPage.toString(), this.currentPage);
  }


  previousPage(): void {
    this.currentPage -= 1;
    this.selectPage(this.currentElementPerPage.toString(), this.currentPage);
  }

  makePageLinks(): void {
    this.linkNumber = [];
    for (let i = 1; i <= this.pagesNumber; i++) {
      this.linkNumber.push(i);
    }
  }

}
