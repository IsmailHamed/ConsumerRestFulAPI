import {Component, Input, OnInit} from '@angular/core';
import {Role} from '../roles.model';
import {ColumnConfig} from 'material-dynamic-table';
import {RoleService} from '../role/role.service';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from '../../../shared/confirmation-dialog/confirmation-dialog.component';
import {DialogComponent} from '../../../shared/dialog/dialog.component';
import {UserComponent} from '../../users/user/user.component';
import {RoleComponent} from '../role/role.component';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-options-cell',
    templateUrl: './options-cell.component.html',
    styleUrls: ['./options-cell.component.css']
})
export class OptionsCellComponent implements OnInit {
    @Input()
    column: ColumnConfig;

    @Input()
    row: Role;

    constructor(private roleService: RoleService,
                private dialog: MatDialog,
                private route: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit(): void {
    }

    fetchRole() {
        const roleId = this.row.identifier;
        this.router.navigate(['../', 'role', roleId], {relativeTo: this.route});
    }

    updateRole() {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '800px',
            height: '400px',
            data: {
                title: 'Edit role',
                component: RoleComponent,
                data: this.row,
            }
        });
    }

    deleteRole() {
        const id = this.row.identifier;
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: {
                title: 'confirm delete role',
                message: 'Are you sure you want to delete role'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.roleService.deleteRole(id).subscribe(res => {
                });
            }
        });
    }
}
