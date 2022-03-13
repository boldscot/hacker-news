import { HackerNewsFirebaseService } from './services/hacker-news-firebase-service/hacker-news-firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hacker-news';

  constructor(private hackerNewsFirebaseService: HackerNewsFirebaseService) {}

  ngOnInit(): void {
    this.hackerNewsFirebaseService.getStories()
      .subscribe(data => console.log(data))
  }
}
