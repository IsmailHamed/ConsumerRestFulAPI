import {NgModule} from '@angular/core';
import {AuthComponent} from './auth.component';
import {SharedModule} from '../shared/shared.module';
import {AuthRoutingModule} from './auth-routing.module';

@NgModule({
    declarations: [
        AuthComponent,
    ],
    imports: [
        AuthRoutingModule,
        SharedModule
    ],
    exports: []
})
export class AuthModule {

}
