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
import { LoginModel } from '../../../core/models/account/login.model';

@Component({
    selector: 'app-user-login',
    templateUrl: './login.component.html',
    // styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit {
    public loginForm :FormGroup;
    public username :AbstractControl;
    public password :AbstractControl;

    public hasRejected :boolean = false;
    public errorMsg :String = null;
    
    constructor(
        private authService :AuthenticationService,
        private toastr :ToastrService,
        private router :Router
    ) {}

    onSubmit() {
        let data = new LoginModel(
            this.username.value,
            this.password.value
        );

        this.authService.login(data).subscribe(
            (data :any) => {
                let user = {
                    token :data.token,
                    username :data.username
                };
                this.setToken(user);
                this.toastr.success('You have logged in successfully, so fast - go and explore!', 'Congrats!');
                this.router.navigate(['/']);
            },
            (err) => {
                this.hasRejected = true;
                this.errorMsg = err.error.errorMsg;
            }
        );
    }

    setToken(data) {
        localStorage.setItem('user', JSON.stringify(data))
    }

    buildForm() {
        this.loginForm = new FormGroup({
            username: new FormControl('', [
                Validators.required
            ]),
            password: new FormControl('', [
                Validators.required
            ])
        });

        this.username = this.loginForm.get('username');
        this.password = this.loginForm.get('password');
    }
    
    ngOnInit() {
        this.buildForm();
    }
}