import { Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateModel } from './create-furniture/create.model';
import { Observable } from 'rxjs';
import { Furniture } from './all-furniture/furniture.model';

@Injectable()
export class FurnitureService {
    private commonUrl = 'http://localhost:5000/furniture/';
    constructor(
        private httpClient :HttpClient
    ) {}

    createFurniture(createModel :CreateModel) {
        return this.httpClient.post(
            `${this.commonUrl}create`,
            JSON.stringify(createModel),
            {}
        );
    }

    listAll() :Observable<any> {
        return this.httpClient.get<Array<Furniture>>(
            `${this.commonUrl}all`
        );
    }

    getDetails(id :string) :Observable<any> {
        return this.httpClient.get<Furniture>(
            `${this.commonUrl}details/${id}`,
            {}
        );
    }

    getMine() {
        return this.httpClient.get<Array<Furniture>>(
            `${this.commonUrl}mine`,
            {}
        );
    }

    deleteItem(id :string) :Observable<any>{
        return this.httpClient.delete<Furniture>(
            `${this.commonUrl}delete/${id}`,
            {}
        );
    }
}