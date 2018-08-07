import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class AuthenticatedRoutes implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }

 
    canActivate() {
        console.log('auth');

        if(this.authService.isAuthenticated === undefined) {
           this.router.navigate(['/']);
            return false;
        }
        
        if (this.authService.isAuthenticated) {
            return true;
        }
       
        this.router.navigate(['/login']);
        return false;
    }
}
