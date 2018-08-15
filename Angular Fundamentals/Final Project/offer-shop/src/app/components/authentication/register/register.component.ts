import { Component, OnInit } from '@angular/core';
import { 
    FormGroup, 
    FormControl, 
    FormControlName,
    AbstractControl,
    Validators
} from '@angular/forms';
import { UsernameValidator } from '../validators/username.validator';
import { EmailValidator } from '../validators/email.validator';
import { PasswordValidator } from '../validators/password.validator';
import { RegisterModel } from '../../../core/models/account/register.model';

@Component({
    selector: 'app-user-register',
    templateUrl: './register.component.html',
    styleUrls: [ './register.component.css']
})
export class RegisterComponent implements OnInit{
    public registerForm  :FormGroup;
    public username :AbstractControl;
    public email :AbstractControl;
    public password :AbstractControl;
    public confirm :AbstractControl;

    constructor() {}

    onSubmit() {
        let data = new RegisterModel(
            this.username.value,
            this.email.value,
            this.password.value
        );

        console.log(data);
    }
    
    buildForm() {
        this.registerForm = new FormGroup({
            username: new FormControl('', [
                Validators.required,
                UsernameValidator.shouldHaveExactLength,
                UsernameValidator.shouldContainOnlyAllowedChars
            ]),
            email: new FormControl('', [
                Validators.required,
                EmailValidator.hasCorrectFormat
            ]),
            password: new FormControl('', [
                Validators.required,
                PasswordValidator.shouldHaveExactLength,
                PasswordValidator.shouldContainsAllowedChars
            ]),
            confirmPassword: new FormControl('', [
                Validators.required
            ])
        });
        
        this.username = this.registerForm.get('username');
        this.email = this.registerForm.get('email');
        this.password = this.registerForm.get('password');
        this.confirm = this.registerForm.get('confirmPassword');
    }

    ngOnInit() {
        this.buildForm();
    }
}