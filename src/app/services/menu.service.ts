import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  navbarItems: {id: string, visible: boolean}[] = [
    {id: 'active', visible: true},
    {id: 'passive', visible: false},
    {id: 'upgrades', visible: true},
    {id: 'challenges', visible: false},
    {id: 'prestige', visible: false},
    {id: 'cards', visible: false},
    {id: 'achievements', visible: false},
    {id: 'stats', visible: true},
    {id: 'options', visible: true},
  ];

  navBarItemsSubject = new BehaviorSubject<{id: string, visible: boolean}[]>(this.navbarItems);

  constructor(private gameService: GameService) {
    this.gameService.getGame().subscribe((game) => {
      if(game.achievements.length > 1) {
        this.navbarItems.find(x => x.id === 'achievements')!.visible = true;
      }
      else {
        this.navbarItems.find(x => x.id === 'achievements')!.visible = false;
      }
      if(game.upgrades.find(x => x.id === 4)) {
        this.navbarItems.find(x => x.id === 'passive')!.visible = true;
      }
      else {
        this.navbarItems.find(x => x.id === 'passive')!.visible = false;
      }
      if(game.upgrades.find(x => x.id === 11)) {
        this.navbarItems.find(x => x.id === 'challenges')!.visible = true;
      }
      else {
        this.navbarItems.find(x => x.id === 'challenges')!.visible = false;
      }
      if(game.allTimePoints >= 1000000) {
        this.navbarItems.find(x => x.id === 'prestige')!.visible = true;
      }
      else {
        this.navbarItems.find(x => x.id === 'prestige')!.visible = false;
      }
      if(game.upgrades.find(x => x.id === 9)) {
        this.navbarItems.find(x => x.id === 'cards')!.visible = true;
      }
      else {
        this.navbarItems.find(x => x.id === 'cards')!.visible = false;
      }
    })
   }

  getNavBarItems(): Observable<{id: string, visible: boolean}[]> {
    return this.navBarItemsSubject.asObservable();
  }
}
