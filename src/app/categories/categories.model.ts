import {Link} from '../shared/link.model';
import {Pagination} from '../shared/pagination.model';

export interface Category {
    identifier: string;
    title: string;
    details: string;
    creationDate: Date;
    lastChange: Date;
    deleteDate: Date;
    links: Link[];
}

export class Categories {
    public categories: Category[] = [];
    public pagination: Pagination;
}
