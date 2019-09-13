import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { PageEvent } from '@angular/material';
import { PostsService } from "../services/posts.service";
import { Post } from "../model/post";
import { Page } from "../model/page";
import { DataViewMode } from "../services/view-mode";
import {Content} from "../model/content";

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    page:Page = new Page();
    posts: Post[] = [];
    viewModeEnum = DataViewMode;
    currentView:DataViewMode = this.viewModeEnum.Grid;


    // Object vs Map
    // https://medium.com/front-end-weekly/es6-map-vs-object-what-and-when-b80621932373

    //An object which stores HTTP GET request parameters for getting posts
    //Example of request: <base-url>/posts?author=33&page=1
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
        console.log("Calling update page... ");
        if (event) {
            this.requestParams['page'] = event.pageIndex;
            this.requestParams['size'] = event.pageSize;
        }
        this.postService.getPostsPage(this.requestParams).subscribe(
            data => {
                this.posts = data._embedded.posts;
                this.page = data.page;
            },
            error => {
            }
        )
    }


}

