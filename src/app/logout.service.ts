import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, of} from "rxjs/index";
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private http: HttpClient) { }
  logout() : Observable<any> {
    return this.http.get("user/logout")
        .pipe(
            map(res => {
              return res;
            }),
            catchError((error: any) => {
              console.error(error);
              return of(error);
            }));
  }
}
