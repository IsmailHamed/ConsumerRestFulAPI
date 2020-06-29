import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {User} from '../../users/users.model';
import {environment} from '../../../../environments/environment';
import {Role} from '../roles.model';

const ROLE_URL = environment.rolesUrl;

@Injectable({
    providedIn: 'root'
})
export class RoleService {

    constructor(private http: HttpClient) {
    }

    deleteRole(id: number) {
        return this.http.delete(ROLE_URL + '/' + id);
    }

    fetchRole(id: number) {
        return this.http.get<any>(ROLE_URL + '/' + id).pipe(map(res => {
            const role: Role = res.data;
            return role;
        }));
    }

    fetchPermissionsToRole(id: number) {
        return this.http.get<any>(ROLE_URL + '/' + id + '/permissions');
    }

    updateRole(id: number, displayName: string, description: string, permissions: number[], users: number[]) {
        const body = {
            displayName: displayName,
            description: description,
            permissions: permissions,
            users: users
        };
        return this.http.patch(ROLE_URL + '/' + id, body);
    }

    storeRole(name: string, displayName: string, description: string, permissions: number[], users: number[]) {
        const body = {
            name: name,
            displayName: displayName,
            description: description,
            permissions: permissions,
            users: users
        };
        return this.http.post(ROLE_URL, body);
    }

    checkRoleName(name: string) {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('name', name);
        httpParams = httpParams.append('showSpinner', 'false');
        const opts = {params: httpParams};
        return this.http.get(ROLE_URL + '/checkRoleName', opts).pipe(map(res => {
            return !!res ? {existingRoleName: true} : null;
        }));

    }
}
