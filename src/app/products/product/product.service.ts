import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product, Products} from '../products.model';
import {environment} from '../../../environments/environment';

const PRODUCTS_URL = environment.productsUrl;

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(private http: HttpClient) {
    }

    fetchProduct(id: string) {
        return this.http.get<Product>(PRODUCTS_URL + '/' + id);
    }
}
