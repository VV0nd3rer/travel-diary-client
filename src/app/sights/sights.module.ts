import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule
} from '@angular/material';

import { SightsRoutingModule } from './sights-routing.module';
import { SightsComponent } from "./sights.component";
import { MapComponent } from './map/map.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    SightsComponent,
    MapComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    SightsRoutingModule
  ]
})
export class SightsModule { }
