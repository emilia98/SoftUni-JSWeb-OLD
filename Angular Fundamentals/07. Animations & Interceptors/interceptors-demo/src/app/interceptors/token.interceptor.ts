import {
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { Router } from '@angular/router';

const appKey = 'kid_SkaaQExBm';
const appSecret = '163b9988005e4abda8fa1f8e029f208a';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private authService :AuthenticationService,
        private router :Router
    ) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        if (request.url.endsWith('login') || request.url.endsWith(appKey)) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                    'Content-Type': 'application/json'
                }
            })
        } else {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                    'Content-Type': 'application/json'
                }
            })
        }

        return next
            .handle(request)
            .pipe(tap(
                (event :HttpEvent<any>) => {
                    // console.log(event);
                    if(event instanceof HttpResponse && request.url.endsWith('login')) {
                        this.loginSuccess(event.body);
                    }
                }, (err :any) => {
                    if(err instanceof HttpErrorResponse) {
                        switch(err.status) {
                            case 401: {
                                return this.router.navigate(['/login'])
                            }
                            case 404: {
                                return this.router.navigate(['/not-found']);
                            }
                            case 500: {
                                return this.router.navigate(['/server-error']);
                            }
                        }
                    }
                }
            ));
    }

    private loginSuccess(data) {
        this.authService.isAuthenticated = true;
        let authtoken = data['_kmd'].authtoken;
        this.authService.authtoken = authtoken;
        localStorage.setItem('authtoken', authtoken);
        localStorage.setItem('username', data.username);
        this.router.navigate(['/home']);
      }
}