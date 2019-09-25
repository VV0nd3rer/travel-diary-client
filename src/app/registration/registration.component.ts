import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

import { Router } from '@angular/router';
import { RegistrationForm } from '../model/registration-form';
import { UserService } from '../services/user.service';
import { ServiceResponse } from "../model/service-response";


@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    registrationForm:any;

    serviceResponse:ServiceResponse<any>;

    registrationError:boolean = false;
    registrationErrorMessage:string = '';
    internalServerError:boolean = false;

    constructor(private userService:UserService,
                private formBuilder:FormBuilder,
                private router:Router) {
        this.registrationForm = this.formBuilder.group({
            'username': ['', [Validators.required, Validators.minLength(4)]],
            'email': ['', [Validators.required, ValidationService.emailValidator]],
            'password': ['', [Validators.required, ValidationService.passwordValidator]],
            'confirmPassword': ['', Validators.required]
        }, {
            validator: ValidationService.passwordMismatchValidator
        });
    }

    ngOnInit() {

    }

    register():void {
        this.userService.register(this.registrationForm.value).subscribe(
            res => {
                console.log(res);
                this.serviceResponse = res;
                if (this.serviceResponse.responseCode != "OK") {
                    this.registrationError = true;
                    this.registrationErrorMessage = this.serviceResponse.responseMessage;
                }
                else {
                    this.router.navigateByUrl('/user-info');
                }

            },
            error => {
                this.internalServerError = true;
            }
        );
    }

}
