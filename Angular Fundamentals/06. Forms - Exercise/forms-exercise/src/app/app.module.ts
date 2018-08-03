import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
 
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { HomeComponent } from './home/home.component';
import { AppRoutesModule } from './app.routes.module';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from './authentication/services/authentication.service';
import { AuthenticatedRoutes } from './authentication/services/routes/authenticated-routes.service';
import { AnonymousRoutes } from './authentication/services/routes/anonymous-routes.service';
import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutesModule,
    ReactiveFormsModule,
    RouterModule,
    
  ],
  providers: [ 
    AuthenticationService
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
