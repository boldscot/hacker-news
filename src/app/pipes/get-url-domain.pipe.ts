import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'getUrlDomain'})
export class GetUrlDomainPipe implements PipeTransform {
  transform(url: string) {
    return (new URL(url)).hostname.replace('www.','');
  }
}
