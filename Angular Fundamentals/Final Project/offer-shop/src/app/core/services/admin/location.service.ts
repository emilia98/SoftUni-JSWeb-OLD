import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LocationService {
    private commonUrl = 'http://localhost:8080/admin/location'
    constructor(
        private httpClient :HttpClient
    ) { }

    createLocation(data) {
        return this.httpClient.post<Object>(
            `${this.commonUrl}/new`,
            data
        );
    }

    editLocation(id, data) {
        return this.httpClient.post(
            `${this.commonUrl}/edit/${id}`,
            data
        );
    }
    
    getAllLocations() {
        return this.httpClient.get(
            `${this.commonUrl}/list`
        )
    }

    getSingleLocation(id :string) {
        return this.httpClient.get(
            `${this.commonUrl}/details/${id}`
        );
    }
    
}