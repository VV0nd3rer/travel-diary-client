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

    constructor(private http:HttpClient) {
    }

    getAllSights():Observable<any> {
        return this.http.get(this.endpoint + "/all")
            .pipe(
                map(res => {
                    return res;
                }),
                catchError((error:any) => {
                    return of(error);
                })
            );
    }
    getSightsBySearchCondition(searchText?: string):Observable<any> {
        return this.http.get(this.endpoint + "/all", {params: { text: searchText } })
            .pipe(
                map(res => {
                    return res;
                }),
                catchError((error:any) => {
                    return of(error);
                })
            );
    }
    getSightsPage(requestParams?:any):Observable<any> {
        return this.http.get(this.endpoint, {params: requestParams})
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
