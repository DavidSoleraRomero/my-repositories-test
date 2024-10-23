import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AnimationController, InfiniteScrollCustomEvent, ModalController } from '@ionic/angular';
import { Paginated } from '../core/models/paginated';
import { Person } from '../core/models/person';
import { BehaviorSubject, Observable } from 'rxjs';
import { PeopleService } from '../core/services/implementations/people.service';
import { PersonModalComponent } from '../components/person-modal/person-modal.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {

  _people:BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
  people$:Observable<Person[]> = this._people.asObservable();

  constructor(
    private animationCtrl: AnimationController,
    private peopleSv:PeopleService,
    private modalController: ModalController,
  ) {}

  ngOnInit(): void {
    this.getMorePeople();
  }


  @ViewChildren('avatar') avatars!: QueryList<ElementRef>;
  @ViewChild('animatedAvatar') animatedAvatar!: ElementRef;
  @ViewChild('animatedAvatarContainer') animatedAvatarContainer!: ElementRef;

  selectedPerson: any = null;
  isAnimating = false;
  page:number = 1;
  pageSize:number = 15;
  totalPages!: number;


  getMorePeople(notify:HTMLIonInfiniteScrollElement | null = null) {
    this.peopleSv.getAll(this.page, this.pageSize).subscribe({
      next:(response:Paginated<Person>)=>{
        this.totalPages = response.pages;
        this._people.next([...this._people.value, ...response.data]);
        this.page++;
        notify?.complete();
      }
    });
  }

  canCallNext(notify:HTMLIonInfiniteScrollElement | null = null): boolean {
    return this.totalPages > this.page;
  }

  async openPersonDetail(person: any, index: number) {
    this.selectedPerson = person;
    const avatarElements = this.avatars.toArray();
    const clickedAvatar = avatarElements[index].nativeElement;

    // Obtener las coordenadas del avatar clicado
    const avatarRect = clickedAvatar.getBoundingClientRect();

    // Mostrar el contenedor animado
    this.isAnimating = true;
    

    // Configurar la posición inicial de la imagen animada
    const animatedAvatarElement = this.animatedAvatar.nativeElement as HTMLElement;
    animatedAvatarElement.style.position = 'absolute';
    animatedAvatarElement.style.top = `${avatarRect.top}px`;
    animatedAvatarElement.style.left = `${avatarRect.left}px`;
    animatedAvatarElement.style.width = `${avatarRect.width}px`;
    animatedAvatarElement.style.height = `${avatarRect.height}px`;

    // Crear la animación
    const animation = this.animationCtrl.create()
      .addElement(animatedAvatarElement)
      .duration(500)
      .easing('ease-out')
      .fromTo('transform', 'translate(0, 0) scale(1)', `translate(${window.innerWidth / 2 - avatarRect.left - avatarRect.width / 2}px, ${window.innerHeight / 2 - avatarRect.top - avatarRect.height / 2}px) scale(5)`);

    // Iniciar la animación
    await animation.play();

    // Opcional: Puedes agregar lógica adicional después de la animación
    // Por ejemplo, mostrar más información, navegar a otra página, etc.

    // Resetear la animación después de completarla
    //this.isAnimating = false;
  }

  onIonInfinite(ev:InfiniteScrollCustomEvent) {
    if (this.canCallNext()) this.getMorePeople(ev.target);
    ev.target.complete();
  }

  async onAddPerson() {
    const modal = await this.modalController.create({
      component: PersonModalComponent,
      componentProps: {}
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
    });

    return await modal.present();
  }

}
