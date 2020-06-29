import {Injectable} from '@angular/core';
import {Products} from './products.model';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductsService} from './products.service';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class ProductsResolverService implements Resolve<Products> {

    constructor(private productsService: ProductsService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Products> | Promise<Products> | Products {
        return this.productsService.fetchProducts(route.queryParams['page'], route.queryParams['per_page']);
    }
}
