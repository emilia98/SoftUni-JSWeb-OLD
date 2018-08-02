import { Component, OnInit, Injectable, Input } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators, AbstractControl } from '@angular/forms';
import { Router} from '@angular/router';
import { UsernameValidator } from './validators/username.validator';
import { PasswordValidator } from './validators/password.validators';
import { NameValidator } from './validators/name.validator';
import { EmailValidator } from './validators/email.validator';
import { RegisterModel } from '../models/register.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  // providers: [AuthenticationService]
})
export class RegisterComponent implements OnInit {
  @Input() title :string;
  public registerForm : FormGroup;
  public username : AbstractControl;
  public password : AbstractControl;
  public confirmPass : AbstractControl;
  public firstName : AbstractControl;
  public lastName : AbstractControl;
  public email : AbstractControl;
  public hasError : boolean = false;
  public serverResponse : string = "";
  
  constructor(
    private authService : AuthenticationService,
    private router : Router
  ) { }

  log(field) {
    // console.log(field);
  }

  onRegister() {
    /*
    let constructObj = [
      form.value.username, form.value.password,
      form.value.firstName, form.value.lastName,
      form.value.email
    ];

    // constructObj.push(form.value.age === '' ? null : form.value.age); */
    let readyForm = new RegisterModel(
      this.username.value, this.password.value,
      this.firstName.value, this.lastName.value,
     this.email.value, this.registerForm.get('age').value === '' ? null : this.registerForm.get('age').value
    )
     this.authService.register(readyForm).subscribe(
       data => {
         this.hasError = false;
         //console.log(data);
         this.registerSuccess(data);
       }, 
       err => {
         this.hasError = true;
         if (err.error.error === 'UserAlreadyExists') {
           this.serverResponse = 'This username is already taken!'
         }
         // console.log(err);
       }
     );
  }
  
  buildForm() {
    this.registerForm = new FormGroup({
      username : new FormControl('', [
        UsernameValidator.doesStartWithCapital,
        UsernameValidator.hasOnlyAplhanumerics
      ]),
      password: new FormControl('', [
        PasswordValidator.hasOnlyAlphanumerics,
        PasswordValidator.hasCustomLength
      ]),
      confirmPass: new FormControl('', [
        Validators.required
      ]),
      firstName : new FormControl('', [
        NameValidator.shouldStartWithCapital,
        NameValidator.containsOnlyLetters
      ]),
      lastName : new FormControl('', [
        NameValidator.shouldStartWithCapital,
        NameValidator.containsOnlyLetters
      ]),
      email : new FormControl('', [
        EmailValidator.isEmailValidated
      ]),
      age : new FormControl('')
    })


    this.username = this.registerForm.get('username');
    this.password = this.registerForm.get('password');
    this.confirmPass = this.registerForm.get('confirmPass');
    this.firstName = this.registerForm.get('firstName');
    this.lastName = this.registerForm.get('lastName');
    this.email = this.registerForm.get('email');
    // this.registerForm.get('age').disable();
  }

  
  registerSuccess(data) {
    this.authService.isAuthenticated = true;
    let authtoken :string = data['_kmd'].authtoken;
    this.authService.authtoken = authtoken;
    localStorage.setItem('authtoken', authtoken);
    localStorage.setItem('username', data.username);
     this.router.navigate(['home']);
  }

  ngOnInit() {
    console.log(this.authService.date);
    this.buildForm();
  }

}
