import { Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Card } from 'src/app/classes/card';
import { CardsService } from 'src/app/services/cards.service';
import { GameService } from 'src/app/services/game.service';
import { GameUtils } from 'src/app/utils/utils';

@Component({
  selector: 'app-modules-menu',
  templateUrl: './modules-menu.component.html',
  styleUrls: ['./modules-menu.component.scss'],
})
export class ModulesMenuComponent {
  cards: Card[] = [];
  mergeAmount: number = 10;

  constructor(private gameService: GameService, private cardService: CardsService) {
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
    this.cardService.mergeCards(card);
  }
}
