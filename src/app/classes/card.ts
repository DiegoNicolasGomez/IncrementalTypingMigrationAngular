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
  
  export type BonusType = 'PointsPercentage' | 'PointsAmount' | 'PassivePointsPercentage' | 'PassivePointsAmount' | 'PassivePointsSpeed' | 'PassivePointsLength' | 'Lowercase' 
  
  export type CardType  = 'Common' | 'Uncommon' | 'Epic' | 'Legendary' | 'Ultimate'