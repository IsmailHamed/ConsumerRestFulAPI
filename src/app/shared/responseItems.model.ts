import {Pagination} from './pagination.model';
export interface Meta {
    pagination: Pagination;
}
export interface ResponseItems {
    data;
    meta: Meta;
}

