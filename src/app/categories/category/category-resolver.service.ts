import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {Category} from '../categories.model';
import {CategoryService} from './category.service';

@Injectable({
    providedIn: 'root'
})
@Injectable()
export class CategoryResolverService implements Resolve<Category> {

    constructor(private categoryService: CategoryService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
        Observable<Category> |
        Promise<Category> |
        Category {
        let id = route.params['id'];
        id = (!!id ? id : route.parent.params['id']);
        return this.categoryService.fetchCategory(id);
    }
}
