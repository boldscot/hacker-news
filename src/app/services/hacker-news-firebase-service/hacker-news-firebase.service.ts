import { list, Database, ref, object } from '@angular/fire/database';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsFirebaseService {

  constructor(private database: Database) {}

  getStories() {
    return list(ref(this.database, '/v0/topstories'));
  }

  getMaxId() {
    return object(ref(this.database, '/v0/maxitem'))
  }
}
