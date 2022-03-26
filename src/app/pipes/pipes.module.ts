import { GetUrlDomainPipe } from './get-url-domain.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from './time-ago/time-ago.pipe';

@NgModule({
  declarations: [
    GetUrlDomainPipe,
    TimeAgoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GetUrlDomainPipe,
    TimeAgoPipe
  ]
})
export class PipesModule { }
