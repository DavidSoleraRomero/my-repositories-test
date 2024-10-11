import { Inject, Injectable } from '@angular/core';
import { IBaseRepository } from '../interfaces/base-repository.interface';
import { Model } from '../../models/model';
import { Observable } from 'rxjs';
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
    throw new Error('Method not implemented.');
  }

  getOne(id: string): Observable<T | null> {
    throw new Error('Method not implemented.');
  }

  create(element: T): Observable<T> {
    throw new Error('Method not implemented.');
  }

  update(id: string, element: T): Observable<T> {
    throw new Error('Method not implemented.');
  }

  delete(id: string): Observable<T> {
    throw new Error('Method not implemented.');
  }

}
