import { Injectable } from '@angular/core';
import { IBaseMapping } from '../interfaces/base-mapping.interface';
import { Person } from '../../models/person';
import { Paginated } from '../../models/paginated';

@Injectable({
  providedIn: 'root'
})
export class PeopleMappingHttpService implements IBaseMapping<Person> {

  constructor() { }

  getPaginated(page: number, pages: number, pageSize: number, data: any[]): Paginated<Person> {
    throw new Error('Method not implemented.');
  }

  getOne(data: any): Person {
    throw new Error('Method not implemented.');
  }

  getCreated(data: any): Person {
    throw new Error('Method not implemented.');
  }

  getUpdated(data: any): Person {
    throw new Error('Method not implemented.');
  }
  
  getDeleted(data: any): Person {
    throw new Error('Method not implemented.');
  }

}
