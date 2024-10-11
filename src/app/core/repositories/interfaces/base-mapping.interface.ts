import { Paginated } from "../../models/paginated";

export interface IBaseMapping<T> {
    getPaginated(page: number, pages: number, pageSize: number, data: any[]): Paginated<T>;
    getOne      (data: any): T;
    getCreated  (data: any): T;
    getUpdated  (data: any): T;
    getDeleted  (data: any): T;
}