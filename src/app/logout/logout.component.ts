import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../services/user.service";
import {ServiceResponse} from "../model/service-response";

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
  serviceResponse: ServiceResponse<any>;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
      this.logout();
  }
  logout(): void {
    this.userService.logout().subscribe(
        res => {
          this.serviceResponse = res;
          if (this.serviceResponse.responseCode == "OK") {
            this.router.navigateByUrl('/');
          }
        }
    );
  }

}
