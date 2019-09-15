import { Component, OnInit, isDevMode  } from '@angular/core';
import {
    GeoSearchControl,
    EsriProvider,
} from 'leaflet-geosearch';

import { Sight } from '../../model/sight';
import { SightsService } from "../../services/sights.service";
import {MapService} from "../../services/map.service";

declare let L;

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

    isDevMode:boolean;
    map:any;

    latitude = 47.103035;
    longitude = 18.773455;
    zoom = 6;

    constructor(private mapService:MapService,
                private sightService:SightsService) {
    }

    ngOnInit() {
        this.isDevMode = isDevMode();
        this.mapService.initMap(this.latitude, this.longitude, this.zoom);
        this.mapService.initGeosearch();

        this.getSights();
        this.map = this.mapService.map;
    }

    getSights() {
        this.sightService.getAllSights().subscribe(
            data => {
                this.mapService.setMarkers(data._embedded.sights);
            }
        )

    }
}
