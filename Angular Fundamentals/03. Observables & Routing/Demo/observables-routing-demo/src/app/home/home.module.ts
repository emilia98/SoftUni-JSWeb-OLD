import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about.component';
import { NotFoundComponent } from './not-found.component';
import { ProfileComponent } from './profile.component';

@NgModule({
    declarations: [
        HomeComponent,
        AboutComponent,
        NotFoundComponent,
        ProfileComponent
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        HomeComponent
    ]
})
export class HomeModule {
    
}