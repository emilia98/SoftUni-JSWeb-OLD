import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movies/details/details.component';

const routes :Routes = [
    
    { path: '', component: MoviesComponent, pathMatch: 'full'},
    { path: 'movie/:id', component: MovieDetailsComponent},
];
/*
@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutesModule {}
*/

export const AppRoutesModule: ModuleWithProviders = RouterModule.forRoot(routes);