import {ErrorHandler, NgModule} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {SpinnerInterceptorService} from './shared/spinner/spinner-interceptor.service';
import {GlobalErrorInterceptor} from './global-error.interceptor';
import {GlobalErrorHandler} from './global-error-handler';

@NgModule({
    providers: [
        MatDatepickerModule,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }, {
            provide: HTTP_INTERCEPTORS,
            useClass: SpinnerInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: GlobalErrorInterceptor,
            multi: true
        },


    ]
})
export class CoreModule {

}
