import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SightsComponent} from "./sights.component";
import {MapComponent} from "./map/map.component";
import {ListComponent} from "./list/list.component";
import {NotFoundComponent} from "../not-found/not-found.component";

const routes: Routes = [
  {
    path: '', component: SightsComponent, children: [
    {
      path: 'map', component: MapComponent
    },
    {
      path: 'list', component: ListComponent
    },
    {
      path: '', redirectTo: 'map', pathMatch: 'full'
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SightsRoutingModule { }
