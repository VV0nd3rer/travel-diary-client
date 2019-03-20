import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoggedIn: Observable<boolean>;
  private observer: Observer<boolean>;

  constructor(private http: HttpClient) {
    this.isLoggedIn = new Observable(observer => this.observer = observer);

  }
    getTest() : Observable<User> {
        return this.http.get<User>("test")
            .pipe(
                tap(val => console.log(`Calling test method. The response: ${val}`)),
                catchError((error: any) => {
                    console.error(error);
                    return of(error);
                })
            );
    }

  login(user: User) : Observable<any> {
      return this.http.post("user/login", user)
        .pipe(
            map(res => {
              return res;
            }),
            catchError((error: any) => {
                return of(error);
            }));
  }

}
