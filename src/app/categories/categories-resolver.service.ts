import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {CategoriesService} from './categories.service';
import {Categories} from './categories.model';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class CategoriesResolverService implements Resolve<Categories> {

    constructor(private categoriesService: CategoriesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<Categories> |
        Promise<Categories> |
        Categories {
        return this.categoriesService.fetchCategories(route.queryParams['page'], route.queryParams['per_page']);
    }
}
