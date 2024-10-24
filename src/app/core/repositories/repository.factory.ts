import { HttpClient } from "@angular/common/http";
import { FactoryProvider } from "@angular/core";
import { GROUPS_API_URL_TOKEN, GROUPS_REPOSITORY_MAPPING_TOKEN, GROUPS_REPOSITORY_TOKEN, GROUPS_RESOURCE_NAME_TOKEN, PEOPLE_API_URL_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN, PEOPLE_REPOSITORY_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN } from "./repository.tokens";
import { IBaseMapping } from "./interfaces/base-mapping.interface";
import { Person } from "../models/person"
import { PeopleRepositoryHttpService } from "./implementations/people-repository-http.service";
import { PeopleRepositoryLocalStorageService } from "./implementations/people-repository-local-storage.service";
import { Model } from "../models/model";
import { Group } from "../models/group";
import { GroupRepositoryJsonServerService } from "./implementations/group-repository-json-server.service";
import { PeopleRepositoryJsonServerService } from "./implementations/people-repository-json-server.service";

export function createPeopleHttpRepository(http: HttpClient, apiUrl: string, resource: string, mapping: IBaseMapping<Person>) {
    return new PeopleRepositoryHttpService(http, apiUrl, resource, mapping);
}

export function createPeopleLocalStorageRepository(resource: string, mapping: IBaseMapping<Person>) {
    return new PeopleRepositoryLocalStorageService(resource, mapping);
}

export function createPeopleJsonServerRepository<T extends Model>(http: HttpClient, apiURL: string, resource: string, mapping: IBaseMapping<T>) {
    return new PeopleRepositoryJsonServerService<T>(http, apiURL, resource, mapping);
}

export function createGroupsJsonServerRepository<T extends Model>(http: HttpClient, apiURL: string, resource: string, mapping: IBaseMapping<T>) {
    return new GroupRepositoryJsonServerService<T>(http, apiURL, resource, mapping);
}

export const PeopleRepositoryFactory: FactoryProvider = {
    provide: PEOPLE_REPOSITORY_TOKEN,
    deps: [HttpClient, PEOPLE_API_URL_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN],
    useFactory: (http: HttpClient, apiUrl: string, resource: string, mapping: IBaseMapping<Person>) => {
        // return createPeopleHttpRepository(http, apiUrl, resource, mapping);
        // return createPeopleLocalStorageRepository(resource, mapping);
        return createPeopleJsonServerRepository<Person>(http, apiUrl, resource, mapping);
    }
}

export const GroupsRepositoryFactory: FactoryProvider = {
    provide: GROUPS_REPOSITORY_TOKEN,
    deps: [HttpClient, GROUPS_API_URL_TOKEN, GROUPS_RESOURCE_NAME_TOKEN, GROUPS_REPOSITORY_MAPPING_TOKEN],
    useFactory: (http: HttpClient, apiUrl: string, resource: string, mapping: IBaseMapping<Group>) => {
        return createGroupsJsonServerRepository<Group>(http, apiUrl, resource, mapping);
    }
}