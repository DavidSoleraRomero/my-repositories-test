import { Model } from "./model";

export interface Person extends Model {
    name: string,
    surnames: string,
    age?: number,
    email?: string,
    gender?: string,
    country_code?: string,
    picture?:{  
        large:string,
        thumbnail:string
    },
    group_id?: string
}
