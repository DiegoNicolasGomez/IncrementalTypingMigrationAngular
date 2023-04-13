import { Injectable } from '@angular/core';
import { Challenge } from '../classes/challenge';
import { GameUtils } from '../utils/utils';
import { GameService } from './game.service';
import { LayoutService } from './layout.service';
import { OverlayService } from './overlay.service';
import { PrestigeService } from './prestige.service';

@Injectable({
  providedIn: 'root',
})
export class ChallengesService {
  challenges: Challenge[] = [];

  intervalId: any;

  constructor(
    private gameService: GameService,
    private prestigeService: PrestigeService,
    private layoutService: LayoutService,
    private overlayService: OverlayService
  ) {
    this.createChallenge(
      new Challenge(
        'Accuracy',
        'Write 4-letter Words with only a set amount of key presses',
        '+1 Card everytime you roll!',
        80,
        50,
        210,
        1
      )
    );
    this.createChallenge(
      new Challenge(
        'Speed',
        'Write 4-letter words in only 1 minute',
        '50% more Points!',
        60,
        50,
        0,
        2
      )
    );
  }

  gameUtils = new GameUtils(this.gameService);

  createChallenge(challenge: Challenge) {
    this.challenges.push(challenge);
  }

  getChallenges(): Challenge[] {
    return this.challenges;
  }

  startTimer(seconds: number, challengeNumber: number) {
    let secondsChallenge = seconds;
    this.layoutService.startTimer(seconds);
    this.overlayService.startChallenge();
    const challenge = this.gameService.game.value.challenges.find(
      (x) => x.id == challengeNumber
    );
    if (!challenge) return;
    this.intervalId = setInterval(() => {
      if (this.gameService.game.value.wordsAmount >= challenge.objective) {
        this.layoutService.challengeCompleted();
        this.overlayService.challengeCompleted();
        this.gameService.completeChallenge(challengeNumber);
        if (challengeNumber == 1)
          this.gameService.updateRollsAmountActive(
            this.gameService.activeGame.value.challenges.find(
              (x) => x.id == challengeNumber
            )!.amount
          );
        clearInterval(this.intervalId);
        this.exitChallenge(challengeNumber);
      } else if (challenge.restriction <= this.gameService.game.value.letterCounter || seconds <= 0) {
        this.layoutService.challengeFailed();
        this.overlayService.challengeFailed();
        clearInterval(this.intervalId);
        this.exitChallenge(challengeNumber);
      }
      seconds--;
    }, 1000);
  }

  startChallenge(challengeNumber: number) {
    if (this.gameService.game.value.isInChallenge)
      return alert('You are already in a Challenge');
    if (
      !this.gameService.game.value.challenges.some(
        (x) => x.id == challengeNumber
      )
    )
      this.gameService.game.value.challenges.push(
        this.challenges.find((x) => x.id == challengeNumber)!
      );
    const challenge = this.gameService.game.value.challenges.find(
      (x) => x.id == challengeNumber
    );
    if (!challenge) return;
    this.prestigeService.prestigeStats();
    setTimeout(() => {
      this.loadAchievements();
      this.loadChallenges();
      this.gameService.loadGame(this.gameService.challengeGame.value);
      this.gameService.updateChallengeState(true, challengeNumber);
      this.startTimer(challenge.time, challengeNumber);
    }, 500);
  }

  exitChallenge(challengeNumber: number) {
    this.gameService.loadGame(this.gameService.activeGame.value);
    this.gameService.updateChallengeState(false, challengeNumber);
    this.gameService.resetLetterCounter();
  }

  loadAchievements() {
    this.gameService.updateAchievements();
  }

  loadChallenges() {
    this.gameService.updateChallenges();
  }
}
