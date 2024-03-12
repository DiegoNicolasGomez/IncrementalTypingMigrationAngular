import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { Game } from '../classes/game';
import { GameService } from './game.service';
import { WordsService } from './words.service';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  gameStats$ = new BehaviorSubject<Game>(new Game(0, 'Current'));
  bonusValues: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  bonusSumsValues: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(
    []
  );

  constructor(private gameService: GameService) {
    this.gameService.getGame().subscribe((game) => {
      this.gameStats$.next(game);
    });

    this.gameService.getGame().subscribe((game) => {
      this.bonusValues.next(game.bonusValues);
      this.bonusSumsValues.next(game.bonusSumsValues);
    });
  }

  getBonusValues() {
    return this.bonusValues.asObservable();
  }

  getBonusSumsValues() {
    return this.bonusSumsValues.asObservable();
  }
}
