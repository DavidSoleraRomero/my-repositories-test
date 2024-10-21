import { Inject, Injectable } from '@angular/core';
import { BaseRepositoryHttpService } from './base-repository-http.service';
import { Person } from '../../models/person';
import { HttpClient } from '@angular/common/http';
import { API_URL_TOKEN, GROUPS_API_URL_TOKEN, GROUPS_REPOSITORY_TOKEN, GROUPS_RESOURCE_NAME_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN, RESOURCE_NAME_TOKEN } from '../repository.tokens';
import { IBaseMapping } from '../interfaces/base-mapping.interface';
import { JsonServerRepositoryService } from './json-server-repository.service';
import { Model } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class GroupRepositoryJsonServerService<T extends Model> extends JsonServerRepositoryService<T> {

    constructor(
        http: HttpClient,
        @Inject(GROUPS_API_URL_TOKEN) apiURL: string,
        @Inject(GROUPS_RESOURCE_NAME_TOKEN) resource: string,
        @Inject(GROUPS_REPOSITORY_TOKEN) mapping: IBaseMapping<T>,
    ) {
        super(http, apiURL, resource, mapping);
    }

}