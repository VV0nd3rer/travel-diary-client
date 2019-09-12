import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Post } from "../model/post";
import {PostsService} from "../services/posts.service";

@Component({
    selector: 'app-save-post',
    templateUrl: './save-post.component.html',
    styleUrls: ['./save-post.component.css']
})
export class SavePostComponent implements OnInit {
    savePostForm:FormGroup;
    post:Post = new Post();

    constructor(private route:ActivatedRoute,
                private location: Location,
                private postService:PostsService,
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
        const id = +this.route.snapshot.paramMap.get('id');
        this.postService.getPostDetails(id).subscribe(
            data => {
                this.post = data;
                this.fillFormData(data);
            },
            err => console.log("Get post Error...")
        )
    }
    private fillFormData(data: any) {
        this.savePostForm.get('title').setValue(data.title);
        this.savePostForm.get('description').setValue(data.description);
        this.savePostForm.get('text').setValue(data.text);
    }
    private prepareUpdatedPost() {
        this.post.title = this.savePostForm.get('title').value;
        this.post.description = this.savePostForm.get('description').value;
        this.post.text = this.savePostForm.get('text').value;
    }
    goBack(): void {
        this.location.back();
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
                console.log("Upd post: " + JSON.stringify(data));
            },
            err => console.log("Get post Error...")
        );
    }
}
