import { Component, OnInit } from '@angular/core';
@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
    public title :string = 'Google Maps Api';
    public lat :number = 42.8707915;
    public lng :number =  25.3168769;
    public zoom :number = 16;
    public emails :Array<string> = [
        'emilia98@students.softuni.bg',
        'emilia_nedialkova@abv.bg'
    ]
    constructor() {}

    ngOnInit() {}
}