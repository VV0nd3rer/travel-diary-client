import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Post } from './../model/post';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    baseUrl = environment.baseUrl;
    endpoint = this.baseUrl + "/posts";

    constructor(private http:HttpClient) {
    }

    getPostsPage(requestParams?: any):Observable<any> {
        return this.http.get(this.endpoint, { params: requestParams})
            .pipe(
                tap(val => console.log(`Calling getAllPosts method. The response: ${val}`)),
                map(res => {
                    return res;
                }),
                catchError((error:any) => {
                    /*console.error(error);*/
                    return of(error);
                })
            );
    }
}
