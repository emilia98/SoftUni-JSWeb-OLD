import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-home',
    template: '<h1>{{data}}</h1>',
    providers: [
        HomeService
    ]
})

export class HomeComponent{
    public data :string;

    constructor (
        private homeService :HomeService,
        private httpClient: HttpClient) {
        this.data = homeService.getData();
    }
}