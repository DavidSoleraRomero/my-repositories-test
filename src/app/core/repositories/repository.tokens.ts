import { Inject, InjectionToken } from "@angular/core";
import { IBaseRepository } from "./interfaces/base-repository.interface";
import { IPeopleRepository } from "./interfaces/people-repository.interface";
import { IBaseMapping } from "./interfaces/base-mapping.interface";
import { Person } from "../models/person";
import { IGroupsRepository } from "./interfaces/groups-repository.interface";

export const RESOURCE_NAME_TOKEN = new InjectionToken<string>("RESOURCE_NAME");
export const PEOPLE_RESOURCE_NAME_TOKEN = new InjectionToken<string>("PEOPLE_RESOURCE_NAME");
export const GROUPS_RESOURCE_NAME_TOKEN = new InjectionToken<string>("GROUPS_RESOURCE_NAME");

export const REPOSITORY_TOKEN = new InjectionToken<IBaseRepository<any>>("RESOURCE_TOKEN");
export const PEOPLE_REPOSITORY_TOKEN = new InjectionToken<IPeopleRepository>("PEOPLE_RESOURCE_TOKEN");
export const GROUPS_REPOSITORY_TOKEN = new InjectionToken<IGroupsRepository>("GROUPS_REPOSITORY_TOKEN");

export const API_URL_TOKEN = new InjectionToken<string>("API_URL_TOKEN");
export const PEOPLE_API_URL_TOKEN = new InjectionToken<string>("PEOPLE_API_URL_TOKEN");
export const GROUPS_API_URL_TOKEN = new InjectionToken<string>("GROUPS_API_URL_TOKEN");

export const REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<any>>("REPOSITORY_MAPPING_TOKEN");
export const PEOPLE_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Person>>("PEOPLE_REPOSITORY_MAPPING_TOKEN");
export const GROUPS_REPOSITORY_MAPPING_TOKEN = new InjectionToken<IBaseMapping<Person>>("GROUPS_REPOSITORY_MAPPING_TOKEN");