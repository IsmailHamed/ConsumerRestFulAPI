import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {ResponseItems} from '../shared/responseItems.model';
import {map} from 'rxjs/operators';
import {Categories} from './categories.model';
import {environment} from '../../environments/environment';

const CATEGORIES_URL = environment.categoriesUrl;

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {

    constructor(private http: HttpClient) {
    }

    fetchCategories(pageNumber: string = '1', perPage: string = '15') {
        let httpParams = new HttpParams({fromObject: {}});
        httpParams = httpParams.set('page', pageNumber);
        httpParams = httpParams.set('per_page', perPage);
        const opts = {params: httpParams};
        return this.http.get<ResponseItems>(CATEGORIES_URL, opts).pipe(map(res => {
            const categories: Categories = new Categories();
            categories.categories.push(...res.data);
            categories.pagination = res.meta.pagination;
            return categories;
        }));
    }
}
