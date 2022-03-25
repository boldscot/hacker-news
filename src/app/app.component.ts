import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="front-page">
      <app-front-page></app-front-page>
    </div>
  `,
  styles: [
    `.front-page{
      background: url(../assets/images/bg.jpg) no-repeat center center fixed;
      min-height: 100%;
      min-width: 100%;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
    }`,
  ]
})
export class AppComponent {}
