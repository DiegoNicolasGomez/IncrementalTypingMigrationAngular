import { Injectable } from '@angular/core';
import { GameUtils } from '../utils/utils';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class ChallengesService {
  constructor(private gameService: GameService) {}

  gameUtils = new GameUtils(this.gameService);

  checkProgress() {
    var progress =
      (this.gameService.game.value.wordsAmount * 100) /
      this.getActiveChallengeObjective()!;
      return progress;
    // progressBar.style.width = `${progress}%`;
  }

  getActiveChallengeObjective() {
    const challenge = this.gameService.game.value.challenges.find(
      (x) => x.onChallenge
    );
    return challenge ? challenge.objective : 0;
  }
}
