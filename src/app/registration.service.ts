import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { RegistrationForm } from './registration-form';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RegistrationService {
    baseUrl = environment.baseUrl;

    constructor(private http:HttpClient) {
    }

    register(registrationForm:RegistrationForm):Observable<any> {
        return this.http.post(this.baseUrl + "/user/register", registrationForm)
            .pipe(
                tap(res => console.log(`results: ${res}`)),
                map(res => {
                    return res;
                }),
                catchError((error:any) => {
                    console.log(error);
                    return of(error);
                })
            );
    }
}
