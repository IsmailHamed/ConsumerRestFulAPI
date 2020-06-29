import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BehaviorSubject, throwError} from 'rxjs';
import {User} from './user.model';
import {catchError, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

export interface AuthResponseData {
    token_type: string;
    access_token: string;
    refreshToken: string;
    expires_at: string;
    userId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient,
                private router: Router) {
    }

    login(email: string, password: string) {
        const body = {
            email: email,
            password: password
        };

        return this.http.post<AuthResponseData>('api/users/login', body)
            .pipe(
                tap(resData => {
                        this.router.navigate(['/']);
                        this.handleAuthentication(
                            resData.userId,
                            resData.token_type,
                            resData.access_token,
                            resData.refreshToken,
                            +resData.expires_at,
                        );
                    }
                )
            );
    }

    private handleAuthentication(
        userId: string,
        tokenType: string,
        token: string,
        refreshToken: string,
        expiresIn: number
    ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(userId, tokenType, token, refreshToken, expirationDate);
        this.user.next(user);
        // this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    // private handleError(errorRes: HttpErrorResponse) {
    //     let errorMessage = 'An unknown error occurred!';
    //     if (!errorRes.error || !errorRes.error.error) {
    //         return throwError(errorMessage);
    //     }
    //     switch (errorRes.error.error.message) {
    //         case 'EMAIL_EXISTS':
    //             errorMessage = 'This email exists already';
    //             break;
    //         case 'EMAIL_NOT_FOUND':
    //             errorMessage = 'This email does not exist.';
    //             break;
    //         case 'INVALID_PASSWORD':
    //             errorMessage = 'This password is not correct.';
    //             break;
    //     }
    //     return throwError(errorMessage);
    // }

    autoLogin() {
        const userData: {
            id: string;
            tokenType: string;
            _token: string;
            _refreshToken: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            {
                this.user.next(null);
                return;
            }
        }
        const loadedUser = new User(
            userData.id,
            userData.tokenType,
            userData._token,
            userData._refreshToken,
            new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.token) {
            this.user.next(loadedUser);
        }
    }

    logout() {
        return this.http.get('api/users/logout').pipe(
            tap(resData => {
                    this.user.next(null);
                    localStorage.removeItem('userData');
                    this.router.navigate(['/auth']);
                }
            )
        );
    }
}
