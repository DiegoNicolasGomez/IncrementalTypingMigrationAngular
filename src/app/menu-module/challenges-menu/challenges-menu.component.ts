import { Component } from '@angular/core';
import { Challenge } from 'src/app/classes/challenge';
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

  startChallenge(challengeNumber: number) {
   this.challengeService.startChallenge(challengeNumber);
  }

  exitAnyChallenge() {
    const challenge = this.gameService.game.value.challenges.find(
      (x) => x.onChallenge
    );
    if (challenge) this.exitChallenge(challenge.id);
  }

  exitChallenge(challengeNumber: number) {
    this.challengeService.exitChallenge(challengeNumber);
  }
}

// const progressBar = document.querySelector("#challengeProgress");
// const timer = document.querySelector("#challengeTimer");

// function StartTimer(seconds: number, challengeNumber: number) {
//   if (!timer || !(timer instanceof HTMLElement)) return;
//   if (!progressBar) return;
//   timer.textContent = seconds.toString();
//   timer.style.color = "white";
//   timer.classList.remove("success");
//   timer.classList.add("show");
//   var intervalId = setInterval(function minusSeconds() {
//     seconds--;
//     timer.textContent = seconds.toString();
//     if (seconds <= 10) {
//       timer.style.color = "red";
//       timer.classList.add("expand");
//     }
//     if (
//       gameObjects.game.wordsAmount >=
//       gameObjects.game.challenges.find(x => x.id == challengeNumber)!.objective
//     ) {
//       timer.textContent = "Success!";
//       timer.classList.add("success");
//       gameObjects.activeGame.challenges.find(x => x.id == challengeNumber)!.amount++;
//       gameObjects.game.challengesAmount++;
//       if(challengeNumber == 1) gameObjects.game.rollsAmount += gameObjects.game.challenges.find(x => x.id == challengeNumber)!.amount;
//       progressBar.classList.add("green");
//       progressBar.classList.add("hide");
//       clearInterval(intervalId);
//       ExitChallenge(challengeNumber);
//       return;
//     }
//     if (seconds <= 0 || !gameObjects.game.isInChallenge) {
//       timer.textContent = "Failed!";
//       timer.style.color = "red";
//       progressBar.classList.add("red");
//       progressBar.classList.add("hide");
//       clearInterval(intervalId);
//       ExitChallenge(challengeNumber);
//       return;
//     }
//   }, 1000);
// }

// if (timer) {
//   timer.addEventListener("transitionend", function (e: Event) {
//     if ((e as TransitionEvent).propertyName === "transform") {
//       timer.classList.remove("expand");
//     }
//   });
// }

// if (progressBar && progressBar instanceof HTMLElement) {
//   progressBar.addEventListener("transitionend", function (e) {
//     if ((e as TransitionEvent).propertyName === "width") {
//       progressBar.classList.remove("red");
//       progressBar.classList.remove("green");
//       progressBar.classList.remove("hide");
//     }
//     if (progressBar.style.width == "100%") {
//       progressBar.style.width = "0%";
//     }
//   });
// }

// function LoadAchievements() {
//   gameObjects.challengeGame.achievements = utilModule.Copy(
//     gameObjects.game.achievements
//   );
// }

// function LoadChallenges() {
//   gameObjects.challengeGame.challenges = utilModule.Copy(
//     gameObjects.game.challenges
//   );
// }
