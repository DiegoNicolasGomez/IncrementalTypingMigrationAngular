import { Injectable } from '@angular/core';
import { BonusType, Card, CardType } from '../classes/card';
import { GameUtils } from '../utils/utils';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root',
})
export class CardsService {
  cards: Card[] = [];
  constructor(private gameService: GameService) {
    this.createCard(
      new Card(
        'Fast+ Progress (C)',
        '+5% Points',
        "Common",
        "PointsPercentage",
        1.05,
        1
      )
    );
    this.createCard(
      new Card(
        '+1 Points (C)',
        '+1 Point Per Word',
        "Common",
        "PointsAmount",
        1,
        2
      )
    );
    this.createCard(
      new Card(
        '10% Passive Points (C)',
        '10% Passive Points!',
        "Common",
        "PassivePointsPercentage",
        1.1,
        3
      )
    );
    this.createCard(
      new Card(
        '+2 Passive Points (C)',
        '+2 Passive Points Per Word!',
        "Common",
        "PassivePointsAmount",
        2,
        4
      )
    );

    this.createCard(
      new Card(
        'Faster Progress (UC)',
        '+25% Points',
        "Uncommon",
        "PointsPercentage",
        1.25,
        5
      )
    );
    this.createCard(
      new Card(
        '+3 Points (UC)',
        '+3 Points Per Word',
        "Uncommon",
        "PointsAmount",
        3,
        6
      )
    );
    this.createCard(
      new Card(
        '25% Passive Points (UC)',
        '25% Passive Points!',
        "Uncommon",
        "PassivePointsPercentage",
        1.25,
        7
      )
    );
    this.createCard(
      new Card(
        '+5 Passive Points (UC)',
        '+5 Passive Points Per Word!',
        "Uncommon",
        "PassivePointsAmount",
        5,
        8
      )
    );
    this.createCard(
      new Card(
        'Faster Passive Words (UC)',
        'Generate Passive Words 5% Faster',
        "Uncommon",
        "PassivePointsSpeed",
        1.05,
        9
      )
    );
    this.createCard(
      new Card(
        'Longer Passive Words (UC)',
        '+1 Letter Per Passive Word',
        "Uncommon",
        "PassivePointsLength",
        1,
        10
      )
    );

    this.createCard(
      new Card(
        'Fasterer Progress (E)',
        '+50% Points',
        "Epic",
        "PointsPercentage",
        1.5,
        11
      )
    );
    this.createCard(
      new Card(
        'All Lowercase (E)',
        'From now on, every word is lowercase',
        "Epic",
        "Lowercase",
        0,
        12
      )
    );
    this.createCard(
      new Card(
        '+6 Points (E)',
        '+6 Points Per Word',
        "Epic",
        "PointsAmount",
        6,
        13
      )
    );
    this.createCard(
      new Card(
        '50% Passive Points (E)',
        '50% Passive Points!',
        "Epic",
        "PassivePointsPercentage",
        1.5,
        14
      )
    );
    this.createCard(
      new Card(
        '+10 Passive Points (E)',
        '+10 Passive Points Per Word!',
        "Epic",
        "PassivePointsAmount",
        10,
        15
      )
    );
    this.createCard(
      new Card(
        'Fasterer Passive Words (E)',
        'Generate Passive Words 10% Faster',
        "Epic",
        "PassivePointsSpeed",
        1.1,
        16
      )
    );
    this.createCard(
      new Card(
        'Longerer Passive Words (E)',
        '+2 Letters Per Passive Word',
        "Epic",
        "PassivePointsLength",
        2,
        17
      )
    );

    this.createCard(
      new Card(
        'Fastest Progress (L)',
        '+100% Points',
        "Legendary",
        "PointsPercentage",
        2,
        18
      )
    );
    this.createCard(
      new Card(
        '+10 Points (L)',
        '+10 Points Per Word',
        "Legendary",
        "PointsAmount",
        10,
        19
      )
    );
    this.createCard(
      new Card(
        'x2 Passive Points (L)',
        'Double Passive Points!',
        "Legendary",
        "PassivePointsPercentage",
        2,
        20
      )
    );
    this.createCard(
      new Card(
        '+25 Passive Points (L)',
        '+25 Passive Points Per Word!',
        "Legendary",
        "PassivePointsAmount",
        25,
        21
      )
    );
    this.createCard(
      new Card(
        'Fastest Passive Words (L)',
        'Generate Passive Words 20% Faster',
        "Legendary",
        "PassivePointsSpeed",
        1.2,
        22
      )
    );
    this.createCard(
      new Card(
        'Longest Passive Words (L)',
        '+5 Letters Per Passive Word',
        "Legendary",
        "PassivePointsLength",
        5,
        23
      )
    );
  }

  gameUtils = new GameUtils(this.gameService);

  createCard(card: Card) {
    this.cards.push(card);
  }

  getCards(): Card[] {
    return this.cards;
  }

  getPack(): Card[] {
    var cards: Card[] = [];
    for (
      let index = 0;
      index < this.gameService.game.value.rollsAmount;
      index++
    ) {
      var randomNumber = Math.floor(Math.random() * 100);
      var card: Card;
      if (randomNumber >= 47) {
        card = this.GetCommonCard();
      } else if (randomNumber >= 20) {
        card = this.GetUncommonCard();
      } else if (randomNumber >= 7) {
        card = this.GetEpicCard();
      } else {
        card = this.GetLegendaryCard();
      }
      if (card.id == 12 && this.gameUtils.HasCard(12)) {
        index--;
        continue;
      }
      this.gameService.addCard(card);
      this.gameService.addCardsAmount();

      if (card.id == 10) this.gameService.updatePassiveLength(1);
      if (card.id == 17) this.gameService.updatePassiveLength(2);
      if (card.id == 23) this.gameService.updatePassiveLength(5);
      if (card.id == 9) this.gameService.updatePassiveRate(5);
      if (card.id == 16) this.gameService.updatePassiveRate(10);
      if (card.id == 22) this.gameService.updatePassiveRate(20);
      cards.push(card);
    }
    this.gameService.addPacksBought();
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
          bonusPercentage *= x.bonusAmount;
          break;
        case 'PointsAmount':
          bonusPointAmount += x.bonusAmount;
          break;
        case 'PassivePointsPercentage':
          bonusPassivePercentage *= x.bonusAmount;
          break;
        case 'PassivePointsAmount':
          bonusPassiveAmount += x.bonusAmount;
          break;
        case 'PassivePointsSpeed':
          bonusPassiveSpeed *= x.bonusAmount;
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
    return `You have x${bonusPercentage.toFixed(
      2
    )} + ${bonusPointAmount} Bonus Points, x${bonusPassivePercentage.toFixed(
      2
    )} + ${bonusPassiveAmount} Bonus Passive Points, x${bonusPassiveSpeed.toFixed(
      2
    )} faster and ${bonusPassiveLength} letters longer ${extraBonus}`;
  }

  GetCommonCard(): Card {
    return this.cards.filter((x) => x.type == "Common")[
      Math.floor(
        Math.random() *
          this.cards.filter((x) => x.type == "Common").length
      )
    ];
  }

  GetUncommonCard(): Card {
    return this.cards.filter((x) => x.type == "Uncommon")[
      Math.floor(
        Math.random() *
          this.cards.filter((x) => x.type == "Uncommon").length
      )
    ];
  }

  GetEpicCard(): Card {
    return this.cards.filter((x) => x.type == "Epic")[
      Math.floor(
        Math.random() * this.cards.filter((x) => x.type == "Epic").length
      )
    ];
  }

  GetLegendaryCard(): Card {
    return this.cards.filter((x) => x.type == "Legendary")[
      Math.floor(
        Math.random() *
          this.cards.filter((x) => x.type == "Legendary").length
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
        ["Common"]: "Uncommon",
        ["Uncommon"]: "Epic",
        ["Epic"]: "Legendary",
        ["Legendary"]: "Ultimate",
        ["Ultimate"]: "Ultimate",
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
