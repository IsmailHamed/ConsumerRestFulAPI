import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Product} from '../products.model';
import {Observable} from 'rxjs';
import {ProductService} from './product.service';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class ProductResolverService implements Resolve<Product> {

    constructor(private productService: ProductService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> | Promise<Product> | Product {
        debugger;
        return this.productService.fetchProduct(route.params['id']);
    }
}
