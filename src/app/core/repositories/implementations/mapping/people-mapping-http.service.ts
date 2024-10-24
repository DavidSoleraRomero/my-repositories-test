import { Injectable } from '@angular/core';
import { IBaseMapping } from '../../interfaces/base-mapping.interface';
import { Person } from '../../../models/person';
import { Paginated } from '../../../models/paginated';

interface PersonRaw {
  id:string,
  name:{
      title:string;
      first:string;
      last:string;
  },
  age:number,
  picture:{
      large:string
      thumbnail:string
  }
}

@Injectable({
  providedIn: 'root'
})
export class PeopleMappingHttpService implements IBaseMapping<Person> {

  constructor() { }

  getPaginated(page: number, pageSize: number, pages: number, data: PersonRaw[]): Paginated<Person> {
    return {
      page: page,
      pageSize: pageSize,
      pages: pages,
      data: data.map<Person>((d: PersonRaw) => {
        return this.getOne(d);
      }),
    }
  }

  getOne(data: PersonRaw): Person {
    return {
      id: data.id,
      name: data.name.first,
      surnames: data.name.last,
      age: data.age,
      picture: {
        large: data.picture.large,
        thumbnail: data.picture.thumbnail
      },
    };
  }

  getCreated(data: PersonRaw): Person {
    return this.getOne(data);
  }

  getUpdated(data: PersonRaw): Person {
    return this.getOne(data);
  }
  
  getDeleted(data: PersonRaw): Person {
    return this.getOne(data);
  }

}
