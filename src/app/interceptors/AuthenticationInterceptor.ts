import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError, of } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private cookieService:CookieService, private userService:UserService) {
    }

    intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
        //console.log("jsessionid: " + this.cookieService.get('JSESSIONID'));
        const clonedRequest =
            request.clone(
                {withCredentials: true}
            );
        return next.handle(clonedRequest)
            .pipe(
                map((event:HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
                        console.log("Http Response event: ", event);
                    }
                    return event;
                }),
                catchError(error => {
                    console.log("Error response status: ", error.status);
                    if (error.status === 401) {
                        this.userService.setLoggedUser(null);
                    }
                    //return of([]);
                    return throwError(error);
                }));

    }
}