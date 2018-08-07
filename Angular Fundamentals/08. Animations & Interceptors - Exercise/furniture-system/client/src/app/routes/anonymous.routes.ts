import { CanActivate , Router} from '@angular/router';
import { Injectable} from '@angular/core';
import { AuthService } from '../authentication/auth.service';

@Injectable()
export class AnonymousRoutes implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) { }

    canActivate() {
        console.log(this.authService.auth);
        if (this.authService.auth === null) {
            this.router.navigate(['/']);
            return false;
        }

        if(this.authService.auth === false) {
            return true;
        }
       
        this.router.navigate(['/']);
        return false;
    }
}