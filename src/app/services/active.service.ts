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

  constructor(
    private gameService: GameService,
    private marketService: MarketService
  ) {}

  gameUtils = new GameUtils(this.gameService);

  CalculatePoints(pointsLetters: number): [number, string, number[], number[]] {
    var bonus = '';
    var totalPoints: number = 0;
    totalPoints += pointsLetters;
    let bonusesValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0].fill(1);
    let bonusesSumsValues = [0, 0, 0];
    const multiUpgrade1 = this.gameService.game.value.multiUpgrades.find(
      (x) => x.id === 'MultiUpgradePoints'
    )!;
    if (multiUpgrade1.amountBought > 0) {
      totalPoints += multiUpgrade1.amountBought;
      bonus += ' + [MultiUpgrade1]';
      bonusesValues[0] += multiUpgrade1.amountBought;
      bonusesSumsValues[0] += multiUpgrade1.amountBought;
    }
    if (this.gameUtils.IsPurchasedUpgrade('WordsValueBitMore')) {
      totalPoints += 4;
      bonus += ' + 4 (Upgrade 2)';
      bonusesValues[0] += 4;
      bonusesSumsValues[1] += 4;
    }
    if (this.gameUtils.IsPurchasedUpgrade('LastBasic')) {
      totalPoints += 20;
      bonus += ' + 20 (Upgrade 12)';
      bonusesValues[0] += 20;
      bonusesSumsValues[1] += 20;
    }

    let pointsAmountCards = this.gameService.game.value.cards
      .filter((x) => x.bonusType === 'PointsAmount')
      .reduce((total, card) => total + card.bonusAmount, 0);
    totalPoints += pointsAmountCards;
    bonusesValues[0] += pointsAmountCards;
    bonusesSumsValues[2] += pointsAmountCards;

    if (this.gameUtils.IsPurchasedUpgrade('WordsValueBitMoreMore')) {
      totalPoints += 10;
      bonus += ' + 10 (Upgrade 7)';
      bonusesValues[0] += 10;
      bonusesSumsValues[1] += 10;
    }
    if (this.gameUtils.IsPurchasedUpgrade('IntermediateBasicsTwo')) {
      totalPoints += 25;
      bonus += ' + 25 (Upgrade 18)';
      bonusesValues[0] += 25;
      bonusesSumsValues[1] += 25;
    }

    if (totalPoints < 1) totalPoints = 1;

    if (this.gameUtils.IsPurchasedUpgrade('FirstUpgradePoints')) {
      totalPoints *= 1.3;
      bonus += ' x 1.3 (Upgrade 1)';
      bonusesValues[1] *= 1.3;
    }
    if (this.gameUtils.IsPurchasedUpgrade('SecondUpgradePoints')) {
      totalPoints *= 1.5;
      bonus += ' x 1.5 (Upgrade 5)';
      bonusesValues[1] *= 1.5;
    }
    if (this.gameUtils.IsPurchasedUpgrade('IntermediateBasicsOne')) {
      totalPoints *= 3;
      bonus += ' x 3 (Upgrade 15)';
      bonusesValues[1] *= 3;
    }
    if (this.gameUtils.IsPurchasedUpgrade('WordLengthBonus')) {
      totalPoints *= pointsLetters;
      bonus += ' x[WordLength] (Upgrade 16)';
      bonusesValues[2] *= pointsLetters;
    }
    if (
      this.gameUtils.IsPurchasedUpgrade('EveryGoalReward') &&
      this.gameService.game.value.achievements.length > 0
    ) {
      totalPoints *= Math.sqrt(this.gameService.game.value.achievements.length);
      bonus += ' x sqrt([Achievements] (Upgrade 6))';
      bonusesValues[3] *= Math.sqrt(
        this.gameService.game.value.achievements.length
      );
    }
    if (
      this.gameUtils.IsPurchasedUpgrade('WordPassiveEnhancer') &&
      this.gameService.game.value.passivePoints > 0
    ) {
      totalPoints *= Math.log10(this.gameService.game.value.passivePoints);
      bonus += ' x log10([PassivePoints])';
      bonusesValues[4] *= Math.log10(this.gameService.game.value.passivePoints);
    }
    if (this.gameUtils.IsPurchasedUpgrade('CardsAmountBonus')) {
      totalPoints *= Math.log(this.gameUtils.getCardBonus());
      bonus += ' x ln([CardsBonus] (Upgrade 19 & 20))';
      bonusesValues[5] *= Math.log(this.gameUtils.getCardBonus());
    }

    let pointsPercentageBonus =
      1 +
      this.gameService.game.value.cards
        .filter((x) => x.bonusType === 'PointsPercentage')
        .reduce((total, card) => total + card.bonusAmount, 0) /
        100;
    totalPoints *= pointsPercentageBonus;

    bonusesValues[6] *= pointsPercentageBonus;

    const multiUpgrade2 = this.gameService.game.value.multiUpgrades.find(
      (x) => x.id == 'MultiUpgradePointsMult'
    )!;

    if (multiUpgrade2.amountBought > 0) {
      totalPoints *= multiUpgrade2.amountBought * 1.25;
      bonus += ' x [MultiUpgrade 2] * 1.25';
      bonusesValues[7] *= multiUpgrade2.amountBought * 1.25;
    }
    if (this.gameUtils.IsPurchasedPrestigeUpgrade('PrestigeFreeMultiplier')) {
      totalPoints *= 2;
      bonus += 'x 2 (Prestige Upgrade 1)';
      bonusesValues[1] *= 2;
    }

    if (this.gameUtils.IsPurchasedUpgrade('PrecisionKey')) {
      const wordCounter = this.gameService.game.value.wordCounterPerfection;

      if (wordCounter + 1 < 100) {
        totalPoints *= Math.sqrt(wordCounter + 1);
        bonus += 'xMath.sqrt(perfectWords)';
        bonusesValues[8] *= Math.sqrt(wordCounter + 1);
      } else {
        totalPoints *= 10;
        bonus += 'x10 (perfectWords > 100)';
        bonusesValues[8] *= 10;
      }
    }
    return [totalPoints, bonus, bonusesValues, bonusesSumsValues];
  }

  GetPointsLetters(word: string, passive: boolean = false) {
    const lettersBonus = this.gameService.game.value.lettersBonus;
    var letters = word.toLowerCase().split('');
    var points = 0;
    let marketBonus = [1, 1, 1, 1, 1, 1, 1, 1];
    if (this.gameUtils.IsPurchasedUpgrade('UnlockMarket')) {
      marketBonus = this.marketService.letterBonus.value;
    }
    if (passive && !this.gameUtils.IsPurchasedPassiveUpgrade('PassiveMarket')) {
      marketBonus = [1, 1, 1, 1, 1, 1, 1, 1];
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
        if (marketBonus[0] <= -100) return;
        if (marketBonus[0] < 0) {
          points += (lettersBonus[0] * Math.abs(marketBonus[0])) / 100;
        } else {
          points += lettersBonus[0] * (1 + Math.abs(marketBonus[0]) / 100);
        }
      } else if (element === 'd' || element === 'g') {
        if (marketBonus[1] <= -100) return;
        if (marketBonus[1] < 0) {
          points += (lettersBonus[1] * Math.abs(marketBonus[1])) / 100;
        } else {
          points += lettersBonus[1] * (1 + Math.abs(marketBonus[1]) / 100);
        }
      } else if (
        element === 'b' ||
        element === 'c' ||
        element === 'm' ||
        element === 'p'
      ) {
        if (marketBonus[2] <= -100) return;
        if (marketBonus[2] < 0) {
          points += (lettersBonus[2] * Math.abs(marketBonus[2])) / 100;
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
        if (marketBonus[3] <= -100) return;
        if (marketBonus[3] < 0) {
          points += (lettersBonus[3] * Math.abs(marketBonus[3])) / 100;
        } else {
          points += lettersBonus[3] * (1 + Math.abs(marketBonus[3]) / 100);
        }
      } else if (element === 'k') {
        if (marketBonus[4] <= -100) return;
        if (marketBonus[4] < 0) {
          points += (lettersBonus[4] * Math.abs(marketBonus[4])) / 100;
        } else {
          points += lettersBonus[4] * (1 + Math.abs(marketBonus[4]) / 100);
        }
      } else if (element === 'j' || element === 'x') {
        if (marketBonus[5] <= -100) return;
        if (marketBonus[5] < 0) {
          points += (lettersBonus[5] * Math.abs(marketBonus[5])) / 100;
        } else {
          points += lettersBonus[5] * (1 + Math.abs(marketBonus[5]) / 100);
        }
      } else if (element === 'q' || element === 'z') {
        if (marketBonus[6] <= -100) return;
        if (marketBonus[6] < 0) {
          points += (lettersBonus[6] * Math.abs(marketBonus[6])) / 100;
        } else {
          points += lettersBonus[6] * (1 + Math.abs(marketBonus[6]) / 100);
        }
      } else {
        if (marketBonus[7] <= -100) return;
        if (marketBonus[7] < 0) {
          points += (lettersBonus[7] * Math.abs(marketBonus[7])) / 100;
        } else {
          points += lettersBonus[7] * (1 + Math.abs(marketBonus[7]) / 100);
        }
      }
    });

    if(this.gameUtils.IsPurchasedUpgrade("UnlockMastery")) {
      this.calculateMasteryPoints(letters);
    }

    return points;
  }

  calculateMasteryPoints(letters: string[]) {
    letters.forEach(letter => {
        switch (letter) {
          case 'a' || 'e' || 'i' || 'o' || 'u' || 'l' || 'n' || 's' || 't' || 'r':
              var amount = 1;
              this.gameService.updateMasteryValue('Alpha', amount)
            break;
        
          default:
            break;
        }
    });
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
