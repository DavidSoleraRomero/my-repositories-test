import { Injectable } from '@angular/core';
import { IBaseMapping } from '../../interfaces/base-mapping.interface';
import { Person } from '../../../models/person';
import { Paginated } from '../../../models/paginated';

interface PersonRaw {
  id: string,
  name: string,
  surnames: string,
  email: string,
  age?: number,
  gender: string,
  country_code: string,
  picture?:{
      large:string,
      thumbnail:string
  },
  group_id: string,
}

@Injectable({
  providedIn: 'root'
})
export class PeopleMappingJsonServerService implements IBaseMapping<Person> {

  constructor() { }

  getPaginated(page: number, pageSize: number, pages: number, data: PersonRaw[]): Paginated<Person> {
    return {
      page: page,
      pageSize: pageSize,
      pages: pages,
      data: data.map<Person>(
        (d: PersonRaw) => {
        return this.getOne(d);
      }),
    }
  }

  getOne(data: PersonRaw): Person {
    return {
      id: data.id,
      name: data.name,
      surnames: data.surnames,
      age: data.age?? Math.floor(Math.random() * 60 + 18),
      email: data.email?? "",
      gender: data.gender?? "",
      country_code: data.country_code?? "",
      picture: data.picture? {
        large: data.picture?.large?? "", 
        thumbnail: data.picture?.thumbnail?? ""
      }: undefined,
      group_id: data.group_id?? ""
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
