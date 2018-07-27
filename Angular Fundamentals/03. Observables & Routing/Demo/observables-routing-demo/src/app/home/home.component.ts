import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    template: '<h1 style="color: #157ce6">{{data}}</h1>',
    providers: [
        HomeService
    ]
})

export class HomeComponent{
    public data :string;

    constructor (
        private homeService :HomeService
    ) {
        this.data = homeService.getData();
    }
}