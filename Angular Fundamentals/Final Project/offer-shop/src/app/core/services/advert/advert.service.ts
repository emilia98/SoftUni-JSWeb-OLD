import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AdvertService {
    private commonUrl = 'http://localhost:8080/advert'
    constructor(
        private httpClient :HttpClient
    ) {}

    createAdvert(data) {
        return this.httpClient.post(
            `${this.commonUrl}/new`,
            data
        );
    }

    getAllLocations(data) {
        return this.httpClient.post(
            `${this.commonUrl}/locations`,
            data
        );
    }
}
