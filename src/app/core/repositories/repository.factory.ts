import { HttpClient } from "@angular/common/http";
import { FactoryProvider } from "@angular/core";
import { BaseRepositoryHttpService } from "./implementations/base-repository-http.service";
import { API_URL_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN, PEOPLE_REPOSITORY_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN } from "./repository.tokens";
import { IBaseMapping } from "./interfaces/base-mapping.interface";
import { Person } from "../models/person";
import { Model } from "../models/model";

export function createHttpRepository<T extends Model>(http: HttpClient, apiUrl: string, resource: string, mapping: IBaseMapping<T>) {
    return new BaseRepositoryHttpService<T>(http, apiUrl, resource, mapping);
}

export const PeopleRepositoryFactory: FactoryProvider = {
    provide: PEOPLE_REPOSITORY_TOKEN,
    deps: [HttpClient, API_URL_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN],
    useFactory: (http: HttpClient, apiUrl: string, resource: string, mapping: IBaseMapping<Person>) => {
        createHttpRepository<Person>(http, apiUrl, resource, mapping);
    }
}