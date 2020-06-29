import {NgModule} from '@angular/core';
import {CategoriesComponent} from './categories.component';
import {CategoryComponent} from './category/category.component';
import {CategoryEditComponent} from './category-edit/category-edit.component';
import {CategoryItemComponent} from './category-item/category-item.component';
import {CategoryProductsComponent} from './category-products/category-products.component';
import {SharedModule} from '../shared/shared.module';
import {CategoriesRoutingModule} from './categories-routing.module';
import {ProductsModule} from '../products/products.module';
import { CategoryTransactionComponent } from './category-transaction/category-transaction.component';

@NgModule({
    declarations: [
        CategoriesComponent,
        CategoryComponent,
        CategoryEditComponent,
        CategoryItemComponent,
        CategoryProductsComponent,
        CategoryTransactionComponent,
    ],
    imports: [
        CategoriesRoutingModule,
        ProductsModule,
        SharedModule
    ],
    exports: [
        CategoriesComponent,
        CategoryComponent,
        CategoryEditComponent,
        CategoryItemComponent,
        CategoryProductsComponent,
    ]
})
export class CategoriesModule {

}
