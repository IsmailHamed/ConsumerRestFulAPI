import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ParentErrorStateMatcher, PasswordValidator} from '../../../shared/validators/password.validator';
import {UsernameValidator} from '../../../shared/validators/username.validator';
import {ActivatedRoute, Data, Router} from '@angular/router';
import {UserService} from './user.service';
import {User} from '../users.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    accountDetailsForm: FormGroup;
    matchingPasswordsGroup: FormGroup;
    parentErrorStateMatcher = new ParentErrorStateMatcher();
    user: User;
    editMode :boolean= false;


    accountValidationMessages = {
        'fullname': [
            {type: 'required', message: 'Full name is required'}
        ],
        'username': [
            // {type: 'required', message: 'Username is required'},
            {type: 'minlength', message: 'Username must be at least 5 characters long'},
            {type: 'maxlength', message: 'Username cannot be more than 25 characters long'},
            {type: 'pattern', message: 'Your username must contain only numbers and letters'},
            {type: 'validUsername', message: 'Your username has already been taken'}
        ],
        'email': [
            {type: 'required', message: 'Email is required'},
            {type: 'pattern', message: 'Enter a valid email'}
        ],
        'confirm_password': [
            {type: 'required', message: 'Confirm password is required'},
            {type: 'areEqual', message: 'Password mismatch'}
        ],
        'password': [
            {type: 'required', message: 'Password is required'},
            {type: 'minlength', message: 'Password must be at least 5 characters long'},
            {type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number'}
        ],
    };

    constructor(private formBuilder: FormBuilder,
                private userService: UserService,
                private route: ActivatedRoute,
                private router: Router,
                private alert: MatSnackBar) {
    }

    ngOnInit() {
        this.route.data.subscribe((data: Data) => {
                this.user = data['user'];
                if (!!this.user) {
                    this.editMode = true;
                } else {
                    this.editMode = false;
                }
                this.createForms(this.user);

            }
        );
    }

    createForms(user: User = null) {
        // matching passwords validation
        const passwordControl: FormControl = new FormControl('', Validators.compose([
            Validators.minLength(5),
            Validators.required,
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
        ]));
        const confirmPasswordControl: FormControl = new FormControl('', Validators.required);
        this.matchingPasswordsGroup = new FormGroup({
            password: passwordControl,
            confirm_password: confirmPasswordControl
        }, (formGroup: FormGroup) => {
            return PasswordValidator.areEqual(formGroup);
        });
        // user links form validations
        this.accountDetailsForm = this.formBuilder.group({
            fullname: [user?.name, Validators.required],
            username: new FormControl('', Validators.compose([
                UsernameValidator.validUsername,
                Validators.maxLength(25),
                Validators.minLength(5),
                Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
            ])),
            email: new FormControl(user?.email, Validators.compose([
                Validators.required,
                Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])),
            matching_passwords: this.matchingPasswordsGroup,
            admin: new FormControl(user?.isAdmin),
            verified: new FormControl(user?.isVerified)
        });

    }

    onSubmit(value) {
        const fullname: string = value.fullname;
        const email: string = value.email;
        const password: string = value.matching_passwords.password;
        if (this.editMode) {
            const id: number = this.user.identifier;
            const admin: boolean = value.admin;
            this.userService.updateUser(id, fullname, email, password, admin).subscribe(() => {
                const alertRef = this.alert.open('Successful', 'X', {
                    duration: 4000
                });
                alertRef.afterDismissed().subscribe(() => {
                    this.router.navigate(['management', 'users']);
                });
            });
        } else {
            this.userService.storeUser(fullname, email, password).subscribe(() => {
                const alertRef = this.alert.open('Successful', 'X', {
                    duration: 4000
                });
                alertRef.afterDismissed().subscribe(() => {
                    this.router.navigate(['management', 'users']);
                });
            });
        }


    }

}
