import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Roles} from './roles.model';
import {RolesService} from './roles.service';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class RolesResolverService implements Resolve<Roles> {

    constructor(private rolesService: RolesService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Roles> | Promise<Roles> | Roles{
        return this.rolesService.fetchRoles(route.queryParams['page'], route.queryParams['per_page']);
    }
}
