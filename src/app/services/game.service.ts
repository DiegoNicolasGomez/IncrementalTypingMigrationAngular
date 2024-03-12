import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval, of } from 'rxjs';
import { Achievement } from '../classes/achievement';
import { Game } from '../classes/game';
import { Upgrade, eIdUpgrade } from '../classes/upgrade';
import { Generator } from '../classes/generator';
import { Card } from '../classes/card';
import { GameUtils } from '../utils/utils';
import { UpgradeService } from './upgrade.service';
import { challengeType } from '../classes/challenge';
import { masteryTier } from '../classes/mastery';
import { Pack, PackTier } from '../classes/pack';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game = new BehaviorSubject<Game>(new Game(1e80, 'Current'));
  challengeGame = new BehaviorSubject<Game>(new Game(0, 'Challenge'));
  activeGame = new BehaviorSubject<Game>(new Game(0, 'Active'));

  constructor() {
  }

  gameUtils = new GameUtils(this);

  getGame(): Observable<Game> {
    return this.game.asObservable();
  }

  loadGame(game: Game) {
    this.game.next(game);
  }

  loadChallengeGame() {
    this.game.next(this.gameUtils.deepCopy(this.challengeGame.value));
  }

  loadActiveGame() {
    this.game.next(this.gameUtils.deepCopy(this.activeGame.value));
  }

  saveToActiveGame() {
    this.activeGame.next(this.gameUtils.deepCopy(this.game.value));
  }

  //Game

  updatePoints(points: number) {
    const game = this.game.value;
    game.points += points;
    this.game.next(game);
  }

  updateAllTimePoints(points: number) {
    const game = this.game.value;
    game.allTimePoints += points;
    this.game.next(game);
  }

  updateWordsAmount() {
    const game = this.game.value;
    game.wordsAmount++;
    this.game.next(game);
  }

  updateMaxLength() {
    const game = this.game.value;
    game.maxLength++;
    this.game.next(game);
  }

  setBestWord(word: string) {
    const game = this.game.value;
    game.bestWord = word;
    this.game.next(game);
  }

  updateLetterCounter(add: number = 1) {
    const game = this.game.value;
    game.letterCounter += add;
    this.game.next(game);
  }

  setLetterCounterPerfection(value: number) {
    const game = this.game.value;
    game.letterCounterPerfection = value;
    this.game.next(game);
  }

  updateLetterCounterPerfection(add: number = 1) {
    const game = this.game.value;
    game.letterCounterPerfection += add;
    this.game.next(game);
  }

  updateWordCounterPerfection(add: number = 1) {
    const game = this.game.value;
    game.wordCounterPerfection += add;
    this.game.next(game);
  }

  setWordCounterPerfection(value: number) {
    const game = this.game.value;
    game.wordCounterPerfection = value;
    this.game.next(game);
  }

  updateBonusValues(values: number[]) {
    const game = this.game.value;
    game.bonusValues = values;
    this.game.next(game);
  }
  //Passive

  updatePassivePoints(points: number) {
    const game = this.game.value;
    game.passivePoints += points;
    this.game.next(game);
  }

  updatePassiveLength(number: number) {
    const game = this.game.value;
    game.passiveLength += number;
    this.game.next(game);
  }

  updatePassiveRate(passiveRatePercentage: number) {
    const game = this.game.value;
    game.passiveRate -= (game.passiveRate * passiveRatePercentage) / 100;
    this.game.next(game);
  }

  addGenerator(generator: Generator) {
    const game = this.game.value;
    game.passiveGenerators.push(generator);
    this.game.next(game);
  }

  buyGenerator(id: number) {
    const game = this.game.value;
    const generator = game.passiveGenerators.find((x) => x.id == id);
    generator!.amountBought++;
    generator!.amountGained++;
    generator!.cost =
      generator!.cost *
      (generator!.amountBought + 1) ** Math.log10(generator!.amountBought + 1);
    this.game.next(game);
  }

  removeGenerators(id: number, cost: number) {
    const game = this.game.value;
    const generator = game.passiveGenerators.find((x) => x.id == id)!;
    generator.amountGained -= cost;
    this.game.next(game);
  }

  addGainedGenerators(id: number) {
    const game = this.game.value;
    const generatorGained = game.passiveGenerators.find((x) => x.id == id - 1);
    const generatorGainer = game.passiveGenerators.find((x) => x.id == id);
    generatorGained!.amountGained += generatorGainer!.amountGained;
    this.game.next(game);
  }

  addGainedGeneratorsBoosted(id: number) {
    const game = this.game.value;
    const generatorGained = game.passiveGenerators.find((x) => x.id == id - 1);
    const generatorGainer = game.passiveGenerators.find((x) => x.id == id);
    generatorGained!.amountGained +=
      generatorGainer!.amountGained *
      game.passiveGenerators.reduce(
        (acc, val) => acc + val.amountBought * val.synergyValue,
        0
      );
    this.game.next(game);
  }

  //Prestige

  updatePrestigePoints(points: number) {
    const game = this.game.value;
    game.prestigePoints += points;
    this.game.next(game);
  }

  updatePrestige() {
    const game = this.game.value;
    game.prestigePoints = Math.round(Math.cbrt(game.allTimePoints));
    game.prestigeCount++;
    game.points = 0;
    game.allTimePoints = 0;
    game.upgrades = [];
    game.maxLength = 4;
    game.bestWord = '';
    const MUcosts = [50, 100, 500];
    game.multiUpgrades.forEach((multiUpgrade, index) => {
      multiUpgrade.amountBought = 0;
      multiUpgrade.cost = MUcosts[index];
    });
    game.wordsAmount = 0;
    game.packs.length = 0;
    game.passiveUpgrades = [];
    game.passiveLength = 4;
    game.passivePoints = 0;
    game.passiveRate = 1000;
    const generatorCosts = [5, 6, 9, 12, 15, 18, 21, 24, 27, 30];
    game.passiveGenerators.forEach((passiveGenerator, index) => {
      passiveGenerator.amountBought = 0;
      passiveGenerator.amountGained = 0;
      passiveGenerator.cost = generatorCosts[index];
    });
    game.cards = [];
    game.cardCost = 0;
    this.game.next(game);
  }

  //Achievement

  addAchievement(achievement: Achievement) {
    const game = this.game.value;
    game.achievements.push(achievement);
    this.game.next(game);
  }

  updateAchievements() {
    const game = this.challengeGame.value;
    game.achievements = this.gameUtils.deepCopy(this.game.value.achievements);
    this.challengeGame.next(game);
  }

  //Upgrades

  addUpgrade(upgrade: Upgrade) {
    const game = this.game.value;
    game.upgrades.push(upgrade);
    this.game.next(game);
  }

  addPassiveUpgrade(upgrade: Upgrade) {
    const game = this.game.value;
    game.passiveUpgrades.push(upgrade);
    this.game.next(game);
  }

  addPrestigeUpgrade(upgrade: Upgrade) {
    const game = this.game.value;
    game.prestigeUpgrades.push(upgrade);
    this.game.next(game);
  }

  addMultiUpgrade(upgrade: Upgrade) {
    const game = this.game.value;
    game.multiUpgrades.push(upgrade);
    this.game.next(game);
  }

  buyMultiUpgrade(id: eIdUpgrade) {
    const game = this.game.value;
    const upgrade = game.multiUpgrades.find((x) => x.id == id);
    upgrade!.amountBought++;
    this.game.next(game);
  }

  setMultiUpgradeCost(id: eIdUpgrade, bonus: number) {
    const game = this.game.value;
    const upgrade = game.multiUpgrades.find((x) => x.id == id);
    upgrade!.cost *=
      ((upgrade!.amountBought + 1) / bonus) **
      Math.log10((upgrade!.amountBought + 1) / bonus);
    this.game.next(game);
  }

  updateTaxEvasion() {
    const game = this.game.value;
    const brokenCards = game.cards.filter((x) => x.type === 'Broken' && !x.description.includes('Halved'));
    brokenCards.forEach((card) => {

      let savedCard = game.cards.find((x) => x === card)!;
      savedCard.bonusAmount = Math.floor(savedCard.bonusAmount / 2);
      switch (savedCard.bonusType) {
        case 'PointsPercentage':
          savedCard.description = `${savedCard.bonusAmount}% Points Per Word (Halved)`;
          break;
        case 'PassivePointsPercentage':
          savedCard.description = `${savedCard.bonusAmount}% Passive Points Per Word (Halved)`;
          break;
        case 'PointsAmount':
          savedCard.description = `${savedCard.bonusAmount} Points Per Word (Halved)`;
          break;
        case 'PassivePointsAmount':
          savedCard.description = `${savedCard.bonusAmount} Passive Points Per Word (Halved)`;
          break;
        case 'PassivePointsSpeed':
          savedCard.description = `Generate Passive Words ${savedCard.bonusAmount}% Faster (Halved)`;
          break;
        case 'PassivePointsLength':
          savedCard.description = `${savedCard.bonusAmount} Passive Word Length (Halved)`;
          break;
        default:
          break;
      }
    });
    this.game.next(game);
  }

  //Cards

  updateRollsAmount(amount: number) {
    const game = this.game.value;
    game.rollsAmount += amount;
    this.game.next(game);
  }

  updateRollsAmountActive(amount: number) {
    const game = this.activeGame.value;
    game.rollsAmount += amount;
    this.activeGame.next(game);
  }

  updateCardsCost() {
    const game = this.game.value;
    game.cardCost =
      100000 * 2 ** game.packs.filter((pack) => pack.type === 'Starter').length;
    this.game.next(game);
  }

  addCard(card: Card) {
    const game = this.game.value;
    game.cards.push(card);
    this.game.next(game);
    this.updateTaxEvasion();
  }

  addPack(pack: Pack) {
    const game = this.game.value;
    game.packs.push(pack);
    this.game.next(game);
  }

  addCardsAmount() {
    const game = this.game.value;
    game.cardsAmount++;
    this.game.next(game);
  }

  resetCards() {
    const game = this.game.value;
    game.cards = [];
    game.cardsAmount = 0;
    this.game.next(game);
  }

  //Challenges

  updateChallengeState(state: boolean, challengeType: challengeType) {
    const game = this.game.value;
    game.challenges.find((x) => x.type == challengeType)!.onChallenge = state;
    this.game.next(game);
  }

  resetLetterCounter() {
    const game = this.game.value;
    game.letterCounter = 0;
    this.game.next(game);
  }

  completeChallenge(challengeType: challengeType) {
    const game = this.activeGame.value;
    game.challenges.find((x) => x.type == challengeType)!.amount++;
    game.challengesAmount++;
    this.activeGame.next(game);
  }

  updateChallenges() {
    const game = this.challengeGame.value;
    game.challenges = this.gameUtils.deepCopy(this.game.value.challenges);
    this.challengeGame.next(game);
  }

  //Modules

  updateMergeCardCost(amount: number) {
    const game = this.game.value;
    game.mergeCardsCost += amount;
    this.game.next(game);
  }

  updateMergeCardAmount() {
    const game = this.game.value;
    game.mergeAmount--;
    this.game.next(game);
  }

  addLettersValue(index: number) {
    const game = this.game.value;
    game.lettersBonus[index]++;
    this.game.next(game);
  }

  unlockModule(index: number) {
    const game = this.game.value;
    game.modulesUnlocked[index] = true;
    this.game.next(game);
  }

  addSynergyValue(generatorNumber: number) {
    const game = this.game.value;
    const generator = game.passiveGenerators.find(
      (x) => x.id === generatorNumber
    )!;
    generator.synergyValue++;
    generator.synergyCost = generator.synergyCost * 2 ** generator.synergyValue;
    this.game.next(game);
  }

  //Mastery

  updateMasteryValue(masteryTier: masteryTier) {
    const game = this.game.value;
    const mastery = game.masteryLevels.find((x) => x.tier === masteryTier)!;
    mastery.amount++;
    if (mastery.amount === mastery.amountToLevel) {
      mastery.amount = 0;
      mastery.amountToLevel *= 2;
      mastery.value *= 2;
      mastery.level++;
    }
  }
}
