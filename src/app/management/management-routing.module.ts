import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from '../auth/auth.component';
import {NgModule} from '@angular/core';
import {ManagementComponent} from './management.component';
import {AuthGurd} from '../auth/auth.gurd';
import {UsersComponent} from './users/users.component';
import {UsersResolverService} from './users/users-resolver.service';
import {UserComponent} from './users/user/user.component';
import {UserResolverService} from './users/user/user-resolver.service';
import {RolesComponent} from './roles/roles.component';
import {RolesResolverService} from './roles/roles-resolver.service';
import {PermissionsComponent} from './permissions/permissions.component';
import {PermissionsResolverService} from './permissions/permissions-resolver.service';
import {RoleComponent} from './roles/role/role.component';
import {RoleResolverService} from './roles/role/role-resolver.service';

const routes: Routes = [
    {
        path: 'management',
        component: ManagementComponent,
        canActivate: [AuthGurd],
        canActivateChild: [AuthGurd],
        children: [
            {
                path: '',
                redirectTo: 'users',
                pathMatch: 'full'
            },
            {
                path: 'users',
                component: UsersComponent,
                canActivate: [AuthGurd],
                resolve: {users: UsersResolverService},
                canActivateChild: [AuthGurd],
                children: [
                    {
                        path: ':id/edit',
                        component: UserComponent,
                        resolve: {user: UserResolverService}
                    },
                ]
            },
            {
                path: 'roles',
                component: RolesComponent,
                canActivate: [AuthGurd],
                resolve: {roles: RolesResolverService},
            },
            {
                path: 'permissions',
                component: PermissionsComponent,
                canActivate: [AuthGurd],
                resolve: {permissions: PermissionsResolverService},
            },
            {
                path: 'role/add',
                component: RoleComponent,
                canActivate: [AuthGurd],
            },
            {
                path: 'role/:id',
                component: RoleComponent,
                canActivate: [AuthGurd],
                resolve: {role: RoleResolverService},
            },
            {
                path: 'user/add',
                component: UserComponent,
                canActivate: [AuthGurd],
            },
            {
                path: 'user/:id',
                component: UserComponent,
                canActivate: [AuthGurd],
                resolve: {user: UserResolverService},
            },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class ManagementRoutingModule {

}
