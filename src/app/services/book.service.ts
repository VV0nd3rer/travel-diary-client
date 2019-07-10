import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from  '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class BookService {
    baseUrl = environment.baseUrl;

    constructor(private http:HttpClient) {
    }

}
