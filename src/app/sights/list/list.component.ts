import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material';
import { Sight } from '../../model/sight';
import { Page } from "../../model/page";
import { SightsService } from "../../services/sights.service";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['label', 'description', 'mapCoordLat', 'mapCoordLong'];
  dataSource: MatTableDataSource<Sight>;
  sights: Sight[] = [];
  page:Page = new Page();
  requestParams = {};

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private sightService:SightsService) {

  }

  ngOnInit() {
    this.updatePage();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  updatePage(event?:PageEvent) {
    if (event) {
      this.requestParams['page'] = event.pageIndex;
      this.requestParams['size'] = event.pageSize;
    }
    this.sightService.getSightsPage(this.requestParams).subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data._embedded.sights);
          this.page = data.page;
          this.dataSource.sort = this.sort;
        }
    )
  }
}
