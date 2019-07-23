import { Component, OnInit } from '@angular/core';
import {PostsService} from "../services/posts.service";

@Component({
  selector: 'app-save-post',
  templateUrl: './save-post.component.html',
  styleUrls: ['./save-post.component.css']
})
export class SavePostComponent implements OnInit {
  constructor(private postService: PostsService) { }

  ngOnInit() {

  }
  getInitData() {
    var service = this.postService;
    return {
      images_upload_handler: function(blobInfo, success, failure) {
        service.uploadImage(blobInfo, success, failure);
      }
    }
  }
}
