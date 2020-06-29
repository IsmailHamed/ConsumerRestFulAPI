import {Link} from '../../shared/link.model';
import {Pagination} from '../../shared/pagination.model';
import {Permission} from '../permissions/permissions.model';
import {User} from '../users/users.model';
export interface Role {
    identifier: number;
    name: string;
    displayName: string;
    description: string;
    permissions: Permission[];
    users: User[];
    creationDate: Date;
    lastChange: Date;
    deleteDate: Date;
    links: Link[];
}

export class Roles {
    public roles: Role[] = [];
    public pagination: Pagination;
}
