import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegisterModel } from '../models/register.model';
import { Injectable, OnInit } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { Observable } from 'rxjs';

const appKey = 'kid_SkaaQExBm';
const appSecret = '163b9988005e4abda8fa1f8e029f208a';
const baseUrl = 'https://baas.kinvey.com/user'
const registerUrl = `${baseUrl}/${appKey}`;
const loginUrl = `${baseUrl}/${appKey}/login`;
const logoutUrl = `${baseUrl}/${appKey}/_logout`;
const authUrl = `https://baas.kinvey.com/appdata/${appKey}/test`;

@Injectable()
export class AuthenticationService implements OnInit {
    private currentToken: string;
    public isAuthenticated: boolean;
    public date: any = new Date().getTime();
    constructor(
        private httpClient: HttpClient
    ) {}

    register(registerModel: RegisterModel) {
        return this.httpClient.post(
            registerUrl,
            JSON.stringify(registerModel),
            {}
        )
    }

    login(loginModel: LoginModel): Observable<Object> {
        return this.httpClient.post<Object>(
            loginUrl,
            JSON.stringify(loginModel),
            {}
        )
    }

    isAuth() {
        return this.httpClient.get(
            authUrl,
            {}
        ).subscribe(
            data => {
                this.isAuthenticated = true;
            },
            err => {
                this.isAuthenticated = false;
            }
        )
    }

    returnResult() {
        return this.httpClient.get(
            authUrl,
            {}
        );
    }

    logout() {
        return this.httpClient.post(
            logoutUrl,
            {},
            {}
        )
    }

    checkIfLoggedIn() {
        return this.currentToken === localStorage.getItem('authtoken');
    }

    get authtoken() {
        return this.currentToken;
    }

    set authtoken(value: string) {
        this.currentToken = value;
    }

    ngOnInit() {}
}