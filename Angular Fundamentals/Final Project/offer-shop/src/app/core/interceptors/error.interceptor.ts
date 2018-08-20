import {
    HttpRequest,
    HttpResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private toastr: ToastrService,
        private router: Router
    ) { }

    intercept(
        request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(

            /*
            tap((event : HttpEvent<any>) => {
                console.log(event)
               
            }),
            */

            catchError((err: HttpErrorResponse) => {
                console.log(err);
                if (err.status === 400) {
                    this.toastr.error('The data you provided is wrong or missing!',
                        'Wrong data provided');

                }
                if (err.status === 401) {
                    if (err.error.hasExpired) {
                        localStorage.clear();
                        this.toastr.error('You should login again to continue!',
                            'Token has expired!');
                    } else {
                        if(err.error.isInvalid) {
                            localStorage.clear();
                        }
                        this.toastr.error('You are not authorized to do that!',
                            'Not authorized');
                    }

                    this.router.navigate(['/account/login']);
                }
                return throwError(err);
            })
        );
    }
}