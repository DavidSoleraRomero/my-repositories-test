import { Inject, Injectable } from '@angular/core';
import { IBaseRepository } from '../interfaces/base-repository.interface';
import { Model } from '../../models/model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL_TOKEN, REPOSITORY_MAPPING_TOKEN, RESOURCE_NAME_TOKEN } from '../repository.tokens';
import { Paginated } from '../../models/paginated';
import { IBaseMapping } from '../interfaces/base-mapping.interface';

@Injectable({
  providedIn: 'root'
})
export class BaseRepositoryHttpService<T extends Model> implements IBaseRepository<T> {

  constructor(
    protected http: HttpClient,
    @Inject(API_URL_TOKEN) protected apiURL: string,
    @Inject(RESOURCE_NAME_TOKEN) protected resource: string,
    @Inject(REPOSITORY_MAPPING_TOKEN) protected mapping: IBaseMapping<T>,
  ) { }

  getAll(page: number, pageSize: number): Observable<Paginated<T>> {
    return this.http.get<T>(`${this.apiURL}/${this.resource}`).pipe(
      map((res) => {
        return this.mapping.getPaginated(page, pageSize, 0, res);
      })
    );
  }

  getOne(id: string): Observable<T | null> {
    return this.http.get<T>(`${this.apiURL}/${this.resource}/${id}`).pipe(
      map((res) => {
        return this.mapping.getOne(res);
      })
    );
  }

  create(element: T): Observable<T> {
    return this.http.post<T>(`${this.apiURL}/${this.resource}`, element).pipe(
      map(res => {
          console.log(res);
          return this.mapping.getCreated(res)
        }
      )
    );
  }

  update(id: string, element: T): Observable<T> {
    return this.http.put<T>(`${this.apiURL}/${this.resource}/${id}`, element).pipe(
      map(res => {
          return this.mapping.getUpdated(res)
        }
      )
    );
  }

  delete(id: string): Observable<T> {
    return this.http.delete<T>(`${this.apiURL}/${this.resource}/${id}`).pipe(
      map(res => {
          return this.mapping.getDeleted(res)
        }
      )
    );
  }

}
