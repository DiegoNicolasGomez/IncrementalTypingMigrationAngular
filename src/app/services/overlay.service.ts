import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Card } from '../classes/card';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  cards$ = new BehaviorSubject<Card[]>([]);

  challengeStatus$ = new BehaviorSubject<string>('inactive');

  progress$ = new BehaviorSubject<number>(0);

  constructor(private gameService: GameService) {
    this.gameService.getGame().subscribe((game) => {
      this.checkProgress(game.wordsAmount);
    })
   }

  appendCards(cards: Card[]){
    this.cards$.next(cards);
  }

  getCards(): Observable<Card[]> {
    return this.cards$.asObservable();
  }

  getProgress() {
    return this.progress$.asObservable();
  }

  getChallengeStatus() {
    return this.challengeStatus$.asObservable();
  }

  challengeCompleted() {
    this.challengeStatus$.next('success'); 
    // gameObjects.game.challenges.progressBar.classList.add('green');
    // progressBar.classList.add('hide');
  }

  challengeFailed() {
    this.challengeStatus$.next('failure');
    // gameObjects.game.challenges.progressBar.classList.add('green');
    // progressBar.classList.add('hide');
  }

  resetChallengeStatus() {
    this.challengeStatus$.next('inactive');
  }

  startChallenge() {
    this.challengeStatus$.next('active');
  }

  checkProgress(wordsAmount: number) {
    var progress =
      (this.gameService.game.value.wordsAmount * 100) /
      this.getActiveChallengeObjective();
    this.progress$.next(progress);
  }

  getActiveChallengeObjective() {
    const challenge = this.gameService.game.value.challenges.find(
      (x) => x.onChallenge
    );
    return challenge ? challenge.objective : 1;
  }
}
