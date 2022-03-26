import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(unixTime: number): unknown {
    const currentUnixTime: number = Math.floor(Date.now()/1000)
    return moment(unixTime).from(currentUnixTime);
  }

}
