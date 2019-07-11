import { Component, OnInit, Input } from '@angular/core';
import { Post } from "../model/post";
import { Observable } from "rxjs/index";
import {PostsService} from "../services/posts.service";

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  postUrl: object;
  postDetails: Post = new Post();

  constructor(private postService: PostsService) {
  }

  ngOnInit() {
    this.postUrl = history.state.postUrl;
    this.getPost();
  }
  getPost(): void {
    this.postService.getPostDetails(this.postUrl).subscribe(
        data => {
          this.postDetails = data;
        }
    )
  }

}
