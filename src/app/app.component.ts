import { HackerNewsService } from './services/hacker-news-service/hacker-news.service';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  maxId$: Observable<number | null> = of(null);
  title = 'hacker-news';

  constructor(private hackerNewsService: HackerNewsService) {}

  ngOnInit(): void {
    this.maxId$ = this.hackerNewsService.getMaxItemId()
  }
}
