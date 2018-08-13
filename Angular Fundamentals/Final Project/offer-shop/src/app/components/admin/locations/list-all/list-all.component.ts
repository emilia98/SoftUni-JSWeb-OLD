import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../../../core/services/admin/location.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-locations-all',
    templateUrl: './list-all.component.html',
    styleUrls: [ './list-all.component.css']
})
export class LocationsAllComponent implements OnInit {
    public hasResult = false;
    public locations = null;
    constructor(
        private locationService :LocationService,
        private router :Router
    ) {}
    
    ngOnInit() {
        this.locationService.getAllLocations().subscribe(
            (data :any) => {
                console.log(data.locations);
                this.hasResult = true;
                this.locations = data.locations;
            },
            (err) => {
                this.hasResult = true;
                if(err.status === 0) {
                    this.router.navigate(['/500']);
                }
                console.log(err);
            }
        )
    }
}

