import { Component, OnInit } from '@angular/core';
import { latLng, LatLng, tileLayer, Layer, marker, icon } from 'leaflet';

@Component({
    selector: 'app-sights',
    templateUrl: './sights.component.html',
    styleUrls: ['./sights.component.css']
})
export class SightsComponent implements OnInit {
    sights: any = [
        [-40.99497, 174.50808],
        [-41.30269, 173.63696],
        [-41.49413, 173.5421],
        [-40.98585, 174.50659]
    ];
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
        center: [-41.49413, 173.5421]
    };


    constructor() {

    }

    ngOnInit() {
        this.addMarker();
    }

    addMarker() {
        for (let m of this.sights) {
            console.log(m);
            const newMarker = marker(
                m, {
                    icon: icon({
                        iconSize: [25, 41],
                        iconAnchor: [13, 41],
                        iconUrl: 'assets/marker-icon.png',
                        shadowUrl: 'assets/marker-shadow.png'
                    })
                })
            this.markers.push(newMarker);
        }
    }
}
