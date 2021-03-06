import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ColumnFilter} from 'material-dynamic-table';
import {DateFilter} from './date-filter.model';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html',
  styleUrls: ['./date-filter.component.css']
})
export class DateFilterComponent implements OnInit {

  model: DateFilter;

  displayName: string;

  public constructor(
      private readonly dialogRef: MatDialogRef<DateFilterComponent>,
      @Inject(MAT_DIALOG_DATA) private readonly filterData: ColumnFilter) { }

  ngOnInit() {
    this.displayName = this.filterData.column.displayName;
    this.model = this.filterData.filter || new DateFilter(this.filterData.column.name);
  }

  apply() {
    if (this.model.fromDate || this.model.toDate) {
      this.dialogRef.close(this.model);
    } else {
      this.dialogRef.close('');
    }
  }
}
