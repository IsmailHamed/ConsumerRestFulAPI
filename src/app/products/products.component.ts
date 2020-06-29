import {Component, OnInit} from '@angular/core';
import {ProductsService} from './products.service';
import {Product} from './products.model';
import {Pagination} from '../shared/pagination.model';
import {ActivatedRoute, Data, Params, Router} from '@angular/router';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products: Product[];
    pagination: Pagination = new Pagination();

    constructor(
        private productService: ProductsService,
        private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        // this.route.queryParams.subscribe((queryParams: Params) => {
        //     this.pageNumber = queryParams['page'];
        //     this.perPage = queryParams['per_page'];
        //     debugger;
        // });
        // this.productService.fetchProducts(this.pageNumber, this.perPage).subscribe(res => {
        //     this.products = res.products;
        //     this.pagination = res.pagination;
        // });
        this.route.data.subscribe((data: Data) => {
            this.products = data['products'].products;
            this.pagination = data['products'].pagination;
        });
    }

    fetchPage(event) {
        this.productService.fetchProducts(event.pageIndex + 1, event.pageSize).subscribe(res => {
            this.products = res.products;
            this.pagination = res.pagination;
        });
    }
}
