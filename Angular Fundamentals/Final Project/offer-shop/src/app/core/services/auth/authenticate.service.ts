import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
    private commonUrl = 'http://localhost:8080/auth';

    constructor(
        private httpClient :HttpClient
    ) {}

    register(data) {
        let url = `${this.commonUrl}/register`;
        return this.httpClient.post<Object>(
            url,
            data
        );
    }
}
