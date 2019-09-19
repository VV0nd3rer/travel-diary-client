import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from "../model/post";
import { Sight } from "../model/sight";
import { UploadedImage } from "../model/uploaded-image"
import { ImageService } from "../services/image.service";
import { PostsService } from "../services/posts.service";
import { MapService } from "../services/map.service";
import { SightsService } from "../services/sights.service";

enum PostAttributes {
    Title = "title",
    SightLabel = "sightLabel",
    SightDescription = "sightDescription",
    Description = "description",
    PreviewImageUrl = "previewImageUrl",
    Text = "text"
}


@Component({
    selector: 'app-save-post',
    templateUrl: './save-post.component.html',
    styleUrls: ['./save-post.component.css']
})
export class SavePostComponent implements OnInit {
    postExists:any;
    savePostForm:FormGroup;
    post:Post = new Post();
    map:any;
    zoom = 6;
    searchLabel:any;

    selectedImgPreview:UploadedImage;
    imgLoadingMessage:any;
    previewImageUrl:any;

    constructor(private activatedRoute:ActivatedRoute,
                private router:Router,
                private imageService:ImageService,
                private postService:PostsService,
                private mapService:MapService,
                private sightService:SightsService,
                private formBuilder:FormBuilder) {

        this.savePostForm = this.formBuilder.group({
            'title': ['', [Validators.required]],
            'sightLabel': ['', [Validators.required]],
            'sightDescription': ['', []],
            'description': ['', [Validators.required, Validators.minLength(10)]],
            'text': ['', [Validators.required]]
        }, {
            validator: this.sightValidator
        });
    }

    sightValidator(control:AbstractControl) {
        let currentSightLabel = control.get(PostAttributes.SightLabel).value;
        if (currentSightLabel === '') {
            control.get(PostAttributes.SightLabel).setErrors({sightRequired: true});
        }
    }

    ngOnInit() {
        this.mapService.resetSearchLocation();
        this.getPost();
    }

    getSearchLocation() {
        var location = this.mapService.getSearchLocation();
        if (location != 'undefined' && location != null
            && this.savePostForm.get(PostAttributes.SightLabel).value === '') {
            this.savePostForm.get(PostAttributes.SightLabel).setValue(location.label);
        }
        return location;
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
            this.post.sight = new Sight();
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
            },
            err => {
                console.log('Error getting sights...');
            }
        )

    }

    private fillFormData(data:any) {
        this.savePostForm.get(PostAttributes.Title).setValue(data.title);
        this.savePostForm.get(PostAttributes.SightLabel).setValue(data.sight.label);
        this.savePostForm.get(PostAttributes.SightDescription).setValue(data.sight.description);
        this.savePostForm.get(PostAttributes.Description).setValue(data.description);
        this.savePostForm.get(PostAttributes.Text).setValue(data.text);
        this.previewImageUrl = data.previewImageUrl;
    }

    private prepareUpdatedPost() {
        var location = this.mapService.getSearchLocation();
        if (location != 'undefined' && location != null) {
            this.post.sight.sightId = 0;
            this.post.sight.label = location.label;
            this.post.sight.latitude = location.y;
            this.post.sight.longitude = location.x;
        }
        if (this.previewImageUrl != 'undefined' && this.previewImageUrl != null) {
            this.post.previewImageUrl = this.previewImageUrl;
        }
        this.post.title = this.savePostForm.get(PostAttributes.Title).value;
        this.post.sight.description = this.savePostForm.get(PostAttributes.SightDescription).value;
        this.post.description = this.savePostForm.get(PostAttributes.Description).value;
        this.post.text = this.savePostForm.get(PostAttributes.Text).value;
    }

    goBack():void {
        this.router.navigateByUrl('/post/' + this.post.postId);
    }

    getEditorInitData() {
        var service = this.imageService;
        return {
            images_upload_handler: function (blobInfo, success, failure) {
                service.uploadImageInEditor(blobInfo, success, failure);
            }
        }
    }

    savePost() {
        this.prepareUpdatedPost();

        if (this.postExists) {
            this.updatePost();
        }
        else {
            this.createPost();
        }

    }

    setPreviewImage(files:any) {
        if (files.length === 0)
            return;

        var mimeType = files[0].type;
        if (mimeType.match(/image\/*/) == null) {
            this.imgLoadingMessage = "Only images are supported.";
            return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = (_event) => {
            this.previewImageUrl = reader.result;
        }
    }

    uploadPreviewImage(imageInput:any) {
        const file:File = imageInput.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', (event:any) => {

            this.selectedImgPreview = new UploadedImage(event.target.result, file);
            this.selectedImgPreview.pending = true;
            this.imageService.uploadPreviewImage(this.selectedImgPreview.file).subscribe(
                data => {
                    this.previewImageUrl = data.url;

                    this.selectedImgPreview.pending = false;
                    this.selectedImgPreview.status = 'ok';
                },
                err => {
                    console.log('Error...');
                    this.selectedImgPreview.pending = false;
                    this.selectedImgPreview.status = 'fail';
                    this.selectedImgPreview.path = '';
                }
            );
        });

        reader.readAsDataURL(file);
    }

    /*uploadPreviewImage(imageInput: any) {
     const file: File = imageInput.files[0];
     const reader = new FileReader();
     reader.addEventListener('load', (event: any) => {

     this.selectedImgPreview = new PreviewImage(event.target.result, file);
     console.log("selected file:  " + JSON.stringify(this.selectedImgPreview));
     this.postService.uploadPreviewImage(this.selectedImgPreview.file);
     });

     reader.readAsDataURL(file);
     }*/

    private updatePost() {
        this.postService.updatePost(this.post).subscribe(
            data => {
                this.router.navigateByUrl('/post/' + this.post.postId);
            },
            err => {
                console.log("Get post Error..." + err);
            }
        );
    }

    private createPost() {
        this.postService.savePost(this.post).subscribe(
            data => {
                this.router.navigateByUrl('/post/' + data.postId);
            },
            err => {
                console.log("Get post Error..." + err);
            }
        )
    }
}
