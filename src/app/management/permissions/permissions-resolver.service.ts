import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {PermissionsService} from './permissions.service';
import {Permissions } from './permissions.model';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class PermissionsResolverService implements Resolve<Permissions> {

    constructor(private permissionsService: PermissionsService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Permissions> | Promise<Permissions> | Permissions{
        return this.permissionsService.fetchPermissions(route.queryParams['page'], route.queryParams['per_page']);
    }
}
