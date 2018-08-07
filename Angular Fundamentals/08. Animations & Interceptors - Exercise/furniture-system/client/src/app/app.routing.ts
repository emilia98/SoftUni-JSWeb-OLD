import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { CreateFurnitureComponent } from './furnitures/create-furniture/create-furniture.component';
import { AllFurnitureComponent } from './furnitures/all-furniture/all-furniture.component';
import { DetailsComponent } from './furnitures/details/details.component';
import { MyFurnitureComponent } from './furnitures/my-furniture/my-furniture.component';
import { AnonymousRoutes } from './routes/anonymous.routes';
import { AuthenticatedRoutes } from './routes/authenticated.routes';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [AnonymousRoutes],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AnonymousRoutes],
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'furniture',
    // canActivate: [AuthenticatedRoutes],
    runGuardsAndResolvers: 'always',
    children: [
      { path: 'create', component: CreateFurnitureComponent },
      { path: 'all', component: AllFurnitureComponent },
      { path: 'details/:id', component: DetailsComponent, pathMatch: 'full' },
      { path: 'mine', component: MyFurnitureComponent, pathMatch: 'full' },
      // { path: 'delete/:id', component: DetailsComponent, pathMatch: 'full'}
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AnonymousRoutes,
    AuthenticatedRoutes,
  ]
})
export class AppRoutingModule { }