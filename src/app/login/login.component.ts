import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
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
  internalServerError: boolean = false;

  constructor(private userService: UserService,
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


  login(): void {
    console.log(this.cookieService.get('XSRF-TOKEN'));
    this.userService.login(this.loginForm.value).subscribe(
      res => {
        this.serviceResponse = res;
        if(this.serviceResponse.responseCode != "OK") {
          this.loginError = true;
        } else {
          this.userService.setLoggedUser(this.serviceResponse.responseObject);
          this.router.navigateByUrl('/');
        }
      },
        error => {
          this.internalServerError = true;
        }
    );
  }
}
