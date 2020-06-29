import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../categories.model';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {CategoryService} from '../category/category.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-category-item',
  templateUrl: './category-item.component.html',
  styleUrls: ['./category-item.component.css']
})
export class CategoryItemComponent implements OnInit {
 @Input()  category: Category;

  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: {
        title: 'confirm delete category',
        message: 'Are you sure you want to delete category'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const id = this.route.snapshot.params['id'];
        this.categoryService.deleteCategory(id).subscribe(res => {
          this.router.navigate(['/']);
        });
      }
    });
  }

  onEdit(): void {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }
}
