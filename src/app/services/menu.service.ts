import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { eIdUpgrade } from '../classes/upgrade';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  navbarItems: {id: string, visible: boolean}[] = [
    {id: 'active', visible: true},
    {id: 'passive', visible: false},
    {id: 'upgrades', visible: true},
    {id: 'modules', visible: false},
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
      this.navbarItems.find(x => x.id === 'achievements')!.visible = game.achievements.length > 1;

      this.navbarItems.find(x => x.id === 'passive')!.visible = game.upgrades.some(x => x.id === eIdUpgrade.WordPassiveEnhancer);

      this.navbarItems.find(x => x.id === 'modules')!.visible = game.upgrades.some(x => x.id === eIdUpgrade.UnlockModules);

      this.navbarItems.find(x => x.id === 'challenges')!.visible = game.upgrades.some(x => x.id === eIdUpgrade.ChallengeYourself);

      this.navbarItems.find(x => x.id === 'prestige')!.visible = game.allTimePoints >= 1000000;

      this.navbarItems.find(x => x.id === 'cards')!.visible = game.upgrades.some(x => x.id === eIdUpgrade.Gacha);
    })
   }

  getNavBarItems(): Observable<{id: string, visible: boolean}[]> {
    return this.navBarItemsSubject.asObservable();
  }
}
