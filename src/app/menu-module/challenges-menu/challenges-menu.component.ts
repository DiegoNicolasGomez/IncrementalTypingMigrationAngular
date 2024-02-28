import { Component } from '@angular/core';
import { Challenge, challengeType } from 'src/app/classes/challenge';
import { ChallengesService } from 'src/app/services/challenges.service';
import { GameService } from 'src/app/services/game.service';
import { LayoutService } from 'src/app/services/layout.service';
import { OverlayService } from 'src/app/services/overlay.service';
import { PrestigeService } from 'src/app/services/prestige.service';

@Component({
  selector: 'app-challenges-menu',
  templateUrl: './challenges-menu.component.html',
  styleUrls: ['./challenges-menu.component.scss'],
})
export class ChallengesMenuComponent {
  challenges: Challenge[] = [];

  constructor(
    private challengeService: ChallengesService,
    private gameService: GameService,
    private prestigeService: PrestigeService,
    private layoutService: LayoutService,
    private overlayService: OverlayService
  ) {
    this.challenges = this.challengeService.getChallenges();
  }

  startChallenge(challengeType: challengeType) {
   this.challengeService.startChallenge(challengeType);
  }

  exitAnyChallenge() {
    const challenge = this.gameService.game.value.challenges.find(
      (x) => x.onChallenge
    );
    if (challenge) this.exitChallenge(challenge.type, false);
  }

  exitChallenge(challengeType: challengeType, completed: boolean) {
    this.challengeService.exitChallenge(challengeType, completed);
  }
}