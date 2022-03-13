import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
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
    const request: Observable<HttpResponse<number>> = this.http.get<number>(`${environment.hackerNewsUrl}/maxitem.json`, {
      observe: 'response'
    });
    return this.requestHandler(request);
  }

  /**
   * Makes a GET request to get the top stories, which is an array of ids, from the Hacker News API
   * @returns Observable<number[]> or Observable<null>
   */
  getTopStories(): Observable<number[] | null> {
    const request: Observable<HttpResponse<number[]>> = this.http.get<number[]>(`${environment.hackerNewsUrl}/topstories.json`, {
      observe: 'response'
    });
    return this.requestHandler(request);
  }

  /**
   * Generic function that maps the HttpResponse to the response body of type 'T'
   * @param request The request url string
   * @returns Observable<T> or Observable<null>
   */
  requestHandler<T>(request: Observable<HttpResponse<T>>): Observable<T | null> {
    return request.pipe(
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
