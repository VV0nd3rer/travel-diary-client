import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, Observer, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Cloudinary } from '@cloudinary/angular-5.x';
import {throwError} from "rxjs/index";

@Injectable()
export class ImageService {

    constructor(private http:HttpClient, private cloudinary:Cloudinary) {
    }
    uploadImageInEditor(blobInfo: any, success: any, failure: any):void {
        var cloudinaryUrl = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`;
        var uploadPreset = this.cloudinary.config().upload_preset;
        var xhr, formData;
        xhr = new XMLHttpRequest();
        xhr.withCredentials = false;
        xhr.open('POST', cloudinaryUrl);
        xhr.onload = function() {
            var json;
            if (xhr.status != 200) {
                failure('HTTP Error: ' + xhr.status);
                return;
            }
            json = JSON.parse(xhr.responseText);
            if (!json || typeof json.url != 'string') {
                failure('Invalid JSON: ' + xhr.responseText);
                return;
            }
            success(json.url);
        };
        formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
        formData.append("upload_preset", uploadPreset);
        xhr.send(formData);
    }
    uploadPreviewImage(imgFile: any):Observable<any> {
        var cloudinaryUrl = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`;
        var uploadPreset = this.cloudinary.config().upload_preset;
        var formData = new FormData();
        formData.append('file', imgFile);
        formData.append("upload_preset", uploadPreset);
        return this.http.post(cloudinaryUrl, formData);
    }
}