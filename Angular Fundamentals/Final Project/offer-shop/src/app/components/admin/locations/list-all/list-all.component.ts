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
    constructor(
        private locationService :LocationService,
        private router :Router
    ) {}
    
    ngOnInit() {
        this.locationService.getAllLocations().subscribe(
            (data) => {
                console.log(data);
                this.hasResult = true;
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

