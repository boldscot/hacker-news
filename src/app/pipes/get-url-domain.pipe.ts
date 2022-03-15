import { Pipe, PipeTransform } from '@angular/core';

/**
 * This pipe takes a url string and returns the domain part of the url.
 * e.g  Input => www.domain.ie/v2/user?id=1000
 *      Output => domain.ie
 */
@Pipe({name: 'getUrlDomain'})
export class GetUrlDomainPipe implements PipeTransform {
  transform(url: string) {
    return (new URL(url)).hostname.replace('www.','');
  }
}
