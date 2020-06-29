import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Products} from '../../products/products.model';
import {Observable} from 'rxjs';
import {CategoryService} from '../category/category.service';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class CategoryProductsResolverService implements Resolve<Products> {
    constructor(private categoryService: CategoryService) {
    }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<Products> | Promise<Products> | Products {
        const page = route.queryParams['page'];
        const perPage = route.queryParams['per_page'];
        const id = route.parent.params['id'];
        return this.categoryService.fetchCategoryProducts(id, page, perPage);
    }
}
