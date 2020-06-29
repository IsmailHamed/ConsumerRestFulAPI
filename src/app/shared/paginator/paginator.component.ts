import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Pagination} from '../pagination.model';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
    @Input() pagination: Pagination;
    @Input() center: true;
    @Output() page = new EventEmitter<{ pageIndex: string, pageSize: string }>();

    constructor() {
    }

    ngOnInit(): void {
    }

    fetchPage(event) {
        this.page.emit({
            pageIndex: event.pageIndex,
            pageSize: event.pageSize
        });
    }
}
