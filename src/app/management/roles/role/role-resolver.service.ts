import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {RoleService} from './role.service';
import {Role} from '../roles.model';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class RoleResolverService implements Resolve<Role> {

    constructor(private roleService: RoleService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Role> | Promise<Role> | Role {
        const id: number = route.params['id'];
        return this.roleService.fetchRole(id);
    }
}
