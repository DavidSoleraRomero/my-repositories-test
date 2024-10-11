import { Person } from "../../models/person";
import { IBaseRepository } from "./base-repository.interface";

export interface IPeopleRepository extends IBaseRepository<Person> {
    
}