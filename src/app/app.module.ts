import {ErrorHandler, NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AppRoutingModule} from './app-routing.module';
import {StoreModule} from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {ColumnFilterService} from 'material-dynamic-table';
import {DateFilterComponent} from './shared/filters/date-filter/date-filter.component';
import {TextFilterComponent} from './shared/filters/text-filter/text-filter.component';
import {CategoriesModule} from './categories/categories.module';
import {SharedModule} from './shared/shared.module';
import {ProductsModule} from './products/products.module';
import {CoreModule} from './core.module';
import {AuthModule} from './auth/auth.module';
import {ManagementModule} from './management/management.module';
import {GlobalErrorHandler} from './global-error-handler';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        PageNotFoundComponent,
    ],
    imports: [
        CoreModule,
        AuthModule,
        CategoriesModule,
        ProductsModule,
        ManagementModule,
        SharedModule,
        AppRoutingModule,
        StoreModule.forRoot(fromApp.appReducer),
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private readonly columnFilterService: ColumnFilterService) {
        columnFilterService.registerFilter('string', TextFilterComponent);
        columnFilterService.registerFilter('date', DateFilterComponent);
    }
}
