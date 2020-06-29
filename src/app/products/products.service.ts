import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Products} from './products.model';
import {map} from 'rxjs/operators';
import {ResponseItems} from '../shared/responseItems.model';
import {environment} from '../../environments/environment';

const PRODUCTS_URL = environment.productsUrl;

@Injectable({
    providedIn: 'root'
})
export class ProductsService {
    constructor(private http: HttpClient) {
    }

    fetchProducts(pageNumber: string = '1', perPage: string = '15') {
        let httpParams = new HttpParams({fromObject: {}});
        httpParams = httpParams.set('page', pageNumber);
        httpParams = httpParams.set('per_page', perPage);
        const opts = {params: httpParams};
        return this.http.get<ResponseItems>(PRODUCTS_URL, opts).pipe(map(res => {
            const products: Products = new Products();
            products.products.push(...res.data);
            products.pagination = res.meta.pagination;
            return products;
        }));
    }
}
