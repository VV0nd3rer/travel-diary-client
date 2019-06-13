import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
import {ServiceResponse} from "../../model/service-response";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  currentUser: User;
  serviceResponse:ServiceResponse<User>;

  constructor(private userService: UserService, private router: Router) {
    this.userService.loggedInUser.subscribe(x => this.currentUser = x);
    console.log(this.currentUser);
  }
  ngOnInit() {}

  logout(): void {
    this.userService.logout().subscribe(
        res => {
          console.log(JSON.stringify(res));
          this.serviceResponse = res;
          if(this.serviceResponse.responseCode == "OK") {
            this.userService.setLoggedUser(null);
          }
        }
    );
  }
}
