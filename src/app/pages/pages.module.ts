import { AngularMaterialModule } from './../modules/angular-material/angular-material.module';
import { FrontPageComponent } from './../pages/front-page/front-page.component';
import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    FrontPageComponent
  ],
  exports: [
    FrontPageComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    AngularMaterialModule
  ]
})
export class PagesModule { }
