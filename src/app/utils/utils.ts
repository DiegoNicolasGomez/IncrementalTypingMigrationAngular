import { GameService } from 'src/app/services/game.service';
import { Card, CardType } from '../classes/card';
import { eIdUpgrade } from '../classes/upgrade';

export class GameUtils {
  constructor(private gameService: GameService) {}

  IsPurchasedUpgrade(upgradeNumber: eIdUpgrade): boolean {
    return this.gameService.game.value.upgrades.some(
      (x) => x.id == upgradeNumber
    );
  }

  IsPurchasedPassiveUpgrade(upgradeNumber: eIdUpgrade): boolean {
    return this.gameService.game.value.passiveUpgrades.some(
      (x) => x.id == upgradeNumber
    );
  }

  IsPurchasedPrestigeUpgrade(upgradeNumber: eIdUpgrade): boolean {
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
      case "Common":
        return 'commonCard';
      case "Uncommon":
        return 'uncommonCard';
      case "Epic":
        return 'epicCard';
      case "Legendary":
        return 'legendaryCard';
      case "Ultimate":
        return 'ultimateCard';
    }
  }

  getCardBonus(): number {
    if (this.IsPurchasedUpgrade("QualityCardsBonus")) {
      const cardValueMap = {
        ["Common"]: 1,
        ["Uncommon"]: 2,
        ["Epic"]: 4,
        ["Legendary"]: 8,
        ["Ultimate"]: 16

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
