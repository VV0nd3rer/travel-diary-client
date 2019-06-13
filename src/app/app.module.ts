import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    HttpClientModule,
    HTTP_INTERCEPTORS
} from '@angular/common/http';

import { MaterialModule } from './material.module';


import { NavigationBarComponent } from './ui/navigation-bar/navigation-bar.component';
import { BottomBarComponent } from './ui/bottom-bar/bottom-bar.component';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationComponent } from './registration/registration.component';
import { PostsComponent } from './posts/posts.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationInterceptor } from './interceptors/AuthenticationInterceptor';
import { BooksComponent } from './books/books.component';

/* Access modifiers in TypeScript:
 * Everything in a class is public if not specified.
 * Everything in a module is private unless export keyword is used.*/

/*An NgModule describes how the application parts fit together.

  Every application has at least one Angular module,
  the root module that you bootstrap to launch the application.
  By convention, it is usually called AppModule.*/
@NgModule({
    /* The module's declarations array tells Angular which components belong to that module.
       As you create more components, add them to declarations.*/
    declarations: [
        AppComponent,
        LoginComponent,
        LogoutComponent,
        RegistrationComponent,
        NavigationBarComponent,
        BottomBarComponent,
        PostsComponent,
        BooksComponent
    ],
    /* The module's imports array tells Angular about other NgModules that
       this particular module needs to function properly.*/
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        MaterialModule
    ],
    /* The providers array is where you list the services the app needs.
       When you list services here, they are available app-wide.
       You can scope them when using feature modules and lazy loading.*/
    providers: [
        CookieService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true
        }
    ],
    /* The providers array is where you list the services the app needs.
       When you list services here, they are available app-wide.
       You can scope them when using feature modules and lazy loading.*/
    bootstrap: [AppComponent]
})
export class AppModule {
}


