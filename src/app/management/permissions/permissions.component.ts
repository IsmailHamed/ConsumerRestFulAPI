import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Data} from '@angular/router';
import {FilteredDataSource} from '../../shared/data-source/filtered-data-source';
import {Permission, Permissions} from '../permissions/permissions.model';
import {MatDialog} from '@angular/material/dialog';
import {PermissionsService} from './permissions.service';
import {Pagination} from '../../shared/pagination.model';
import {ColumnConfig} from 'material-dynamic-table';

@Component({
    selector: 'app-permissions',
    templateUrl: './permissions.component.html',
    styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {
    columns: ColumnConfig[] = [
        {
            name: 'identifier',
            displayName: 'No.',
            type: 'number'
        },
        {
            name: 'name',
            displayName: 'Name',
            type: 'string'
        },
        {
            name: 'displayName',
            displayName: 'Display Name',
            type: 'string'
        },
        {
            name: 'description',
            displayName: 'Description',
            type: 'string'
        },
        {
            name: 'creationDate',
            displayName: 'Created Date',
            type: 'date',
            // options: {
            //     dateFormat: 'shortDate'
            // }
        },
        {
            name: 'lastChange',
            displayName: 'Lasted Change Date',
            type: 'date'
        },
    ];

    permissions: Permission[];
    dataSource;
    pagination: Pagination = new Pagination();

    constructor(private permissionsService: PermissionsService,
                private route: ActivatedRoute,
                private dialog: MatDialog) {
    }

    ngOnInit(): void {
        this.route.data.subscribe((data: Data) => {
            debugger;
            this.permissions = data['permissions'].permissions;
            this.dataSource = new FilteredDataSource<Permission>(this.permissions);
            this.pagination = data['permissions'].pagination;
            // this.users.sort = this.sort;
        });
    }

    fetchPage(event): void {
        const pageNumber: string = event.pageIndex + 1;
        const perPage: string = event.pageSize;
        this.permissionsService.fetchPermissions(pageNumber, perPage).subscribe(res => {
            debugger;
            this.permissions = res.permissions;
            this.dataSource = new FilteredDataSource<Permission>(this.permissions);
            this.pagination = res.pagination;
        });
    }
}
