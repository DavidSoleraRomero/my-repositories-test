import { Inject, Injectable, numberAttribute } from '@angular/core';
import { IBaseService } from '../interfaces/base-service.interface';
import { Observable } from 'rxjs';
import { Paginated } from '../../models/paginated';
import { Model } from '../../models/model';
import { IBaseRepository } from '../../repositories/interfaces/base-repository.interface';
import { REPOSITORY_TOKEN } from '../../repositories/repository.tokens';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends Model> implements IBaseService<T> {

  constructor(
    @Inject(REPOSITORY_TOKEN) protected repository: IBaseRepository<T>,
  ) { }

  getAll(page: number = 0, pageSize: number = 25): Observable<Paginated<T>> {
    return this.repository.getAll(page, pageSize);
  }

  getOne(id: string): Observable<T | null> {
    return this.repository.getOne(id);
  }

  create(t: T): Observable<T> {
    t.id = this.randomUuid();
    return this.repository.create(t);
  }

  update(id:string, t: T): Observable<T> {
    return this.repository.update(id, t);
  }

  delete(id:string): Observable<T> {
    return this.repository.delete(id);
  }
  
  private randomUuid(): string {
    const randomHex = (): string => Math.random().toString(16).slice(2, 6);
  
    return `${randomHex()}-${randomHex()}-${randomHex()}-${randomHex()}-${randomHex()}${randomHex()}`;
  }

}
