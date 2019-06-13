import {Component, ViewChild, Input, OnInit} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PageEvent} from '@angular/material';
import {PostsService} from "../service/posts.service";
import { Post } from "../model/post";
import { Page } from "../model/page";


@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {



  @Input() entity: Post[] = [];

  ngOnInit() {
    this.updateUsersDisplayedInPage(null);
  }
  constructor(private postService: PostsService) {

  }
  ngAfterViewInit() {

  }

  updateUsersDisplayedInPage(event?: PageEvent) {
    let currentPage: number;
    if(event === null) {
      currentPage = 1;
    } else {
      currentPage = event.pageIndex+1;
    }
    this.postService.getPostsPage(currentPage).subscribe(
        res => {
          this.entity = res;
        }
    )
  }
}

