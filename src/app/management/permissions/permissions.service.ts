import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ResponseItems} from '../../shared/responseItems.model';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Permissions } from './permissions.model';

const PERMISSIONS_URL = environment.permissionsUrl;

@Injectable({
    providedIn: 'root'
})
export class PermissionsService {

    constructor(private http: HttpClient) {
    }

    fetchPermissions(pageNumber: string = '1', perPage: string = '15') {
        let httpParams = new HttpParams({fromObject: {}});
        httpParams = httpParams.set('page', pageNumber);
        httpParams = httpParams.set('per_page', perPage);
        const opts = {params: httpParams};
        return this.http.get<ResponseItems>(PERMISSIONS_URL, opts).pipe(map(res => {
            const permissions: Permissions = new Permissions();
            permissions.permissions.push(...res.data);
            permissions.pagination = res.meta.pagination;
            return permissions;
        }));
    }

}
