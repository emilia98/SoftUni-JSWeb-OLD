import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRouterModule } from './account.routing';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        RegisterComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRouterModule
    ],
    providers: [],
    exports: []
})
export class AccountModule {}