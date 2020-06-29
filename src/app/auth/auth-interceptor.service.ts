import {Injectable} from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpHeaders
} from '@angular/common/http';
import {take, exhaustMap} from 'rxjs/operators';

import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl;

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap(user => {
                const modifiedURLReq = req.clone(
                    {url: API_URL + req.url}
                );
                if (!user) {
                    return next.handle(modifiedURLReq);
                }
                const headers = new HttpHeaders({
                    Authorization: 'Bearer ' + user.token
                });
                const modifiedReq = modifiedURLReq.clone({headers});
                return next.handle(modifiedReq);
            })
        );
    }
}
