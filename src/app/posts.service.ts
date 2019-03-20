import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  getPostsPage(currentPage: any): Observable<any> {
    return this.http.get('http://localhost:8080/posts/page/'+currentPage)
        .pipe(
            tap(val => console.log(`Calling getAllPosts method. The response: ${val}`)),
            map(res => {
              return res;
            }),
            catchError((error: any) => {
              /*console.error(error);*/
              return of(error);
            })
        );
  }
}
