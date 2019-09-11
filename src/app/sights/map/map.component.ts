import { Component, OnInit, isDevMode  } from '@angular/core';
import {
    GeoSearchControl,
    EsriProvider,
} from 'leaflet-geosearch';

import { Sight } from '../../model/sight';
import { SightsService } from "../../services/sights.service";

declare let L;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  isDevMode:boolean;
  map: any;
  zoom = 6;
  center = new L.LatLng(47.103035, 18.773455);

  constructor(private sightService:SightsService) {
  }

  ngOnInit() {
    this.isDevMode = isDevMode();
      const provider = new EsriProvider();

      const searchControl = new GeoSearchControl({
          provider: provider,
          style: 'button',
          marker: {
              icon: L.icon({
                  iconSize: [25, 41],
                  iconAnchor: [13, 29],
                  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
              })
          },
          popupFormat: ({ query, result }) => result.label + "<p>Please log in to tell something about this place</p>"
      });

      this.map = L.map('map').setView(this.center, this.zoom);

      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
          {
              attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>, ' +
              'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
              id: 'mapbox.streets',
              maxZoom: 18,
              accessToken: 'pk.eyJ1Ijoia3ZlcmNoaSIsImEiOiJjanlyd2NncnMwOTdtM2NwNThuMHVreGpzIn0.GiLeL75YtFDxkEvvBOw5lQ'
          } as any).addTo(this.map);
      this.map.addControl(searchControl);
    this.getSights();
  }

  getSights() {
    this.sightService.getSights().subscribe(
        data => {
          this.setMarkers(data._embedded.sights);
        }
    )

  }
  setMarkers(sights: any) {
    for (let place of sights) {
      new L.marker(
          [place.latitude, place.longitude], {
            icon: L.icon({
              iconSize: [25, 41],
              iconAnchor: [13, 29],
              iconUrl: 'assets/marker-icon.png',
              shadowUrl: 'assets/marker-shadow.png'
            })
          }).bindPopup(place.label).addTo(this.map)
    }
  }
}
