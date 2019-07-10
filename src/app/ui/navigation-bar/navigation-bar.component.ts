import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Title }     from '@angular/platform-browser';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';
import {ServiceResponse} from "../../model/service-response";

@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
    currentUser:User;
    serviceResponse:ServiceResponse<User>;
    ngOnInit() {}
    constructor(private userService:UserService,
                private router:Router,
                private titleService: Title,
                public translate:TranslateService) {

        this.userService.loggedInUser$.subscribe(x => this.currentUser = x);

        translate.addLangs(['en', 'ru']);
        translate.setDefaultLang('en');

        const browserLang = translate.getBrowserLang();
        translate.use(browserLang.match(/en|ru/) ? browserLang : 'en');

        this.translate.onLangChange.subscribe(() => {
            const translation = this.translate.instant('APP_TITLE');
            this.setTitle(translation);
        });


    }



    activeLink:string = "";

    public setTitle( newTitle: string) {
        this.titleService.setTitle( newTitle );
    }

    logout():void {
        this.userService.logout().subscribe(
            res => {
                console.log(JSON.stringify(res));
                this.serviceResponse = res;
                if (this.serviceResponse.responseCode == "OK") {
                    this.userService.setLoggedUser(null);
                }
            }
        );
    }
}
