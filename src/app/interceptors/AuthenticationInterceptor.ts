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
import { Observable, throwError, of } from "rxjs";
import { UserService } from '../services/user.service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

    constructor(private userService:UserService) {
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
                        console.log("Http Response event... " + event.status);
                    }
                    return event;
                }),
                catchError(error => {
                    console.log("Error response status: ", error.status);
                    if (error.status === 401) {
                        this.userService.setLoggedUser(null);
                    }
                    return throwError(error);
                }));

    }
}