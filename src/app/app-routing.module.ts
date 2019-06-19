import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from "./logout/logout.component";
import { RegistrationComponent } from "./registration/registration.component";
import { SightsComponent } from "./sights/sights.component";
import { PostsComponent } from "./posts/posts.component";
import { BooksComponent } from "./books/books.component";
import { MultimediaComponent } from "./multimedia/multimedia.component";

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'sights', component: SightsComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'books', component: BooksComponent },
  { path: 'multimedia', component: MultimediaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
