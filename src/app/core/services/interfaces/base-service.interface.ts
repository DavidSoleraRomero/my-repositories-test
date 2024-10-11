import { Observable } from "rxjs";
import { Paginated } from "../../models/paginated";

export interface IBaseService<T> {
    getAll(page: number, pageSize: number): Observable<Paginated<T>>,
    getOne(id: string): Observable<T | null>,
    create(t: T): Observable<T>,
    update(id: string, t: T): Observable<T>,
    delete(id: string): Observable<T>
}