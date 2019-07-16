import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import {
    HttpClient,
    HttpHeaders,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, throwError, of } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private router: Router,
                private cookieService:CookieService,
                private userService:UserService) {
    }

    intercept(request:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
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
                    } else if(error.status === 404) {
                        this.router.navigateByUrl('/not-found');
                    }

                    //return of([]);
                    return throwError(error);
                }));

    }
}