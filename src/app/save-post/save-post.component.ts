import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {PostsService} from "../services/posts.service";

@Component({
    selector: 'app-save-post',
    templateUrl: './save-post.component.html',
    styleUrls: ['./save-post.component.css']
})
export class SavePostComponent implements OnInit {
    savePostForm: any;

    constructor(private postService:PostsService,
                private formBuilder:FormBuilder) {
        this.savePostForm = this.formBuilder.group({
            'description': ['', [Validators.required, Validators.minLength(10)]],
            'text': ['', [Validators.required, Validators.minLength(40)]]
        });
    }

    ngOnInit() {

    }

    getInitData() {
        var service = this.postService;
        return {
            images_upload_handler: function (blobInfo, success, failure) {
                service.uploadImage(blobInfo, success, failure);
            }
        }
    }
}
