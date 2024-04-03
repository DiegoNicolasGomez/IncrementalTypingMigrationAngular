import { Injectable } from '@angular/core';
import { eIdUpgrade, Upgrade } from '../classes/upgrade';
import { GameService } from './game.service';
import { LayoutService } from './layout.service';
import { PassiveService } from './passive.service';
import { TimerService } from './timer.service';
import { BehaviorSubject } from 'rxjs';
import { GameUtils } from '../utils/utils';

@Injectable({
  providedIn: 'root',
})
export class UpgradeService {
  private basicUpgrades: Upgrade[] = [];
  private intermediateUpgrades: Upgrade[] = [];
  private advancedUpgrades: Upgrade[] = [];
  private passiveUpgrades: Upgrade[] = [];
  private prestigeUpgrades: Upgrade[] = [];
  lengthUpgradeBlocked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private gameService: GameService,
    private layoutService: LayoutService,
    private passiveService: PassiveService,
    private timerService: TimerService
  ) {
    //Basic Upgrade
    this.createBasicUpgrade(
      new Upgrade(
        'First Upgrade of them all',
        'x1.3 Points',
        50,
        'FirstUpgradePoints'
      )
    );
    this.createBasicUpgrade(
      new Upgrade(
        'Your words value a little bit more, absolutely',
        '+4 Points per Word',
        200,
        'WordsValueBitMore'
      )
    );
    this.createBasicUpgrade(
      new Upgrade("I'm speed", 'Get a letter per minute value', 500, 'ImSpeed')
    );
    this.createBasicUpgrade(
      new Upgrade(
        'You found a word passive enhancer!',
        'Unlock passive income. Bonus: Multiplied by Math.log10([PassivePoints])',
        1_500,
        'WordPassiveEnhancer'
      )
    );
    this.createBasicUpgrade(
      new Upgrade(
        '2nd Upgrade of this type',
        'x1.5 Points',
        2_500,
        'SecondUpgradePoints'
      )
    );
    this.createBasicUpgrade(
      new Upgrade(
        'Every goal has its reward',
        'Every achievement gives a bonus! Bonus: Multiplied by Math.sqrt([Achievements])',
        6_000,
        'EveryGoalReward'
      )
    );
    this.createBasicUpgrade(
      new Upgrade(
        'Your words value a bit more more, absolutely again',
        '+10 points per word',
        10_000,
        'WordsValueBitMoreMore'
      )
    );
    this.createBasicUpgrade(
      new Upgrade(
        'You found a Scrabble <span class="highlight">module</span>!',
        'Every letter gets a value',
        40_000,
        'ScrabbleModule'
      )
    );
    this.createBasicUpgrade(
      new Upgrade('Gacha. Yes, gacha', 'Unlocks Cards!', 100_000, 'Gacha')
    );
    this.createBasicUpgrade(
      new Upgrade('Time to get longer', 'You can keep buying the Word Length Multiupgrade', 200_000, 'WordLengthMultiOne')
    );
    this.createBasicUpgrade(
      new Upgrade(
        'You can challenge yourself to be better next time',
        'Unlock Challenges!',
        5_000_000,
        'ChallengeYourself'
      )
    );
    this.createBasicUpgrade(
      new Upgrade(
        'Last Basic Upgrade! Your words value MORE, a bit more.',
        '+20 points per word',
        10_000_000,
        'LastBasic'
      )
    );

    //Intermediate Upgrade
    this.createIntermediateUpgrade(
      new Upgrade(
        `Screw it, now you can upgrade all those <span class="highlight">modules</span> you've been collecting`,
        'Unlock <span class="highlight">Modules</span> Tab!',
        100_000_000,
        'UnlockModules'
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `For every same letter that the word has, you get a bonus`,
        'Bonus: Math.pow(1.25, [DifferentRepeatedLetter])',
        250_000_000,
        'SameLetterBonus'
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `Lets go back to the basics`,
        'x3 Points!',
        600_000_000,
        'IntermediateBasicsOne'
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `The word length now increases the word value`,
        'Bonus: x[WordLength], simple.',
        1_000_000_000,
        'WordLengthBonus'
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `Now for every DIFFERENT letter that the word has, you get a bonus`,
        'Bonus: Math.pow(1.1, [DifferentLetters])',
        4_500_000_000,
        'DifferentLetterBonus'
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `Lets go back to the basics v2`,
        '+25 Points per Word',
        6_000_000_000,
        'IntermediateBasicsTwo'
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `Your cards amount gives a bonus too.`,
        'Bonus: Multiplied by ln([CardsAmount])',
        10_000_000_000,
        'CardsAmountBonus'
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `More mechanics!`,
        'Unlock Mastery! The word gets an increasing bonus based on its initial',
        50_000_000_000,
        'UnlockMastery'
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `Precision is key`,
        'Gets a bonus for every word perfectly typed',
        100_000_000_000,
        'PrecisionKey'
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `Tax Evasion`,
        'Broken Cards effects are halved',
        500_000_000_000,
        'TaxEvasion'
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `Now the quality of the cards provides a better bonus!`,
        'Bonus: Every card counts as x*Math.pow(2, [Tier])',
        1_500_000_000_000,
        'QualityCardsBonus'
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `Unlock the Market`,
        'Now the letters values increases and decreases over time',
        10_000_000_000_000,
        'UnlockMarket'
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `Unlock the Second Card Pack!`,
        'You can access it on the Cards Menu',
        20_000_000_000_000,
        'SecondCardPack'
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `You found the Merge Module!`,
        'Now you can merge the cards to be better!',
        50_000_000_000_000,
        'MergeModule'
      )
    );

    this.createIntermediateUpgrade(
      new Upgrade(
        `Bull Market!`,
        'There is a chance that the market cannot fall',
        100_000_000_000_000,
        'BullMarket'
      )
    );

    //Advanced Upgrade

    this.createAdvancedUpgrade(
      new Upgrade(
        `Unlock Cardinal Sins!`,
        'Why not!',
        100_000_000_000_000_000,
        'UnlockMinigames'
      )
    );


    this.createAdvancedUpgrade(
      new Upgrade(
        `Unlock Minigames!`,
        'Good Luck!',
        500_000_000_000_000_000,
        'UnlockMinigames'
      )
    );


    //Passive Upgrade
    this.createPassiveUpgrade(
      new Upgrade(
        'You force the enhancer to be enhancerer',
        'x1.25 Points',
        50_000,
        'PassiveEnhancerEnhancerer'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        "Here's a little bonus for you",
        '+5 points per Word',
        200_000,
        'PassiveLittleBonus'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        "I don't know exactly what to upgrade, I'm sorry",
        'x1.5 Points',
        1_000_000,
        'PassiveDontKnow'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        'Wow, it seems that they made a Scrabble <span class="highlight">module</span> for the enhancer too. Interesting',
        'Every letter gets a value',
        5_000_000,
        'PassiveScrabbleModule'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        'Horizontal scaling ftw',
        '+1 Letter',
        100_000_000,
        'PassiveHorizontalScaling'
      )
    );
    this.createPassiveUpgrade(
      new Upgrade(
        'More <span class="highlight">modules</span>! This time you found a synergy <span class="highlight">module</span>.',
        'Every Generator Bought gives a Bonus to the other Generators!',
        500_000_000,
        'PassiveMoreModules'
      )
    );

    this.createPassiveUpgrade(
      new Upgrade(
        'Passive Market',
        'Now Passive Points are affected by the Market',
        100_000_000_000_000_000,
        'PassiveMarket'
      )
    );

    //Prestige Upgrade
    this.createPrestigeUpgrade(
      new Upgrade(
        'Welcome to Prestige! Take a free x2 multiplier',
        'Yes',
        10,
        'PrestigeFreeMultiplier'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        'The Gacha Gods have spoken',
        '+2 Cards Per Roll',
        50,
        'PrestigeGachaGods'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        'Better Scaling for MultiUpgrades!',
        'Cost: ([AmountBought]/2)**(Math.log10([AmountBought]/2))',
        100,
        'PrestigeBetterScaling'
      )
    );
    this.createPrestigeUpgrade(
      new Upgrade(
        'It seems that the next time you Prestige you can bring the enhancer with you. But the upgrades must wear out',
        'Keep your Passive Income (Not your upgrades) when Prestige! (PP resets too)',
        500,
        'PrestigeBringEnhancer'
      )
    );
  }

  gameUtils = new GameUtils(this.gameService);

  createBasicUpgrade(upgrade: Upgrade) {
    this.basicUpgrades.push(upgrade);
  }

  createIntermediateUpgrade(upgrade: Upgrade) {
    this.intermediateUpgrades.push(upgrade);
  }

  createAdvancedUpgrade(upgrade: Upgrade) {
    this.advancedUpgrades.push(upgrade);
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

  getAdvancedUpgrades(): Upgrade[] {
    return this.advancedUpgrades;
  }

  getPassiveUpgrades(): Upgrade[] {
    return this.passiveUpgrades;
  }

  getPrestigeUpgrades(): Upgrade[] {
    return this.prestigeUpgrades;
  }

  getLengthUpgradeBlocked() {
    return this.lengthUpgradeBlocked.asObservable();
  }

  getUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.basicUpgrades.find((x) => x.id === upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService.game.value.upgrades.some(
        (x) => x.id == upgradeType
      ) &&
      this.gameService.game.value.points >= upgrade.cost
    ) {
      this.gameService.updatePoints(-upgrade.cost);
      this.gameService.addUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
      if (upgradeType === "ImSpeed") {
        this.layoutService.setLettersPerSecondVisibility(true);
      }
      if (upgradeType === "WordPassiveEnhancer") {
        if (
          !this.gameService.game.value.passiveGenerators.some((x) => x.id == 1)
        ) {
          this.gameService.addGenerator(
            this.passiveService.generators.find((x) => x.id == 1)!
          );
        }
        this.gameService.buyGenerator(1);
      }
      if(upgradeType === "WordLengthMultiOne") this.lengthUpgradeBlocked.next(false);
    }
  }

  getMultiUpgrade(upgradeType: eIdUpgrade) {
    const multiUpgrade = this.gameService.game.value.multiUpgrades.find(
      (x) => x.id === upgradeType
    );
    if (!multiUpgrade) return;
    if (upgradeType === 'MultiUpgradeWords' && this.lengthUpgradeBlocked.value)
      return;
    if (this.gameService.game.value.points >= multiUpgrade.cost) {
      this.gameService.updatePoints(-multiUpgrade.cost);
      this.gameService.buyMultiUpgrade(upgradeType);
      this.gameService.setMultiUpgradeCost(
        upgradeType,
        this.gameUtils.IsPurchasedPrestigeUpgrade('PrestigeBetterScaling')
          ? 2
          : 1
      );
      this.timerService.logGameTimer(`Obtained Upgrade: ${multiUpgrade.name}"`);
      if (upgradeType === 'MultiUpgradeWords') {
        this.gameService.updateMaxLength();
        let maxAmount = 3;
        if(this.gameUtils.IsPurchasedUpgrade('WordLengthMultiOne')) maxAmount += 3
        this.lengthUpgradeBlocked.next(maxAmount <= multiUpgrade.amountBought)
      }
    }
  }

  getIntermediateUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.intermediateUpgrades.find(
      (x) => x.id == upgradeType
    );
    if (!upgrade) return;
    if (
      !this.gameService.game.value.upgrades.some(
        (x) => x.id == upgradeType
      ) &&
      this.gameService.game.value.points >= upgrade.cost
    ) {
      this.gameService.updatePoints(-upgrade.cost);
      this.gameService.addUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
      if(upgradeType === "PrecisionKey") {
        this.layoutService.setComboCounterVisibility(true);
      }
      if(upgradeType === "TaxEvasion") {
        this.gameService.updateTaxEvasion();
      }
    }
  }

  getAdvancedUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.advancedUpgrades.find(
      (x) => x.id == upgradeType
    );
    if (!upgrade) return;
    if (
      !this.gameService.game.value.upgrades.some(
        (x) => x.id == upgradeType
      ) &&
      this.gameService.game.value.points >= upgrade.cost
    ) {
      this.gameService.updatePoints(-upgrade.cost);
      this.gameService.addUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
    }
  }


  getPassiveUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.passiveUpgrades.find((x) => x.id == upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService.game.value.passiveUpgrades.some(
        (x) => x.id == upgradeType
      ) &&
      this.gameService.game.value.passivePoints >= upgrade.cost
    ) {
      this.gameService.updatePassivePoints(-upgrade.cost);
      this.gameService.addPassiveUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
      if (upgradeType == "PassiveHorizontalScaling") this.gameService.updatePassiveLength(1);
    }
  }

  getPrestigeUpgrade(upgradeType: eIdUpgrade) {
    const upgrade = this.prestigeUpgrades.find((x) => x.id == upgradeType);
    if (!upgrade) return;
    if (
      !this.gameService.game.value.passiveUpgrades.some(
        (x) => x.id == upgradeType
      ) &&
      this.gameService.game.value.prestigePoints >= upgrade.cost
    ) {
      this.gameService.updatePrestigePoints(-upgrade.cost);
      this.gameService.addPrestigeUpgrade(upgrade);
      this.timerService.logGameTimer(`Obtained Upgrade: ${upgrade.name}"`);
      if (upgradeType == "PrestigeGachaGods") this.gameService.updateRollsAmount(2);
    }
  }
}
