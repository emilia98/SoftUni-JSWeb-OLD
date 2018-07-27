import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 

@Component({
    selector: 'app-profile',
     template: `
     <h1>Name: <span style="color:#c2a163">{{name}}</span> </h1>
     <h1>Id: <span style="color:#0a82c9">{{id}}</span></h1>
    `
})
export class ProfileComponent implements OnInit {
    public id :string;
    public name :string;

    constructor(private route :ActivatedRoute) { }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.id = params.id;
                this.name = params.name;
            });
    }
}