import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitHubProfile } from './github.profile';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileService {
    constructor(
        private httpClient :HttpClient
    ) { }

    getData(username :string) :Observable<GitHubProfile> {
        let url :string = `https://api.github.com/users/${username}`;
        // return this.httpClient.get<Object>(url); // there is better idea

        return this.httpClient.get<GitHubProfile>(url);
    }
}