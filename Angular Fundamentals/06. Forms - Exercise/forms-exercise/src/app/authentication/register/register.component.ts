import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators, AbstractControl } from '@angular/forms';
import { UsernameValidator } from './validators/username.validator';
import { PasswordValidator } from './validators/password.validators';
import { NameValidator } from './validators/name.validator';
import { EmailValidator } from './validators/email.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm : FormGroup;
  public username : AbstractControl;
  public password : AbstractControl;
  public confirmPass : AbstractControl;
  public firstName : AbstractControl;
  public lastName : AbstractControl;
  public email : AbstractControl;
  // public 
  /* public fields = {
    username : null,
    password: '',
    confirmPass: ''
  }; */

  

  
  symbolsCount() {
    return this.registerForm.get('password').value.length;
  }
  
  constructor() { }

  log(field) {
    console.log(field);
  }

  formSubmitted(form) {
    console.log(form.valid);
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

  ngOnInit() {
    this.buildForm();
    // console.log(this.registerForm.get('password').);
    //this.registerForm.
    this.registerForm.valueChanges.subscribe
    this.registerForm.valueChanges.subscribe(data => {
      // console.log(data);
     /* this.fields.username = data.username;
      this.fields.password = data.password;
      this.fields.confirmPass = data.confirmPass;
      */
     //console.log(this.username.value);

      //console.log(this.fields);
    });
  }

}
