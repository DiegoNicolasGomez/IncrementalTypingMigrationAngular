import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  animate,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Card } from 'src/app/classes/card';
import { ActiveService } from 'src/app/services/active.service';
import { CardsService } from 'src/app/services/cards.service';
import { GameService } from 'src/app/services/game.service';
import { GameUtils } from 'src/app/utils/utils';
import { Generator } from 'src/app/classes/generator';
import { AchievementsService } from 'src/app/services/achievements.service';

@Component({
  selector: 'app-modules-menu',
  templateUrl: './modules-menu.component.html',
  styleUrls: ['./modules-menu.component.scss'],
  animations: [
    trigger('fadeOut', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0, pointerEvents: 'none' })),
      transition('visible => hidden', animate('300ms ease-out')),
      transition('hidden => visible', animate('300ms ease-in')),
    ]),
  ],
})
export class ModulesMenuComponent {
  scrabbleModuleBought: boolean = false;
  synergyModuleBought: boolean = false;
  mergeModuleBought: boolean = false;
  scrabbleModuleAvailable: boolean = false;
  synergyModuleAvailable: boolean = false;
  mergeModuleAvailable: boolean = false;

  cards: Card[] = [];
  mergeAmount: number = 10;
  mergeCardsCost: number = 200;
  totalCards: number = 0;
  lettersBonus: number[] = [];
  generators: Generator[] = [];

  constructor(
    private gameService: GameService,
    private cardService: CardsService,
    private activeService: ActiveService,
    private achievementService: AchievementsService
  ) {
    this.gameService.getGame().subscribe((game) => {
      const seenIds: { [id: string]: boolean } = {};

      // Filter out cards with duplicate IDs
      const distinctCards = game.cards.reduce((acc: Card[], card) => {
        if (!seenIds[card.id]) {
          seenIds[card.id] = true; // mark ID as seen
          acc.push(card); // add card to the accumulator array
        }
        return acc;
      }, []);

      this.cards = distinctCards;
      this.mergeAmount = game.mergeAmount;
      this.mergeCardsCost = game.mergeCardsCost;
      this.totalCards = game.cards.length;
      this.lettersBonus = game.lettersBonus;
      this.generators = game.passiveGenerators;
      this.scrabbleModuleBought = game.modulesUnlocked[0];
      this.synergyModuleBought = game.modulesUnlocked[1];
      this.mergeModuleBought = game.modulesUnlocked[2];
      this.scrabbleModuleAvailable = game.upgrades.some(
        (x) => x.id === 'ScrabbleModule'
      );
      this.synergyModuleAvailable = game.upgrades.some(
        (x) => x.id === 'PassiveMoreModules'
      );;
      this.mergeModuleAvailable = game.upgrades.some(
        (x) => x.id === 'MergeModule'
      );
    });
  }

  gameUtils = new GameUtils(this.gameService);

  getCardType(card: Card): string {
    return this.gameUtils.getCardType(card);
  }

  getCardsAmount(card: Card): number {
    return this.gameService.game.value.cards.filter((x) => x.id === card.id)
      .length;
  }

  canMerge(card: Card) {
    return this.mergeAmount <= this.getCardsAmount(card);
  }

  mergeCard(card: Card) {
    if (
      card.type === 'Omnipotent' &&
      !this.gameUtils.IsUnlockedAchievement('The Cycle Continues')
    )
      this.achievementService.completeAchievement('The Cycle Continues');
    this.cardService.mergeCards(card);
  }

  reduceMergeCost() {
    this.cardService.reduceMergeCost();
  }

  buyLetterTier(index: number) {
    this.activeService.buyLetterTier(index);
  }

  isScrabbleModulePurchased() {
    return this.scrabbleModuleBought;
  }

  isSynergyModulePurchased() {
    return this.synergyModuleBought;
  }

  isMergeModulePurchased() {
    return this.mergeModuleBought;
  }

  isScrabbleModuleAvailable() {
    return this.scrabbleModuleAvailable;
  }

  isSynergyModuleAvailable() {
    return this.synergyModuleAvailable;
  }

  isMergeModuleAvailable() {
    return this.mergeModuleAvailable;
  }

  buyMergeModule() {
    if (this.gameService.game.value.points >= 1_000_000_000_000_000 && this.gameUtils.IsPurchasedUpgrade('MergeModule')) {
      this.gameService.updatePoints(-1_000_000_000_000_000);
      this.gameService.unlockModule(2);
    }
  }

  buySynergyModule() {
    if (this.gameService.game.value.points >= 1_000_000_000_000 && this.gameUtils.IsPurchasedPassiveUpgrade('PassiveMoreModules')) {
      this.gameService.updatePoints(-1_000_000_000_000);
      this.gameService.unlockModule(1);
    }
  }

  buyScrabbleModule() {
    if (this.gameService.game.value.points >= 1_000_000_000 && this.gameUtils.IsPurchasedUpgrade('ScrabbleModule')) {
      this.gameService.updatePoints(-1_000_000_000);
      this.gameService.unlockModule(0);
    }
  }

  buySynergyValue(generator: Generator) {
    if (this.gameService.game.value.passivePoints >= generator.synergyCost) {
      this.gameService.updatePassivePoints(-generator.synergyCost);
      this.gameService.addSynergyValue(generator.id);
    }
  }
}
