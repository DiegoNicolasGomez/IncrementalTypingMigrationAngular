import { GameService } from 'src/app/services/game.service';
import { Card, CardType } from '../classes/card';
import { eIdUpgrade } from '../classes/upgrade';

export class GameUtils {
  constructor(private gameService: GameService) {}

  IsPurchasedUpgrade(upgradeNumber: number): boolean {
    return this.gameService.game.value.upgrades.some(
      (x) => x.id == upgradeNumber
    );
  }

  IsPurchasedPassiveUpgrade(upgradeNumber: number): boolean {
    return this.gameService.game.value.passiveUpgrades.some(
      (x) => x.id == upgradeNumber
    );
  }

  IsPurchasedPrestigeUpgrade(upgradeNumber: number): boolean {
    return this.gameService.game.value.prestigeUpgrades.some(
      (x) => x.id == upgradeNumber
    );
  }

  HasCard(cardNumber: number): boolean {
    return this.gameService.game.value.cards.some((x) => x.id == cardNumber);
  }

  Copy(object: object) {
    return JSON.parse(JSON.stringify(object));
  }

  IsInChallenge(challengeNumber: number): boolean {
    const challenge = this.gameService.game.value.challenges.find(
      (x) => x.id == challengeNumber
    );
    if (!challenge) return false;
    return challenge.onChallenge;
  }

  IsUnlockedAchievement(achievementName: string): boolean {
    return this.gameService.game.value.achievements.some(
      (x) => x.name == achievementName
    );
  }

  getCardType(card: Card) {
    switch (card.type) {
      case CardType.Common:
        return 'commonCard';
      case CardType.Uncommon:
        return 'uncommonCard';
      case CardType.Epic:
        return 'epicCard';
      case CardType.Legendary:
        return 'legendaryCard';
      case CardType.Ultimate:
        return 'ultimateCard';
    }
  }

  getCardBonus(): number {
    if (this.IsPurchasedUpgrade(eIdUpgrade.QualityCardsBonus)) {
      const cardValueMap = {
        [CardType.Common]: 1,
        [CardType.Uncommon]: 2,
        [CardType.Epic]: 4,
        [CardType.Legendary]: 8,
        [CardType.Ultimate]: 16

      };
      return this.gameService.game.value.cards.map((x) => cardValueMap[x.type]).reduce((a, b) => a + b, 1);
    } else {
      return this.gameService.game.value.cardsAmount;
    }
  }

  getProperty<T>(
    obj: Record<string, unknown>,
    propertyName: string,
    defaultValue: T
  ): T {
    if (propertyName in obj) {
      return obj[propertyName] as T;
    } else {
      return defaultValue;
    }
  }

  deepCopy(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }
}
