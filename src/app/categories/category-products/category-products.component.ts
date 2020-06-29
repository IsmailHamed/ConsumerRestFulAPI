import {Component, OnInit} from '@angular/core';
import {Product} from '../../products/products.model';
import {Pagination} from '../../shared/pagination.model';
import {ActivatedRoute, Data} from '@angular/router';
import {CategoryService} from '../category/category.service';

@Component({
    selector: 'app-category-products',
    templateUrl: './category-products.component.html',
    styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {
    products: Product[];
    pagination: Pagination = new Pagination();

    constructor(private categoryProducts: CategoryService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.data.subscribe((data: Data) => {
            this.products = data['products'].products;
            this.pagination = data['products'].pagination;
        });
    }

    fetchPage(event) {
        debugger;
        const id = this.route.parent.params['id'];
        const page = event.pageIndex + 1;
        const perPage = event.pageSize;
        this.categoryProducts.fetchCategoryProducts(id, page, perPage).subscribe(res => {
            this.products = res.products;
            this.pagination = res.pagination;
        });
    }
}
