import {NgModule} from '@angular/core';
import {ProductsComponent} from './products.component';
import {ProductComponent} from './product/product.component';
import {ProductItemComponent} from './product-item/product-item.component';
import {SharedModule} from '../shared/shared.module';
import {ProductsRoutingModule} from './products-routing.module';


@NgModule({
    declarations: [
        ProductsComponent,
        ProductComponent,
        ProductItemComponent,
    ],
    imports: [
        ProductsRoutingModule,
        SharedModule
    ],
    exports: [
        // ProductComponent,
        // ProductsComponent,
         ProductItemComponent,
    ]
})
export class ProductsModule {

}
