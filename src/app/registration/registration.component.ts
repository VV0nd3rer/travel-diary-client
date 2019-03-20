import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../validation.service';

import { Router } from '@angular/router';
import { RegistrationForm } from '../registration-form';
import { RegistrationService } from '../registration.service';
import {ServiceResponse} from "../service-response";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: any;

  serviceResponse: ServiceResponse<any>;
  error: boolean = false;

  constructor(private registrationService: RegistrationService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.registrationForm = this.formBuilder.group({
      'username': ['', [Validators.required, Validators.minLength(8)]],
      'email': ['', [Validators.required, ValidationService.emailValidator]],
      'password': ['', [Validators.required, ValidationService.passwordValidator]],
      'confirmPassword': ['', Validators.required]
    }, {
      validator: ValidationService.passwordMismatchValidator
    });
    console.log(this.registrationForm);
  }

  ngOnInit() {

  }
  register(): void {
    this.registrationService.register(this.registrationForm).subscribe(
        res => {
          console.log(res);
          this.serviceResponse = res;
          this.serviceResponse.responseCode != "OK" ? this.error = true :
              this.router.navigateByUrl('/');
        },
        err => { this.error = true; }
    );
  }

}
