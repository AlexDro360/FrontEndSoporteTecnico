import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'rellenaZero'
})
export class RellenaZeroPipe implements PipeTransform {

  transform(value: number | string, length: number = 3): string {
    return value.toString().padStart(length, '0');
  }

}
