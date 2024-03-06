import { Injectable } from '@angular/core';
import { Challenge, challengeType } from '../classes/challenge';
import { GameUtils } from '../utils/utils';
import { GameService } from './game.service';
import { LayoutService } from './layout.service';
import { OverlayService } from './overlay.service';
import { PrestigeService } from './prestige.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChallengesService {
  challenges: Challenge[] = [];
  language: BehaviorSubject<language> = new BehaviorSubject<language>(
    'English'
  );
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
        210
      )
    );
    this.createChallenge(
      new Challenge(
        'Speed',
        'Write 4-letter words in only 1 minute',
        '50% more Points!',
        60,
        50,
        0
      )
    );
    this.createChallenge(
      new Challenge(
        'Language',
        'Complete 50 words in another language!',
        '50% more Points! (Check)',
        100,
        50,
        0
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

  startTimer(seconds: number, challengeType: challengeType) {
    let secondsChallenge = seconds;
    this.layoutService.startTimer(seconds);
    this.overlayService.startChallenge();
    const challenge = this.gameService.game.value.challenges.find(
      (x) => x.type == challengeType
    );
    if (!challenge) return;
    this.intervalId = setInterval(() => {
      switch (challengeType) {
        case 'Accuracy':
          if (this.gameService.game.value.wordsAmount >= challenge.objective) {
            this.layoutService.challengeCompleted();
            this.overlayService.challengeCompleted();
            this.gameService.completeChallenge(challengeType);
            this.gameService.updateRollsAmountActive(
              this.gameService.activeGame.value.challenges.find(
                (x) => x.type == challengeType
              )!.amount
            );
            clearInterval(this.intervalId);
            this.exitChallenge(challengeType);
          } else if (
            challenge.restriction <=
              this.gameService.game.value.letterCounter ||
            secondsChallenge <= 0
          ) {
            clearInterval(this.intervalId);
            this.exitChallenge(challengeType, false);
          }
          break;
        case 'Language':
          if (this.gameService.game.value.wordsAmount >= challenge.objective) {
            this.layoutService.challengeCompleted();
            this.overlayService.challengeCompleted();
            this.gameService.completeChallenge(challengeType);
            this.gameService.updateRollsAmountActive(
              this.gameService.activeGame.value.challenges.find(
                (x) => x.type == challengeType
              )!.amount
            );
            clearInterval(this.intervalId);
            this.exitChallenge(challengeType);
          } else if (secondsChallenge <= 0) {
            clearInterval(this.intervalId);
            this.exitChallenge(challengeType, false);
          }
          break;
        default:
          break;
      }
      secondsChallenge--;
    }, 1000);
  }

  startChallenge(challengeType: challengeType) {
    if (this.gameService.game.value.gameType === 'Challenge')
      return alert('You are already in a Challenge');
    if (
      !this.gameService.game.value.challenges.some(
        (x) => x.type == challengeType
      )
    )
      this.gameService.game.value.challenges.push(
        this.challenges.find((x) => x.type == challengeType)!
      );
    const challenge = this.gameService.game.value.challenges.find(
      (x) => x.type == challengeType
    );
    if (!challenge) return;
    this.prestigeService.prestigeStats();
    setTimeout(() => {
      if (challenge.type === 'Language') this.language.next('Amharic');
      this.gameService.saveToActiveGame();
      this.loadAchievements();
      this.loadChallenges();
      this.gameService.loadChallengeGame();
      this.gameService.updateChallengeState(true, challengeType);
      this.startTimer(challenge.time, challengeType);
    }, 500);
  }

  exitChallenge(
    challengeType: challengeType,
    challengeCompleted: boolean = true
  ) {
    if (challengeType === 'Language') this.language.next('English');
    this.gameService.loadActiveGame();
    this.gameService.updateChallengeState(false, challengeType);
    this.gameService.resetLetterCounter();
    clearInterval(this.intervalId);
    if (!challengeCompleted) {
      this.layoutService.challengeFailed();
      this.overlayService.challengeFailed();
    }
  }

  loadAchievements() {
    this.gameService.updateAchievements();
  }

  loadChallenges() {
    this.gameService.updateChallenges();
  }

  setLanguageChallenge(language: language) {
    switch (language) {
      case 'Japanese':
        this.language.next('Japanese');
        break;
    }
  }
  getLanguage() {
    return this.language.asObservable();
  }
}

export type language =
  | 'English'
  | 'Spanish'
  | 'French'
  | 'German'
  | 'Russian'
  | 'Japanese'
  | 'Arabic'
  | 'Amharic';
