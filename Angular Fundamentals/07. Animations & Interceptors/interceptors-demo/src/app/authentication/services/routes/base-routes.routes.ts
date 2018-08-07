import { CanActivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Injectable()
export class BaseRoutes implements CanActivate {
    constructor(
        private authService :AuthenticationService,
        private route :Router
    ) { }
 
    canActivate() {

        this.authService.returnResult().subscribe(
            data => {
                // console.log(data);
                this.route.navigate(['/home']);
                return true;
            },
            err => {
                // console.log(err);
                this.route.navigate(['/login']);
                return false;
            }
        )

        return null;
       
    }
}
