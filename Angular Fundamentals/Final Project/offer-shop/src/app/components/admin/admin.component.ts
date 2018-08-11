import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: [ './admin.component.css', './index.css'],
    encapsulation: ViewEncapsulation.None // <------
})
export class AdminComponent implements OnInit {
    public title = "Dashboard"
    constructor() {}

    ngOnInit() {}
}