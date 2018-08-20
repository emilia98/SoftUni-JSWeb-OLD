import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-account',
    templateUrl: './account.component.html',
    styleUrls: [],
    encapsulation: ViewEncapsulation.None // <------
})
export class AccountComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}