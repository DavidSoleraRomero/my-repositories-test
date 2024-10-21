import { Inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { GROUPS_REPOSITORY_TOKEN } from '../../repositories/repository.tokens';
import { Group } from '../../models/group';
import { IGroupsService } from '../interfaces/groups-service.interface';
import { IGroupsRepository } from '../../repositories/interfaces/groups-repository.interface';

@Injectable({
  providedIn: 'root'
})
export class GroupsService extends BaseService<Group> implements IGroupsService {

  constructor(
    @Inject(GROUPS_REPOSITORY_TOKEN) repository: IGroupsRepository
  ) { 
    super(repository);
  }
}
