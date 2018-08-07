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
import { tap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private router :Router,
        private toastr :ToastrService
    ) {}

    intercept(request :HttpRequest<any>, next :HttpHandler) :Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError( (err : HttpErrorResponse) => {
            // console.log(err);
            switch(err.status) {
                
                case 400: {
                    this.toastr.error(err.error.message, 'Incorrect Information!');
                    break;
                }
                case 401: {
                    this.toastr.error(err.error ? err.error.message : 'You are not authorized to do that!', 'Warning!');
                    break;
                }
            }
            return throwError(err);
        })) ;
    }

    private setToken(data) {
        localStorage.setItem('user', JSON.stringify({
            username: data.user.name,
            authtoken: data.token
        }));
    }
}