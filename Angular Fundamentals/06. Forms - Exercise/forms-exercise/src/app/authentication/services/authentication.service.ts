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
export class AuthenticationService implements OnInit{
    private currentToken :string;
    public isAuthenticated :boolean;
     public date :any = new Date().getTime();
    constructor(
        private httpClient: HttpClient
        
    ) { 
        console.log(this);
        this.isAuth();
    }

    private generateAuthHeaders(type ): HttpHeaders {
        let headers = {
            'Authorization': '',
            'Content-Type': 'application/json'
        };

        if (type === 'Basic') {
            headers['Authorization'] = `Basic ${btoa(`${appKey}:${appSecret}`)}`;
        } else {
            headers['Authorization'] = `Kinvey ${localStorage.getItem('authtoken')}`;
        }

        return new HttpHeaders(headers);
    }

    register(registerModel :RegisterModel) {
        return this.httpClient.post(
            registerUrl,
            JSON.stringify(registerModel),
            {
                headers: this.generateAuthHeaders('Basic')
            }
        )
    }

    login(loginModel : LoginModel) : Observable<Object>{
        return this.httpClient.post<Object>(
            loginUrl,
            JSON.stringify(loginModel),
            {
                headers: this.generateAuthHeaders('Basic')
            }
        )
    }

    /*
    isLoggedIn() {
        this.authService.isAuth().subscribe(
          data => {
            this.isAuthenticated = true;
            this.router.navigate(['/home']);
            // console.log(data)
          },
          err => {
            this.isAuthenticated = false;
            // console.log(err)
          }
        );
        // this.authService.isAuth();
        //console.log('here');
        // this.authService.isAuth().subscribe(data => console.log(data));
      }*/

    isAuth() {
        return this.httpClient.get(
            authUrl,
            {
                headers: this.generateAuthHeaders('Kinvey')
            }
        ).subscribe(
            data => {
                this.isAuthenticated = true;
                console.log(data);
            },
            err => {
                this.isAuthenticated = false;
                console.log(err);
            }
        )
        // console.log(isAuth);
    }

    logout() {
        return this.httpClient.post(
            logoutUrl,
            {},
            {
                headers: this.generateAuthHeaders('Kinvey')
            }
        )
    }

    checkIfLoggedIn() {
        return this.currentToken === localStorage.getItem('authtoken');
    }

    get authtoken() {
        return this.currentToken;
    }

    set authtoken(value :string) {
        console.log('here');
        console.log(value);
        this.currentToken = value;
    }

    ngOnInit() {

    }
}

