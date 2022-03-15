import { PipesModule } from './pipes/pipes.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ItemComponent } from './components/item-component/item/item.component';
import { ItemGridComponent } from './components/item-grid/item-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ItemGridComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatIconModule,
    PipesModule
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
