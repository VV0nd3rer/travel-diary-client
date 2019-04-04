import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { User } from '../user';
import {ServiceResponse} from "../service-response";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User;
  loginForm: FormGroup;

  serviceResponse: ServiceResponse<User>;

  loginError: boolean = false;

  constructor(private loginService: LoginService,
              private formBuilder: FormBuilder,
              private router: Router,
              private cookieService: CookieService) {
    this.loginForm = this.formBuilder.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    });
  }


  ngOnInit() {
  }

  test(): void {
    event.preventDefault();
    this.loginService.getTest()
        .subscribe(data => this.user = data);
  }
  login(): void {
    console.log(this.cookieService.get('XSRF-TOKEN'));
    this.loginService.login(this.loginForm.value).subscribe(
      res => {
        this.serviceResponse = res;
        this.serviceResponse.responseCode != "OK" ? this.loginError = true :
            this.router.navigateByUrl('/');
      }/*,
        error => {
          console.error(`There was an error loading user: ${error}`);
        }*/
    );
  }
}
