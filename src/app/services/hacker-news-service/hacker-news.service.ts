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
    return this.requestHandler<number>(`${environment.hackerNewsUrl}/maxitem.json`);
  }

  /**
   * Makes a GET request to get the top stories, which is an array of ids, from the Hacker News API
   * @returns Observable<number[]> or Observable<null>
   */
  getTopStories(): Observable<number[] | null> {
    return this.requestHandler<number[]>(`${environment.hackerNewsUrl}/topstories.json`);
  }

  /**
   * Generic function that handles making requests, the response body from the requests will be of type 'T'
   * @param requestUrl The request url string
   * @returns Observable<T> or Observable<null>
   */
  requestHandler<T>(requestUrl: string): Observable<T | null> {
    return this.http.get<T>(requestUrl, {
      observe: 'response'
    }).pipe(
      map((response: HttpResponse<T>) => {
        return this.responseHandler<T>(response);
      }),
      catchError((err: HttpErrorResponse)=> this.handleError(err))
    );
  }

  /**
   * Generic function that checks the response status and returns
   * @param response HttpResponse object with a body of type 'T'
   * @returns 'T' or null
   */
  responseHandler<T>(response: HttpResponse<T>) {
    return (response && response.status === 200)? response.body: null;
  }

  /**
   * Simple error handler function, logs the error message and returns
   * @param err The HttpErrorResponse from the request
   * @returns Observable<null>
   */
  private handleError(err: HttpErrorResponse) {
    console.error(err.message);
    return of(null);
  }
}
