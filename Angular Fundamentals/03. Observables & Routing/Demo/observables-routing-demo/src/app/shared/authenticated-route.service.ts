import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthentcatedRoute implements CanActivate {
    constructor(
        private router :Router
    ) { }
    
    canActivate() {
        // if(this.userService.isAuthenticated())
        
        // in this case we will use hard-coded value
        this.router.navigateByUrl('/account/login');
        return false;
    }
}