import {Component, OnInit} from '@angular/core';
import {CellService, ColumnConfig} from 'material-dynamic-table';
import {FilteredDataSource} from '../../shared/data-source/filtered-data-source';
import {Pagination} from '../../shared/pagination.model';
import {Role, Roles} from './roles.model';
import {ActivatedRoute, Data} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {RolesService} from './roles.service';
import {OptionsCellComponent} from './options-cell/options-cell.component';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
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

        // @ts-ignore
        {
            displayName: 'Actions',
            type: 'options'
        },
    ];
    roles: Role[];
    dataSource: FilteredDataSource<Role>;
    pagination: Pagination = new Pagination();

    constructor(private rolesService: RolesService,
                private route: ActivatedRoute,
                private dialog: MatDialog,
                private readonly cellService: CellService) {
        cellService.registerCell('options', OptionsCellComponent);
    }

    ngOnInit(): void {
        this.route.data.subscribe((data: Data) => {
            debugger;
            this.roles = data.roles.roles;
            this.dataSource = new FilteredDataSource<Role>(this.roles);
            this.pagination = data.roles.pagination;
            // this.users.sort = this.sort;
        });
    }

    fetchPage(event): void {
        const pageNumber: string = event.pageIndex + 1;
        const perPage: string = event.pageSize;
        this.rolesService.fetchRoles(pageNumber, perPage).subscribe(res => {
            const roles: Role[] = res.roles;
            this.dataSource = new FilteredDataSource<Role>(this.roles);
            this.pagination = res.pagination;
        });
    }

}
