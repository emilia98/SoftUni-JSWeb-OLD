import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRouterModule } from './account.routing';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../core/services/auth/authenticate.service';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account.component';
import { NavigationComponent } from '../navigation/navigation.component';
import { NavigationModule } from '../navigation/navigation.module';

@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
        AccountComponent
    ],
    imports: [
        CommonModule,
        NavigationModule,
        ReactiveFormsModule,
        AccountRouterModule
    ],
    providers: [
        AuthenticationService
    ],
    exports: [ AccountComponent ],
    bootstrap: [ AccountComponent ]
})
export class AccountModule {}