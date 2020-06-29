import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';
import {Category} from '../categories.model';
import {ResponseItems} from '../../shared/responseItems.model';
import {Products} from '../../products/products.model';

const CATEGORIES_URL = environment.categoriesUrl;

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) {
    }

    fetchCategory(id: string) {
        // let httpParams = new HttpParams({fromObject: {}});
        // httpParams = httpParams.set('page', pageNumber);
        // httpParams = httpParams.set('per_page', perPage);
        // const opts = {params: httpParams};
        return this.http.get<any>(CATEGORIES_URL + '/' + id).pipe(map(res => {
            const category: Category = res.data;
            return category;
        }));
    }

    deleteCategory(id: string) {
        return this.http.delete(CATEGORIES_URL + '/' + id);
    }

    updateCategory(id: string, title: string, details: string) {
        const body = {
            title: title,
            details: details
        };
        // let httpParams = new HttpParams({fromObject: {}});
        // httpParams = httpParams.set('page', pageNumber);
        // httpParams = httpParams.set('per_page', perPage);
        // const opts = {params: httpParams};
        return this.http.put(CATEGORIES_URL + '/' + id, body);
    }

    storeCategory(title: string, details: string) {
        const body = {
            title: title,
            details: details
        };
        return this.http.post(CATEGORIES_URL, body);

    }

    fetchCategoryProducts(id: string, pageNumber: string = '1', perPage: string = '15') {
        let httpParams = new HttpParams({fromObject: {}});
        httpParams = httpParams.set('page', pageNumber);
        httpParams = httpParams.set('per_page', perPage);
        const opts = {params: httpParams};
        return this.http.get<ResponseItems>(CATEGORIES_URL + '/' + id + '/' + 'products', opts).pipe(map(res => {
            const products: Products = new Products();
            products.products.push(...res.data);
            products.pagination = res.meta.pagination;
            return products;
        }));
    }


}
