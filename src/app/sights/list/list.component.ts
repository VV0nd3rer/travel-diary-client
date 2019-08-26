import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sight } from '../../model/sight';
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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private sightService:SightsService) {

  }

  ngOnInit() {
    this.getSights();
  }
  getSights() {
    this.sightService.getSights().subscribe(
        data => {
          this.dataSource = new MatTableDataSource(data._embedded.sights);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
    )
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
