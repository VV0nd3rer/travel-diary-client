import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

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
    LeafletModule.forRoot(),
    SightsRoutingModule
  ]
})
export class SightsModule { }
