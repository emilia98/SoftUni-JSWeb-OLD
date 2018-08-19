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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private toastr :ToastrService
    ) { }

    intercept(
        request :HttpRequest<any>, next :HttpHandler) :Observable<HttpEvent<any>> {
            return next.handle(request).pipe(
                
                /*
                tap((event : HttpEvent<any>) => {
                    console.log(event)
                   
                }),
                */
               
                catchError( (err :HttpErrorResponse) => {
                    // console.log(err);
                    if(err.status === 400) {
                        this.toastr.error('The data you provided is wrong or missing!', 
                            'Wrong data provided');
                           
                    }
                    if(err.status === 401) {
                        this.toastr.error('You are not authorized to do that!', 
                        'Not authorized');
                    }
                    return throwError(err);
                    
                })
                
            )
    }
}