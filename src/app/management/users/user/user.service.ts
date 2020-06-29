import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../../users/users.model';
import {map} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';

const USER_URL = environment.usersUrl;


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    deleteUser(id: number) {
        return this.http.delete(USER_URL + '/' + id);
    }

    fetchUser(id: number) {
        return this.http.get<any>(USER_URL + '/' + id).pipe(map(res => {
            const user: User = res.data;
            return user;
        }));
    }

    updateUser(id: number, name: string, email: string, password: string, admin: boolean) {
        const body = {
            name: name,
            email: email,
            password: password,
            password_confirmation: password,
            isAdmin: String(admin),
        };
        return this.http.patch(USER_URL + '/' + id, body);
    }

    storeUser(name: string, email: string, password: string) {
        const body = {
            name: name,
            email: email,
            password: password,
            password_confirmation: password
        };
        return this.http.post(USER_URL, body);
    }
}
