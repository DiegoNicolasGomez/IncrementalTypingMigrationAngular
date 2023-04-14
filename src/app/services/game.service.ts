import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Achievement } from '../classes/achievement';
import { Game } from '../classes/game';
import { Upgrade } from '../classes/upgrade';
import { Generator } from '../classes/generator';
import { Card } from '../classes/card';
import { GameUtils } from '../utils/utils';
import { UpgradeService } from './upgrade.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game = new BehaviorSubject<Game>(new Game(1000000000));
  challengeGame = new BehaviorSubject<Game>(new Game(0));
  activeGame = new BehaviorSubject<Game>(new Game(0));

  constructor() {}

  gameUtils = new GameUtils(this);

  getGame(): Observable<Game> {
    return this.game.asObservable();
  }

  loadGame(game: Game) {
    this.game.next(game);
  }

  loadChallengeGame() {
    this.game.next(this.challengeGame.value);
  }

  loadActiveGame() {
    this.game.next(this.activeGame.value);
  }

  saveToActiveGame() {
    this.activeGame.next(this.game.value);
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
    game.bestWord += word;
    this.game.next(game);
  }

  updateLetterCounter() {
    const game = this.game.value;
    game.letterCounter++;
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
      game.passiveGenerators.reduce((acc, val) => acc + val.amountBought, 0);
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
    const costs = [50, 100, 500];
    game.multiUpgrades.forEach((multiUpgrade, index) => {
      multiUpgrade.amountBought = 0;
      multiUpgrade.cost = costs[index];
    });
    game.wordsAmount = 0;
    game.passiveUpgrades = [];
    game.passiveLength = 4;
    game.passivePoints = 0;
    game.passiveRate = 1000;
    game.cards = [];
    game.cardCost = 0;
    game.isInChallenge = false;
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
    game.achievements = this.game.value.achievements;
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

  buyMultiUpgrade(id: number) {
    const game = this.game.value;
    const upgrade = game.multiUpgrades.find((x) => x.id == id);
    upgrade!.amountBought++;
    this.game.next(game);
  }

  setMultiUpgradeCost(id: number, bonus: number) {
    const game = this.game.value;
    const upgrade = game.multiUpgrades.find((x) => x.id == id);
    upgrade!.cost *=
      (upgrade!.amountBought / bonus + 1) **
      Math.log10(upgrade!.amountBought / bonus + 1);
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
    game.cardCost = 100000 * 2 ** (game.cards.length / game.rollsAmount);
    this.game.next(game);
  }

  addCard(card: Card) {
    const game = this.game.value;
    game.cards.push(card);
    this.game.next(game);
  }

  //Challenges

  updateChallengeState(state: boolean, challengeNumber: number) {
    const game = this.game.value;
    game.isInChallenge = state;
    game.challenges.find((x) => x.id == challengeNumber)!.onChallenge = state;
    this.game.next(game);
  }

  resetLetterCounter() {
    const game = this.game.value;
    game.letterCounter = 0;
    this.game.next(game);
  }

  completeChallenge(challengeNumber: number) {
    const game = this.activeGame.value;
    game.challenges.find((x) => x.id == challengeNumber)!.amount++;
    game.challengesAmount++;
    this.activeGame.next(game);
  }

  updateChallenges() {
    const game = this.challengeGame.value;
    game.challenges = this.game.value.challenges;
    this.challengeGame.next(game);
  }
}
