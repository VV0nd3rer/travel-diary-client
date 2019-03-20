import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';
import { ControlMessagesComponent } from './control-messages.component';


import { NavigationBarComponent } from './ui/navigation-bar/navigation-bar.component';
import { BottomBarComponent } from './ui/bottom-bar/bottom-bar.component';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegistrationComponent } from './registration/registration.component';
import { PostsComponent } from './posts/posts.component';


@NgModule({
  declarations: [
    AppComponent,
    ControlMessagesComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    NavigationBarComponent,
    BottomBarComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


