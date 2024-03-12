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
    {id: 'upgrades', visible: false},
    {id: 'cards', visible: false},
    {id: 'modules', visible: false},
    {id: 'mastery', visible: false},
    {id: 'challenges', visible: false},
    {id: 'minigames', visible: false},
    {id: 'market', visible: false},
    {id: 'prestige', visible: false},
    {id: 'achievements', visible: false},
    {id: 'stats', visible: true},
    {id: 'options', visible: true},
  ];

  navBarItemsSubject = new BehaviorSubject<{id: string, visible: boolean}[]>(this.navbarItems);

  constructor(private gameService: GameService) {
    this.gameService.getGame().subscribe((game) => {
      this.navbarItems.find(x => x.id === 'upgrades')!.visible = game.allTimePoints >= 50;

      this.navbarItems.find(x => x.id === 'achievements')!.visible = game.achievements.length >= 1;

      this.navbarItems.find(x => x.id === 'passive')!.visible = game.upgrades.some(x => x.id === "WordPassiveEnhancer");

      this.navbarItems.find(x => x.id === 'modules')!.visible = game.upgrades.some(x => x.id === "UnlockModules");

      this.navbarItems.find(x => x.id === 'challenges')!.visible = game.upgrades.some(x => x.id === "ChallengeYourself") || game.gameType === "Challenge";
      
      this.navbarItems.find(x => x.id === 'minigames')!.visible = game.upgrades.some(x => x.id === "UnlockMinigames");
      
      this.navbarItems.find(x => x.id === 'market')!.visible = game.upgrades.some(x => x.id === "UnlockMarket");

      this.navbarItems.find(x => x.id === 'prestige')!.visible = game.allTimePoints >= 1000000;

      this.navbarItems.find(x => x.id === 'cards')!.visible = game.upgrades.some(x => x.id === "Gacha");

      this.navbarItems.find(x => x.id === 'mastery')!.visible = game.upgrades.some(x => x.id === "UnlockMastery");
    })
   }

  getNavBarItems(): Observable<{id: string, visible: boolean}[]> {
    return this.navBarItemsSubject.asObservable();
  }
}
