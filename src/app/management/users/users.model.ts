import {Link} from '../../shared/link.model';
import {Pagination} from '../../shared/pagination.model';

export interface User {
    identifier: number;
    name: string;
    email: string;
    isVerified: number;
    isAdmin: string;
    creationDate: Date;
    lastChange: Date;
    deleteDate: Date;
    links: Link[];
}

export class Users {
    public users: User[] = [];
    public pagination: Pagination;
}
