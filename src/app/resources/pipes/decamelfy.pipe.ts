import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decamelfy'
})
export class DecamelfyPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/([A-Z])/g, ' $1')
      // tslint:disable-next-line:only-arrow-functions
      .replace(/^./, function(str): any { return str.toUpperCase(); });
  }

}
