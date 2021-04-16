import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'paginator'
})
export class PaginatorPipe implements PipeTransform {

  transform(value: any, currentPage: number, currentNumOfElements: number): any {
    const start = currentPage * currentNumOfElements;
    const end = start + currentNumOfElements;
    return _.slice(value, start, end);
  }

}
