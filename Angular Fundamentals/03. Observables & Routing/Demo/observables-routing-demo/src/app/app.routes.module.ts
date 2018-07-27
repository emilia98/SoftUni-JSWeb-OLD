import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './home/about.component';
import { NotFoundComponent } from './home/not-found.component';
import { ProfileComponent } from './home/profile.component';
import { AuthentcatedRoute } from './shared/authenticated-route.service';
import { LoginComponent } from './account/login.component';
import { RegisterComponent } from './account/register.component';

const routes :Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'profile/:id/:name', component: ProfileComponent},
    { 
        path: 'admin', 
        component: AboutComponent, 
        canActivate: [AuthentcatedRoute]
    }, 
    {
        path: 'account', 
        children: [
            { path: 'login', component: LoginComponent},  // account/login
            { path: 'register', component: RegisterComponent}, // account/register
            { path: 'user/:id', component: RegisterComponent} // account/user/:id
        ]
    },
    // If the requested URL does not match any of the given routes
    { path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [ AuthentcatedRoute ]
})
export class AppRoutesModule {}