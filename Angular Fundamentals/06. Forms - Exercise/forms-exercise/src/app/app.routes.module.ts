import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';

const routes :Routes = [
    { path: 'home', component: HomeComponent, pathMatch: 'full'},
    { path: 'login', component: LoginComponent, pathMatch:'full'},
    { path: 'register', component: RegisterComponent, pathMatch: 'full'}
];

@NgModule({
  
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutesModule {}