export class Card {
    name: string;
    description: string;
    type: CardType;
    bonusType: BonusType;
    bonusAmount: number;
    id: number;
  
    constructor(
      cardName: string,
      cardDesc: string,
      cardType: CardType,
      bonusType: BonusType,
      bonusAmount: number,
      cardNumber: number
    ) {
      this.name = cardName;
      this.description = cardDesc;
      this.type = cardType;
      this.bonusType = bonusType;
      this.bonusAmount = bonusAmount;
      this.id = cardNumber;
    }
  }
  
  export enum BonusType {
    PointsPercentage = 'PointsPercentage',
    PointsAmount = 'PointsAmount',
    PassivePointsPercentage = 'PassivePointsPercentage',
    PassivePointsAmount = 'PassivePointsAmount',
    PassivePointsSpeed = 'PassivePointsSpeed',
    PassivePointsLength = 'PassivePointsLength',
    Lowercase = 'Lowercase' 
  }
  
  export enum CardType {
    Common = 'Common',
    Uncommon = 'Uncommon',
    Epic = 'Epic',
    Legendary = 'Legendary',
    Ultimate = 'Ultimate'
  }