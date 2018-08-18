import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRouterModule } from './account.routing';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../core/services/auth/authenticate.service';
import { LoginComponent } from './login/register.component';

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRouterModule
    ],
    providers: [
        AuthenticationService
    ],
    exports: []
})
export class AccountModule {}