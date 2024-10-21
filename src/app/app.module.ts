import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { GROUPS_API_URL_TOKEN, GROUPS_REPOSITORY_MAPPING_TOKEN, GROUPS_RESOURCE_NAME_TOKEN, PEOPLE_API_URL_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN } from './core/repositories/repository.tokens';
import { GroupsRepositoryFactory, PeopleRepositoryFactory } from './core/repositories/repository.factory';
import { provideHttpClient } from '@angular/common/http';
import { PeopleMappingJsonServerService } from './core/repositories/implementations/mapping/people-mapping-json-server.service';
import { GroupMappingJsonServerService } from './core/repositories/implementations/mapping/group-mapping-json-server.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    provideHttpClient(),
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy
    },
    // Resources
    {
      provide: PEOPLE_RESOURCE_NAME_TOKEN,
      useValue: "persons"
    },
    {
      provide: GROUPS_RESOURCE_NAME_TOKEN,
      useValue: "groups"
    },
    // APIs urls
    {
      provide: PEOPLE_API_URL_TOKEN,
      useValue: "http://localhost:3000"
    },
    {
      provide: GROUPS_API_URL_TOKEN,
      useValue: "http://localhost:3000"
    },
    // Repositories
    {
      provide: PEOPLE_REPOSITORY_MAPPING_TOKEN,
      useClass: PeopleMappingJsonServerService
    },
    {
      provide: GROUPS_REPOSITORY_MAPPING_TOKEN,
      useClass: GroupMappingJsonServerService
    },
    PeopleRepositoryFactory,
    GroupsRepositoryFactory,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
