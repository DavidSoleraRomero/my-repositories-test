import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PEOPLE_API_URL_TOKEN, PEOPLE_REPOSITORY_MAPPING_TOKEN, PEOPLE_RESOURCE_NAME_TOKEN } from './core/repositories/repository.tokens';
import { PeopleMappingHttpService } from './core/repositories/implementations/people-mapping-http.service';
import { PeopleRepositoryFactory } from './core/repositories/repository.factory';
import { provideHttpClient } from '@angular/common/http';
import { PeopleMappingLocalStorageService } from './core/repositories/implementations/people-mapping-local-storage.service';

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
      useValue: "people"
    },
    // APIs urls
    {
      provide: PEOPLE_API_URL_TOKEN,
      useValue: "https://randomuser.me/api/?results=100"
    },
    // Repositories
    {
      provide: PEOPLE_REPOSITORY_MAPPING_TOKEN,
      useClass: PeopleMappingLocalStorageService
    },
    PeopleRepositoryFactory,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
