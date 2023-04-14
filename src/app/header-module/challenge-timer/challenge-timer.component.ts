import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-challenge-timer',
  templateUrl: './challenge-timer.component.html',
  styleUrls: ['./challenge-timer.component.scss'],
  animations: [
    trigger('pulseAnimation', [
      state('inactive', style({})),
      state('active', style({})),
      transition('inactive => active', animate('0.5s', keyframes([
        style({ transform: 'scale(1)', offset: 0 }),
        style({ transform: 'scale(1.2)', offset: 0.5 }),
        style({ transform: 'scale(1)', offset: 1 })
      ])))
    ])
  ]
})
export class ChallengeTimerComponent {

  challengeTimerVisibility: boolean = false;
  challengeTimerValue: string = "";
  timerAnimation = 'inactive';

  constructor(private layoutService: LayoutService) { 
    this.layoutService.getChallengeTimerVisibility().subscribe((visible) => {
      this.challengeTimerVisibility = visible;
    });
    this.layoutService.getChallengeTimerValue().subscribe((value) => {
      this.challengeTimerValue = value;
      const animationValues = ['Failed!', 'Success!', ...Array.from({ length: 11 }, (_, i) => i.toString())];
      this.timerAnimation = animationValues.includes(this.challengeTimerValue) ? 'active' : 'inactive';
    });
  }

  isTimerVisible() { 
    return this.challengeTimerVisibility;
  }
}
