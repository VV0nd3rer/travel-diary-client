import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { PostsService } from "../service/posts.service";
import { Post } from "../model/post";
import { Page } from "../model/page";
import { DataViewMode } from "../service/view-mode";

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    page:Page <Post[]> = new Page();
    viewModeEnum = DataViewMode;
    currentView:DataViewMode = this.viewModeEnum.Grid;


    // Object vs Map
    // https://medium.com/front-end-weekly/es6-map-vs-object-what-and-when-b80621932373

    //An object which stores HTTP GET request parameters for getting posts
    //Example of request: <base-url>/posts?author=33&current_page=1
    requestParams = {};

    ngOnInit() {
        this.updatePage();
    }

    constructor(private postService:PostsService) {
    }
    changeViewMode(mode:DataViewMode):void {
        this.currentView = mode;
    }
    updatePage(event?:PageEvent) {
        if (event) {
            this.requestParams['page'] = event.pageIndex;
            this.requestParams['size'] = event.pageSize;
        }
        this.postService.getPostsPage(this.requestParams).subscribe(
            data => {
                this.parsePaginationResponse(data);
            }
        )
    }

    private parsePaginationResponse(data:any) {
        this.page.content = data.resources.content;
        this.page.totalPages = data.totalPages;
        this.page.totalElements = data.totalElements;
        this.page.currentPage = data.currentPage;
        this.page.pageSize = data.pageSize;
    }
}

