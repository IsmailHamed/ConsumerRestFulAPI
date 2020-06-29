import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry, tap} from 'rxjs/operators';
export class GlobalErrorInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            // retry(1), to resend request if throw exception
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    localStorage.removeItem('userData');
                    // this.router.navigate(['/auth']);
                    return throwError(error);
                } else {
                    return throwError(error);
                }
            })
        );
    }
}
