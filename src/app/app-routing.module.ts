import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
const appRoutes: Routes = [
        {
            path: '',
            pathMatch: 'full',
            redirectTo: '/categories',
        },
        {
            path: 'not-found',
            component: PageNotFoundComponent
        },
        {
            path: '**',
            redirectTo: '/not-found'
        },
    ]
;

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
