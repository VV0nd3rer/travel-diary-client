import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from "../model/post";
import { Observable } from "rxjs/index";
import {PostsService} from "../services/posts.service";

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
    postUrl:string;
    post:Post = new Post();

    constructor(private activatedRoute:ActivatedRoute,
                private router:Router,
                private postService:PostsService) {
    }

    ngOnInit() {
        this.getPost();

    }

    getPost():void {
        const id = +this.activatedRoute.snapshot.paramMap.get('id');
        this.postService.getPostDetails(id).subscribe(
            data => {
                this.post = data;
                console.log("Post: " + JSON.stringify(this.post));
            },
            err => console.log("Get post Error...")
        )
    }
    goBack(): void {
        this.router.navigateByUrl('/posts');
    }
}
