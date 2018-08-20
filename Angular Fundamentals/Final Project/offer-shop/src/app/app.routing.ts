import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminModule } from './components/admin/admin.module';
import { AdminComponent } from './components/admin/admin.component';
import { InternalServerErrorComponent } from './components/errors/error-500/500.component';
import { ConnectionErrorComponent } from './components/errors/error-0/connection-error.component';
import { AccountModule } from './components/authentication/account.module';
import { RegisterComponent } from './components/authentication/register/register.component';
import { AdvertModule } from './components/advert/advert.module';
import { AccountComponent } from './components/authentication/account.component';
import { HomeComponent } from './components/home/home.component';

const routes :Routes = [
    { path: '', component: HomeComponent},
    // { path: 'admin', loadChildren : '../app/components/admin/admin.module#AdminModule'}
    { path: 'admin', component: AdminComponent, loadChildren: () => AdminModule},
    { path: 'account', component: AccountComponent, loadChildren: () => AccountModule},
    { path: 'ad', loadChildren: () => AdvertModule },
    { path: '500', pathMatch: 'full', component: InternalServerErrorComponent},
    { path: 'connection-error', pathMatch: 'full', component: ConnectionErrorComponent }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRouterModule {}
