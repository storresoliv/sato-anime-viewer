import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'w3Remove'
})
export class W3RemovePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.replace('www.', '');
  }

}
