import { GameService } from 'src/app/services/game.service';
import { Card, CardType } from '../classes/card';
import { eIdUpgrade } from '../classes/upgrade';
import { challengeType } from '../classes/challenge';
import { PackTier } from '../classes/pack';

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

  IsInChallenge(challengeType: challengeType): boolean {
    const challenge = this.gameService.game.value.challenges.find(
      (x) => x.type == challengeType
    );
    if (!challenge) return false;
    return challenge.onChallenge;
  }

  IsUnlockedAchievement(achievementName: string): boolean {
    return this.gameService.game.value.achievements.some(
      (x) => x.name == achievementName
    );
  }

  getCardType(card: Card): string {
    switch (card.type) {
      case "Broken":
        return 'brokenCard';
      case "Common":
        return 'commonCard';
      case "Uncommon":
        return 'uncommonCard';
      case "Rare":
        return 'rareCard';
      case "Epic":
        return 'epicCard';
      case "Legendary":
        return 'legendaryCard';
      case "Mythical":
        return 'mythicalCard';
      case "Celestial":
        return 'celestialCard';
      case "Divine":
        return 'divineCard';
      case "Ultimate":
        return 'ultimateCard';
      case "Infinite":
        return 'infiniteCard';
      case "Omnipotent":
        return 'omnipotentCard';
    }
  }

  getCardBonus(): number {
    if (this.IsPurchasedUpgrade("QualityCardsBonus")) {
      const cardValueMap = {
        ["Broken"]: 0.5,
        ["Common"]: 1,
        ["Uncommon"]: 2,
        ["Rare"]: 4,
        ["Epic"]: 8,
        ["Legendary"]: 16,
        ["Mythical"]: 32,
        ["Celestial"]: 64,
        ["Divine"]: 128,
        ["Ultimate"]: 256,
        ["Infinite"]: 512,
        ["Omnipotent"]: 1028

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

  getPercentagesValues(packTier: PackTier): number[] {
    const cardPackDecayMap: Record<PackTier, number> = {
      ["Starter"]: 1.1,
      ["Explorer"]: 0.7,
      ["Master"]: 0.5,
      ["Grandmaster"]: 0.4,
      ["Mighty"]: 0.2,
      ["Ethereal"]: 0.1,
    };
    
    let percentagesArr: number[] = [];

    for (let index = 1; index <= 12; index++) {
      percentagesArr[index - 1] = 100 / Math.exp(cardPackDecayMap[packTier] * index);
    }

    const sumPercentages = percentagesArr.reduce((a, b) => a + b, 0);

    for (let index = 1; index <= 12; index++) {
      percentagesArr[index - 1] = percentagesArr[index - 1] / sumPercentages * 100;
    }

    return percentagesArr;

  }

}
