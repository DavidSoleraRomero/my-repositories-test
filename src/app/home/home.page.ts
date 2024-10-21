import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnimationController, InfiniteScrollCustomEvent } from '@ionic/angular';
import { Person } from '../core/models/person';
import { PeopleService } from '../core/services/implementations/people.service';
import { Paginated } from '../core/models/paginated';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor() { }

  ngOnInit(): void { }

}
