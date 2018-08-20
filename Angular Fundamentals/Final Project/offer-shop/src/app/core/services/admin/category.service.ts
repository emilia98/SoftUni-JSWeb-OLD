import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {
    private commonUrl = 'http://localhost:8080/admin'
    constructor(
        private httpClient :HttpClient
    ) { }

    createCategory() :Observable<Object> {
        return this.httpClient.post<Object>(
            `${this.commonUrl}/category/new`,
            {
                hello: 'world'
            }
        )
    }

    getAllCategories() :Observable<Array<Object>> {
        return this.httpClient.get<Array<Object>>(
            `${this.commonUrl}/all`,
        );
    }
}