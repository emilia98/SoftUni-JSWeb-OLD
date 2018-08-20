import {
    HttpRequest,
    HttpResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    constructor() {}
    
    intercept(request :HttpRequest<any>, next: HttpHandler) :Observable<HttpEvent<any>> {
        let currentUser = JSON.parse(localStorage.getItem('user'));
        console.log(currentUser);

        if(currentUser) {
            let token = currentUser.token;

            if(token) {
                request = request.clone({
                    setHeaders: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
            }
        }

        return next.handle(request);
    }
}