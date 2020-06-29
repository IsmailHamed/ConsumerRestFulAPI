import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ColumnFilter} from 'material-dynamic-table';
import {TextFilter} from './text-filter.model';

@Component({
    selector: 'app-text-filter',
    templateUrl: './text-filter.component.html',
    styleUrls: ['./text-filter.component.css']
})
export class TextFilterComponent implements OnInit {

    model: TextFilter;

    displayName: string;

    public constructor(
        private readonly dialogRef: MatDialogRef<TextFilterComponent>,
        @Inject(MAT_DIALOG_DATA) private readonly filterData: ColumnFilter) {
    }

    ngOnInit() {
        debugger;
        this.displayName = this.filterData.column.displayName;
        this.model = this.filterData.filter || new TextFilter(this.filterData.column.name);
    }

    apply() {
        debugger;
        if (this.model.value) {
            this.dialogRef.close(this.model);
        } else {
            this.dialogRef.close('');
        }
    }
}
