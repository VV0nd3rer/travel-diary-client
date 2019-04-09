import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../validation.service';

import { Router } from '@angular/router';
import { RegistrationForm } from '../user/registration-form';
import { UserService } from '../user/user.service';
import { ServiceResponse } from "../service-response";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: any;

  serviceResponse: ServiceResponse<any>;

  registrationError: boolean = false;
  internalServerError: boolean = false;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.registrationForm = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(5)]],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'password': ['', [Validators.required, ValidationService.passwordValidator]],
      'confirmPassword': ['', Validators.required]
    }, {
      validator: ValidationService.passwordMismatchValidator
    });
  }

  ngOnInit() {

  }

  register(): void {
    this.userService.register(this.registrationForm).subscribe(
        res => {
          /*console.log(res);*/
          this.serviceResponse = res;
          this.serviceResponse.responseCode != "OK" ? this.registrationError = true :
              this.router.navigateByUrl('/');
        },
        error => { this.internalServerError = true; }
    );
  }

}
