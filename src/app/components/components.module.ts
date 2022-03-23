import { PipesModule } from './../pipes/pipes.module';
import { AngularMaterialModule } from './../modules/angular-material/angular-material.module';
import { ToolbarComponent } from './toolbar/toolbar/toolbar.component';
import { ItemGridComponent } from './item-grid/item-grid.component';
import { ItemComponent } from './item-component/item/item.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ItemComponent,
    ItemGridComponent,
    ToolbarComponent
  ],
  exports: [
    ItemComponent,
    ItemGridComponent,
    ToolbarComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PipesModule
  ]
})
export class ComponentsModule { }
