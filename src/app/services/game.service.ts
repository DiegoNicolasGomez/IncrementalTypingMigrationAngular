import { Injectable } from '@angular/core';
import { Game } from '../classes/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  game = new Game(0);
  challengeGame = new Game(0);
  activeGame = new Game(0);

  constructor() {}
  
}
