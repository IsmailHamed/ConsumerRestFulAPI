import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ResponseItems} from '../../shared/responseItems.model';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Roles} from './roles.model';

const ROLES_URL = environment.rolesUrl;

@Injectable({
    providedIn: 'root'
})
export class RolesService {

    constructor(private http: HttpClient) {
    }

    fetchRoles(pageNumber: string = '1', perPage: string = '15') {
        let httpParams = new HttpParams({fromObject: {}});
        httpParams = httpParams.set('page', pageNumber);
        httpParams = httpParams.set('per_page', perPage);
        const opts = {params: httpParams};
        return this.http.get<ResponseItems>(ROLES_URL, opts).pipe(map(res => {
            const roles: Roles = new Roles();
            roles.roles.push(...res.data);
            roles.pagination = res.meta.pagination;
            return roles;
        }));
    }
}
