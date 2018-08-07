import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class AnonymousRoutes implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthenticationService
    ) { }

    canActivate() {
        console.log('anonymous');
    
        if (this.authService.isAuthenticated === undefined) {
            this.router.navigate(['/']);
            return false;
        }

        if(this.authService.isAuthenticated === false) {
            return true;
        }
       
        this.router.navigate(['/home']);
        return false;
    }
}