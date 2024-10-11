import { Observable } from "rxjs";
import { Paginated } from "../../models/paginated";

export interface IBaseRepository<T> {
    getAll(page: number, pageSize: number): Observable<Paginated<T>>;
    getOne(id: string): Observable<T | null>;
    create(element: T): Observable<T>;
    update(id: string, element: T): Observable<T>;
    delete(id: string): Observable<T>;
}