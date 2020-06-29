import {Component, OnInit} from '@angular/core';
import {Pagination} from '../shared/pagination.model';
import {Category} from './categories.model';
import {CategoriesService} from './categories.service';
import {ActivatedRoute, Data} from '@angular/router';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
    categories: Category [];
    pagination: Pagination = new Pagination();

    constructor(private categoriesService: CategoriesService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        // this.categoriesService.fetchCategories().subscribe(res => {
        //     this.categories = res.categories;
        //     this.pagination = res.pagination;
        // });
        this.route.data.subscribe((data: Data) => {
            this.categories = data['categories'].categories;
            this.pagination = data['categories'].pagination;
        });
    }

    fetchPage(event) {
        this.categoriesService.fetchCategories(event.pageIndex + 1, event.pageSize).subscribe(res => {
            this.categories = res.categories;
            this.pagination = res.pagination;
        });
    }

}
