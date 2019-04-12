import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from  '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  baseUrl = environment.baseUrl;
  constructor(private http:HttpClient) { }
  public getTestCall():Observable<any> {
    return this.http.get(this.baseUrl + "/book/test")
        .pipe(
            map(res => {
              console.log("Test call res: `${res}`");
              return res;
            }),
            catchError(error => {
              console.log("Test call error: `${error}`");
              return throwError(error);
            })
        );
  }

}
