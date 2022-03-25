import { PipesModule } from './../pipes/pipes.module';
import { AngularMaterialModule } from './../modules/angular-material/angular-material.module';
import { ItemGridComponent } from './item-grid/item-grid.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from './item-component/item.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

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
