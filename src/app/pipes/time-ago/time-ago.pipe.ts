import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(unixTime: number): unknown {
    const pastDate: Date = new Date(unixTime*1000);
    const nowDate: Date = new Date(Date.now());
    return moment(pastDate).from(nowDate);
  }

}
