import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material';
import { Sight } from '../../model/sight';
import { Page } from "../../model/page";
import { SightsService } from "../../services/sights.service";
import { TranslateService } from '@ngx-translate/core';
import { RequestParam } from  '../../services/request-param';
import { SightSortingCriteria } from '../../services/sight-sorting-criteria';

enum SightAttributes {
    Label = "label",
    Description = "description",
    Latitude = "latitude",
    Longitude = "longitude",
    Visits = "visits"
}

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
    requestParam = RequestParam;
    sortingCriteria = SightSortingCriteria;

    requestParameters = {};

    dataSource = new MatTableDataSource();
    displayedColumns:string[] = [
        SightAttributes.Label, SightAttributes.Description,
        SightAttributes.Latitude, SightAttributes.Longitude,
        SightAttributes.Visits
    ];

    sights:Sight[] = [];
    page:Page = new Page();

    @ViewChild(MatPaginator, {static: true}) paginator:MatPaginator;
    @ViewChild(MatSort, {static: true}) sort:MatSort;

    constructor(private sightService:SightsService) {

    }

    ngOnInit() {
        this.updatePage();
    }

    applyFilter(filterValue:string) {
        console.log(filterValue);
        this.requestParameters['searchLikeAttr'] = filterValue.trim().toLowerCase();
        this.updatePage();
    }

    sortData(sort:Sort) {
        this.requestParameters = {};
        switch (sort.active) {
            case SightAttributes.Visits:
                switch (sort.direction) {
                    case this.sortingCriteria.DESC:
                        this.setSortingRequestParam(this.sortingCriteria.MostVisited);
                        break;
                    case this.sortingCriteria.ASC:
                        this.setSortingRequestParam(this.sortingCriteria.LeastVisited);
                        break;
                }
                break;
            case SightAttributes.Label:
                switch (sort.direction) {
                    case this.sortingCriteria.DESC:
                        this.setSortingRequestParam(this.sortingCriteria.ByLabelDesc);
                        break;
                    case this.sortingCriteria.ASC:
                        this.setSortingRequestParam(this.sortingCriteria.ByLabelAsc);
                        break;
                }
                break;
        }
        this.updatePage();
    }

    private setSortingRequestParam(criteria: SightSortingCriteria) {
        this.requestParameters[this.requestParam.Sorting] = criteria;
    }

    private setPaginationRequestParam(page: number, size: number) {
        this.requestParameters[this.requestParam.Page] = page;
        this.requestParameters[this.requestParam.Size] = size;
    }

    updatePage(event?:PageEvent) {
        if (event) {
            this.setPaginationRequestParam(event.pageIndex, event.pageSize);
        }
        this.sightService.getSightsPage(this.requestParameters).subscribe(
            data => {
                if (data._embedded) {
                    this.dataSource = new MatTableDataSource(data._embedded.sights);
                }
                else {
                    this.dataSource = new MatTableDataSource<Sight>();
                }
                this.page = data.page;
                this.dataSource.sort = this.sort;
            }
        )
    }
}
