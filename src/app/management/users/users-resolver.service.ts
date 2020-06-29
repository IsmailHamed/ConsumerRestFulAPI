import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Users} from './users.model';
import {UsersService} from './users.service';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class UsersResolverService implements Resolve<Users> {

    constructor(private usersService: UsersService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Users> | Promise<Users> | Users {
        return this.usersService.fetchUsers(route.queryParams['page'], route.queryParams['per_page']);
    }
}
