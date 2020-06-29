import {Link} from '../../shared/link.model';
import {Pagination} from '../../shared/pagination.model';

export interface Permission {
    identifier: number;
    name: string;
    displayName: string;
    description: string;
    creationDate: Date;
    lastChange: Date;
    deleteDate: Date;
    links: Link[];
}

export class Permissions {
    public permissions: Permission[] = [];
    public pagination: Pagination;
}
