import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from "./logout/logout.component";
import { RegistrationComponent } from "./registration/registration.component";
import { PostsComponent } from "./posts/posts.component";
import { BooksComponent } from "./books/books.component";
import { MultimediaComponent } from "./multimedia/multimedia.component";
import {PostDetailComponent} from "./post-detail/post-detail.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {SavePostComponent} from "./save-post/save-post.component";

const routes: Routes = [
  { path: '', redirectTo: 'posts', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'sights', loadChildren: () => import(`./sights/sights.module`).then(m => m.SightsModule) },
  { path: 'posts', component: PostsComponent },
  { path: 'books', component: BooksComponent },
  { path: 'multimedia', component: MultimediaComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'save-post', component: SavePostComponent },
  { path: 'save-post/:id', component: SavePostComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
