import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ResponseItems} from '../../shared/responseItems.model';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Users} from './users.model';

const USERS_URL = environment.usersUrl;

@Injectable({
    providedIn: 'root'
})
export class UsersService {

    constructor(private http: HttpClient) {
    }

    fetchUsers(pageNumber: string = '1', perPage: string = '15') {
        let httpParams = new HttpParams({fromObject: {}});
        httpParams = httpParams.set('page', pageNumber);
        httpParams = httpParams.set('per_page', perPage);
        const opts = {params: httpParams};
        return this.http.get<ResponseItems>(USERS_URL, opts).pipe(map(res => {
            const users: Users = new Users();
            users.users.push(...res.data);
            users.pagination = res.meta.pagination;
            return users;
        }));
    }
}
