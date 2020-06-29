import {Component, OnInit} from '@angular/core';
import {Category} from '../categories.model';
import {ActivatedRoute, Data, NavigationExtras, Router} from '@angular/router';
import {CategoryService} from './category.service';

@Component({
    selector: 'app-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
    category: Category;

    constructor(private categoryService: CategoryService,
                private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.route.data.subscribe((data: Data) => {
                this.category = data['category'];
            }
        );
    }




}
