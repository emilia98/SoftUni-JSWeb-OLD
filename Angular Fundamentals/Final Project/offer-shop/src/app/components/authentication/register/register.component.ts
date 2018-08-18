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
import { AuthenticationService } from '../../../core/services/auth/authenticate.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

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
    public isLoading :boolean = null;
    public hasErrors :boolean = null;

    public errors :Object = null;
    public hasRejected :boolean = false;
    public serverError :boolean = false;
    public errorMsg :string = null;

    public usernameErrors :Object = null;
    public emailErrors :Object = null;
    public passwordErrors :Object = null;
    public confirmPassErrors :Object = null;


    constructor(
        private authService :AuthenticationService,
        private toastr: ToastrService,
        private router :Router
    ) {}

    onSubmit() {
        this.isLoading = true;

        let data = new RegisterModel(
            this.username.value,
            this.email.value,
            this.password.value,
            this.confirm.value
        );

        let timeout = setTimeout(() => {
            this.authService.register(data).subscribe(
                (data) => {
                    console.log(data);
                    this.isLoading = false;
                    this.hasErrors = false;
                    clearTimeout(timeout);

                    this.usernameErrors = null;
                    this.emailErrors = null;
                    this.passwordErrors = null;
                    this.confirmPassErrors = null;

                    this.toastr.success('You have registered successfully!', 'Congrats!');
                    this.router.navigate(['/account/login']);
                },
                (err) => {
                    let errors = err.error.errors;
                    this.isLoading = false;
                    this.hasErrors = true;
                    
                    if(errors) {
                        this.usernameErrors = Object.keys(errors.username).length > 0 ? errors.username : null;
                        this.emailErrors = Object.keys(errors.email).length > 0 ? errors.email : null;
                        this.passwordErrors = Object.keys(errors.password).length > 0 ? errors.password : null;
                        this.confirmPassErrors = Object.keys(errors.confirmPass).length > 0 ? errors.confirmPass : null;
                    }
                    
                    switch(err.status) {
                        case 409: {
                            this.hasRejected = true;
                            this.errorMsg = err.error.errorMsg;
                            this.toastr.error(this.errorMsg, 'Conflict');
                            break;
                        }
                        case 500: {
                            this.serverError = true;
                            this.errorMsg = err.error.errorMsg;
                            this.toastr.error('Server cannot process your request!', 'Server Error')
                            break;
                        }
                        default: {
                            this.toastr.error('You might have entered an invalid data!', 'Cannot register');
                        }
                    }

                    

                   

                    clearTimeout(timeout);
                    
                }
            )
        }, 500);
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