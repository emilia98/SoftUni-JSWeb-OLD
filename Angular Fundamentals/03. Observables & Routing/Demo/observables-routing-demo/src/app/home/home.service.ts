import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService {
    constructor(
        private httpClient :HttpClient
    ) { }

    getData() {
        return 'Hello from the service!'
    }

    getGitHubProfile(profile: string) {
        let url = `https://api.github/com/users/${profile}`
        return this.httpClient.get<Object>(url);
    }
}