import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NavigationModule } from '../navigation/navigation.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        NavigationModule,
        RouterModule
    ],
    providers: [],
    exports: [ HomeComponent ],
    bootstrap: [ HomeComponent ]
})
export class HomeModule {}