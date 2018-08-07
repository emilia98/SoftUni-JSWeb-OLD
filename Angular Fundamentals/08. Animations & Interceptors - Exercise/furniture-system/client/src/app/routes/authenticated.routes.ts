import { CanActivate , Router} from '@angular/router';
import { Injectable} from '@angular/core';
import { AuthService } from '../authentication/auth.service';
console.log('auth');
@Injectable()
export class AuthenticatedRoutes implements CanActivate {

    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

 
    canActivate() {

        if(this.authService.auth === null) {
           this.router.navigate(['/']);
            return false;
        }
        
        if (this.authService.auth) {
            return true;
        }
       
        this.router.navigate(['/signin']);
        return false;
    }
}