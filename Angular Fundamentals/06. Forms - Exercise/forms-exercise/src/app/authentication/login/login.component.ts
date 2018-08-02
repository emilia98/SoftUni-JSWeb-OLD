import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators, AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { LoginModel } from '../models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  // providers: [ AuthenticationService ]
})
export class LoginComponent implements OnInit {
  public loginForm : FormGroup;
  public username : AbstractControl;
  public password : AbstractControl;
  public serverResponse : string;
  public hasError : boolean = false;

  constructor(
    private authService :AuthenticationService,
    private router : Router
  ) { }

  buildForm() {
    this.loginForm = new FormGroup({
      username : new FormControl('', [
        Validators.required,
      ]),
      password : new FormControl('', [
        Validators.required
      ])
    });

    this.username = this.loginForm.get('username');
    this.password = this.loginForm.get('password');
  }

  onLogin(){
    let form = new LoginModel(
      this.username.value, this.password.value
    );
    
    this.authService.login(form).subscribe(data => {
      this.hasError = false;
      this.loginSuccess(data);
    }, err => {
      this.hasError = true;
      if(err.error.error === 'InvalidCredentials') {
        return this.serverResponse = 'Invalid username or password';
      }
      this.serverResponse = err.error.error;
    });
  }

  loginSuccess(data) {
    this.authService.isAuthenticated = true;
    let authtoken = data['_kmd'].authtoken;
    this.authService.authtoken = authtoken;
    localStorage.setItem('authtoken', authtoken);
    localStorage.setItem('username', data.username);
    this.router.navigate(['/']);
  }

  ngOnInit() {
    console.log(this.authService.date);
    //console.log(this.authService.date);
    this.buildForm();
  }

}
