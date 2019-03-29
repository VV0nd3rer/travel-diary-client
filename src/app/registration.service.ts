import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { RegistrationForm } from './registration-form';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  register(registrationForm: RegistrationForm) : Observable<any> {
    return this.http.post("http://localhost:8080/user/register", registrationForm)
        .pipe(
            tap(res => console.log(`results: ${res}`)),
            map(res => {
              return res;
            }),
            catchError((error: any) => {
              console.log(error);
              return of(error);
            })
        );
  }
}
