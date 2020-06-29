import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    hide = true;
    constructor(
        private authService: AuthService,
        private router: Router) {
    }

    ngOnInit(): void {

    }

    onSubmit(form: NgForm) {
        if (form.invalid) {
            return;
        }
        const email = form.value.email;
        const password = form.value.password;
        this.authService.login(email, password).subscribe(response => {
            debugger
              this.router.navigate(['/']);
        });
    }
}
