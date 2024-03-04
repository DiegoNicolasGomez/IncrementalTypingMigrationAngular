export class Card {
  name: string;
  description: string;
  type: CardType;
  bonusType: BonusType;
  bonusAmount: number;
  id: number;

  readonly cardMap: Record<CardType, number> = {
    ['Common']: 1,
    ['Uncommon']: 2,
    ['Broken']: 3,
    ['Rare']: 4,
    ['Epic']: 5,
    ['Legendary']: 6,
    ['Mythical']: 7,
    ['Celestial']: 8,
    ['Divine']: 9,
    ['Ultimate']: 10,
    ['Infinite']: 11,
    ['Omnipotent']: 12,
  };

  readonly formulaOptions: formulaOptions = {
    upperbound: 1000,
    steepness: 0.1,
    separator: 5,
    midpoint: 70,
  };

  constructor(
    cardName: string,
    cardType: CardType,
    bonusType: BonusType,
    cardNumber: number
  ) {
    this.name = cardName;
    this.type = cardType;
    this.bonusType = bonusType;
    this.id = cardNumber;
    this.description = this.getDescAmount();
    this.bonusAmount = this.getBonusAmount();
  }

  private getBonusAmount(): number {
    switch (this.bonusType) {
      case 'PointsAmount':
        return this.type === 'Broken'
          ? -10
          : Math.floor(
              this.formulaOptions.upperbound *
                (1 /
                  (1 +
                    Math.exp(
                      -this.formulaOptions.steepness *
                        (this.cardMap[this.type] *
                          this.formulaOptions.separator -
                          this.formulaOptions.midpoint)
                    )))
            );
      default:
        return 1;
    }
  }

  private getDescAmount(): string {
    switch (this.bonusType) {
      case 'PointsAmount':
          return this.type === 'Broken'
          ? '-10 Points Per Word' : `+${Math.floor(
            this.formulaOptions.upperbound *
              (1 /
                (1 +
                  Math.exp(
                    -this.formulaOptions.steepness *
                      (this.cardMap[this.type] *
                        this.formulaOptions.separator -
                        this.formulaOptions.midpoint)
                  )))
          )} Points Per Word`;
    
      default:
        return '';
        break;
    }
  }
}

export type BonusType =
  | 'PointsPercentage'
  | 'PointsAmount'
  | 'PassivePointsPercentage'
  | 'PassivePointsAmount'
  | 'PassivePointsSpeed'
  | 'PassivePointsLength'
  | 'Lowercase';

export type CardType =
  | 'Broken'
  | 'Common'
  | 'Uncommon'
  | 'Rare'
  | 'Epic'
  | 'Legendary'
  | 'Mythical'
  | 'Celestial'
  | 'Divine'
  | 'Ultimate'
  | 'Infinite'
  | 'Omnipotent';

export type PackTier =
  | 'Starter'
  | 'Explorer'
  | 'Master'
  | 'Grandmaster'
  | 'Mighty'
  | 'Ethereal';

interface formulaOptions {
  upperbound: number;
  steepness: number;
  separator: number;
  midpoint: number;
}
