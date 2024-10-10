import { Observable } from "rxjs";
import { Paginated } from "../../models/paginated";

export interface IBaseService<T> {
    getAll(page: number, pageSize: number): Observable<Paginated<T>>,
    getOne(id: string): Observable<T | null>,
    create(t: T): Observable<T>,
    update(t: T): Observable<T>,
    delete(t: T): Observable<T>
}