import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import {ServiceResponse} from "./service-response";
import { environment } from '../environments/environment';



@Injectable({
    providedIn: 'root'
})
export class LoginService {
    /*Access modifiers in TypeScript:
    * Everything in a class is public if not specified.
    * Everything in a module is private unless export keyword is used.*/

    baseUrl = environment.baseUrl;

    isLoggedIn: boolean = false;

    constructor(private http:HttpClient) {
        console.log("isLoggedIn status: " + this.isLoggedIn);
    }

    getTest():Observable<User> {
        return this.http.get<User>("test")
            .pipe(
                tap(val => console.log(`Calling test method. The response: ${val}`)),
                catchError((error:any) => {
                    console.error(error);
                    return of(error);
                })
            );
    }

    login(user:User):Observable<any> {
        return this.http.post("//localhost:8080" + "/user/login", user)
            .pipe(
                map(res => {
                    this.changeLoginStatus(true);
                    console.log("isLoggedIn status: " + this.isLoggedIn);
                    return res;
                }),
                catchError((error:any) => {
                    return of(error);
                }));
    }
    private changeLoginStatus(status: boolean) {
        this.isLoggedIn = status;
    }

}
