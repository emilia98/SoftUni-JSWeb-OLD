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
import { LocationsAllComponent } from './locations/list-all/list-all.component';
import { AdminRouterModule } from './admin.routing';
import { EditLocationComponent } from './locations/edit/edit-location.component';

console.log('booasiosafasfasfasfjaskfasf')
@NgModule({
    declarations: [
        SidebarMenuComponent,
        AdminComponent,
        SidebarHeaderComponent,
        CreateLocationComponent,
        CreateCategoryComponent,
        LocationsAllComponent,
        EditLocationComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AgmCoreModule,
        AdminRouterModule
    ],
    providers: [
        CategoryService,
        LocationService
    ],
    exports: [ 
        AdminComponent,
    ],
    bootstrap: [ AdminComponent ]
})

export class AdminModule {}

