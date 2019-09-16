import { Component, ViewChild, Input, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, PageEvent } from '@angular/material';
import { FormControl } from '@angular/forms';
import { debounceTime, tap, switchMap, finalize, map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PostsService } from "../services/posts.service";
import { Post } from "../model/post";
import { Page } from "../model/page";
import { DataViewMode } from "../services/view-mode";
import {Content} from "../model/content";
import {SightsService} from "../services/sights.service";
import {UserService} from "../services/user.service";

@Component({
    selector: 'app-posts',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
    page:Page = new Page();
    posts:Post[] = [];
    viewModeEnum = DataViewMode;
    currentView:DataViewMode = this.viewModeEnum.Grid;

    authorSearchControl = new FormControl();
    filteredAuthors:any;

    sightSearchControl = new FormControl();
    filteredSights:any;

    isFilterDataLoading = false;
    filterErrorMessage:string;

    selectedSort = "none";

    // Object vs Map
    // https://medium.com/front-end-weekly/es6-map-vs-object-what-and-when-b80621932373

    //An object which stores HTTP GET request parameters for getting posts
    //Example of request: <base-url>/posts?author=33&page=1
    requestParams = {};


    constructor(private postService:PostsService,
                private sightService:SightsService,
                private userService:UserService) {
    }

    ngOnInit() {
        this.loadPage();

        this.initSightsFilter();
        this.initSightsFilterData();

        this.initAuthorsFilter();
        this.initAuthorsFilterData();
    }

    initSightsFilter() {
        this.sightSearchControl.valueChanges
            .pipe(
                debounceTime(500),
                tap(() => {
                    this.filterErrorMessage = "";
                    this.filteredSights = [];
                    this.isFilterDataLoading = true;
                }),
                switchMap(value => {
                    if (value != '') {
                        return this.sightService.getSightsBySearchCondition(value);
                    }
                    else {
                        this.filteredSights = []
                        return this.sightService.getSightsPage();
                    }

                })
            )
            .subscribe(data => {
                if (data._embedded == undefined) {
                    this.filterErrorMessage = "Not found";
                    this.filteredSights = [];
                } else {
                    this.filterErrorMessage = "";
                    this.filteredSights = data._embedded.sights;
                }
                this.isFilterDataLoading = false;
            });
    }

    initAuthorsFilter() {
        this.authorSearchControl.valueChanges
            .pipe(
                debounceTime(500),
                tap(() => {
                    this.filterErrorMessage = "";
                    this.filteredAuthors = [];
                    this.isFilterDataLoading = true;
                }),
                switchMap(value => {
                    if (value != '') {
                        return this.userService.getUsersBySearchCondition(value);
                    }
                    else {
                        this.filteredAuthors = [];
                        return this.userService.getUsersPage();
                    }

                })
            )
            .subscribe(data => {
                if (data._embedded == undefined) {
                    this.filterErrorMessage = "Not found";
                    this.filteredAuthors = [];
                } else {
                    this.filterErrorMessage = "";
                    this.filteredAuthors = data._embedded.users;
                }
                this.isFilterDataLoading = false;
            });
    }

    initSightsFilterData() {
        console.log("init filter data");
        this.sightService.getSightsPage()
            .subscribe(data => {
                this.filteredSights = data._embedded.sights;
            });
    }

    initAuthorsFilterData() {
        this.userService.getUsersPage()
            .subscribe(data => {
                this.filteredAuthors = data._embedded.users;
            });
    }

    changeViewMode(mode:DataViewMode):void {
        this.currentView = mode;
    }

    loadPage(event?:PageEvent) {
        if (event) {
            this.requestParams['page'] = event.pageIndex;
            this.requestParams['size'] = event.pageSize;
        }
        this.postService.getPostsPage(this.requestParams)
            .subscribe(
                data => {
                    if (data._embedded) {
                        this.posts = data._embedded.posts;
                        this.page = data.page;
                    }
                    else {
                        this.page = new Page();
                        this.posts = [];
                    }
                },
                error => {
                }
            )
    }

    searchPosts() {
        this.requestParams = [];
        if (this.sightSearchControl.value != null) {
            this.requestParams['sight.label'] = this.sightSearchControl.value;
        }
        if (this.authorSearchControl.value != null) {
            this.requestParams['author.username'] = this.authorSearchControl.value;
        }
        if (this.selectedSort != 'none') {
            this.requestParams['sorting'] = this.selectedSort;
        }

        this.loadPage();
    }
    resetSearch() {
        this.requestParams = [];
        this.selectedSort = "none";
        this.sightSearchControl.reset();
        this.authorSearchControl.reset();
        this.loadPage();
    }

}

