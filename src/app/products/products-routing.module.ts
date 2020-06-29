import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {ProductsComponent} from './products.component';
import {AuthGurd} from '../auth/auth.gurd';
import {ProductsResolverService} from './products-resolver.service';
import {ProductComponent} from './product/product.component';
import {ProductResolverService} from './product/product-resolver.service';

const routes: Routes = [
    {
        path: 'products',
        component: ProductsComponent,
        canActivate: [AuthGurd],
        resolve: {products: ProductsResolverService}
    },
    {
        path: 'products/:id',
        component: ProductComponent,
        canActivate: [AuthGurd],
        resolve: {product: ProductResolverService}
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
export class ProductsRoutingModule {

}
