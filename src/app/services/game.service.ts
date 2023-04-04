import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Achievement } from '../classes/achievement';
import { Game } from '../classes/game';
import { Upgrade } from '../classes/upgrade';
import { Generator } from '../classes/generator';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  game = new BehaviorSubject<Game>(new Game(0));
  challengeGame = new BehaviorSubject<Game>(new Game(0));
  activeGame = new BehaviorSubject<Game>(new Game(0));

  constructor() {}

  getGame(): Observable<Game> {
    return this.game.asObservable();
  }

  updatePoints(points: number) {
    const game = this.game.value;
    game.points += points;
    this.game.next(game);
  }

  updatePassivePoints(points: number) {
    const game = this.game.value;
    game.passivePoints += points;
    this.game.next(game);
  }

  updatePrestigePoints(points: number) {
    const game = this.game.value;
    game.prestigePoints += points;
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

  addAchievement(achievement: Achievement) {
    const game = this.game.value;
    game.achievements.push(achievement);
    this.game.next(game);
  }

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
    const upgrade = game.multiUpgrades.find((x) => x.id);
    upgrade!.amountBought++;
    this.game.next(game);
  }

  setMultiUpgradeCost(id: number, bonus: number) {
    const game = this.game.value;
    const upgrade = game.multiUpgrades.find((x) => x.id);
    upgrade!.cost *=
      (upgrade!.amountBought / bonus + 1) ** Math.log10(upgrade!.amountBought / bonus + 1);
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

  updatePassiveLength() {
    const game = this.game.value;
    game.passiveLength++;
    this.game.next(game);
  }

  updateRollsAmount(amount: number) {
    const game = this.game.value;
    game.rollsAmount += amount;
    this.game.next(game);
  }
}
