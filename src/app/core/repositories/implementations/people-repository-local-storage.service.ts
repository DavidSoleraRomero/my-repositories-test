import { Inject, Injectable } from '@angular/core';
import { BaseRepositoryLocalStorageService } from './base-repository-local-storage.service';
import { Person } from '../../models/person';
import { IPeopleRepository } from '../interfaces/people-repository.interface';
import { PEOPLE_REPOSITORY_MAPPING_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN } from '../repository.tokens';
import { IBaseMapping } from '../interfaces/base-mapping.interface';

@Injectable({
  providedIn: 'root'
})
export class PeopleRepositoryLocalStorageService extends BaseRepositoryLocalStorageService<Person> implements IPeopleRepository {

  constructor(
    @Inject(PEOPLE_RESOURCE_NAME_TOKEN) resource: string,
    @Inject(PEOPLE_REPOSITORY_MAPPING_TOKEN) mapping: IBaseMapping<Person>
  ) {
    super(resource, mapping);
  }

}
