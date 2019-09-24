import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from "../model/user";
import { Post } from "../model/post";
import { Observable } from "rxjs/index";
import {PostsService} from "../services/posts.service";
import {MapService} from "../services/map.service";
import { UserService } from "../services/user.service";

@Component({
    selector: 'app-post-detail',
    templateUrl: './post-detail.component.html',
    styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
    currentUser:User;

    postUrl:string;
    post:Post = new Post();
    map:any;
    zoom = 7;

    constructor(private activatedRoute:ActivatedRoute,
                private router:Router,
                private userService:UserService,
                private postService:PostsService,
                private mapService:MapService) {
    }

    ngOnInit() {
        this.userService.loggedInUser$.subscribe(x => this.currentUser = x);
        this.getPost();
    }

    getPost():void {
        const id = +this.activatedRoute.snapshot.paramMap.get('id');
        this.postService.getPostDetails(id).subscribe(
            data => {
                this.post = data;
                this.mapService.initMap(data.sight.latitude, data.sight.longitude, this.zoom);
                this.mapService.setMarker(data.sight);
                this.map = this.mapService.map;
            },
            err => console.log("Get post Error...")
        )
    }
    goBack(): void {
        this.router.navigateByUrl('/posts');
    }
    deletePost(): void {
        this.postService.deletePost(this.post.postId).subscribe(
            data => {
                this.goBack();
            },
            err => console.log("Error " + err)
        )
    }
}
