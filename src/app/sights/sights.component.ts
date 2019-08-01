import { Component, OnInit } from '@angular/core';
import { latLng, LatLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-sights',
  templateUrl: './sights.component.html',
  styleUrls: ['./sights.component.css']
})
export class SightsComponent implements OnInit {
  options = {
    name: 'Mapbox',
    enabled: true,
    layers: [
      tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoia3ZlcmNoaSIsImEiOiJjanlyd2NncnMwOTdtM2NwNThuMHVreGpzIn0.GiLeL75YtFDxkEvvBOw5lQ',
      })
    ],
    zoom: 5,
    center: [ 46.879966, -121.726909 ]
  };
  constructor() { }

  ngOnInit() {

  }

}
