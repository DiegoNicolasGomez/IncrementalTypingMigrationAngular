import { Injectable } from '@angular/core';
import { GameService } from './game.service';
import { Mastery, masteryTier } from '../classes/mastery';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasteryService {
masteries: Mastery[] = [];
private gameSubscription = new Subscription();
  constructor(public gameService: GameService) {
    this.gameSubscription = this.gameService.getGame().subscribe((game) => {
      this.masteries = game.masteryLevels;
    })
   }

   ngOnDestroy() {
    this.gameSubscription.unsubscribe();
   }

   updateMasteryValue(masteryTier: masteryTier) {
    var amount = 1;
    this.gameService.updateMasteryValue(masteryTier, amount);
   }

}
