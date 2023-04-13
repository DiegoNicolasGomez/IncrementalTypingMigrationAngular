import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  lettersPerSecondVisible = new BehaviorSubject<boolean>(false);
  challengeTimerVisible = new BehaviorSubject<boolean>(false);
  challengeTimerValue = new BehaviorSubject<string>('');
  private intervalId: any;

  constructor() {}

  getLettersPerSecondVisibility() {
    return this.lettersPerSecondVisible.asObservable();
  }

  setLettersPerSecondVisibility(visible: boolean) {
    this.lettersPerSecondVisible.next(visible);
  }

  getChallengeTimerVisibility() {
    return this.challengeTimerVisible.asObservable();
  }

  setChallengeTimerVisibility(visible: boolean) {
    this.challengeTimerVisible.next(visible);
  }

  getChallengeTimerValue() {
    return this.challengeTimerValue.asObservable();
  }

  setChallengeTimerValue(value: string) {
    this.challengeTimerValue.next(value);
  }

  startTimer(seconds: number) {
    this.setChallengeTimerVisibility(true);
    this.setChallengeTimerValue(seconds.toString());
    this.intervalId = setInterval(() => {
      seconds--;
      if (seconds >= 0) {
        this.setChallengeTimerValue(seconds.toString());
      } else {
        this.challengeFailed();
      }
    }, 1000);
  }

  challengeCompleted() {
    clearInterval(this.intervalId);
    this.setChallengeTimerValue('Success!');
  }

  challengeFailed() {
    clearInterval(this.intervalId);
    this.setChallengeTimerValue('Failed!');
  }
}
