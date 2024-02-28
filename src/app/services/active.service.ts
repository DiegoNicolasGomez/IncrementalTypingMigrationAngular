import { Injectable } from '@angular/core';
import { eIdUpgrade } from '../classes/upgrade';
import { GameUtils } from '../utils/utils';
import { GameService } from './game.service';
import { WordsService } from './words.service';

@Injectable({
  providedIn: 'root',
})
export class ActiveService {
  private critical: boolean = false;
  constructor(private gameService: GameService) {}

  gameUtils = new GameUtils(this.gameService);

  CalculatePoints(wordLength: number): [number, string] {
    var bonus = '';
    var totalPoints: number = 0;
    totalPoints += wordLength;
    const multiUpgrade1 = this.gameService.game.value.multiUpgrades.find(
      (x) => x.id === 'MultiUpgradePoints'
    )!;
    if (multiUpgrade1.amountBought > 0) {
      totalPoints += multiUpgrade1.amountBought;
      bonus += ' + [MultiUpgrade1]';
    }
    if (this.gameUtils.IsPurchasedUpgrade('WordsValueBitMore')) {
      totalPoints += 4;
      bonus += ' + 4 (Upgrade 2)';
    }
    if (this.gameUtils.IsPurchasedUpgrade('LastBasic')) {
      totalPoints += 20;
      bonus += ' + 20 (Upgrade 12)';
    }

    const cardsPointsMap: { [key: number]: number } = {
      [2]: 1,
      [6]: 3,
      [13]: 6,
      [19]: 10,
    };

    var cardsPointsBonus = this.gameService.game.value.cards.map(
      (x) => cardsPointsMap[x.id] || 0
    );
    totalPoints += cardsPointsBonus.reduce((a, b) => a + b, 0);

    if (cardsPointsBonus.some((x) => x > 0)) {
      bonus += ' + [Cards+Points]';
    }

    if (this.gameUtils.IsPurchasedUpgrade('WordsValueBitMoreMore')) {
      totalPoints += 10;
      bonus += ' + 10 (Upgrade 7)';
    }
    if (this.gameUtils.IsPurchasedUpgrade('IntermediateBasicsTwo')) {
      totalPoints += 25;
      bonus += ' + 25 (Upgrade 18)';
    }
    if (this.gameUtils.IsPurchasedUpgrade('SecondUpgradePoints')) {
      totalPoints *= 1.5;
      bonus += ' x 1.5 (Upgrade 5)';
    }

    if (this.gameUtils.IsPurchasedUpgrade('FirstUpgradePoints')) {
      totalPoints *= 1.3;
      bonus += ' x 1.3 (Upgrade 1)';
    }
    if (this.gameUtils.IsPurchasedUpgrade('ThirdUpgradePoints')) {
      totalPoints *= 2;
      bonus += ' x 2 (Upgrade 10)';
    }
    if (this.gameUtils.IsPurchasedUpgrade('IntermediateBasicsOne')) {
      totalPoints *= 3;
      bonus += ' x 3 (Upgrade 15)';
    }
    if (this.gameUtils.IsPurchasedUpgrade('WordLengthBonus')) {
      totalPoints *= wordLength;
      bonus += ' x[WordLength] (Upgrade 16)';
    }
    if (
      this.gameUtils.IsPurchasedUpgrade('EveryGoalReward') &&
      this.gameService.game.value.achievements.length > 0
    ) {
      totalPoints *= Math.sqrt(this.gameService.game.value.achievements.length);
      bonus += ' x sqrt([Achievements] (Upgrade 6))';
    }
    if (
      this.gameUtils.IsPurchasedUpgrade('WordPassiveEnhancer') &&
      this.gameService.game.value.passivePoints > 0
    ) {
      totalPoints *= Math.log10(this.gameService.game.value.passivePoints);
      bonus += ' x log10([PassivePoints])';
    }
    if (this.gameUtils.IsPurchasedUpgrade('CardsAmountBonus')) {
      totalPoints *= Math.log(this.gameUtils.getCardBonus());
      bonus += ' x ln([CardsBonus] (Upgrade 19 & 20))';
    }

    const cardsPercentageMap: { [key: number]: number } = {
      [1]: 0.05,
      [5]: 0.25,
      [11]: 0.5,
      [18]: 1,
    };

    var cardsPercentageBonus = this.gameService.game.value.cards.map(
      (x) => cardsPercentageMap[x.id] || 0
    );
    totalPoints *= 1 + cardsPointsBonus.reduce((a, b) => a + b, 0);

    if (cardsPercentageBonus.some((x) => x > 0)) {
      bonus += ' x 1 + [CardsPercentage]';
    }

    const multiUpgrade2 = this.gameService.game.value.multiUpgrades.find(
      (x) => x.id == 'MultiUpgradePointsMult'
    )!;

    if (multiUpgrade2.amountBought > 0) {
      totalPoints *= 1 + multiUpgrade2.amountBought * 0.25;
      bonus += ' x 0.25[MultiUpgrade 2]';
    }
    if (this.gameUtils.IsPurchasedPrestigeUpgrade('PrestigeFreeMultiplier')) {
      totalPoints *= 2;
      bonus += 'x 2 (Prestige Upgrade 1)';
    }

    if (this.gameUtils.IsPurchasedUpgrade('PrecisionKey')) {
      const wordCounter = this.gameService.game.value.wordCounterPerfection;

      if(wordCounter < 100) {
        totalPoints *= Math.sqrt(this.gameService.game.value.wordCounterPerfection);
        bonus += 'xMath.sqrt(perfectWords)'
      }
      else {
        totalPoints *= 10;
        bonus += 'x10 (perfectWords > 100)'
      }
    }

    if (this.critical === true) {
      totalPoints *= 5;
      bonus += 'x5 (CRITICAL)'
    }

    return [totalPoints, bonus];
  }

  GetPointsLetters(word: string) {
    const lettersBonus = this.gameService.game.value.lettersBonus;
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
        points += lettersBonus[0];
      } else if (element === 'd' || element === 'g') {
        points += lettersBonus[1];
      } else if (
        element === 'b' ||
        element === 'c' ||
        element === 'm' ||
        element === 'p'
      ) {
        points += lettersBonus[2];
      } else if (
        element === 'f' ||
        element === 'h' ||
        element === 'v' ||
        element === 'w' ||
        element === 'y'
      ) {
        points += lettersBonus[3];
      } else if (element === 'k') {
        points += lettersBonus[4];
      } else if (element === 'j' || element === 'x') {
        points += lettersBonus[5];
      } else if (element === 'q' || element === 'z') {
        points += lettersBonus[6];
      } else {
        points += lettersBonus[7];
      }
    });
    return points;
  }

  getRepeatedLetters(word: string): number {
    const repeatedLetters = new Set<string>();

    for (let i = 0; i < word.length; i++) {
      const char = word[i].toLowerCase();
      if (word.lastIndexOf(char) > i) {
        repeatedLetters.add(char);
      }
    }

    return repeatedLetters.size;
  }

  getDifferentLetters(word: string): number {
    const differentLetters = new Set<string>();

    for (let i = 0; i < word.length; i++) {
      const char = word[i].toLowerCase();
      if (!differentLetters.has(char)) {
        differentLetters.add(char);
      }
    }

    return differentLetters.size;
  }

  buyLetterTier(index: number) {
    const letterBonus = this.gameService.game.value.lettersBonus[index];
    if (letterBonus <= this.gameService.game.value.prestigePoints) {
      this.gameService.updatePrestigePoints(-letterBonus);
      this.gameService.addLettersValue(index);
    }
  }
}
