import { Injectable } from '@angular/core';
import { GameUtils } from '../utils/utils';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class ActiveService {

  constructor(private gameService: GameService) { }

  gameUtils = new GameUtils(this.gameService);

  CalculatePoints(wordLength: number) {
    var totalPoints: number = 0;
    totalPoints += wordLength;
    const multiUpgrade1 = this.gameService.game.value.multiUpgrades.find((x) => x.id == 1);
    totalPoints += multiUpgrade1 ? multiUpgrade1.amountBought : 0;
    if (this.gameUtils.IsPurchasedUpgrade(2)) totalPoints += 4;
    if (this.gameUtils.IsPurchasedUpgrade(12)) totalPoints += 20;
    if (this.gameUtils.HasCard(2))
      totalPoints +=
        1 *
        this.gameService.game.value.cards.filter((x) => x.name === '+1 Points (C)').length;
    if (this.gameUtils.HasCard(6))
      totalPoints +=
        1 *
        this.gameService.game.value.cards.filter((x) => x.name === '+3 Points (UC)')
          .length;
    if (this.gameUtils.HasCard(13))
      totalPoints +=
        1 *
        this.gameService.game.value.cards.filter((x) => x.name === '+6 Points (E)').length;
    if (this.gameUtils.HasCard(19))
      totalPoints +=
        1 *
        this.gameService.game.value.cards.filter((x) => x.name === '+10 Points (L)')
          .length;
    if (this.gameUtils.IsPurchasedUpgrade(8)) totalPoints += 10;
    if (this.gameUtils.IsPurchasedUpgrade(1)) totalPoints *= 1.5;
    if (this.gameUtils.IsPurchasedUpgrade(5)) totalPoints *= 1.3;
    if (this.gameUtils.IsPurchasedUpgrade(10)) totalPoints *= 2;
    if (this.gameUtils.IsPurchasedUpgrade(6) && this.gameService.game.value.achievements.length > 0)
      totalPoints *= Math.sqrt(this.gameService.game.value.achievements.length);
    if (this.gameUtils.IsPurchasedUpgrade(4) && this.gameService.game.value.passivePoints > 0)
      totalPoints *= Math.log10(this.gameService.game.value.passivePoints);
    if (this.gameUtils.HasCard(1))
      totalPoints *=
        1 +
        0.05 *
          this.gameService.game.value.cards.filter((x) => x.name === 'Fast+ Progress (C)')
            .length;
    if (this.gameUtils.HasCard(5))
      totalPoints *=
        1 +
        0.25 *
          this.gameService.game.value.cards.filter(
            (x) => x.name === 'Faster Progress (UC)'
          ).length;
    if (this.gameUtils.HasCard(11))
      totalPoints *=
        1 +
        0.5 *
          this.gameService.game.value.cards.filter(
            (x) => x.name === 'Fasterer Progress (E)'
          ).length;
    if (this.gameUtils.HasCard(18))
      totalPoints *=
        1 +
        1 *
          this.gameService.game.value.cards.filter(
            (x) => x.name === 'Fastest Progress (L)'
          ).length;
    const multiUpgrade2 = this.gameService.game.value.multiUpgrades.find((x) => x.id == 2);
    totalPoints *= !multiUpgrade2 ? 1 : 1 + multiUpgrade2.amountBought * 0.25;
    if (this.gameUtils.IsPurchasedPrestigeUpgrade(1)) totalPoints *= 2;
    return totalPoints;
  }
  
  GetPointsLetters(word: string) {
    var letters = word.toLowerCase().split('');
    var points = 0;
    letters.forEach((element) => {
      if (
        element === 'a' ||
        element === 'e' ||
        element === 'i' ||
        element === 'o' ||
        element === 'u' ||
        element === 'l' ||
        element === 'n' ||
        element === 's' ||
        element === 't' ||
        element === 'r'
      ) {
        points++;
      } else if (element === 'd' || element === 'g') {
        points += 2;
      } else if (
        element === 'b' ||
        element === 'c' ||
        element === 'm' ||
        element === 'p'
      ) {
        points += 3;
      } else if (
        element === 'f' ||
        element === 'h' ||
        element === 'v' ||
        element === 'w' ||
        element === 'y'
      ) {
        points += 4;
      } else if (element === 'k') {
        points += 5;
      } else if (element === 'j' || element === 'x') {
        points += 8;
      } else if (element === 'q' || element === 'z') {
        points += 10;
      } else {
        points += 20;
      }
    });
    return points;
  }
}
