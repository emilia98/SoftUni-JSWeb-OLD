import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { AnonymousRoutes } from './authentication/services/routes/anonymous-routes.service';
import { AuthenticatedRoutes } from './authentication/services/routes/authenticated-routes.service';
import { BaseRoutes } from './authentication/services/routes/base-routes.routes';
import { BaseComponent } from './base/base.component';


const routes: Routes = [
    {
        path: '',
        component: BaseComponent,
        pathMatch: 'full',
        canActivate: [BaseRoutes],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'home', component: HomeComponent,
        pathMatch: 'full',
        canActivate: [AuthenticatedRoutes],
        runGuardsAndResolvers: 'always'
    },
    {
        path: 'login',
        component: LoginComponent,
        pathMatch: 'full',
        canActivate: [AnonymousRoutes]
    },
    {
        path: 'register',
        component: RegisterComponent,
        pathMatch: 'full',
        canActivate: [AnonymousRoutes]
    }
];

@NgModule({

    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        BaseRoutes,
        AnonymousRoutes,
        AuthenticatedRoutes,
    ]
})
export class AppRoutesModule { }