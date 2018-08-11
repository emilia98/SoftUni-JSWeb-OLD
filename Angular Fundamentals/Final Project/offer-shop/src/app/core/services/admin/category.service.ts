import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CategoryService {
    private commonUrl = 'http://localhost:8080/admin/category'
    constructor(
        private httpClient :HttpClient
    ) { }

    createCategory() :Observable<Object> {
        return this.httpClient.post<Object>(
            `${this.commonUrl}/new`,
            {
                hello: 'world'
            }
        )
    }
}