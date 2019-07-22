import { Component, OnInit } from '@angular/core';
import { Observable, Observer, of } from 'rxjs';
import { Cloudinary } from '@cloudinary/angular-5.x';

@Component({
  selector: 'app-save-post',
  templateUrl: './save-post.component.html',
  styleUrls: ['./save-post.component.css']
})
export class SavePostComponent implements OnInit {
  constructor(private cloudinary: Cloudinary) { }

  ngOnInit() {

  }
  getInitData() {
    var cloudinaryUrl = `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`;
    var uploadPreset = this.cloudinary.config().upload_preset;
    return {
      images_upload_handler: function(blobInfo, success, failure) {
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
    }
  }
}
