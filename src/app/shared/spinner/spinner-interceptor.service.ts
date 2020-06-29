import {Injectable} from '@angular/core';
import {SpinnerService} from './spinner.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptorService implements HttpInterceptor {
    constructor(private spinnerService: SpinnerService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const showSpinner: boolean = JSON.parse(req.params.get('showSpinner'));
        if (showSpinner != null && !showSpinner) {
            return next.handle(req);
        }

        this.showLoader();
        // we use finalize for covering all the cas
        return next.handle(req).pipe(finalize(() => this.onEnd()));
    }

    private onEnd(): void {
        this.hideLoader();
    }

    private showLoader(): void {
        this.spinnerService.show();
    }

    private hideLoader(): void {
        this.spinnerService.hide();
    }
}
