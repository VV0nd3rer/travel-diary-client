import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LogoutService} from "../logout.service";
import {ServiceResponse} from "../service-response";

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent implements OnInit {
  serviceResponse: ServiceResponse<any>;

  constructor(private logoutService: LogoutService, private router: Router) { }

  ngOnInit() {
      this.logout();
  }
  logout(): void {
    this.logoutService.logout().subscribe(
        res => {
          this.serviceResponse = res;
          if (this.serviceResponse.responseCode == "OK") {
            this.router.navigateByUrl('/');
          }
        }
    );
  }

}
