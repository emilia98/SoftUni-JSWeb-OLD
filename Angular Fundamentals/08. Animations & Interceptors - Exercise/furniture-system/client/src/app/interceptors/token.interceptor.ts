import {
    HttpRequest,
    HttpResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private toastr: ToastrService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem('user'));

        if (currentUser && currentUser.authtoken) {
            let token = currentUser.authtoken;
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        }

        return next
            .handle(request)
            .pipe(tap(
                (res: any) => {
                    if (res instanceof HttpResponse && res.body.token) {
                        this.setToken(res.body);
                        // this.toastr.success()
                        this.toastr.success(res.body.message, 'Welcome!');
                        this.router.navigate(['/home']);
                    }

                    if (res instanceof HttpResponse &&
                        res.body.success &&
                        res.url.endsWith('/signup')) {
                        this.toastr.success(res.body.message, 'Successful signup!');
                        this.router.navigate(['/signin']);

                    }
                }
            ));
    }

    private setToken(data) {
        localStorage.setItem('user', JSON.stringify({
            username: data.user.name,
            authtoken: data.token
        }));
    }
}