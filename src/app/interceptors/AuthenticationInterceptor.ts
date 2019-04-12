import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    const
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
        withCredentials: true
    };
    constructor(private cookieService:CookieService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("jsessionid: " + this.cookieService.get('JSESSIONID'));
        const clonedRequest =
            request.clone(
                { headers: request.headers.set('Set-Cookie', 'JSESSIONID=' + this.cookieService.get('JSESSIONID')),
                    withCredentials: true
                }
            );
        return next.handle(clonedRequest);
        /*return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('HttpResponse event--->>>', event);
                }
                console.log('event--->>>', event);
                return event;
            }));*/
    }
}