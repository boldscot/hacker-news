import { GetUrlDomainPipe } from './get-url-domain.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    GetUrlDomainPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GetUrlDomainPipe
  ]
})
export class PipesModule { }
