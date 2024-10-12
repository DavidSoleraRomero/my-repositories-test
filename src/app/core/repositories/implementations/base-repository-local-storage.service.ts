import { Inject, Injectable } from '@angular/core';
import { IBaseRepository } from '../interfaces/base-repository.interface';
import { Observable, of } from 'rxjs';
import { Paginated } from '../../models/paginated';
import { REPOSITORY_MAPPING_TOKEN, RESOURCE_NAME_TOKEN } from '../repository.tokens';
import { IBaseMapping } from '../interfaces/base-mapping.interface';
import { Model } from '../../models/model';

@Injectable({
  providedIn: 'root'
})
export class BaseRepositoryLocalStorageService<T extends Model> implements IBaseRepository<T> {

  _items:T[] = [];
  private newID():string{
    const validChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      code += validChars[randomIndex];
    }
    return code;
  }

  constructor(
    @Inject(RESOURCE_NAME_TOKEN) protected resource: string,
    @Inject(REPOSITORY_MAPPING_TOKEN) protected mapping: IBaseMapping<T>,
  ) {
    let mockupList:any[] = [];
    const names: string[] = [
      "Carlos", "María", "Juan", "Lucía", "Miguel", "Ana", "Pedro", "Sofía", 
      "Javier", "Elena", "Fernando", "Paula", "Diego", "Laura", "Luis", 
      "Carmen", "Alberto", "Irene", "Raúl", "Marta"
    ];
    
    const surnames: string[] = [
      "García", "Martínez", "López", "Sánchez", "Pérez", "González", 
      "Rodríguez", "Fernández", "Hernández", "Ruiz", "Díaz", "Moreno", 
      "Alonso", "Romero", "Torres", "Vargas", "Molina", "Castro", "Ortiz", 
      "Silva"
    ];
    for(let i = 0; i<100;i++){
      let mockup = {
        name:{
          title:'Mrs',
          first: names[Math.floor(Math.random() * names.length)],
          last: surnames[Math.floor(Math.random() * surnames.length)]
        },
        age: Math.floor(Math.random() * 70 + 18),
        picture:{
          large:"https://picsum.photos/id/0/200/300",
          thumbnail:"https://picsum.photos/id/0/200/300"
        }
      };
      mockup.picture.large = `https://picsum.photos/id/${i}/200/300`;
      mockup.picture.thumbnail = `https://picsum.photos/id/${i}/200/300`;
      mockupList = [...mockupList, mockup];
    }
    this._items = JSON.parse(localStorage.getItem(resource) ?? JSON.stringify(mockupList));
    localStorage.setItem(this.resource, JSON.stringify(this._items));
  }

  getAll(page: number, pageSize: number): Observable<Paginated<T>> {
    return of(this.mapping.getPaginated(
      page,
      pageSize,
      this._items.length / pageSize,
      this._items.slice(
        page * pageSize,
        Math.min(
          (page + 1) * pageSize,
          this._items.length
        )
      )
    ))
  }

  getOne(id: string): Observable<T | null> {
    return of(
      this.mapping.getOne(this._items.find(element => element.id == id)) 
      ?? 
      null
    );
  }

  create(element: T): Observable<T> {
    element.id = this.newID();
    element.createdAt = (new Date()).toISOString();
    this._items.push(element);
    localStorage.setItem(this.resource, JSON.stringify(this._items));
    return of(this.mapping.getCreated(element));
  }

  update(id: string, element: T): Observable<T> {
    let index = this._items.findIndex(el => el.id == id);
    if (index >= 0) {
      this._items[index] = element;
      localStorage.setItem(this.resource, JSON.stringify(this._items));
      return of(this.mapping.getUpdated(element));
    }
    throw new Error("Element with that ID couldn't be found");
  }

  delete(id: string): Observable<T> {
    let index = this._items.findIndex(el => el.id == id);
    if (index >= 0) {
      let removedElement = this._items[index];
      this._items.splice(index, 1);
      localStorage.setItem(this.resource, JSON.stringify(this._items));
      return of(this.mapping.getDeleted(removedElement));
    }
    throw new Error("Element with that ID couldn't be found");
  }

}
