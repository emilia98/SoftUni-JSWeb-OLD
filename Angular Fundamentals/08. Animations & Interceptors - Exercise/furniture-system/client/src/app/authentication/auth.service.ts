import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignUpModel } from './models/signup.model';
import { SignInModel } from './models/signin.model';
import { Observable } from 'rxjs';

const loginUrl = 'http://localhost:5000/auth/login';
const registerUrl = 'http://localhost:5000/auth/signup';
const authUrl = 'http://localhost:5000/auth';

@Injectable()
export class AuthService {
  private isAuth :boolean = null;
  constructor(private http : HttpClient) {  }

  register(body : SignUpModel) {
    return this.http.post(registerUrl, body);
  }

  login(body : SignInModel) {
    return this.http.post(loginUrl, body);
  }

  logout() {
    localStorage.clear();
  }

  get auth() {
    return this.isAuth;
  }

  checkAuth() :any {
    return this.http.get(authUrl).subscribe(
      (data) => {
        this.isAuth = true;
        //this.authService.
        //this.isAuthenticated = true;
        //console.log(data)
      },
      (err) => {
        this.isAuth = false;
        //this.isAuthenticated = false;
        //console.log(err);
      }
    );
  }
  
  isAuthenticated() : boolean {
   
    return localStorage.getItem('user') !== null;
  }
}