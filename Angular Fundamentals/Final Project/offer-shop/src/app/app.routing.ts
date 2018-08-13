import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminModule } from './components/admin/admin.module';
import { AdminComponent } from './components/admin/admin.component';
import { InternalServerErrorComponent } from './components/errors/error-500/500.component';
import { ConnectionErrorComponent } from './components/errors/error-0/connection-error.component';

const routes :Routes = [
    // { path: 'admin', loadChildren : '../app/components/admin/admin.module#AdminModule'}
    { path: 'admin', component: AdminComponent, loadChildren: () => AdminModule},
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
