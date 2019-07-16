import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { LOCAL_STORAGE } from 'ngx-webstorage-service';
import { USER_SERVICE_STORAGE, UserService } from './services/user.service';

/*The layout package provides utilities to build responsive UIs that react to screen-size changes.*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule
} from '@angular/material';


import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMugHot, faHeart,
         faTh, faThList,
         faSignInAlt, faUserPlus,
         faPlaneDeparture, faMapMarked,
         faSearch,
         faHiking, faCalendarAlt, faArchway, faComments,
         faCogs, faEdit, faTrashAlt, faArrowCircleLeft
} from '@fortawesome/free-solid-svg-icons';

import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
    HttpClient,
    HttpClientModule,
    HTTP_INTERCEPTORS
} from '@angular/common/http';

import { NavigationBarComponent } from './ui/navigation-bar/navigation-bar.component';
import { BottomBarComponent } from './ui/bottom-bar/bottom-bar.component';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationComponent } from './registration/registration.component';
import { PostsComponent } from './posts/posts.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationInterceptor } from './interceptors/AuthenticationInterceptor';
import { BooksComponent } from './books/books.component';
import { MultimediaComponent } from './multimedia/multimedia.component';
import { SightsComponent } from './sights/sights.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { NotFoundComponent } from './not-found/not-found.component';

library.add(faHeart, faMugHot,
    faTh, faThList,
    faSignInAlt, faUserPlus,
    faPlaneDeparture, faMapMarked,
    faSearch,
    faHiking, faCalendarAlt, faArchway, faComments,
    faCogs, faEdit, faTrashAlt, faArrowCircleLeft
);

// AoT requires an exported function for factories
// More: https://www.npmjs.com/package/@ngx-translate/core#aot
export function HttpLoaderFactory(httpClient: HttpClient) {
    return new TranslateHttpLoader(httpClient);
}

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
        BooksComponent,
        MultimediaComponent,
        SightsComponent,
        PostDetailComponent,
        NotFoundComponent
    ],
    /* The module's imports array tells Angular about other NgModules that
       this particular module needs to function properly.*/
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        BrowserAnimationsModule,
        LayoutModule,
        FlexLayoutModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatListModule,
        MatGridListModule,
        FontAwesomeModule,
        MatMenuModule
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
        },
        UserService,
        { provide: USER_SERVICE_STORAGE, useExisting: LOCAL_STORAGE }

    ],
    /* The providers array is where you list the services the app needs.
       When you list services here, they are available app-wide.
       You can scope them when using feature modules and lazy loading.*/
    bootstrap: [AppComponent]
})
export class AppModule {
}


