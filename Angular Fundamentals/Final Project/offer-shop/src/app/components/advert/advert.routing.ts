import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAdvertComponent } from './create/create.component';

const advertRoutes :Routes = [
    {
        path: 'new',
        component: CreateAdvertComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(advertRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdvertRoutingModule {}
