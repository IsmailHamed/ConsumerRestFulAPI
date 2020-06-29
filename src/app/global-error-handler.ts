import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from './notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private injector: Injector) {
    }

    handleError(error: Error | HttpErrorResponse): void {
        debugger;
        const notifier = this.injector.get(NotificationService);
        debugger;
        if (error instanceof HttpErrorResponse) {
            const messages = navigator.onLine ? error.error.message : 'No Internet Connection';
            for (let message of messages) {
                    debugger;
            }
            notifier.showError(messages);
        } else {
            const message: string = error.message ? error.message : error.toString();
            notifier.showError(message);

        }
    }
}
