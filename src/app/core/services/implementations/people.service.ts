import { Inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Person } from '../../models/person';
import { IPeopleService } from '../interfaces/people-service.interface';
import { IPeopleRepository } from '../../repositories/interfaces/people-repository.interface';
import { PEOPLE_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends BaseService<Person> implements IPeopleService {

  constructor(
    @Inject(PEOPLE_REPOSITORY_TOKEN) repository: IPeopleRepository
  ) { 
    super(repository);
  }
}
