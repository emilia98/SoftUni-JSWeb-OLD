import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationsAllComponent } from './locations/list-all/list-all.component';
import { CreateLocationComponent } from './locations/create/create-location.component';
import { AdminComponent } from './admin.component';
import { EditLocationComponent } from './locations/edit/edit-location.component';
import { CreateCategoryComponent } from './categories/create/create-category.component';

const adminRoutes :Routes = [
    { 
        path: 'locations', 
        pathMatch: 'full', 
        component: LocationsAllComponent,
    },
    {
        path: 'location/new',
        pathMatch: 'full',
        component: CreateLocationComponent,
    },
    {
        path: 'location/edit/:name/:id',
        pathMatch: 'full',
        component: EditLocationComponent
    },
    {
        path: 'category',
        pathMatch: 'full',
        component: CreateCategoryComponent
    }
];


@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRouterModule {}