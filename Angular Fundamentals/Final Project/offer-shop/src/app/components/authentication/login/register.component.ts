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
    selector: 'app-user-login',
    templateUrl: './login.component.html',
    styleUrls: [ './login.component.css']
})
export class LoginComponent implements OnInit {
    ngOnInit() {}
}