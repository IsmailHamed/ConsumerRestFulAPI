import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from './user.service';
import {User} from '../users.model';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class UserResolverService implements Resolve<User> {

    constructor(private userService: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<User> | Promise<User> | User {
        const id: number = route.params['id'];
        return this.userService.fetchUser(id);
    }
}
