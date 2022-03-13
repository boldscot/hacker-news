import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ItemComponent } from './components/item-component/item/item.component';
import { ItemGridComponent } from './components/item-grid/item-grid.component';


@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    ItemGridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
