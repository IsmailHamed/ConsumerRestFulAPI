import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-management',
    templateUrl: './management.component.html',
    styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
    links = [
        {path: '/management/users', label: 'Users'},
        {path: '/management/roles', label: 'Roles'},
        {path: '/management/permissions', label: 'Permissions'},
    ];
    activeLink = this.links[0];


    constructor() {
    }

    ngOnInit(): void {
    }

}
