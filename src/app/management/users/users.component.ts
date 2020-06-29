import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {Pagination} from '../../shared/pagination.model';
import {ActivatedRoute, Data} from '@angular/router';
import {UsersService} from './users.service';
import {User} from './users.model';
import {UserService} from './user/user.service';
import {ConfirmationDialogComponent} from '../../shared/confirmation-dialog/confirmation-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../shared/dialog/dialog.component';
import {UserComponent} from './user/user.component';


@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    displayedColumns: string[] = ['identifier', 'name', 'email', 'isVerified', 'isAdmin',
        'creationDate', 'lastChange', 'action'];
    dataSource: MatTableDataSource<User>;
    users: User[];
    pagination: Pagination = new Pagination();

    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(private usersService: UsersService,
                private userService: UserService,
                private route: ActivatedRoute,
                private dialog: MatDialog) {

    }

    ngOnInit() {
        this.route.data.subscribe((data: Data) => {
            this.users = data['users'].users;
            this.dataSource = new MatTableDataSource(this.users);
            this.pagination = data['users'].pagination;
            this.dataSource.sort = this.sort;
        });
    }

    fetchPage(event): void {
        this.usersService.fetchUsers(event.pageIndex + 1, event.pageSize).subscribe(res => {
            this.users = res.users;
            this.dataSource = new MatTableDataSource(this.users);
            this.pagination = res.pagination;

        });
    }

    viewProfile(id: number): void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '600px',
            data: {
                component: UserComponent,
                // message: 'Are you sure you want to delete user'
            }
        });
    }


    onDelete(user: User): void {
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
            width: '350px',
            data: {
                title: 'confirm delete user',
                message: 'Are you sure you want to delete user'
            }
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                // const id = this.route.snapshot.params['id'];
                this.userService.deleteUser(user.identifier).subscribe(res => {
                    const index = this.dataSource.data.indexOf(user);
                    this.dataSource.data.splice(index, 1);
                    this.dataSource._updateChangeSubscription();
                });
            }
        });
    }

}

