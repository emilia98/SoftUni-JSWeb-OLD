import { Component } from '@angular/core';


import { ViewChild } from '@angular/core';
import { } from '@types/googlemaps';
import { InputComponent } from './input/input.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public itemProps :Array<Object> = [
    {
      color: 'blue',
      title: 'Dashboard',
      icon: 'home'
    },
    {
      color: 'yellowgreen',
      title: 'User',
      icon: 'user'
    }
  ]
  
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  title = 'app';

  parentClick(value) {
    console.log(value);
    console.log('parent click');
  }

  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
  }
}
