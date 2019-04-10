import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { RegistrationForm } from './registration-form';
import {ServiceResponse} from "../service-response";
import { environment } from  '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private loggedInUserSubject:BehaviorSubject<User>;
    public loggedInUser:Observable<User>;

    baseUrl = environment.baseUrl;

    const
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        withCredentials: true
    };

    constructor(private http:HttpClient) {
        this.loggedInUserSubject = new BehaviorSubject<User>(null);
        this.loggedInUser = this.loggedInUserSubject.asObservable();
    }

    public setLoggedUser(loggedUser:User):void {
        this.loggedInUserSubject.next(loggedUser);
    }

    public getLoggedUser():User {
        return this.loggedInUserSubject.value;
    }

    public getTestCall():Observable<any> {
        return this.http.get(this.baseUrl + "/test")
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(error => {
                    return throwError(error);
                })
            );
    }

    login(user:User):Observable<any> {

        return this.http.post(this.baseUrl + "/user/login", user, this.httpOptions)
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(error => {
                    /* Provide a default fallback value ([]) to the subscribers,
                     despite the fact that the original Observable did error out.
                     So the error handling callback in subscribe() is not invoked anymore.
                     */
                    //return of([]);
                    /* --------------- */

                    /* Rethrow the error. */
                    return throwError(error);
                }));
    }

    logout():Observable<any> {
        return this.http.get(this.baseUrl + "/user/logout")
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(error => {
                    return of(error);
                }));
    }

    register(registrationForm:RegistrationForm):Observable<any> {
        return this.http.post(this.baseUrl + "user/register", registrationForm)
            .pipe(
                map(res => {
                    return res;
                }),
                catchError(error => {
                    //return of(error);
                    return throwError(error);
                })
            );
    }

}
