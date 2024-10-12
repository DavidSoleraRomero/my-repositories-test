export interface PersonRaw {
    id:string,
    name:{
        title:string;
        first:string;
        last:string;
    },
    age:number,
    picture:{
        large:string
        thumbnail:string
    }
}