import { Inject, Injectable } from '@angular/core';
import { Model } from '../../models/model';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { API_URL_TOKEN, REPOSITORY_MAPPING_TOKEN, RESOURCE_NAME_TOKEN } from '../repository.tokens';
import { Paginated } from '../../models/paginated';
import { IBaseMapping } from '../interfaces/base-mapping.interface';
import { BaseRepositoryHttpService } from './base-repository-http.service';

export interface PaginatedRaw<T> {
    first: number
    prev: number | null
    next: number | null
    last: number
    pages: number
    items: number
    data: T[]
  }

@Injectable({
  providedIn: 'root'
})
export class JsonServerRepositoryService<T extends Model> extends BaseRepositoryHttpService<T> {

  constructor(
    http: HttpClient,
    @Inject(API_URL_TOKEN) apiURL: string,
    @Inject(RESOURCE_NAME_TOKEN) resource: string,
    @Inject(REPOSITORY_MAPPING_TOKEN) mapping: IBaseMapping<T>,
  ) { 
    super(http, apiURL, resource, mapping)
  }

  override getAll(page: number, pageSize: number): Observable<Paginated<T>> {
    return this.http.get<PaginatedRaw<T>>(`${this.apiURL}/${this.resource}/?_page=${page}&_per_page=${pageSize}`).pipe(
      map((res) => {
        return this.mapping.getPaginated(page, pageSize, res.pages, res.data);
      })
    );
  }

  override update(id: string, entity: T): Observable<T> {
    return this.http.patch<T>(
      `${this.apiURL}/${this.resource}/${id}`, entity).pipe(
        map((res) => {
        return this.mapping.getUpdated(res);
      }));
  }

}
