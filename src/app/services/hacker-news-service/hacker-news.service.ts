import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from './../../../environments/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {

  constructor(private http: HttpClient) { }

  /**
   * Makes a GET request to get the max item id from the Hacker News API
   * @returns Observable<number> or Observable<null>
   */
  getMaxItemId(): Observable<number | null>{
    return this.http.get<number>(`${environment.hackerNewsUrl}/maxitem.json`, {
      observe: 'response'
    }).pipe(
      map((response: HttpResponse<number>) => {
        return (response && response.status === 200)? response.body: null;
      }),
      catchError((err: HttpErrorResponse)=> this.handleError(err))
    );
  }


  getTopStories(): Observable<number[] | null> {
    return of([1,2,3,4])
  }



  /**
   * Simple error handler fucntion, logs the error message and returns
   * @param err The HttpErrorResponse from the request
   * @returns Observable<null>
   */
  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return of(null);
  }
}
