import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminComponent } from './admin.component';
import { SidebarMenuComponent } from './navigation/sidebar/menu/menu.component';
import { SidebarHeaderComponent } from './navigation/sidebar/header/header.component';
import { CreateLocationComponent } from './locations/create/create-location.component';
import { CreateCategoryComponent } from './categories/create/create-category.component';
import { CategoryService } from '../../core/services/admin/category.service';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { LocationService } from '../../core/services/admin/location.service';

@NgModule({
    declarations: [
        SidebarMenuComponent,
        AdminComponent,
        SidebarHeaderComponent,
        CreateLocationComponent,
        CreateCategoryComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AgmCoreModule
    ],
    providers: [
        CategoryService,
        LocationService
    ],
    exports: [ 
        AdminComponent,
    ]
})

export class AdminModule {}

