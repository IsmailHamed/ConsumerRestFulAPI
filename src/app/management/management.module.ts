import {NgModule} from '@angular/core';
import {UsersComponent} from './users/users.component';
import {UserComponent} from './users/user/user.component';
import {RolesComponent} from './roles/roles.component';
import {PermissionsComponent} from './permissions/permissions.component';
import {ManagementComponent} from './management.component';
import {RoleComponent} from './roles/role/role.component';
import {OptionsCellComponent} from './roles/options-cell/options-cell.component';
import {SharedModule} from '../shared/shared.module';
import {ManagementRoutingModule} from './management-routing.module';

@NgModule({
    declarations: [
        UsersComponent,
        UserComponent,
        RolesComponent,
        PermissionsComponent,
        ManagementComponent,
        RoleComponent,
        OptionsCellComponent,
    ],
    imports: [
        ManagementRoutingModule,
        SharedModule
    ],
    exports: []
})
export class ManagementModule {

}
