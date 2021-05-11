import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'pageSelector'
})
export class PageSelectorPipe implements PipeTransform {

  transform(value: number[], start: number, end: number): any {
      return _.slice(value, start, end);
  }

}
