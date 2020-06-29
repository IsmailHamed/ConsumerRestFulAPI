import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoriesComponent} from './categories.component';
import {AuthGurd} from '../auth/auth.gurd';
import {CategoriesResolverService} from './categories-resolver.service';
import {CategoryComponent} from './category/category.component';
import {CategoryResolverService} from './category/category-resolver.service';
import {CategoryEditComponent} from './category-edit/category-edit.component';
import {CategoryProductsComponent} from './category-products/category-products.component';
import {CategoryProductsResolverService} from './category-products/category-products-resolver.service';
import {CategoryTransactionComponent} from './category-transaction/category-transaction.component';

const routes: Routes = [
    {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGurd],
        resolve: {categories: CategoriesResolverService},

    },
    {
        path: 'categories/:id',
        component: CategoryComponent,
        canActivate: [AuthGurd],
        canActivateChild: [AuthGurd],
        resolve: {category: CategoryResolverService},
        children: [
            {
                path: 'edit',
                component: CategoryEditComponent,
                resolve: {category: CategoryResolverService}
            },
            {
                path: 'products',
                component: CategoryProductsComponent,
                resolve: {products: CategoryProductsResolverService}
            },
            {
                path: 'transaction',
                component: CategoryTransactionComponent,
                // resolve: {products: CategoryProductsResolverService}
            },
        ]
    },
    {
        path: 'category/add',
        component: CategoryEditComponent,
        canActivate: [AuthGurd],
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class CategoriesRoutingModule {

}
