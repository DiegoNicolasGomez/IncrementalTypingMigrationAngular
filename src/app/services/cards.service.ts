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
        CardType.Common,
        BonusType.PointsPercentage,
        1.05,
        1
      )
    );
    this.createCard(
      new Card(
        '+1 Points (C)',
        '+1 Point Per Word',
        CardType.Common,
        BonusType.PointsAmount,
        1,
        2
      )
    );
    this.createCard(
      new Card(
        '10% Passive Points (C)',
        '10% Passive Points!',
        CardType.Common,
        BonusType.PassivePointsPercentage,
        1.1,
        3
      )
    );
    this.createCard(
      new Card(
        '+2 Passive Points (C)',
        '+2 Passive Points Per Word!',
        CardType.Common,
        BonusType.PassivePointsAmount,
        2,
        4
      )
    );

    this.createCard(
      new Card(
        'Faster Progress (UC)',
        '+25% Points',
        CardType.Uncommon,
        BonusType.PointsPercentage,
        1.25,
        5
      )
    );
    this.createCard(
      new Card(
        '+3 Points (UC)',
        '+3 Points Per Word',
        CardType.Uncommon,
        BonusType.PointsAmount,
        3,
        6
      )
    );
    this.createCard(
      new Card(
        '25% Passive Points (UC)',
        '25% Passive Points!',
        CardType.Uncommon,
        BonusType.PassivePointsPercentage,
        1.25,
        7
      )
    );
    this.createCard(
      new Card(
        '+5 Passive Points (UC)',
        '+5 Passive Points Per Word!',
        CardType.Uncommon,
        BonusType.PassivePointsAmount,
        5,
        8
      )
    );
    this.createCard(
      new Card(
        'Faster Passive Words (UC)',
        'Generate Passive Words 5% Faster',
        CardType.Uncommon,
        BonusType.PassivePointsSpeed,
        1.05,
        9
      )
    );
    this.createCard(
      new Card(
        'Longer Passive Words (UC)',
        '+1 Letter Per Passive Word',
        CardType.Uncommon,
        BonusType.PassivePointsLength,
        1,
        10
      )
    );

    this.createCard(
      new Card(
        'Fasterer Progress (E)',
        '+50% Points',
        CardType.Epic,
        BonusType.PointsPercentage,
        1.5,
        11
      )
    );
    this.createCard(
      new Card(
        'All Lowercase (E)',
        'From now on, every word is lowercase',
        CardType.Epic,
        BonusType.Lowercase,
        0,
        12
      )
    );
    this.createCard(
      new Card(
        '+6 Points (E)',
        '+6 Points Per Word',
        CardType.Epic,
        BonusType.PointsAmount,
        6,
        13
      )
    );
    this.createCard(
      new Card(
        '50% Passive Points (E)',
        '50% Passive Points!',
        CardType.Epic,
        BonusType.PassivePointsPercentage,
        1.5,
        14
      )
    );
    this.createCard(
      new Card(
        '+10 Passive Points (E)',
        '+10 Passive Points Per Word!',
        CardType.Epic,
        BonusType.PassivePointsAmount,
        10,
        15
      )
    );
    this.createCard(
      new Card(
        'Fasterer Passive Words (E)',
        'Generate Passive Words 10% Faster',
        CardType.Epic,
        BonusType.PassivePointsSpeed,
        1.1,
        16
      )
    );
    this.createCard(
      new Card(
        'Longerer Passive Words (E)',
        '+2 Letters Per Passive Word',
        CardType.Epic,
        BonusType.PassivePointsLength,
        2,
        17
      )
    );

    this.createCard(
      new Card(
        'Fastest Progress (L)',
        '+100% Points',
        CardType.Legendary,
        BonusType.PointsPercentage,
        2,
        18
      )
    );
    this.createCard(
      new Card(
        '+10 Points (L)',
        '+10 Points Per Word',
        CardType.Legendary,
        BonusType.PointsAmount,
        10,
        19
      )
    );
    this.createCard(
      new Card(
        'x2 Passive Points (L)',
        'Double Passive Points!',
        CardType.Legendary,
        BonusType.PassivePointsPercentage,
        2,
        20
      )
    );
    this.createCard(
      new Card(
        '+25 Passive Points (L)',
        '+25 Passive Points Per Word!',
        CardType.Legendary,
        BonusType.PassivePointsAmount,
        25,
        21
      )
    );
    this.createCard(
      new Card(
        'Fastest Passive Words (L)',
        'Generate Passive Words 20% Faster',
        CardType.Legendary,
        BonusType.PassivePointsSpeed,
        1.2,
        22
      )
    );
    this.createCard(
      new Card(
        'Longest Passive Words (L)',
        '+5 Letters Per Passive Word',
        CardType.Legendary,
        BonusType.PassivePointsLength,
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
      if (randomNumber >= 40) {
        card = this.GetCommonCard();
      } else if (randomNumber >= 10) {
        card = this.GetUncommonCard();
      } else if (randomNumber >= 1) {
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
    return cards;
  }

  GetCommonCard(): Card {
    return this.cards.filter((x) => x.type == CardType.Common)[
      Math.floor(Math.random() * this.cards.filter(x => x.type == CardType.Common).length)
    ];
  }

  GetUncommonCard(): Card {
    return this.cards.filter((x) => x.type == CardType.Uncommon)[
      Math.floor(Math.random() * this.cards.filter(x => x.type == CardType.Uncommon).length)
    ];
  }

  GetEpicCard(): Card {
    return this.cards.filter((x) => x.type == CardType.Epic)[
      Math.floor(Math.random() * this.cards.filter(x => x.type == CardType.Epic).length)
    ];
  }

  GetLegendaryCard(): Card {
    return this.cards.filter((x) => x.type == CardType.Legendary)[
      Math.floor(Math.random() * this.cards.filter(x => x.type == CardType.Legendary).length)
    ];
  }
}
