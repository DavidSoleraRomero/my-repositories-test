import { Injectable } from '@angular/core';
import { IBaseMapping } from '../../interfaces/base-mapping.interface';
import { Paginated } from '../../../models/paginated';
import { Group } from 'src/app/core/models/group';

interface GroupRaw {
  id: string,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class GroupMappingJsonServerService implements IBaseMapping<Group> {

  constructor() { }

  getPaginated(page: number, pageSize: number, pages: number, data: GroupRaw[]): Paginated<Group> {
    return {
      page: page,
      pageSize: pageSize,
      pages: pages,
      data: data.map<Group>(
        (d: GroupRaw) => {
        return this.getOne(d);
      }),
    }
  }

  getOne(data: GroupRaw): Group {
    return {
      id: data.id,
      name: data.name
    };
  }

  getCreated(data: GroupRaw): Group {
    return this.getOne(data);
  }

  getUpdated(data: GroupRaw): Group {
    return this.getOne(data);
  }
  
  getDeleted(data: GroupRaw): Group {
    return this.getOne(data);
  }

}
