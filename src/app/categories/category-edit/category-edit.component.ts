import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {Category} from '../categories.model';
import {CategoryService} from '../category/category.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, Subscription} from 'rxjs';

@Component({
    selector: 'app-category-edit',
    templateUrl: './category-edit.component.html',
    styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
    @ViewChild('f', {static: false}) slForm: NgForm;
    editMode = false;
    category: Category;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private categoryService: CategoryService,
                private alert: MatSnackBar,
    ) {
    }

    ngOnInit(): void {
        this.route.data.subscribe((data: Data) => {
            this.category = data['category'];
            debugger;
            if (!!this.category) {
                this.editMode = true;
                setTimeout(() => {
                    this.slForm.setValue({
                        title: this.category.title,
                        details: this.category.details
                    });
                });
            }

        });
    }

    onSubmit(form: NgForm): void {
        if (form.valid) {
            const title: string = form.value.title;
            const details: string = form.value.details;
            if (this.editMode) {
                this.updateCategory(this.category.identifier, title, details);
            } else {
                this.storeCategory(title, details);
            }
        }
    }

    updateCategory(id: string, title: string, details: string): void {
        this.categoryService.updateCategory(id, title, details).subscribe(() => {
            const alertRef = this.alert.open('Successful', 'X', {
                duration: 4000
            });
            alertRef.afterDismissed().subscribe(() => {
                this.router.navigate(['../'], {relativeTo: this.route});
            });
        });
    }

    storeCategory(title: string, details: string): void {
        this.categoryService.storeCategory(title, details).subscribe(() => {
            const alertRef = this.alert.open('Successful', 'X', {
                duration: 4000
            });
            alertRef.afterDismissed().subscribe(() => {
                this.router.navigate(['../']);
            });
        });
    }
}
