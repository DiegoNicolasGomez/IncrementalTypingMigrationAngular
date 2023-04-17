import { Injectable } from '@angular/core';
import { eIdUpgrade, Upgrade } from '../classes/upgrade';
import { GameService } from './game.service';
import { LayoutService } from './layout.service';
import { PassiveService } from './passive.service';

@Injectable({
  providedIn: 'root',
})
export class UpgradeService {
  private basicUpgrades: Upgrade[] = [];
  private intermediateUpgrades: Upgrade[] = [];
  private passiveUpgrades: Upgrade[] = [];
  private prestigeUpgrades: Upgrade[] = [];

  constructor(
    private gameService: GameService,
    private layoutService: LayoutService,
    private passiveService: PassiveService
  ) {
    //Basic Upgrade
    this.createBasicUpgrade(
      new Upgrade('First Upgrade of them all', 'x1.3 Points', 50, 1)
    );
    this.createBasicUpgrade(
      new Upgrade(
        'Your words value a little bit more, absolutely',
        '+4 Points per Word',
        200,
        2
      )
    );
    this.createBasicUpgrade(
      new Upgrade("I'm speed", 'Get a letter per minute value', 500, 3)
    );
    this.createBasicUpgrade(
      new Upgrade(
        'You found a word passive enhancer!',
        'Unlock passive income. Bonus: Multiplied by Math.log10([PassivePoints])',
        1500,
        4
      )
    );
    this.createBasicUpgrade(
      new Upgrade('2nd Upgrade of this type', 'x1.5 Points', 2500, 5)
    );
    this.createBasicUpgrade(
      new Upgrade(
        'Every goal has its reward',
        'Every achievement gives a bonus! Bonus: Multiplied by Math.sqrt([Achievements])',
        6000,
        6
      )
    );
    this.createBasicUpgrade(
      new Upgrade(
        'Your words value a bit more more, absolutely again',
        '+10 points per word',
        10000,
        7
      )
    );
    this.createBasicUpgrade(
      new Upgrade(
        'You found a Scrabble module!',
        'Every letter gets a value',
        40000,
        8
      )
    );
    this.createBasicUpgrade(
      new Upgrade('Gacha. Yes, gacha', 'Unlocks Cards!', 100000, 9)
    );
    this.createBasicUpgrade(new Upgrade('3rd time', 'x2 points', 200000, 10));
    this.createBasicUpgrade(
      new Upgrade(
        'You can challenge yourself to be better next time',
        'Unlock Challenges!',
        5000000,
        11
      )
    );
    this.createBasicUpgrade(
      new Upgrade(
        'Last Basic Upgrade! Your words value MORE, a bit more',
        '+20 points per word',
        10000000,
        12
      )
    );

    //Intermediate Upgrade
    this.createIntermediateUpgrade(
      new Upgrade(
        `Screw it, now you can upgrade all those modules you've been collecting`,
        'Unlock Modules Tab!',
        100000000,
        13
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `For every same letter that the word has, you get a bonus`,
        'Bonus: Math.pow(1.25, [DifferentRepeatedLetter])',
        250_000_000,
        14
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(`Lets go back to the basics`, 'x3 Points!', 600_000_000, 15)
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `The word length now increases the word value`,
        'Bonus: x[WordLength], simple.',
        1_000_000_000,
        16
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `Now for every DIFFERENT letter that the word has, you get a bonus`,
        'Bonus: Math.pow(1.1, [DifferentLetters])',
        4_500_000_000,
        17
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `Lets go back to the basics v2`,
        '+25 Points per Word',
        6_000_000_000,
        18
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `Your cards amount gives a bonus too.`,
        'Bonus: Multiplied by ln([CardsAmount])',
        10_000_000_000,
        19
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `Last Intermediate Upgrade! Now the quality of the cards provides a better bonus!`,
        'Bonus: Every card counts as x*Math.pow(2, [Tier])',
        50_000_000_000,
        20
      )
    );

    //Passive Upgrade
    this.createPassiveUpgrade(
      new Upgrade(
        'You force the enhancer to be enhancerer',
        'x1.25 Points',
        50000,
        1
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        "Here's a little bonus for you",
        '+5 points per Word',
        200000,
        2
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        "I don't know exactly what to upgrade, I'm sorry",
        'x1.5 Points',
        1000000,
        3
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        'Wow, it seems that they made a Scrabble module for the enhancer too. Interesting',
        'Every letter gets a value',
        5000000,
        4
      )
    );
    this.createPassiveUpgrade(
      new Upgrade('Horizontal scaling ftw', '+1 Letter', 100000000, 5)
    );
    this.createPassiveUpgrade(
      new Upgrade(
        'More modules! This time you found a synergy module.',
        'Every Generator Bought gives a Bonus to the other Generators!',
        500000000,
        6
      )
    );

    //Prestige Upgrade
    this.createPrestigeUpgrade(
      new Upgrade(
        'Welcome to Prestige! Take a free x2 multiplier',
        'Yes',
        10,
        1
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade('The Gacha Gods have spoken', '+2 Cards Per Roll', 50, 2)
    );
    this.createPrestigeUpgrade(
      new Upgrade('Better Scaling for MultiUpgrades!', 'x1.25 Points', 100, 3)
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        'It seems that the next time you Prestige you can bring the enhancer with you. But the upgrades must wear out',
        'Keep your Passive Income (Not your upgrades) when Prestige! (PP resets too)',
        500,
        4
      )
    );
  }

  createBasicUpgrade(upgrade: Upgrade) {
    this.basicUpgrades.push(upgrade);
  }

  createIntermediateUpgrade(upgrade: Upgrade) {
    this.intermediateUpgrades.push(upgrade);
  }

  createPassiveUpgrade(upgrade: Upgrade) {
    this.passiveUpgrades.push(upgrade);
  }

  createPrestigeUpgrade(upgrade: Upgrade) {
    this.prestigeUpgrades.push(upgrade);
  }

  getBasicUpgrades(): Upgrade[] {
    return this.basicUpgrades;
  }

  getIntermediateUpgrades(): Upgrade[] {
    return this.intermediateUpgrades;
  }

  getPassiveUpgrades(): Upgrade[] {
    return this.passiveUpgrades;
  }

  getPrestigeUpgrades(): Upgrade[] {
    return this.prestigeUpgrades;
  }

  getUpgrade(upgradeNumber: number) {
    const upgrade = this.basicUpgrades.find((x) => x.id == upgradeNumber);
    if (!upgrade) return;
    if (
      !this.gameService.game.value.upgrades.some(
        (x) => x.id == upgradeNumber
      ) &&
      this.gameService.game.value.points >= upgrade.cost
    ) {
      this.gameService.updatePoints(-upgrade.cost);
      this.gameService.addUpgrade(upgrade);
      if (upgradeNumber == eIdUpgrade.ImSpeed) {
        this.layoutService.setLettersPerSecondVisibility(true);
      }
      if (upgradeNumber == eIdUpgrade.WordPassiveEnhancer) {
        console.time('passive-timer');
        this.gameService.addGenerator(
          this.passiveService.generators.find((x) => x.id == 1)!
        );
        this.gameService.buyGenerator(1);
      }
    }
  }

  getIntermediateUpgrade(upgradeNumber: number) {
    const upgrade = this.intermediateUpgrades.find(
      (x) => x.id == upgradeNumber
    );
    if (!upgrade) return;
    if (
      !this.gameService.game.value.upgrades.some(
        (x) => x.id == upgradeNumber
      ) &&
      this.gameService.game.value.points >= upgrade.cost
    ) {
      this.gameService.updatePoints(-upgrade.cost);
      this.gameService.addUpgrade(upgrade);
    }
  }

  getPassiveUpgrade(upgradeNumber: number) {
    const upgrade = this.passiveUpgrades.find((x) => x.id == upgradeNumber);
    if (!upgrade) return;
    if (
      !this.gameService.game.value.passiveUpgrades.some(
        (x) => x.id == upgradeNumber
      ) &&
      this.gameService.game.value.passivePoints >= upgrade.cost
    ) {
      console.timeLog('passive-timer');
      this.gameService.updatePassivePoints(-upgrade.cost);
      this.gameService.addPassiveUpgrade(upgrade);
      if (upgradeNumber == 4) this.gameService.updatePassiveLength(1);
    }
  }

  getPrestigeUpgrade(upgradeNumber: number) {
    const upgrade = this.prestigeUpgrades.find((x) => x.id == upgradeNumber);
    if (!upgrade) return;
    if (
      !this.gameService.game.value.passiveUpgrades.some(
        (x) => x.id == upgradeNumber
      ) &&
      this.gameService.game.value.prestigePoints >= upgrade.cost
    ) {
      this.gameService.updatePrestigePoints(-upgrade.cost);
      this.gameService.addPrestigeUpgrade(upgrade);
      if (upgradeNumber == 1) this.gameService.updateRollsAmount(2);
    }
  }
}
