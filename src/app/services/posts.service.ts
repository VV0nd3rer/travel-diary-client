import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { Post } from './../model/post';
import { environment } from '../../environments/environment';
import {throwError} from "rxjs/index";


@Injectable()
export class PostsService {
    baseUrl = environment.baseUrl;
    endpoint = this.baseUrl + "/posts";

    constructor(private http:HttpClient, private cloudinary: Cloudinary) {
    }

    getPostsPage(requestParams?:any):Observable<any> {
        return this.http.get(this.endpoint, {params: requestParams})
            .pipe(
                tap(val => console.log("Calling getAllPosts method ... ")),
                map(res => {
                    return res;
                }),
                catchError((error:any) => {
                    /*console.error(error);*/
                    return of(error);
                })
            );
    }

    getPostDetails(id:number):Observable<any> {
        return this.http.get(this.endpoint + "/" + id)
            .pipe(
                map(res => {
                    return res;
                }),
                catchError((error:any) => {
                    return of(error);
                })
            );
    }
    updatePost(post: Post):Observable<any> {
        return this.http.put<Post>(this.endpoint, post)
            .pipe(
                map(res => {
                    return res;
                }),
                catchError((error:any) => {
                    return of(error);
                })
            );
    }
    savePost(post: Post):Observable<any> {
        return this.http.post(this.endpoint, post)
            .pipe(
                map(res => {
                    return res;
                }),
                catchError((error:any) => {
                    return of(error);
                })
            );
    }

}
