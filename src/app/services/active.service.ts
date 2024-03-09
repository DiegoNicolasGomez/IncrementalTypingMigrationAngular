import { Injectable } from '@angular/core';
import { eIdUpgrade } from '../classes/upgrade';
import { GameUtils } from '../utils/utils';
import { GameService } from './game.service';
import { WordsService } from './words.service';
import { MarketService } from './market.service';

@Injectable({
  providedIn: 'root',
})
export class ActiveService {
  private critical: boolean = false;
  constructor(private gameService: GameService, private marketService: MarketService) {}

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

    totalPoints += this.gameService.game.value.cards.filter(x => x.bonusType === 'PointsAmount').reduce((total, card) => total + card.bonusAmount, 0);

    if (this.gameUtils.IsPurchasedUpgrade('WordsValueBitMoreMore')) {
      totalPoints += 10;
      bonus += ' + 10 (Upgrade 7)';
    }
    if (this.gameUtils.IsPurchasedUpgrade('IntermediateBasicsTwo')) {
      totalPoints += 25;
      bonus += ' + 25 (Upgrade 18)';
    }

    if(totalPoints < 1) totalPoints = 1;

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

    totalPoints *= 1 + (this.gameService.game.value.cards.filter((x) => x.bonusType === 'PointsPercentage').reduce((total, card) => total + card.bonusAmount, 0) / 100)

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

      if(wordCounter + 1 < 100) {
        totalPoints *= Math.sqrt(wordCounter + 1);
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
    let marketBonus = [1, 1, 1, 1, 1, 1, 1, 1]
    if(this.gameUtils.IsPurchasedUpgrade('UnlockMarket')) {
      marketBonus = this.marketService.letterBonus.value;
    }
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
        if(marketBonus[0] <= -100) return;
        if(marketBonus[0] < 0) {
          points += lettersBonus[0] * Math.abs(marketBonus[0]) / 100;
        } else {
          points += lettersBonus[0] * (1 + Math.abs(marketBonus[0]) / 100);
        }
      } else if (element === 'd' || element === 'g') {
        if(marketBonus[1] <= -100) return;
        if(marketBonus[1] < 0) {
          points += lettersBonus[1] * Math.abs(marketBonus[1]) / 100;
        } else {
          points += lettersBonus[1] * (1 + Math.abs(marketBonus[1]) / 100);
        }
      } else if (
        element === 'b' ||
        element === 'c' ||
        element === 'm' ||
        element === 'p'
      ) {
        if(marketBonus[2] <= -100) return;
        if(marketBonus[2] < 0) {
          points += lettersBonus[2] * Math.abs(marketBonus[2]) / 100;
        } else {
          points += lettersBonus[2] * (1 + Math.abs(marketBonus[2]) / 100);
        }
      } else if (
        element === 'f' ||
        element === 'h' ||
        element === 'v' ||
        element === 'w' ||
        element === 'y'
      ) {
        if(marketBonus[3] <= -100) return;
        if(marketBonus[3] < 0) {
          points += lettersBonus[3] * Math.abs(marketBonus[3]) / 100;
        } else {
          points += lettersBonus[3] * (1 + Math.abs(marketBonus[3]) / 100);
        }
      } else if (element === 'k') {
        if(marketBonus[4] <= -100) return;
        if(marketBonus[4] < 0) {
          points += lettersBonus[4] * Math.abs(marketBonus[4]) / 100;
        } else {
          points += lettersBonus[4] * (1 + Math.abs(marketBonus[4]) / 100);
        }
      } else if (element === 'j' || element === 'x') {
        if(marketBonus[5] <= -100) return;
        if(marketBonus[5] < 0) {
          points += lettersBonus[5] * Math.abs(marketBonus[5]) / 100;
        } else {
          points += lettersBonus[5] * (1 + Math.abs(marketBonus[5]) / 100);
        }
      } else if (element === 'q' || element === 'z') {
        if(marketBonus[6] <= -100) return;
        if(marketBonus[6] < 0) {
          points += lettersBonus[6] * Math.abs(marketBonus[6]) / 100;
        } else {
          points += lettersBonus[6] * (1 + Math.abs(marketBonus[6]) / 100);
        }
      } else {
        if(marketBonus[7] <= -100) return;
        if(marketBonus[7] < 0) {
          points += lettersBonus[7] * Math.abs(marketBonus[7]) / 100;
        } else {
          points += lettersBonus[7] * (1 + Math.abs(marketBonus[7]) / 100);
        }
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
