import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { Game } from '../classes/game';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  gameStats$ = new BehaviorSubject<Game>(new Game(0, "Current"));

  constructor(private gameService: GameService) {
    this.gameService.getGame().subscribe((game) => {
      this.gameStats$.next(game);
    }) 
   }
}
