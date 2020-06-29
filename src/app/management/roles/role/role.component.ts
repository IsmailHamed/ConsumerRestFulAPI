import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Role} from '../roles.model';
import {RoleService} from './role.service';
import {Observable} from 'rxjs';
import {Permission, Permissions} from '../../permissions/permissions.model';
import {PermissionsService} from '../../permissions/permissions.service';
import {UsersService} from '../../users/users.service';
import {User, Users} from '../../users/users.model';
import {MatStepper} from '@angular/material/stepper';

@Component({
    selector: 'app-role',
    templateUrl: './role.component.html',
    styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

    roleFormGroup: FormGroup;
    permissionsFormGroup: FormGroup;
    usersFormGroup: FormGroup;
    role: Role;
    editMode = false;
    isLoading = false;
    rolePermissions: Permission[];
    roleUsers: User[];
    permissions: Permissions;
    users: Users;

    constructor(private formBuilder: FormBuilder,
                private roleService: RoleService,
                private permissionsService: PermissionsService,
                private usersService: UsersService,
                private route: ActivatedRoute,
                private router: Router,
                private alert: MatSnackBar) {
    }

    ngOnInit() {
        this.route.data.subscribe((data: Data) => {
                this.role = data?.role;
                if (!!this.role) {
                    this.editMode = true;
                    this.rolePermissions = this.role.permissions;
                    this.roleUsers = this.role.users;
                } else {
                    this.editMode = false;
                }
                this.createForms(this.role);

            }
        );

    }

    createForms(role: Role = null) {
        this.roleFormGroup = this.formBuilder.group({
            name: new FormControl({
                    value: role?.name,
                    disabled: this.editMode
                },
                [
                    Validators.maxLength(25),
                    Validators.minLength(5),
                ], this.uniqueRoleName.bind(this)
            ),
            displayName: new FormControl(
                role?.displayName,
                Validators.maxLength(190)
            ),
            description: new FormControl(
                role?.description,
                Validators.maxLength(190)
            )
        });


        this.permissionsFormGroup = this.formBuilder.group({
            permissions: new FormControl()
        });

        this.usersFormGroup = this.formBuilder.group({
            userFilter: new FormControl(),
            users: new FormControl()
        });
    }

    get controlsPermissionsToRole() { // a getter!
        debugger;
        return (this.permissionsFormGroup.get('permissions') as FormArray).controls;
    }

    uniqueRoleName(control: FormControl): Promise<any> | Observable<any> {
        debugger;
        this.isLoading = true;
        const observable = this.roleService.checkRoleName(control.value);
        return observable;
    }

    fetchPermissions(event = null) {
        const pageIndex = event?.pageIndex + 1;
        const pageSize = event?.pageSize;
        this.permissionsService.fetchPermissions(pageIndex, pageSize).subscribe((res) => {
            this.permissions = res;
        });
    }

    fetchUsers(event = null) {
        const pageIndex = event?.pageIndex + 1;
        const pageSize = event?.pageSize;
        this.usersService.fetchUsers(pageIndex, pageSize).subscribe((res) => {
            this.users = res;
        });
    }

    isSelectedPermission(id: number): boolean {
        return this.rolePermissions?.some(r => r.identifier === id);
    }

    isSelectedUsers(id: number): boolean {
        return this.roleUsers?.some(r => r.identifier === id);

    }

    selectionChange(event) {
        if (event.selectedIndex === 1 && !this.permissions) {
            this.fetchPermissions();
        } else if (event.selectedIndex === 2 && !this.users) {
            this.fetchUsers();

        }
    }

    applyFilter(event: Event) {
    }

    matStepperFirst(stepper: MatStepper) {
        stepper.selectedIndex = 0;
    }

    saveChanges() {
        const displayName: string = this.roleFormGroup.value?.displayName;
        const description: string = this.roleFormGroup.value?.description;
        const permissions: number[] = this.permissionsFormGroup.value.permissions;
        const users: number[] = this.usersFormGroup.value.users;
        if (this.editMode) {
            const id: number = this.role?.identifier;
            this.roleService.updateRole(id, displayName, description, permissions, users).subscribe(() => {
                const alertRef = this.alert.open('Successful', 'X', {
                    duration: 4000
                });
                alertRef.afterDismissed().subscribe(() => {
                    this.router.navigate(['management', 'roles']);
                });
            });
        } else {
            const name: string = this.roleFormGroup.value?.name;
            this.roleService.storeRole(name, displayName, description, permissions, users).subscribe(() => {
                const alertRef = this.alert.open('Successful', 'X', {
                    duration: 4000
                });
                alertRef.afterDismissed().subscribe(() => {
                    this.router.navigate(['management', 'roles']);
                });
            });
        }
    }
}
