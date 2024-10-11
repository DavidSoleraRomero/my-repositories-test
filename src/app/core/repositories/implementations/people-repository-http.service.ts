import { Inject, Injectable } from '@angular/core';
import { BaseRepositoryHttpService } from './base-repository-http.service';
import { Person } from '../../models/person';
import { HttpClient } from '@angular/common/http';
import { API_URL_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN, RESOURCE_NAME_TOKEN } from '../repository.tokens';
import { IBaseMapping } from '../interfaces/base-mapping.interface';

@Injectable({
  providedIn: 'root'
})
export class PeopleRepositoryHttpService extends BaseRepositoryHttpService<Person> {

  constructor(
    http: HttpClient,
    @Inject(API_URL_TOKEN) apiUrl: string,
    @Inject(PEOPLE_RESOURCE_NAME_TOKEN) resource: string,
    @Inject(PEOPLE_REPOSITORY_MAPPING_TOKEN) mapping: IBaseMapping<Person>,
  ) {
    super(http, apiUrl, resource, mapping);
  }


}
