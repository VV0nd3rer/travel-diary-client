import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SightsService {
  baseUrl = environment.baseUrl;
  endpoint = this.baseUrl + "/sights";

      constructor(private http:HttpClient) { }

  getSights():Observable<any> {
    return this.http.get(this.endpoint)
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
