import { Component, OnInit } from '@angular/core';
import { latLng, LatLng, tileLayer, Layer, marker, icon } from 'leaflet';
import { Sight } from './../model/sight';
import { SightsService } from "../services/sights.service";

@Component({
    selector: 'app-sights',
    templateUrl: './sights.component.html',
    styleUrls: ['./sights.component.css']
})
export class SightsComponent implements OnInit {
    sights: Sight[] = [];
    markers:Layer[] = [];

    options = {
        name: 'Mapbox',
        enabled: true,
        layers: [
            tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
                {
                    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, ' +
                    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                    id: 'mapbox.streets',
                    maxZoom: 18,
                    accessToken: 'pk.eyJ1Ijoia3ZlcmNoaSIsImEiOiJjanlyd2NncnMwOTdtM2NwNThuMHVreGpzIn0.GiLeL75YtFDxkEvvBOw5lQ'
                } as any)
        ],
        zoom: 9,
        center: [48.499998, 23.3833318]
    };


    constructor(private sightService:SightsService) {

    }

    ngOnInit() {
        this.getSights();
    }

    getSights() {
        this.sightService.getSights().subscribe(
            data => {
                this.setMarkers(data._embedded.sightsListResourceList);
            }
        )

    }
    setMarkers(sights: any) {
        console.log(sights);
        for (let place of sights) {
            const newMarker = marker(
                [place.mapCoordLat, place.mapCoordLong], {
                    icon: icon({
                        iconSize: [25, 41],
                        iconAnchor: [13, 41],
                        iconUrl: 'assets/marker-icon.png',
                        shadowUrl: 'assets/marker-shadow.png'
                    })
                })
            newMarker.bindPopup(place.label).openPopup();
            this.markers.push(newMarker);
        }
    }
}
