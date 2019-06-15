import {Component, ViewChild, Input, OnInit} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {PageEvent} from '@angular/material';
import {PostsService} from "../posts.service";
import { Post } from "../post";
import { DataViewMode} from "../view-mode";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  viewModeEnum = DataViewMode;
  currentView: DataViewMode = this.viewModeEnum.Grid;
  changeViewMode(mode: DataViewMode):void {
    this.currentView = mode;
  }

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

