import {Link} from '../shared/link.model';
import {Pagination} from '../shared/pagination.model';

export interface Product {
    identifier: number;
    title: string;
    details: string;
    stock: number;
    situation: string;
    picture: string;
    seller: number;
    creationDate: Date;
    lastChange: Date;
    deleteDate: Date;
    links: Link[];
}

export class Products {
    public  products: Product[] = [];
    public pagination: Pagination;
}
