import { Injectable, OnInit } from '@angular/core';
import { BonusType, Card, CardType } from '../classes/card';
import { GameUtils } from '../utils/utils';
import { GameService } from './game.service';
import { Pack, PackTier } from '../classes/pack';
import { PackService } from './pack.service';
import { AchievementsService } from './achievements.service';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  cards: Card[] = [];
  packs: Pack[] = [];
  constructor(
    private gameService: GameService,
    private packService: PackService,
    private achievementService: AchievementsService
  ) {
    this.createCard(
      new Card('Percentage Points Booster', 'Common', 'PointsPercentage', 1)
    );
    this.createCard(
      new Card('Nominal Points Booster', 'Common', 'PointsAmount', 2)
    );
    this.createCard(
      new Card(
        'Percentage Passive Points Improver',
        'Common',
        'PassivePointsPercentage',
        3
      )
    );
    this.createCard(
      new Card(
        'Nominal Passive Points Improver',
        'Common',
        'PassivePointsAmount',
        4
      )
    );

    this.createCard(
      new Card('Percentage Points Augmentor', 'Uncommon', 'PointsPercentage', 5)
    );
    this.createCard(
      new Card('Nominal Points Augmentor', 'Uncommon', 'PointsAmount', 6)
    );
    this.createCard(
      new Card(
        'Percentage Passive Points Infuser',
        'Uncommon',
        'PassivePointsPercentage',
        7
      )
    );
    this.createCard(
      new Card(
        'Nominal Passive Points Infuser',
        'Uncommon',
        'PassivePointsAmount',
        8
      )
    );
    this.createCard(
      new Card(
        'Passive Points Accelerator',
        'Uncommon',
        'PassivePointsSpeed',
        9
      )
    );
    this.createCard(
      new Card('Word Length Extender', 'Uncommon', 'PassivePointsLength', 10)
    );

    this.createCard(
      new Card('Income Impairer', 'Broken', 'PointsPercentage', 24)
    );
    this.createCard(new Card('Detrimental Debt', 'Broken', 'PointsAmount', 25));
    this.createCard(
      new Card('Debilitating Discount', 'Broken', 'PassivePointsPercentage', 26)
    );
    this.createCard(
      new Card('Shrinking Stash', 'Broken', 'PassivePointsAmount', 27)
    );
    this.createCard(
      new Card('Lethargic Generator', 'Broken', 'PassivePointsSpeed', 28)
    );
    this.createCard(
      new Card('Diminished Diction', 'Broken', 'PassivePointsLength', 29)
    );

    this.createCard(
      new Card('Percentage Points Magnifier', 'Rare', 'PointsPercentage', 11)
    );
    this.createCard(new Card('All Lowercase', 'Legendary', 'Lowercase', 12));
    this.createCard(
      new Card('Nominal Points Magnifier', 'Rare', 'PointsAmount', 13)
    );
    this.createCard(
      new Card(
        'Percentage Passive Points Energizer',
        'Rare',
        'PassivePointsPercentage',
        14
      )
    );
    this.createCard(
      new Card(
        'Nominal Passive Points Energizer',
        'Rare',
        'PassivePointsAmount',
        15
      )
    );
    this.createCard(
      new Card('Passive Points Turbocharger', 'Rare', 'PassivePointsSpeed', 16)
    );
    this.createCard(
      new Card('Word Length Expander', 'Rare', 'PassivePointsLength', 17)
    );

    this.createCard(
      new Card('Percentage Points Empowerer', 'Epic', 'PointsPercentage', 18)
    );
    this.createCard(
      new Card('Nominal Points Empowerer', 'Epic', 'PointsAmount', 19)
    );
    this.createCard(
      new Card(
        'Percentage Passive Points Dynamo',
        'Epic',
        'PassivePointsPercentage',
        20
      )
    );
    this.createCard(
      new Card(
        'Nominal Passive Points Dynamo',
        'Epic',
        'PassivePointsAmount',
        21
      )
    );
    this.createCard(
      new Card('Passive Points Booster', 'Epic', 'PassivePointsSpeed', 22)
    );
    this.createCard(
      new Card('Word Length Enhancer', 'Epic', 'PassivePointsLength', 23)
    );

    this.createCard(
      new Card('Significant Surge', 'Legendary', 'PointsPercentage', 30)
    );
    this.createCard(
      new Card('Masterful Magnification', 'Legendary', 'PointsAmount', 31)
    );
    this.createCard(
      new Card('Measured Momentum', 'Legendary', 'PassivePointsPercentage', 32)
    );
    this.createCard(
      new Card('Incremental Impact', 'Legendary', 'PassivePointsAmount', 33)
    );
    this.createCard(
      new Card('Speedy Scripting', 'Legendary', 'PassivePointsSpeed', 34)
    );
    this.createCard(
      new Card('Longevity Linguistics', 'Legendary', 'PassivePointsLength', 35)
    );

    this.createCard(
      new Card('Pronounced Percentage', 'Mythical', 'PointsPercentage', 36)
    );
    this.createCard(new Card('Grandiose Gain', 'Mythical', 'PointsAmount', 37));
    this.createCard(
      new Card(
        'Exponential Enhancement',
        'Mythical',
        'PassivePointsPercentage',
        38
      )
    );
    this.createCard(
      new Card('Steady Stream', 'Mythical', 'PassivePointsAmount', 39)
    );
    this.createCard(
      new Card('Hustle Harmony', 'Mythical', 'PassivePointsSpeed', 40)
    );
    this.createCard(
      new Card('Word Length Enhancer', 'Mythical', 'PassivePointsLength', 41)
    );

    this.createCard(
      new Card('Elevated Expansion', 'Celestial', 'PointsPercentage', 42)
    );
    this.createCard(
      new Card('Illustrious Increase', 'Celestial', 'PointsAmount', 43)
    );
    this.createCard(
      new Card(
        'Amplified Ascendance',
        'Celestial',
        'PassivePointsPercentage',
        44
      )
    );
    this.createCard(
      new Card('Amplified Accumulation', 'Celestial', 'PassivePointsAmount', 45)
    );
    this.createCard(
      new Card('Velocity Versification', 'Celestial', 'PassivePointsSpeed', 46)
    );
    this.createCard(
      new Card('Extended Enunciation', 'Celestial', 'PassivePointsLength', 47)
    );

    this.createCard(
      new Card('Substantial Spike', 'Divine', 'PointsPercentage', 48)
    );
    this.createCard(
      new Card('Prodigious Profit', 'Divine', 'PointsAmount', 49)
    );
    this.createCard(
      new Card(
        'Magnitude Multiplicity',
        'Divine',
        'PassivePointsPercentage',
        50
      )
    );
    this.createCard(
      new Card('Significant Surplus', 'Divine', 'PassivePointsAmount', 51)
    );
    this.createCard(
      new Card('Supersonic Script', 'Divine', 'PassivePointsSpeed', 52)
    );
    this.createCard(
      new Card('Enduring Expression', 'Divine', 'PassivePointsLength', 53)
    );

    this.createCard(
      new Card('Momentous Multiplicity', 'Ultimate', 'PointsPercentage', 54)
    );
    this.createCard(
      new Card('Monumental Multiplication', 'Ultimate', 'PointsAmount', 55)
    );
    this.createCard(
      new Card('Grandiose Gargantua', 'Ultimate', 'PassivePointsPercentage', 56)
    );
    this.createCard(
      new Card('Elevated Endowment', 'Ultimate', 'PassivePointsAmount', 57)
    );
    this.createCard(
      new Card('Majestic Manuscript', 'Ultimate', 'PassivePointsSpeed', 58)
    );
    this.createCard(
      new Card('Celestial Composition', 'Ultimate', 'PassivePointsLength', 59)
    );

    this.createCard(
      new Card('Mythic Magnitude', 'Infinite', 'PointsPercentage', 60)
    );
    this.createCard(
      new Card('Legendary Lucre', 'Infinite', 'PointsAmount', 61)
    );
    this.createCard(
      new Card('Ultimate Uplift', 'Infinite', 'PassivePointsPercentage', 62)
    );
    this.createCard(
      new Card('Paramount Proliferation', 'Infinite', 'PassivePointsAmount', 63)
    );
    this.createCard(
      new Card('Grandiloquent Gyrator', 'Infinite', 'PassivePointsSpeed', 64)
    );
    this.createCard(
      new Card('Majestic Manifestation', 'Infinite', 'PassivePointsLength', 65)
    );

    this.createCard(
      new Card('Supreme Surplus', 'Omnipotent', 'PointsPercentage', 66)
    );
    this.createCard(
      new Card('Transcendent Treasury', 'Omnipotent', 'PointsAmount', 67)
    );
    this.createCard(
      new Card(
        'Celestial Sovereignty',
        'Omnipotent',
        'PassivePointsPercentage',
        68
      )
    );
    this.createCard(
      new Card('Ultimate Ubiquity', 'Omnipotent', 'PassivePointsAmount', 69)
    );
    this.createCard(
      new Card('Celestial Celerity', 'Omnipotent', 'PassivePointsSpeed', 70)
    );
    this.createCard(
      new Card('Supreme Syllabication', 'Omnipotent', 'PassivePointsLength', 71)
    );

    this.packService.getPacks().subscribe((packs) => (this.packs = packs));
  }

  gameUtils = new GameUtils(this.gameService);

  createCard(card: Card) {
    this.cards.push(card);
  }

  getCards(): Card[] {
    return this.cards;
  }

  getPack(packTier: PackTier): Card[] {
    var cards: Card[] = [];
    const pack = this.packs.find((x) => x.type === packTier)!;
    let cardPercentages: number[] =
      this.gameUtils.getPercentagesValues(packTier);
    for (
      let index = 0;
      index < this.gameService.game.value.rollsAmount;
      index++
    ) {
      var randomNumber = Math.random() * 100;
      var card: Card;
      let selectedTier = cardPercentages.length + 1;
      for (let tier = 0; tier < cardPercentages.length; tier++) {
        const condition = cardPercentages
          .slice(0, tier + 1)
          .reduce((sum, threshold) => sum + threshold, 0);

        if (randomNumber >= 100 - condition) {
          selectedTier = tier + 1;
          break;
        }
      }
      const cardMap: Record<number, CardType> = {
        [1]: 'Common',
        [2]: 'Uncommon',
        [3]: 'Broken',
        [4]: 'Rare',
        [5]: 'Epic',
        [6]: 'Legendary',
        [7]: 'Mythical',
        [8]: 'Celestial',
        [9]: 'Divine',
        [10]: 'Ultimate',
        [11]: 'Infinite',
        [12]: 'Omnipotent',
      };

      card = this.GetCard(cardMap[selectedTier]);

      if (card.id == 12 && this.gameUtils.HasCard(12)) {
        index--;
        continue;
      }
      this.gameService.addCard(card);
      this.gameService.addCardsAmount();

      switch (card.bonusType) {
        case 'PassivePointsSpeed':
          this.gameService.updatePassiveRate(card.bonusAmount);
          break;
        case 'PassivePointsLength':
          this.gameService.updatePassiveLength(card.bonusAmount);
          break;
        default:
          break;
      }

      cards.push(card);
    }

    const gameCards = this.gameService.game.value.cards;
    const uniqueTypes = new Set(gameCards.map((obj) => obj.type));

    if (
      uniqueTypes.size >= 4 &&
      !this.gameUtils.IsUnlockedAchievement('Deck Diversifier')
    )
      this.achievementService.completeAchievement('Deck Diversifier');
    if (
      uniqueTypes.size >= 8 &&
      !this.gameUtils.IsUnlockedAchievement('Octo-Collector Maestro')
    )
      this.achievementService.completeAchievement('Octo-Collector Maestro');

    if (
      uniqueTypes.size >= 12 &&
      !this.gameUtils.IsUnlockedAchievement('Master of All Trades')
    )
      this.achievementService.completeAchievement('Master of All Trades');

    this.gameService.addPack(pack);
    return cards;
  }

  getBonus(): string {
    var bonusPercentage = 1;
    var bonusPointAmount = 0;
    var bonusPassivePercentage = 1;
    var bonusPassiveAmount = 0;
    var bonusPassiveSpeed = 1;
    var bonusPassiveLength = 0;
    var extraBonus = '';
    this.gameService.game.value.cards.forEach((x) => {
      switch (x.bonusType) {
        case 'PointsPercentage':
          bonusPercentage += x.bonusAmount;
          break;
        case 'PointsAmount':
          bonusPointAmount += x.bonusAmount;
          break;
        case 'PassivePointsPercentage':
          bonusPassivePercentage += x.bonusAmount;
          break;
        case 'PassivePointsAmount':
          bonusPassiveAmount += x.bonusAmount;
          break;
        case 'PassivePointsSpeed':
          bonusPassiveSpeed *= 1 + x.bonusAmount / 100;
          break;
        case 'PassivePointsLength':
          bonusPassiveLength += x.bonusAmount;
          break;
        case 'Lowercase':
          extraBonus += '- All Lowercase';
          break;
        default:
          break;
      }
    });
    return `You have x${(1 + bonusPercentage / 100).toFixed(
      2
    )} + ${bonusPointAmount} Bonus Points, x${(
      1 +
      bonusPassivePercentage / 100
    ).toFixed(
      2
    )} + ${bonusPassiveAmount} Bonus Passive Points, x${bonusPassiveSpeed.toFixed(
      2
    )} faster and ${bonusPassiveLength} letters longer ${extraBonus}`;
  }

  GetCard(type: CardType): Card {
    return this.cards.filter((x) => x.type == type)[
      Math.floor(
        Math.random() * this.cards.filter((x) => x.type == type).length
      )
    ];
  }

  mergeCards(card: Card) {
    const cards = this.gameService.game.value.cards.filter(
      (x) => x.id === card.id
    );
    if (this.gameService.game.value.mergeAmount <= cards.length) {
      const cardsToBeMerged = cards.slice(
        0,
        this.gameService.game.value.mergeAmount
      );
      this.gameService.game.value.cards =
        this.gameService.game.value.cards.filter(
          (x) => !cardsToBeMerged.includes(x)
        );

      const cardsTiersMap: { [key in CardType]: CardType } = {
        ['Broken']: 'Common',
        ['Common']: 'Uncommon',
        ['Uncommon']: 'Rare',
        ['Rare']: 'Epic',
        ['Epic']: 'Legendary',
        ['Legendary']: 'Mythical',
        ['Mythical']: 'Celestial',
        ['Celestial']: 'Divine',
        ['Divine']: 'Ultimate',
        ['Ultimate']: 'Infinite',
        ['Infinite']: 'Omnipotent',
        ['Omnipotent']: 'Broken',
      };

      this.gameService.addCard(
        this.cards.find(
          (x) =>
            x.bonusType === card.bonusType &&
            x.type === cardsTiersMap[card.type]
        )!
      );
    }
  }

  reduceMergeCost() {
    const game = this.gameService.game.value;
    if (game.cards.length >= game.mergeCardsCost) {
      this.gameService.updateMergeCardCost(100);
      this.gameService.updateMergeCardAmount();
      this.gameService.resetCards();
    }
  }
}
