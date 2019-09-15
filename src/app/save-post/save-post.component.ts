import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from "../model/post";
import { PostsService } from "../services/posts.service";
import { MapService } from "../services/map.service";
import { SightsService } from "../services/sights.service";

enum PostAttributes {
    Title = "title",
    Description = "description",
    Text = "text"
}

@Component({
    selector: 'app-save-post',
    templateUrl: './save-post.component.html',
    styleUrls: ['./save-post.component.css']
})
export class SavePostComponent implements OnInit {
    postExists: any;
    savePostForm:FormGroup;
    post:Post = new Post();
    map:any;
    zoom = 6;

    constructor(private activatedRoute:ActivatedRoute,
                private router:Router,
                private postService:PostsService,
                private mapService:MapService,
                private sightService:SightsService,
                private formBuilder:FormBuilder) {
        this.savePostForm = this.formBuilder.group({
            'title': ['', [Validators.required]],
            'description': ['', [Validators.required, Validators.minLength(10)]],
            'text': ['', [Validators.required]]
        });
    }

    ngOnInit() {
        this.getPost();
    }

    getPost():void {
        const id = +this.activatedRoute.snapshot.paramMap.get('id');
        this.postExists = id;
        if (this.postExists) {
            this.postService.getPostDetails(id).subscribe(
                data => {
                    this.post = data;
                    this.fillFormData(data);
                    this.mapService.initMap(data.sight.latitude, data.sight.longitude, this.zoom);
                    this.mapService.initGeosearch();
                    this.mapService.setMarker(data.sight);
                },
                err => console.log("Get post Error...")
            )
        }
        else {
            var latitude = 47.103035;
            var longitude = 18.773455;
            this.mapService.initMap(latitude, longitude, this.zoom);
            this.mapService.initGeosearch();
            this.getSights();

        }

        this.map = this.mapService.map;
    }
    getSights() {
        this.sightService.getAllSights().subscribe(
            data => {
                this.mapService.setMarkers(data._embedded.sights);
            }
        )

    }

    private fillFormData(data:any) {
        this.savePostForm.get(PostAttributes.Title).setValue(data.title);
        this.savePostForm.get(PostAttributes.Description).setValue(data.description);
        this.savePostForm.get(PostAttributes.Text).setValue(data.text);
    }

    private prepareUpdatedPost() {
        this.post.title = this.savePostForm.get(PostAttributes.Title).value;
        this.post.description = this.savePostForm.get(PostAttributes.Description).value;
        this.post.text = this.savePostForm.get(PostAttributes.Text).value;
    }

    goBack():void {
        this.router.navigateByUrl('/post/' + this.post.postId);
    }

    getEditorInitData() {
        var service = this.postService;
        return {
            images_upload_handler: function (blobInfo, success, failure) {
                service.uploadImage(blobInfo, success, failure);
            }
        }
    }

    updatePost() {
        this.prepareUpdatedPost();
        this.postService.updatePost(this.post).subscribe(
            data => {
                this.router.navigateByUrl('/post/' + this.post.postId);
            },
            err => {
                console.log("Get post Error..." + err);
                this.router.navigateByUrl('/login');
            }
        );
    }
}
